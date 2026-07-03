"use client";
import { useEffect, useState } from "react";
import { watchPrograms, watchSub, money } from "@/lib/db";
import Icon from "../Icon";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function colorFor(s) {
  let h = 0; for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();
const statusColor = (s) => ({ live: "#16A34A", done: "#94A3B8", ended: "#94A3B8", cancelled: "#DC2626", postponed: "#D97706" }[s] || "#F5A623");

export default function Overview({ community, go }) {
  const [programs, setPrograms] = useState([]);
  const [subs, setSubs] = useState([]);
  const [att, setAtt] = useState([]);
  const [dons, setDons] = useState([]);
  const [rem, setRem] = useState([]);

  useEffect(() => {
    if (!community) return;
    const us = [
      watchPrograms(community.id, setPrograms),
      watchSub(community.id, "subscribers", setSubs),
      watchSub(community.id, "attendance", setAtt),
      watchSub(community.id, "donations", setDons),
      watchSub(community.id, "reminders", setRem, { orderByField: "createdAt", desc: true }),
    ];
    return () => us.forEach((u) => u && u());
  }, [community]);

  const now = new Date();
  const todayIso = now.toISOString().slice(0, 10);
  const dayLabel = `${now.getDate()} ${MON[now.getMonth()]} ${now.getFullYear()}`;
  const todayFns = programs.filter((p) => p.date === todayIso);
  const live = programs.find((p) => p.status === "live");
  const donTotal = dons.reduce((s, d) => s + Number(d.amount || 0), 0);
  const checkedToday = att.filter((a) => a.at === dayLabel).length;
  const attRate = subs.length ? Math.round((checkedToday / subs.length) * 100) : 0;

  // Edition day X of Y
  let dayOfEdition = null, totalDays = null;
  if (community.editionStart) {
    const s = new Date(community.editionStart);
    dayOfEdition = Math.max(1, Math.floor((now - s) / 86400000) + 1);
    if (community.editionEnd) totalDays = Math.floor((new Date(community.editionEnd) - s) / 86400000) + 1;
    else if (community.editionDays) totalDays = Number(community.editionDays);
    if (totalDays && dayOfEdition > totalDays) dayOfEdition = totalDays;
  }

  // Leaderboard from real attendance (top attendees)
  const perPerson = {};
  att.forEach((a) => { const n = a.name || "Guest"; perPerson[n] = (perPerson[n] || 0) + 1; });
  const leaders = Object.entries(perPerson).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const kpis = [
    { ic: "users", bg: "var(--t1)", st: "var(--t7)", val: subs.length, lbl: "Subscribers", delta: subs.length ? "community members" : null },
    { ic: "cal", bg: "var(--g1)", st: "var(--g5)", val: todayFns.length, lbl: "Functions today", delta: dayOfEdition ? `Day ${dayOfEdition}${totalDays ? ` of ${totalDays}` : ""}` : `${programs.length} total` },
    { ic: "qr", bg: "var(--ok1)", st: "#16A34A", val: checkedToday, lbl: "Checked in today", delta: subs.length ? `${attRate}% of subs` : `${att.length} all-time`, up: 1 },
    { ic: "rupee", bg: "var(--in1)", st: "var(--in)", val: money(donTotal), lbl: "Donations", delta: dons.length ? `${dons.length} contributor${dons.length === 1 ? "" : "s"}` : null, up: donTotal > 0 ? 1 : 0 },
  ];

  return (
    <>
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {kpis.map((k) => (
          <div className="kpi" key={k.lbl}>
            {k.delta && <div className={`delta ${k.up ? "up" : ""}`} style={{ fontSize: ".6rem", color: "var(--ink4)", marginBottom: 6 }}>{k.delta}</div>}
            <div className="ic" style={{ background: k.bg, color: k.st }}><Icon name={k.ic} /></div>
            <div className="val">{k.val}</div><div className="lbl">{k.lbl}</div>
          </div>
        ))}
      </div>

      {live && (
        <div className="card" style={{ marginBottom: 18, background: "linear-gradient(135deg,#1A0E3D,#3D2582)", border: "none", color: "#fff", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="qr" stroke="#fff" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: ".6rem", fontWeight: 800, color: "#86EFAC", textTransform: "uppercase", letterSpacing: ".6px" }}>● Live now</div>
            <div style={{ fontFamily: "var(--fd)", fontSize: "1.15rem", fontWeight: 800 }}>{live.title}</div>
            <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}>{live.time} · {live.venue} · {att.filter((a) => a.programme === live.title).length} checked in</div>
          </div>
          <button className="btn btn-gold" onClick={() => go("attendance")}><Icon name="qr" size={15} stroke="#fff" /> Open QR check-in</button>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="cal" /> Today's schedule</div><button className="btn btn-s btn-sm" onClick={() => go("schedule")}>Open schedule <Icon name="arrowR" size={13} /></button></div>
          {todayFns.length === 0 ? <div className="empty" style={{ padding: 20 }}>Nothing scheduled today.</div>
            : todayFns.sort((a, b) => (a.time || "").localeCompare(b.time || "")).map((f, i) => (
              <div className="prog" key={f.id} style={{ borderLeftColor: statusColor(f.status), display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: "var(--t1)", color: "var(--t7)", fontFamily: "var(--fm)", fontWeight: 700, fontSize: ".72rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontFamily: "var(--fm)", fontWeight: 600, fontSize: ".78rem", color: "var(--t7)", flexShrink: 0, width: 62 }}>{f.time || "—"}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="t">{f.title}</div>
                  <div className="meta"><Icon name="pin" size={11} /> {f.venue || "—"}</div>
                </div>
                <span className={`chip ${f.status === "live" ? "chip-live" : f.status === "cancelled" || f.status === "done" ? "chip-end" : "chip-up"}`}>{f.status}</span>
              </div>
            ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="award" /> Top devotees</div><span className="chip ca">By attendance</span></div>
            {leaders.length === 0 ? <div className="empty" style={{ padding: 20 }}>No check-ins yet.</div>
              : leaders.map(([name, n], i) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 0", borderBottom: "1px solid var(--bd)" }}>
                  <div style={{ width: 22, fontFamily: "var(--fm)", fontWeight: 700, color: i === 0 ? "var(--g4, #D97706)" : "var(--ink4)", fontSize: ".84rem" }}>{i + 1}</div>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: colorFor(name), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700 }}>{initials(name)}</div>
                  <div style={{ flex: 1, minWidth: 0, fontWeight: 700, fontSize: ".8rem" }}>{name}</div>
                  <div style={{ fontFamily: "var(--fm)", fontWeight: 700, fontSize: ".86rem", color: "var(--t7)" }}>{n}</div>
                  <span style={{ fontSize: ".6rem", color: "var(--ink4)", marginLeft: 3 }}>events</span>
                </div>
              ))}
          </div>

          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="bell" /> Recent alerts</div><button className="btn btn-ghost btn-sm" onClick={() => go("reminders")}>All</button></div>
            {rem.length === 0 ? <div className="empty" style={{ padding: 20 }}>No alerts sent yet.</div>
              : rem.slice(0, 4).map((r) => (
                <div key={r.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0", borderBottom: "1px solid var(--bd)" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--t0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--in)" }}><Icon name="bell" size={14} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: ".76rem", fontWeight: 700, color: "var(--ink)" }}>{r.title || "Alert"}</div>
                    <div style={{ fontSize: ".64rem", color: "var(--ink3)" }}>{r.message || ""}</div>
                  </div>
                  <div style={{ fontSize: ".58rem", color: "var(--ink4)", whiteSpace: "nowrap" }}>{r.sentAt || ""}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
