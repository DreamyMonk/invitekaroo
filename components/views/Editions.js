"use client";
import { useState } from "react";
import { updateCommunity, fmtWindow } from "@/lib/db";
import Icon from "../Icon";

// The active edition lives on the community doc. This view focuses on the
// edition lifecycle (label, dates, status) and starting a new edition.
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
    setF((x) => ({ ...x, editionLabel: next, editionStart: "", editionEnd: "", editionStatus: "active" }));
    save({ editionLabel: next, editionStart: "", editionEnd: "", editionStatus: "active" });
  }

  return (
    <div className="card" style={{ maxWidth: 640 }}>
      <div className="card-h"><div className="ttl"><Icon name="layers" /> Editions</div>
        <span className={`chip ${f.editionStatus === "active" ? "chip-live" : "chip-end"}`}>{f.editionStatus}</span>
      </div>
      <div className="kpi" style={{ marginBottom: 16, background: "linear-gradient(135deg,#1A0E3D,#3D2582)", color: "#fff", border: "none" }}>
        <div className="lbl" style={{ color: "rgba(255,255,255,.6)" }}>Current edition</div>
        <div className="val" style={{ color: "#fff" }}>{f.editionLabel || "—"}</div>
        <div style={{ fontSize: ".76rem", color: "rgba(255,255,255,.7)", marginTop: 4 }}>{fmtWindow(f.editionStart, f.editionEnd) || "dates not set"}</div>
      </div>
      <div className="row">
        <div><label className="label">Edition label</label><input className="input" value={f.editionLabel} onChange={(e) => set("editionLabel", e.target.value)} /></div>
        <div><label className="label">Days</label><input className="input" type="number" value={f.editionDays} onChange={(e) => set("editionDays", e.target.value)} /></div>
      </div>
      <div className="row">
        <div><label className="label">Start</label><input className="input" type="date" value={f.editionStart} onChange={(e) => set("editionStart", e.target.value)} /></div>
        <div><label className="label">End</label><input className="input" type="date" value={f.editionEnd} onChange={(e) => set("editionEnd", e.target.value)} /></div>
      </div>
      <label className="label">Status</label>
      <select className="input" value={f.editionStatus} onChange={(e) => set("editionStatus", e.target.value)}>
        <option value="active">active</option><option value="upcoming">upcoming</option><option value="ended">ended</option>
      </select>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button className="btn btn-p" disabled={busy} onClick={() => save()}><Icon name="check" size={15} stroke="#fff" /> Save edition</button>
        <button className="btn btn-s" disabled={busy} onClick={startNew}><Icon name="plus" size={15} /> Start new edition</button>
      </div>
    </div>
  );
}
