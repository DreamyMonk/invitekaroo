"use client";
import { useEffect, useState } from "react";
import { watchPrograms, watchSub } from "@/lib/db";
import Icon from "../Icon";

function Bar({ label, value, max, color }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".76rem", marginBottom: 5 }}>
        <span style={{ color: "var(--ink2)", fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: "var(--fm)", fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 9, background: "var(--t1)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: color || "linear-gradient(90deg,#7C5CBF,#3D2582)" }} />
      </div>
    </div>
  );
}

export default function Analytics({ community }) {
  const [programs, setPrograms] = useState([]);
  const [subs, setSubs] = useState([]);
  const [att, setAtt] = useState([]);

  useEffect(() => {
    if (!community) return;
    const u1 = watchPrograms(community.id, setPrograms);
    const u2 = watchSub(community.id, "subscribers", setSubs);
    const u3 = watchSub(community.id, "attendance", setAtt);
    return () => { u1 && u1(); u2 && u2(); u3 && u3(); };
  }, [community]);

  // attendance per programme title
  const perProg = {};
  att.forEach((a) => { const k = a.programme || "Unknown"; perProg[k] = (perProg[k] || 0) + 1; });
  const progRows = Object.entries(perProg).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxAtt = Math.max(1, ...progRows.map((r) => r[1]));

  const statusCounts = {};
  programs.forEach((p) => { statusCounts[p.status] = (statusCounts[p.status] || 0) + 1; });

  return (
    <>
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {[["users", subs.length, "Subscribers"], ["cal", programs.length, "Programmes"], ["qr", att.length, "Check-ins"],
          ["chart", subs.length ? Math.round((att.length / subs.length) * 100) + "%" : "0%", "Engagement"]].map(([ic, v, l]) => (
          <div className="kpi" key={l}><div className="ic" style={{ background: "var(--t1)", color: "var(--t7)" }}><Icon name={ic} /></div><div className="val">{v}</div><div className="lbl">{l}</div></div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", alignItems: "start" }}>
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="chart" /> Attendance by programme</div></div>
          {progRows.length === 0 ? <div className="empty" style={{ padding: 20 }}>No attendance data yet.</div>
            : progRows.map(([name, v]) => <Bar key={name} label={name} value={v} max={maxAtt} />)}
        </div>
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="cal" /> Programmes by status</div></div>
          {Object.keys(statusCounts).length === 0 ? <div className="empty" style={{ padding: 20 }}>No programmes yet.</div>
            : Object.entries(statusCounts).map(([s, v]) => <Bar key={s} label={s} value={v} max={Math.max(1, ...Object.values(statusCounts))} color="linear-gradient(90deg,#F5A623,#D97706)" />)}
        </div>
      </div>
    </>
  );
}
