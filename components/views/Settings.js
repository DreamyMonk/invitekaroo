"use client";
import { useState } from "react";
import { logout } from "@/lib/db";
import Icon from "../Icon";

const initials = (s) =>
  (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();

const NOTIF_PREFS = [
  ["subscribers", "New subscriber alerts", true],
  ["attendance", "Daily attendance summary", true],
  ["donations", "Donation receipts", true],
  ["whatsapp", "WhatsApp delivery reports", false],
];

export default function Settings({ user, host, community }) {
  const hostName = host?.hostName || "—";
  const email = user?.email || "—";
  const communityName = community?.name || "—";
  const edition = community?.editionLabel || "";

  const [notifs, setNotifs] = useState(() =>
    NOTIF_PREFS.reduce((o, [k, , on]) => ((o[k] = on), o), {})
  );
  const toggle = (k) => setNotifs((n) => ({ ...n, [k]: !n[k] }));

  return (
    <div className="grid g2" style={{ alignItems: "start" }}>
      {/* ── Host account ── */}
      <div className="card">
        <div className="card-h"><div className="ttl"><Icon name="user" /> Host account</div></div>

        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
          <div style={{
            width: 54, height: 54, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg,#5B3E9E,#2D1B69)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--fd)", fontWeight: 800, fontSize: "1.05rem",
          }}>{initials(hostName)}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontFamily: "var(--fd)", fontSize: "1.05rem", color: "var(--ink)" }}>{hostName}</div>
            <div style={{ fontFamily: "var(--fm)", fontSize: ".7rem", color: "var(--ink3)", wordBreak: "break-all" }}>{email}</div>
          </div>
        </div>

        <label className="flbl">Full name</label>
        <div className="input" style={{ background: "var(--t0)" }}>{hostName}</div>
        <label className="flbl">Email</label>
        <div className="input" style={{ background: "var(--t0)", wordBreak: "break-all" }}>{email}</div>
        <label className="flbl">Role</label>
        <div className="input" style={{ background: "var(--t0)" }}>Community Host</div>

        <div className="info-box" style={{ marginTop: 14 }}>
          <Icon name="check" size={15} />
          <div>Host access for <b>{communityName}</b> is managed by the Invite Karoo Super Admin.</div>
        </div>
      </div>

      {/* ── Right column: Community · Notifications · Account ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="flower" /> Community</div></div>
          <label className="flbl">Community name</label>
          <div className="input" style={{ background: "var(--t0)" }}>{communityName}</div>
          {edition && (
            <>
              <label className="flbl">Edition</label>
              <div className="input" style={{ background: "var(--t0)" }}>{edition}</div>
            </>
          )}
        </div>

        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="bell" /> Notifications</div></div>
          {NOTIF_PREFS.map(([k, label]) => (
            <div key={k} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 0", borderBottom: "1px solid var(--bd)",
            }}>
              <span style={{ fontSize: ".78rem", color: "var(--ink2)" }}>{label}</span>
              <div className={`tg ${notifs[k] ? "on" : ""}`} onClick={() => toggle(k)} role="switch"
                aria-checked={notifs[k]}><i /></div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="gear" /> Account</div></div>
          <label className="flbl">App version</label>
          <div className="input" style={{ background: "var(--t0)" }}>Invite Karoo Host · v2.0</div>
          <button className="btn btn-danger btn-block" style={{ marginTop: 16 }} onClick={logout}>
            <Icon name="logout" size={15} stroke="#DC2626" /> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
