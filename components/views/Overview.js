"use client";
import { useEffect, useState } from "react";
import { watchPrograms, watchSub, money, fmtDate } from "@/lib/db";
import Icon from "../Icon";

export default function Overview({ community, go }) {
  const [programs, setPrograms] = useState([]);
  const [subs, setSubs] = useState([]);
  const [att, setAtt] = useState([]);
  const [dons, setDons] = useState([]);

  useEffect(() => {
    if (!community) return;
    const u1 = watchPrograms(community.id, setPrograms);
    const u2 = watchSub(community.id, "subscribers", setSubs);
    const u3 = watchSub(community.id, "attendance", setAtt);
    const u4 = watchSub(community.id, "donations", setDons);
    return () => { u1 && u1(); u2 && u2(); u3 && u3(); u4 && u4(); };
  }, [community]);

  const today = new Date().toISOString().slice(0, 10);
  const todayFns = programs.filter((p) => p.date === today);
  const live = programs.find((p) => p.status === "live");
  const donTotal = dons.reduce((s, d) => s + Number(d.amount || 0), 0);

  const kpis = [
    { ic: "users", val: subs.length, lbl: "Subscribers" },
    { ic: "cal", val: programs.length, lbl: "Programmes" },
    { ic: "qr", val: att.length, lbl: "Total check-ins" },
    { ic: "rupee", val: money(donTotal), lbl: "Donations" },
  ];

  return (
    <>
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {kpis.map((k) => (
          <div className="kpi" key={k.lbl}>
            <div className="ic" style={{ background: "var(--t1)", color: "var(--t7)" }}><Icon name={k.ic} /></div>
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
            <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}>{live.time} · {live.venue}</div>
          </div>
          <button className="btn btn-gold" onClick={() => go("attendance")}><Icon name="qr" size={15} stroke="#fff" /> Check-ins</button>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="cal" /> Today's schedule</div><button className="btn btn-s btn-sm" onClick={() => go("schedule")}>Open <Icon name="arrowR" size={13} /></button></div>
          {todayFns.length === 0 ? <div className="empty" style={{ padding: 20 }}>Nothing scheduled today.</div>
            : todayFns.sort((a, b) => (a.time || "").localeCompare(b.time || "")).map((f) => (
              <div className="prog" key={f.id} style={{ borderLeftColor: f.status === "live" ? "#16A34A" : "#F5A623" }}>
                <div className="t">{f.title}</div><div className="meta">{f.time} · {f.venue}</div>
              </div>
            ))}
        </div>
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="award" /> Recent subscribers</div></div>
          {subs.length === 0 ? <div className="empty" style={{ padding: 20 }}>No subscribers yet.</div>
            : subs.slice(0, 6).map((s) => (
              <div key={s.id} style={{ padding: "9px 0", borderBottom: "1px solid var(--bd)", fontSize: ".82rem", fontWeight: 600 }}>{s.name || s.mobile || "Subscriber"}</div>
            ))}
        </div>
      </div>
    </>
  );
}
