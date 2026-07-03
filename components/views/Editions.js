"use client";
import { useState } from "react";
import { updateCommunity, fmtWindow, fmtDate } from "@/lib/db";
import Icon from "../Icon";

// The active edition lives on the community doc. This view mirrors the reference
// layout: a highlighted "current edition" summary with a Day X of Y progress
// bar, edit controls, and a "start a new edition" action. Real data only —
// everything initializes from the `community` prop.
const STATUS = ["active", "upcoming", "ended"];

export default function Editions({ community, toast, onSaved }) {
  const [f, setF] = useState({
    editionLabel: community.editionLabel || "",
    editionStart: community.editionStart || "",
    editionEnd: community.editionEnd || "",
    editionDays: community.editionDays || "",
    editionStatus: community.editionStatus || "active",
  });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  async function save(extra) {
    setBusy(true);
    try {
      await updateCommunity(community.id, { ...f, ...(extra || {}) });
      toast("Edition updated");
      onSaved && onSaved();
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }

  function startNew() {
    if (!confirm("Start a new edition? The current one will be marked ended.")) return;
    const m = /(\d+)/.exec(f.editionLabel || "");
    const next = m ? `Edition ${+m[1] + 1}` : "Edition 2";
    const patch = { editionLabel: next, editionStart: "", editionEnd: "", editionStatus: "active" };
    setF((x) => ({ ...x, ...patch }));
    save(patch);
  }

  // Compute "Day X of Y" + progress from real edition dates vs today.
  const now = new Date();
  const start = f.editionStart ? new Date(f.editionStart) : null;
  let totalDays = null;
  if (start) {
    if (f.editionEnd) totalDays = Math.floor((new Date(f.editionEnd) - start) / 86400000) + 1;
    else if (f.editionDays) totalDays = Number(f.editionDays);
  } else if (f.editionDays) {
    totalDays = Number(f.editionDays);
  }
  let dayOf = null;
  if (start) {
    dayOf = Math.floor((now - start) / 86400000) + 1;
    if (dayOf < 1) dayOf = 0; // edition hasn't begun yet
    if (totalDays && dayOf > totalDays) dayOf = totalDays;
  }
  const done = start ? Math.max(0, Math.min(dayOf || 0, totalDays || dayOf || 0)) : 0;
  const daysLeft = totalDays ? Math.max(0, totalDays - done) : null;
  const pct = totalDays && totalDays > 0 ? Math.round((done / totalDays) * 100) : 0;
  const hasDates = !!f.editionStart;
  const windowText = fmtWindow(f.editionStart, f.editionEnd);
  const statusChip = f.editionStatus === "active" ? "cg" : f.editionStatus === "upcoming" ? "ca" : "cn";

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr", alignItems: "start", gap: 16 }}>
      {/* LEFT — current edition summary + progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card" style={{ background: "linear-gradient(135deg,#1A0E3D,#3D2582)", border: "none", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
            <div>
              <span className={`chip ${statusChip}`} style={{ background: f.editionStatus === "active" ? "rgba(22,163,74,.25)" : "rgba(255,255,255,.15)", color: f.editionStatus === "active" ? "#86EFAC" : "#fff", border: "none" }}>
                {f.editionStatus === "active" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />}
                {f.editionStatus}
              </span>
              <div className="disp" style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: 8 }}>{f.editionLabel || "Untitled edition"}</div>
              <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)", marginTop: 2 }}>
                {hasDates ? `${windowText}${totalDays ? ` · ${totalDays} days` : ""}` : "Dates not set yet"}
              </div>
            </div>
          </div>

          {hasDates && totalDays ? (
            <>
              <div style={{ display: "flex", gap: 9 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 11, padding: 11, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fm)", fontSize: "1.3rem", fontWeight: 700 }}>{done}</div>
                  <div style={{ fontSize: ".56rem", color: "rgba(255,255,255,.6)" }}>Days done</div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 11, padding: 11, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fm)", fontSize: "1.3rem", fontWeight: 700, color: "#FDE68A" }}>{daysLeft}</div>
                  <div style={{ fontSize: ".56rem", color: "rgba(255,255,255,.6)" }}>Days left</div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 11, padding: 11, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fm)", fontSize: "1.3rem", fontWeight: 700 }}>{totalDays}</div>
                  <div style={{ fontSize: ".56rem", color: "rgba(255,255,255,.6)" }}>Total days</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                <div className="bar-track" style={{ flex: 1, background: "rgba(255,255,255,.15)" }}>
                  <div className="bar-fill" style={{ width: pct + "%" }} />
                </div>
                <span style={{ fontFamily: "var(--fm)", fontSize: ".72rem", fontWeight: 700, color: "rgba(255,255,255,.85)", whiteSpace: "nowrap" }}>
                  Day {Math.min(Math.max(dayOf || 0, 0), totalDays)} of {totalDays}
                </span>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".74rem", color: "rgba(255,255,255,.7)", background: "rgba(255,255,255,.08)", borderRadius: 11, padding: "12px 13px" }}>
              <Icon name="cal" size={15} stroke="rgba(255,255,255,.7)" />
              Set a start and end date (or number of days) to track this edition's progress.
            </div>
          )}
        </div>

        {/* Start-new-edition action */}
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="clock" /> Start a new edition</div></div>
          <div className="info-box" style={{ marginBottom: 14 }}>
            <Icon name="layers" size={15} />
            <div>Subscribers stay subscribed across editions. Starting a new edition marks the current one ended, bumps the edition number, and opens a fresh date range to schedule.</div>
          </div>
          <button className="btn btn-s" style={{ width: "100%" }} disabled={busy} onClick={startNew}>
            <Icon name="plus" size={15} /> Start new edition
          </button>
        </div>
      </div>

      {/* RIGHT — edit controls */}
      <div className="card">
        <div className="card-h"><div className="ttl"><Icon name="layers" /> Edit edition</div>
          <span className={`chip ${statusChip}`}>{f.editionStatus}</span>
        </div>
        <label className="flbl">Edition label</label>
        <input className="input" value={f.editionLabel} placeholder="e.g. Edition 2" onChange={(e) => set("editionLabel", e.target.value)} />
        <div className="grid g2" style={{ gap: 12, marginTop: 12 }}>
          <div><label className="flbl">Start date</label><input className="input" type="date" value={f.editionStart} onChange={(e) => set("editionStart", e.target.value)} /></div>
          <div><label className="flbl">End date</label><input className="input" type="date" value={f.editionEnd} onChange={(e) => set("editionEnd", e.target.value)} /></div>
        </div>
        <div className="grid g2" style={{ gap: 12, marginTop: 12 }}>
          <div><label className="flbl">Days</label><input className="input" type="number" min="0" value={f.editionDays} placeholder="auto from dates" onChange={(e) => set("editionDays", e.target.value)} /></div>
          <div><label className="flbl">Status</label>
            <select className="input" value={f.editionStatus} onChange={(e) => set("editionStatus", e.target.value)}>
              {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="hint">
          {hasDates ? `Window: ${windowText}${totalDays ? ` · ${totalDays} days` : ""}` : "Set dates to compute the edition length automatically."}
        </div>
        <button className="btn btn-p" style={{ width: "100%", marginTop: 16 }} disabled={busy} onClick={() => save()}>
          <Icon name="check" size={15} stroke="#fff" /> Save edition
        </button>
      </div>
    </div>
  );
}
