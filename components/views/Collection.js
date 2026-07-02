"use client";
import { useEffect, useState } from "react";
import { watchSub, addSub, deleteSubDoc, pushNotify, money, fmtDate } from "@/lib/db";
import Icon from "../Icon";

// Per-view configs (all data lives in communities/{cid}/<sub>).
export const CONFIGS = {
  subscribers: {
    icon: "users", title: "Subscribers", order: "createdAt",
    empty: "No subscribers yet. They appear here when app users subscribe to your community.",
    canAdd: false,
    columns: [["name", "Name"], ["mobile", "Mobile"], ["since", "Since"]],
  },
  attendance: {
    icon: "qr", title: "Attendance", order: "createdAt", desc: true,
    empty: "No check-ins yet. Attendance is recorded when subscribers scan the event QR.",
    canAdd: false,
    columns: [["name", "Name"], ["programme", "Programme"], ["at", "Checked in"]],
  },
  rsvps: {
    icon: "check", title: "RSVP", order: "createdAt", desc: true,
    empty: "No RSVPs yet. They arrive when subscribers confirm attendance from the app.",
    canAdd: false,
    columns: [["name", "Name"], ["programme", "Programme"], ["guests", "Guests"], ["status", "Status"]],
  },
  donations: {
    icon: "rupee", title: "Donations", order: "createdAt", desc: true,
    empty: "No donations recorded yet.",
    canAdd: true, notify: false,
    add: [["donor", "Donor name", "text"], ["amount", "Amount (₹)", "number"], ["note", "Note", "text"]],
    columns: [["donor", "Donor"], ["amountFmt", "Amount"], ["note", "Note"]],
    map: (r) => ({ ...r, amountFmt: money(r.amount) }),
  },
  rewards: {
    icon: "gift", title: "Rewards", order: "createdAt", desc: true,
    empty: "No rewards given yet.",
    canAdd: true,
    add: [["devotee", "Devotee", "text"], ["gift", "Gift", "text"], ["reason", "Reason", "text"]],
    columns: [["devotee", "Devotee"], ["gift", "Gift"], ["reason", "Reason"]],
  },
  reminders: {
    icon: "bell", title: "Reminders & Alerts", order: "createdAt", desc: true,
    empty: "No alerts sent yet. Publishing a programme auto-notifies subscribers; send a custom alert below.",
    canAdd: true, notify: true,
    add: [["title", "Alert title", "text"], ["message", "Message", "text"]],
    columns: [["title", "Title"], ["message", "Message"], ["sentAt", "Sent"]],
  },
  team: {
    icon: "user", title: "Access Manager", order: "createdAt",
    empty: "Only you have access. Invite team members below.",
    canAdd: true,
    add: [["name", "Name", "text"], ["email", "Email", "text"], ["role", "Role", "select", ["Manager", "Volunteer", "Viewer"]]],
    columns: [["name", "Name"], ["email", "Email"], ["role", "Role"]],
  },
};

export default function Collection({ community, name, toast }) {
  const cfg = CONFIGS[name];
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => community ? watchSub(community.id, name, setRows, { orderByField: cfg.order, desc: cfg.desc }) : undefined, [community, name]);

  const view = cfg.map ? rows.map(cfg.map) : rows;

  async function add() {
    for (const [k, label] of cfg.add) if (!String(form[k] || "").trim() && k !== "note" && k !== "reason") return toast(`${label} required`);
    setBusy(true);
    try {
      const data = { ...form };
      if (name === "reminders") data.sentAt = fmtDate(new Date().toISOString().slice(0, 10));
      await addSub(community.id, name, data);
      if (cfg.notify) pushNotify(form.title || "Update", form.message || "");
      toast(cfg.notify ? "Alert sent to subscribers" : "Saved");
      setForm({});
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }

  return (
    <>
      <div className="card-h" style={{ marginBottom: 16 }}>
        <div className="ttl"><Icon name={cfg.icon} /> {cfg.title} · {rows.length}</div>
      </div>

      {cfg.canAdd && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row" style={{ alignItems: "flex-end" }}>
            {cfg.add.map(([k, label, type, opts]) => (
              <div key={k}>
                <label className="label">{label}</label>
                {type === "select"
                  ? <select className="input" value={form[k] || opts[0]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}>{opts.map((o) => <option key={o}>{o}</option>)}</select>
                  : <input className="input" type={type} value={form[k] || ""} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} />}
              </div>
            ))}
          </div>
          <button className="btn btn-p" style={{ marginTop: 12 }} disabled={busy} onClick={add}>
            <Icon name={cfg.notify ? "send" : "plus"} size={14} stroke="#fff" /> {cfg.notify ? "Send alert" : "Add"}
          </button>
        </div>
      )}

      <div className="card">
        {view.length === 0 ? (
          <div className="empty"><Icon name={cfg.icon} size={40} /><div style={{ marginTop: 10 }}>{cfg.empty}</div></div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{cfg.columns.map(([, label]) => <th key={label} style={{ textAlign: "left", padding: "8px 10px", fontSize: ".62rem", textTransform: "uppercase", letterSpacing: ".5px", color: "var(--ink4)", borderBottom: "1px solid var(--bd)" }}>{label}</th>)}<th /></tr>
            </thead>
            <tbody>
              {view.map((r) => (
                <tr key={r.id}>
                  {cfg.columns.map(([k]) => <td key={k} style={{ padding: "10px", fontSize: ".82rem", borderBottom: "1px solid var(--bd)" }}>{String(r[k] ?? "—")}</td>)}
                  <td style={{ padding: "10px", borderBottom: "1px solid var(--bd)", textAlign: "right" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => deleteSubDoc(community.id, name, r.id)}><Icon name="trash" size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
