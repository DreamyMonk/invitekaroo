"use client";
import { useEffect, useRef } from "react";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from "firebase/firestore";
import { sendEmailOtp, verifyEmailOtp, getMyCommunity, createCommunity, addProgram, updateProgram, deleteProgram, addSub, updateSubDoc, deleteSubDoc, updateCommunity, pushNotify } from "@/lib/db";

// Exact reference shell (login + app + containers). Only the login field is
// switched to email and the button to liveSignIn() — per the chosen approach.
const SHELL = `
<div id="login">
  <div class="lg-glow" style="top:-140px;left:50%;transform:translateX(-50%);width:540px;height:400px;background:radial-gradient(circle,rgba(124,92,191,.16),transparent 70%);"></div>
  <div class="lg-glow" style="bottom:-120px;right:-80px;width:380px;height:380px;background:radial-gradient(circle,rgba(245,166,35,.1),transparent 70%);"></div>
  <div class="lg-card">
    <div style="width:150px;margin:0 auto 10px;background:#fff;border-radius:22px;padding:14px;box-shadow:0 10px 34px rgba(0,0,0,.12);"><img src="/logo.jpg" alt="Invite Karoo" style="width:100%;display:block;border-radius:12px;"/></div>
    <div class="lg-tag">Community Host</div>
    <div class="lg-div"></div>
    <div class="field"><label>Email</label><div style="display:flex;gap:8px;align-items:stretch;"><div class="ip-wrap" style="flex:1;min-width:0;"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg><input id="lg-email" type="email" class="mono" placeholder="you@example.com" style="letter-spacing:.3px;"/></div><button id="lg-send" class="btn btn-s" onclick="liveSendCode()" style="white-space:nowrap;flex-shrink:0;">Send code</button></div></div>
    <div class="field" style="margin-bottom:8px;"><label>One-time password</label>
      <div class="lg-otp"><input maxlength="1" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" placeholder="•"/><input maxlength="1" inputmode="numeric" pattern="[0-9]*" placeholder="•"/><input maxlength="1" inputmode="numeric" pattern="[0-9]*" placeholder="•"/><input maxlength="1" inputmode="numeric" pattern="[0-9]*" placeholder="•"/><input maxlength="1" inputmode="numeric" pattern="[0-9]*" placeholder="•"/><input maxlength="1" inputmode="numeric" pattern="[0-9]*" placeholder="•"/></div>
    </div>
    <button id="lg-btn" class="btn btn-p btn-full" onclick="liveSignIn()" style="margin-top:14px;">Sign in</button>
    <div id="lg-msg" style="text-align:center;font-size:.66rem;color:var(--ink4);margin-top:18px;display:flex;align-items:center;justify-content:center;gap:6px;"><svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.4" style="width:12px;height:12px;"><polyline points="20 6 9 17 4 12"/></svg>Approved host access only</div>
  </div>
</div>

<div id="app" class="hide">
  <aside class="side">
    <div class="side-top">
      <div class="side-brand">
        <div class="mk" style="background:#fff;overflow:hidden;padding:0;"><img src="/logo.jpg" alt="Invite Karoo" style="width:100%;height:100%;object-fit:cover;object-position:center 32%;"/></div>
        <div><div class="nm">Invite <b>Karoo</b></div><div class="rl">Community Host</div></div>
      </div>
      <div class="comm-switch" onclick="nav('community')">
        <div class="ci"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5c0-2 1.5-3.5 0-5.5-1.5 2-1.5 3.5 0 5.5M12 14.5c0 2-1.5 3.5 0 5.5 1.5-2 1.5-3.5 0-5.5M9.5 12c-2 0-3.5 1.5-5.5 0 2-1.5 3.5-1.5 5.5 0M14.5 12c2 0 3.5-1.5 5.5 0-2 1.5-3.5 1.5-5.5 0"/></svg></div>
        <div class="csn"><div class="t" id="cs-name">Community</div><div class="s"><span class="dot"></span><span id="cs-ed">Active</span></div></div>
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
    <nav class="nav" id="nav"></nav>
    <div class="side-foot">
      <div class="host-chip" onclick="nav('settings')">
        <div class="av" id="hc-av">H</div>
        <div class="hn"><div class="t" id="hc-name">Host</div><div class="s" id="hc-sub">Host</div></div>
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
  </aside>
  <div class="main">
    <header class="topbar">
      <div class="tb-title"><div class="t" id="tb-t">Overview</div><div class="s" id="tb-s"></div></div>
      <div class="ed-pill"><span class="dot"></span><div><div class="x" id="ed-day">EDITION</div><div class="d" id="ed-win"></div></div></div>
      <div class="tb-act" onclick="nav('reminders')" title="Reminders"><svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
      <div class="tb-act" onclick="openFnModal()" title="Add function"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
    </header>
    <main class="view"><div class="view-in" id="view"></div></main>
  </div>
</div>

<div class="ov" id="ov"></div>
<div class="drawer-ov" id="drawerOv"></div>
<div class="toast" id="toast"></div>
<div class="kiosk-ov" id="kioskOv"></div>
<div id="printArea"></div>
`;

// ── Reshape Firestore → the reference's exact data structures ──
function isoOf(v) { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v || ""); return m ? { y: +m[1], m: +m[2] - 1, d: +m[3] } : null; }

async function loadAll(uid) {
  let community = await getMyCommunity(uid);
  if (!community) {
    // Brand-new host with no community yet → provision a starter one so the
    // account can sign in and fill in the details from the Community screen.
    const email = (auth.currentUser && auth.currentUser.email) || "";
    const base = email ? email.split("@")[0].replace(/[^a-zA-Z0-9]+/g, " ").trim() : "";
    const name = base ? base.charAt(0).toUpperCase() + base.slice(1) : "My Community";
    try { community = await createCommunity(uid, { name, editionLabel: "Edition 1", editionStatus: "active" }); }
    catch (e) { return null; }
    if (!community) return null;
  }
  const cid = community.id;
  const grab = async (name) => {
    try { const s = await getDocs(collection(db, "communities", cid, name)); return s.docs.map((d) => ({ id: d.id, ...d.data() })); }
    catch { return []; }
  };
  const [progSnap, subs, att, rsvps, dons, rems, team, rewards] = await Promise.all([
    getDocs(query(collection(db, "programs"), where("communityId", "==", cid))).then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() }))).catch(() => []),
    grab("subscribers"), grab("attendance"), grab("rsvps"), grab("donations"), grab("reminders"), grab("team"), grab("rewards"),
  ]);
  const giftByName = {}; rewards.forEach((r) => { giftByName[(r.devotee || "").toLowerCase()] = { gift: r.gift || "", docId: r.id }; });

  // programmes keyed by ISO date (exact shape the render functions expect)
  const programmes = {};
  let fid = 0;
  progSnap.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)).forEach((p) => {
    const day = p.date || "";
    if (!day) return;
    (programmes[day] = programmes[day] || []).push({
      _docId: p.id, id: ++fid, name: p.title || "Programme", time: p.time || "", dur: p.dur || "", venue: p.venue || "", area: p.area || "",
      status: p.status || "scheduled", rem: [], note: p.description || "", published: p.published !== false,
    });
  });

  // subscribers with computed activity
  const attByName = {}; att.forEach((a) => { const n = (a.name || "").toLowerCase(); attByName[n] = (attByName[n] || 0) + 1; });
  const donByName = {}; dons.forEach((d) => { const n = (d.donor || "").toLowerCase(); donByName[n] = (donByName[n] || 0) + Number(d.amount || 0); });
  const subscribers = subs.map((s, i) => {
    const key = (s.name || "").toLowerCase(); const g = giftByName[key] || {};
    return {
      id: i + 1, name: s.name || "Subscriber", family: "", phone: s.mobile || "", city: s.city || "", since: s.since || "",
      status: s.suspended ? "suspended" : "active", editions: 1, attended: attByName[key] || 0,
      rsvp: rsvps.filter((r) => (r.name || "").toLowerCase() === key && r.status === "going").length,
      donated: donByName[key] || 0, gift: g.gift || null, events: [], _uid: s.uid || s.id, _docId: s.id, _giftDoc: g.docId || null,
    };
  });

  // edition — start/end must never be null (render does edition.start.y)
  const _t = new Date(); const todayObj = { y: _t.getFullYear(), m: _t.getMonth(), d: _t.getDate() };
  const es = isoOf(community.editionStart) || todayObj;
  const ee = isoOf(community.editionEnd) || es;
  let days = Number(community.editionDays || 0);
  if (!days) days = Math.max(1, Math.round((new Date(ee.y, ee.m, ee.d) - new Date(es.y, es.m, es.d)) / 86400000) + 1);
  const edition = { label: community.editionLabel || "Edition 1", start: es, end: ee, days: days, status: community.editionStatus || "active" };

  // attLog: fnId -> [subIndex] (by matching attendance.programme → today's function names)
  const attLog = {};
  Object.values(programmes).flat().forEach((f) => {
    attLog[f.id] = att.filter((a) => (a.programme || "").toLowerCase() === f.name.toLowerCase())
      .map((a) => subscribers.findIndex((s) => (s.name || "").toLowerCase() === (a.name || "").toLowerCase()) + 1).filter((x) => x > 0);
  });

  const donations = dons.map((d, i) => ({ id: d.id, no: i + 1, sub: subscribers.findIndex((s) => (s.name || "").toLowerCase() === (d.donor || "").toLowerCase()) + 1 || 0, donor: d.donor || "", amt: Number(d.amount || 0), date: d.at || "", mode: d.mode || "—", purpose: d.note || "General" }));
  const reminders = rems.map((r, i) => ({ id: r.id, kind: "reminder", fn: r.title || "Alert", when: r.sentAt || "", msg: r.message || "", ch: ["app"], reach: subscribers.length, status: "sent" }));
  const teamRows = team.map((t, i) => ({ id: t.id, name: t.name || "", email: t.email || "", role: t.role || "Viewer", status: "active", last: "" }));

  const hostName = community.name || "Host";
  const reminderAutomation = Array.isArray(community.reminderRules) && community.reminderRules.length ? community.reminderRules : null;
  return { community, edition, programmes, subscribers, attLog, donations, reminders, team: teamRows, reminderAutomation, hostName, cid };
}

export default function Page() {
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return; started.current = true;

    // Bridge: expose Firestore + auth helpers to the injected reference script.
    window.__fb = {
      sendOtp: (email) => sendEmailOtp(email),
      verifyOtp: async (email, code) => { const u = await verifyEmailOtp(email, code); return u.uid; },
      currentUid: () => auth.currentUser && auth.currentUser.uid,
      watchAuth: (cb) => onAuthStateChanged(auth, cb),
      loadAll,
      // mutations (return promises; the adapter reloads + re-renders after)
      addProgram: (community, p) => addProgram(community, p),
      updateProgram: (id, p) => updateProgram(id, p),
      deleteProgram: (id) => deleteProgram(id),
      addSub: (cid, name, data) => addSub(cid, name, data),
      updateSub: (cid, name, id, data) => updateSubDoc(cid, name, id, data),
      deleteSub: (cid, name, id) => deleteSubDoc(cid, name, id),
      updateCommunity: (cid, data) => updateCommunity(cid, data),
      pushNotify: (t, b, cid) => pushNotify(t, b, cid),
      serverTs: serverTimestamp,
    };

    const load = (src) => new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.body.appendChild(s); });
    (async () => { try { await load("/dash.js"); await load("/dash-live.js"); } catch (e) { /* ignore */ } })();
  }, []);

  return <div id="dash-root" dangerouslySetInnerHTML={{ __html: SHELL }} />;
}
