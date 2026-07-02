"use client";
import { useEffect, useState } from "react";
import { watchAuth, getHost, getMyCommunity, createCommunity, logout } from "@/lib/db";
import Icon from "@/components/Icon";
import AuthGate from "@/components/AuthGate";
import Overview from "@/components/views/Overview";
import Schedule from "@/components/views/Schedule";
import Community from "@/components/views/Community";
import Editions from "@/components/views/Editions";
import Analytics from "@/components/views/Analytics";
import Settings from "@/components/views/Settings";
import Collection from "@/components/views/Collection";

const NAV = [
  { sec: "Manage" },
  { id: "overview", label: "Overview", ic: "grid" },
  { id: "schedule", label: "Schedule", ic: "cal" },
  { id: "community", label: "Community Profile", ic: "flower" },
  { id: "editions", label: "Editions", ic: "layers" },
  { sec: "People" },
  { id: "subscribers", label: "Subscribers", ic: "users" },
  { id: "attendance", label: "Attendance & QR", ic: "qr" },
  { id: "analytics", label: "Analytics", ic: "chart" },
  { id: "rsvp", label: "RSVP", ic: "check" },
  { id: "donations", label: "Donations", ic: "rupee" },
  { id: "rewards", label: "Rewards", ic: "gift" },
  { sec: "Comms" },
  { id: "reminders", label: "Reminders & Alerts", ic: "bell" },
  { sec: "Admin" },
  { id: "access", label: "Access Manager", ic: "user" },
  { id: "settings", label: "Settings", ic: "gear" },
];
const TITLES = Object.fromEntries(NAV.filter((n) => n.id).map((n) => [n.id, n.label]));

export default function Page() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [host, setHost] = useState(null);
  const [community, setCommunity] = useState(null);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("overview");
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => watchAuth(async (u) => {
    setUser(u || null);
    try {
      if (u) {
        // .catch on each so one failing read never blocks the app on "Loading…"
        const [h, c] = await Promise.all([
          getHost(u.uid).catch(() => null),
          getMyCommunity(u.uid).catch(() => null),
        ]);
        setHost(h); setCommunity(c);
      } else { setHost(null); setCommunity(null); }
    } finally {
      setReady(true); // always leave the loading state
    }
  }), []);

  function toast(m) { setToastMsg(m); clearTimeout(window.__t); window.__t = setTimeout(() => setToastMsg(""), 2800); }
  async function reloadCommunity() { if (user) setCommunity(await getMyCommunity(user.uid)); }

  if (user === undefined || !ready) return <div className="center-screen"><div style={{ color: "#fff" }}>Loading…</div></div>;
  if (!user) return <AuthGate />;
  if (!community) return <CommunitySetup uid={user.uid} onCreated={setCommunity} toast={toast} />;

  const render = () => {
    switch (view) {
      case "overview": return <Overview community={community} go={setView} />;
      case "schedule": return <Schedule community={community} toast={toast} />;
      case "community": return <Community community={community} toast={toast} onSaved={reloadCommunity} />;
      case "editions": return <Editions community={community} toast={toast} onSaved={reloadCommunity} />;
      case "analytics": return <Analytics community={community} />;
      case "settings": return <Settings user={user} host={host} community={community} />;
      case "rsvp": return <Collection community={community} name="rsvps" toast={toast} />;
      case "access": return <Collection community={community} name="team" toast={toast} />;
      default: return <Collection community={community} name={view} toast={toast} />;
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "252px 1fr", height: "100vh" }}>
      <aside className="side">
        <div className="side-top">
          <div className="side-brand">
            <div className="mk"><Icon name="heart" size={20} stroke="#fff" /></div>
            <div><div className="nm">Invite <b>Karoo</b></div><div className="rl">Community Host</div></div>
          </div>
          <div className="comm-switch" onClick={() => setView("community")}>
            <div className="ci"><Icon name="flower" size={18} stroke="#fff" /></div>
            <div className="csn"><div className="t">{community.name}</div><div className="s"><span className="dot" />{community.editionLabel || "Active"}</div></div>
          </div>
        </div>
        <nav className="nav">
          {NAV.map((n, i) => n.sec
            ? <div className="nav-sec" key={"s" + i}>{n.sec}</div>
            : <div key={n.id} className={`nav-i ${view === n.id ? "on" : ""}`} onClick={() => setView(n.id)}><Icon name={n.ic} /><span>{n.label}</span></div>)}
        </nav>
        <div className="side-foot">
          <div className="host-chip" onClick={() => setView("settings")}>
            <div className="av">{(host?.hostName || user.email || "H").slice(0, 2).toUpperCase()}</div>
            <div className="hn"><div className="t">{host?.hostName || "Host"}</div><div className="s">{user.email}</div></div>
          </div>
        </div>
      </aside>

      <div className="main" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <header className="topbar">
          <div className="tb-title"><div className="t">{TITLES[view]}</div><div className="s">{community.name}</div></div>
          <button className="btn btn-ghost btn-sm" onClick={logout}><Icon name="logout" size={15} /> Log out</button>
        </header>
        <main className="view" style={{ overflowY: "auto", flex: 1, padding: 24 }}>
          <div className="view-in">{render()}</div>
        </main>
      </div>

      {toastMsg && <div className="toast on"><Icon name="check" size={16} stroke="#fff" /><span>{toastMsg}</span></div>}
    </div>
  );
}

function CommunitySetup({ uid, onCreated, toast }) {
  const [f, setF] = useState({ name: "", city: "", area: "", venue: "", editionLabel: "Edition 1" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  async function save() {
    if (!f.name.trim()) { setErr("Community name required"); return; }
    setErr("");
    setBusy(true);
    try {
      const community = await createCommunity(uid, f);
      toast("Community created");
      onCreated(community); // enter the dashboard immediately (no re-read needed)
    } catch (e) {
      const msg = String(e?.code || e?.message || e);
      setErr(
        /permission|insufficient/i.test(msg)
          ? "Permission denied — publish the Firestore rules in the Firebase console, then try again."
          : "Couldn't create: " + msg,
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="center-screen">
      <div className="card" style={{ maxWidth: 460, width: "100%" }}>
        <div className="h2">Set up your community</div>
        <p className="muted" style={{ marginTop: 4, marginBottom: 8 }}>This is shown to attendees in the app.</p>
        <label className="label">Community name</label>
        <input className="input" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Jain Community Sammelan" />
        <div className="row">
          <div><label className="label">City</label><input className="input" value={f.city} onChange={(e) => set("city", e.target.value)} /></div>
          <div><label className="label">Area</label><input className="input" value={f.area} onChange={(e) => set("area", e.target.value)} /></div>
        </div>
        <label className="label">Current venue</label>
        <input className="input" value={f.venue} onChange={(e) => set("venue", e.target.value)} />
        {err && <div className="err">{err}</div>}
        <button className="btn btn-p btn-block" style={{ marginTop: 16 }} disabled={busy} onClick={save}>
          {busy ? "Creating…" : "Create community"}
        </button>
      </div>
    </div>
  );
}
