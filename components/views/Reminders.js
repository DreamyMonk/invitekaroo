"use client";
import { useEffect, useState } from "react";
import { watchSub, addSub, deleteSubDoc, pushNotify, fmtDate } from "@/lib/db";
import Icon from "../Icon";

// Reminders & alerts — real data from communities/{cid}/reminders.
// Each doc = { title, message, sentAt }.
export default function Reminders({ community, toast }) {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!community) return;
    return watchSub(community.id, "reminders", setRows, { orderByField: "createdAt", desc: true });
  }, [community]);

  async function send() {
    const title = form.title.trim();
    const message = form.message.trim();
    if (!title) return toast("Alert title required");
    if (!message) return toast("Message required");
    setBusy(true);
    try {
      const sentAt = fmtDate(new Date().toISOString().slice(0, 10));
      await addSub(community.id, "reminders", { title, message, sentAt });
      pushNotify(title, message);
      toast("Alert sent to subscribers");
      setForm({ title: "", message: "" });
    } catch (e) {
      toast("Error: " + (e.message || e));
    }
    setBusy(false);
  }

  return (
    <>
      <div className="card-h" style={{ marginBottom: 16 }}>
        <div className="ttl"><Icon name="bell" /> Reminders & Alerts · {rows.length}</div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1.6fr", alignItems: "start" }}>
        {/* Left column: composer + automation info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="send" /> Send alert</div></div>
            <label className="flbl">Alert title</label>
            <input
              className="input"
              type="text"
              value={form.title}
              placeholder="e.g. Aarti timing changed"
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <label className="flbl" style={{ marginTop: 12 }}>Message</label>
            <textarea
              className="input"
              rows={3}
              value={form.message}
              placeholder="e.g. Tonight's Aarti shifts to 7 PM. Please plan accordingly."
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
            <button className="btn btn-p btn-block" style={{ marginTop: 14 }} disabled={busy} onClick={send}>
              <Icon name="send" size={14} stroke="#fff" /> {busy ? "Sending…" : "Send alert"}
            </button>
          </div>

          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="clock" /> Automatic reminders</div></div>
            <div className="info-box">
              <Icon name="bell" size={16} stroke="var(--t7)" />
              <div>
                When you publish a programme, the app automatically notifies subscribers and
                schedules <b>4 reminders</b> before it starts — so devotees never miss an event.
                Use the composer above only for custom, one-off alerts.
              </div>
            </div>
            <div className="hint" style={{ marginTop: 10 }}>
              Auto-reminders run for every published programme · no setup needed.
            </div>
          </div>
        </div>

        {/* Right column: sent alerts log (real data) */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="card-h" style={{ padding: 16, marginBottom: 0 }}>
            <div className="ttl"><Icon name="clock" /> Sent alerts</div>
            <span className="chip cg">Custom</span>
          </div>

          {rows.length === 0 ? (
            <div className="empty" style={{ padding: 30 }}>
              <Icon name="bell" size={40} />
              <div className="t" style={{ marginTop: 10 }}>No alerts sent yet</div>
              <div className="s">Publishing a programme auto-notifies subscribers. Send a custom alert on the left.</div>
            </div>
          ) : (
            <div>
              {rows.map((r) => (
                <div key={r.id} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "14px 16px", borderTop: "1px solid var(--bd)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--in1)", color: "var(--in)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="bell" size={16} stroke="var(--in)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: ".84rem", fontWeight: 700, color: "var(--ink)" }}>{r.title || "Alert"}</span>
                      <span className="chip ci">Sent</span>
                    </div>
                    <div style={{ fontSize: ".72rem", color: "var(--ink3)", marginTop: 3, lineHeight: 1.5 }}>{r.message || ""}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <div style={{ fontSize: ".6rem", color: "var(--ink4)", whiteSpace: "nowrap" }}>{r.sentAt || ""}</div>
                    <button className="btn btn-ghost btn-sm" title="Delete" onClick={() => deleteSubDoc(community.id, "reminders", r.id)}>
                      <Icon name="trash" size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
