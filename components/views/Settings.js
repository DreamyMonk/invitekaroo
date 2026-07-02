"use client";
import { logout } from "@/lib/db";
import Icon from "../Icon";

export default function Settings({ user, host, community }) {
  return (
    <div className="card" style={{ maxWidth: 560 }}>
      <div className="card-h"><div className="ttl"><Icon name="gear" /> Settings</div></div>
      <label className="label">Host</label>
      <div className="input" style={{ background: "var(--t0)" }}>{host?.hostName || "—"}</div>
      <label className="label">Email</label>
      <div className="input" style={{ background: "var(--t0)" }}>{user?.email}</div>
      <label className="label">Community</label>
      <div className="input" style={{ background: "var(--t0)" }}>{community?.name || "—"}</div>
      <label className="label">App version</label>
      <div className="input" style={{ background: "var(--t0)" }}>Invite Karoo Host · v2.0</div>
      <button className="btn btn-danger btn-block" style={{ marginTop: 18 }} onClick={logout}>
        <Icon name="logout" size={15} /> Log out
      </button>
    </div>
  );
}
