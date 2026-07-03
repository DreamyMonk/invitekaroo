"use client";
import { useEffect, useState } from "react";
import { watchPrograms, watchSub } from "@/lib/db";
import Icon from "../Icon";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const isoLabel = (iso) => {
  if (!iso) return "";
  const p = String(iso).split("-");
  if (p.length !== 3) return iso;
  return `${+p[2]} ${MON[+p[1] - 1] || ""}`;
};
const STATUS_CHIP = { live: "cg", done: "cn", ended: "cn", cancelled: "ce", postponed: "ca", scheduled: "ci" };
const STATUS_FILL = {
  live: "linear-gradient(90deg,#16A34A,#4ADE80)",
  cancelled: "linear-gradient(90deg,#DC2626,#F87171)",
  postponed: "linear-gradient(90deg,#F5A623,#D97706)",
  done: "linear-gradient(90deg,#94A3B8,#CBD5E1)",
  ended: "linear-gradient(90deg,#94A3B8,#CBD5E1)",
  scheduled: "linear-gradient(90deg,#7C5CBF,#A07ED4)",
};

// A single horizontal bar row (uses .bar-track / .bar-fill from globals.css)
function Bar({ label, value, max, fill, sub }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 5 }}>
        <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--ink)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 6, flexShrink: 0 }}>
          {sub && <span style={{ fontSize: ".58rem", color: "var(--ink4)", textTransform: "uppercase", letterSpacing: ".4px" }}>{sub}</span>}
          <span style={{ fontFamily: "var(--fm)", fontWeight: 700, fontSize: ".9rem", color: "var(--t7)" }}>{value}</span>
        </span>
      </div>
      <div className="bar-track" style={{ height: 9 }}>
        <div className="bar-fill" style={{ width: pct + "%", background: fill || undefined }} />
      </div>
    </div>
  );
}

export default function Analytics({ community }) {
  const [programs, setPrograms] = useState([]);
  const [subs, setSubs] = useState([]);
  const [att, setAtt] = useState([]);
  const [dons, setDons] = useState([]);

  useEffect(() => {
    if (!community) return;
    const us = [
      watchPrograms(community.id, setPrograms),
      watchSub(community.id, "subscribers", setSubs),
      watchSub(community.id, "attendance", setAtt),
      watchSub(community.id, "donations", setDons),
    ];
    return () => us.forEach((u) => u && u());
  }, [community]);

  // ── KPI summary (all real) ──────────────────────────────
  const engagement = subs.length ? Math.round((att.length / subs.length) * 100) : 0;
  const donTotal = dons.reduce((s, d) => s + Number(d.amount || 0), 0);
  const kpis = [
    { ic: "users", bg: "var(--t1)", st: "var(--t7)", val: subs.length, lbl: "Subscribers" },
    { ic: "cal", bg: "var(--g1)", st: "var(--g5)", val: programs.length, lbl: "Programmes" },
    { ic: "qr", bg: "var(--ok1)", st: "#16A34A", val: att.length, lbl: "Check-ins" },
    { ic: "chart", bg: "var(--in1)", st: "var(--in)", val: engagement + "%", lbl: "Engagement", delta: subs.length ? "check-ins / subs" : null },
  ];

  // ── Attendance by programme ─────────────────────────────
  const perProg = {};
  att.forEach((a) => { const k = a.programme || "Unknown"; perProg[k] = (perProg[k] || 0) + 1; });
  const progRows = Object.entries(perProg).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxProg = Math.max(1, ...progRows.map((r) => r[1]));

  // ── Programmes by status ────────────────────────────────
  const statusCounts = {};
  programs.forEach((p) => { const s = p.status || "scheduled"; statusCounts[s] = (statusCounts[s] || 0) + 1; });
  const statusRows = Object.entries(statusCounts).sort((a, b) => b[1] - a[1]);
  const maxStatus = Math.max(1, ...statusRows.map((r) => r[1]));

  // ── Check-ins over time (by day) ────────────────────────
  // Attendance rows carry `at` as a day label ("3 Jul 2026"); group & keep order by count.
  const perDay = {};
  att.forEach((a) => { const k = a.at || "—"; perDay[k] = (perDay[k] || 0) + 1; });
  const dayRows = Object.entries(perDay).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxDay = Math.max(1, ...dayRows.map((r) => r[1]));

  // ── Top venues (from programme metadata) ────────────────
  const perVenue = {};
  programs.forEach((p) => { const v = (p.venue || "").trim(); if (v) perVenue[v] = (perVenue[v] || 0) + 1; });
  const venueRows = Object.entries(perVenue).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxVenue = Math.max(1, ...venueRows.map((r) => r[1]));

  return (
    <>
      {/* KPI / summary row */}
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {kpis.map((k) => (
          <div className="kpi" key={k.lbl}>
            {k.delta && <div className="delta">{k.delta}</div>}
            <div className="ic" style={{ background: k.bg, color: k.st }}><Icon name={k.ic} /></div>
            <div className="val">{k.val}</div>
            <div className="lbl">{k.lbl}</div>
          </div>
        ))}
      </div>

      {/* Panels row 1: attendance by programme + programmes by status */}
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", alignItems: "start", marginBottom: 18 }}>
        <div className="card">
          <div className="card-h">
            <div className="ttl"><Icon name="chart" /> Attendance by programme</div>
            <span className="chip ci">{att.length} check-ins</span>
          </div>
          {progRows.length === 0
            ? <div className="empty"><Icon name="qr" size={40} /><div className="t">No attendance yet</div><div className="s">Check-ins appear here once devotees start arriving.</div></div>
            : progRows.map(([name, v]) => <Bar key={name} label={name} value={v} max={maxProg} sub={att.length ? Math.round((v / att.length) * 100) + "%" : null} />)}
        </div>

        <div className="card">
          <div className="card-h">
            <div className="ttl"><Icon name="cal" /> Programmes by status</div>
            <span className="chip ca">{programs.length} total</span>
          </div>
          {statusRows.length === 0
            ? <div className="empty"><Icon name="cal" size={40} /><div className="t">No programmes yet</div><div className="s">Add functions from the Schedule tab.</div></div>
            : statusRows.map(([s, v]) => (
              <div key={s} style={{ marginBottom: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <span className={`chip ${STATUS_CHIP[s] || "cp"}`}>{s}</span>
                  <span style={{ fontFamily: "var(--fm)", fontWeight: 700, fontSize: ".9rem", color: "var(--t7)" }}>{v}</span>
                </div>
                <div className="bar-track" style={{ height: 9 }}>
                  <div className="bar-fill" style={{ width: Math.round((v / maxStatus) * 100) + "%", background: STATUS_FILL[s] || undefined }} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Panels row 2: check-ins over time + top venues */}
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", alignItems: "start" }}>
        <div className="card">
          <div className="card-h">
            <div className="ttl"><Icon name="qr" /> Check-ins over time</div>
            <span className="chip ca">By day</span>
          </div>
          {dayRows.length === 0
            ? <div className="empty"><Icon name="chart" size={40} /><div className="t">No check-ins recorded</div><div className="s">Daily attendance will chart here.</div></div>
            : dayRows.map(([day, v]) => <Bar key={day} label={day} value={v} max={maxDay} fill="linear-gradient(90deg,#16A34A,#4ADE80)" />)}
        </div>

        <div className="card">
          <div className="card-h">
            <div className="ttl"><Icon name="pin" /> Programmes by venue</div>
            <span className="chip cp">Top {venueRows.length || ""}</span>
          </div>
          {venueRows.length === 0
            ? <div className="empty"><Icon name="pin" size={40} /><div className="t">No venues yet</div><div className="s">Venues from your programmes will rank here.</div></div>
            : venueRows.map(([v, n]) => <Bar key={v} label={v} value={n} max={maxVenue} fill="linear-gradient(90deg,#7C5CBF,#3D2582)" sub="events" />)}
        </div>
      </div>
    </>
  );
}
