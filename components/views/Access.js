"use client";
import { useEffect, useState } from "react";
import { watchSub, addSub, deleteSubDoc } from "@/lib/db";
import Icon from "../Icon";

// Role → module → capability. Static config (mirrors the reference ROLE_PERMS),
// used to render the permission-matrix reference card. Not user data.
const ROLE_PERMS = {
  "Event Manager": { overview: "view", schedule: "manage", attendance: "manage", rsvp: "manage", subscribers: "view", donations: "none", analytics: "view", reminders: "manage" },
  "Accounts": { overview: "view", schedule: "none", attendance: "none", rsvp: "none", subscribers: "view", donations: "manage", analytics: "view", reminders: "none" },
  "Volunteer": { overview: "view", schedule: "view", attendance: "manage", rsvp: "none", subscribers: "view", donations: "none", analytics: "none", reminders: "none" },
};
const ROLES = Object.keys(ROLE_PERMS);
const MODULES = [
  ["overview", "Overview"],
  ["schedule", "Schedule"],
  ["attendance", "Attendance"],
  ["rsvp", "RSVP"],
  ["subscribers", "Subscribers"],
  ["donations", "Donations"],
  ["analytics", "Analytics"],
  ["reminders", "Reminders"],
];

function colorFor(s) {
  let h = 0;
  for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();

export default function Access({ community, toast }) {
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: ROLES[0] });
  const [busy, setBusy] = useState(false);

  useEffect(() => community ? watchSub(community.id, "team", setTeam, { orderByField: "createdAt" }) : undefined, [community]);

  async function add() {
    const name = (form.name || "").trim();
    const email = (form.email || "").trim();
    if (!name) return toast("Name required");
    if (!email || email.indexOf("@") < 1) return toast("Enter a valid email");
    setBusy(true);
    try {
      await addSub(community.id, "team", { name, email, role: form.role || ROLES[0] });
      toast("Member invited · they sign in with email + OTP");
      setForm({ name: "", email: "", role: ROLES[0] });
    } catch (e) {
      toast("Error: " + (e.message || e));
    }
    setBusy(false);
  }

  return (
    <>
      <div className="card-h" style={{ marginBottom: 16 }}>
        <div className="ttl"><Icon name="users" /> Team &amp; access · {team.length}</div>
      </div>

      <div className="info-box" style={{ marginBottom: 16 }}>
        <Icon name="user" size={15} stroke="var(--t7)" />
        <div>Share your dashboard with community members. Invited members sign in with their <b>email + OTP</b> — no password. Each role can <b>View</b> or <b>Manage</b> a fixed set of modules.</div>
      </div>

      {/* Add-member form */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><div className="ttl"><Icon name="plus" /> Invite member</div></div>
        <div className="row" style={{ alignItems: "flex-end" }}>
          <div>
            <label className="flbl">Name</label>
            <input className="input" value={form.name} placeholder="e.g. Suresh Jain"
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="flbl">Email <span className="req">*</span></label>
            <input className="input" value={form.email} placeholder="name@email.com"
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="flbl">Role</label>
            <select className="input" value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-p" style={{ marginTop: 12 }} disabled={busy} onClick={add}>
          <Icon name="plus" size={14} stroke="#fff" /> Send invite
        </button>
      </div>

      {/* Team member table */}
      <div className="card" style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
        <div className="card-h" style={{ padding: 16, marginBottom: 0 }}>
          <div className="ttl"><Icon name="users" /> Team members</div>
        </div>
        {team.length === 0 ? (
          <div className="empty">
            <Icon name="users" size={40} />
            <div className="t" style={{ marginTop: 10 }}>Only you have access</div>
            <div className="s">Invite team members above — they sign in with email + OTP.</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 520 }}>
              <thead>
                <tr><th>Member</th><th>Email</th><th>Role</th><th /></tr>
              </thead>
              <tbody>
                {team.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="u-cell">
                        <div className="av-sm" style={{ background: colorFor(m.name) }}>{initials(m.name)}</div>
                        <div className="nm">{m.name || "—"}</div>
                      </div>
                    </td>
                    <td><span className="mono" style={{ fontSize: ".72rem", color: "var(--ink3)" }}>{m.email || "—"}</span></td>
                    <td><span className="chip cp">{m.role || "Viewer"}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => deleteSubDoc(community.id, "team", m.id)}>
                        <Icon name="trash" size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Permission matrix (static role → capability reference) */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="card-h" style={{ padding: 16, marginBottom: 0 }}>
          <div className="ttl"><Icon name="gear" /> Role permissions</div>
          <span className="eyebrow">What each role can do</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ minWidth: 640 }}>
            <thead>
              <tr>
                <th>Role</th>
                {MODULES.map(([id, label]) => <th key={id} style={{ textAlign: "center" }}>{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role}>
                  <td><span className="chip cp">{role}</span></td>
                  {MODULES.map(([id]) => {
                    const lvl = ROLE_PERMS[role][id] || "none";
                    return (
                      <td key={id} style={{ textAlign: "center" }}>
                        {lvl === "none" ? (
                          <span style={{ color: "var(--ink4)", fontSize: ".8rem" }}>•</span>
                        ) : (
                          <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                            <span className="cbox on" title={lvl}>
                              <Icon name="check" size={12} stroke="#fff" />
                            </span>
                            <span style={{ fontSize: ".54rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".4px", color: lvl === "manage" ? "var(--t7)" : "var(--ink4)" }}>{lvl}</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hint" style={{ padding: "0 16px 16px" }}>
          • = no access · <b>View</b> = read-only · <b>Manage</b> = can edit. Roles are fixed presets applied when a member is invited.
        </div>
      </div>
    </>
  );
}
