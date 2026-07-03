"use client";
import { useEffect, useMemo, useState } from "react";
import { watchPrograms, watchSub, fmtDate } from "@/lib/db";
import Icon from "../Icon";

function colorFor(s) {
  let h = 0; for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();

export default function Attendance({ community, toast }) {
  const [programs, setPrograms] = useState([]);
  const [att, setAtt] = useState([]);

  useEffect(() => {
    if (!community) return;
    const us = [
      watchPrograms(community.id, setPrograms),
      watchSub(community.id, "attendance", setAtt),
    ];
    return () => us.forEach((u) => u && u());
  }, [community]);

  // KPIs from real attendance
  const uniqueAttendees = useMemo(() => {
    const set = new Set();
    att.forEach((a) => set.add(a.uid || a.name || a.id));
    return set.size;
  }, [att]);
  const progsWithCheckins = useMemo(() => {
    const set = new Set();
    att.forEach((a) => { if (a.programme) set.add(a.programme); });
    return set.size;
  }, [att]);

  // Attendance by programme (count per programme, sorted desc)
  const byProgramme = useMemo(() => {
    const counts = {};
    att.forEach((a) => { const p = a.programme || "Unlabelled"; counts[p] = (counts[p] || 0) + 1; });
    // seed with known programme titles so scheduled events show even at 0? keep to real check-ins only.
    return Object.entries(counts)
      .map(([programme, n]) => {
        const prog = programs.find((p) => p.title === programme);
        return { programme, n, venue: prog?.venue || "", date: prog?.date || "" };
      })
      .sort((a, b) => b.n - a.n);
  }, [att, programs]);
  const maxCount = byProgramme.length ? byProgramme[0].n : 0;

  // Recent check-ins (attendance has no reliable timestamp order; show most recent by array tail)
  const recent = useMemo(() => att.slice().reverse().slice(0, 12), [att]);

  const kpis = [
    { ic: "qr", bg: "var(--ok1)", st: "#16A34A", val: att.length, lbl: "Total check-ins" },
    { ic: "users", bg: "var(--t1)", st: "var(--t7)", val: uniqueAttendees, lbl: "Unique attendees" },
    { ic: "cal", bg: "var(--g1)", st: "var(--g5)", val: progsWithCheckins, lbl: "Functions with check-ins" },
  ];

  return (
    <>
      <div className="grid g3" style={{ marginBottom: 18 }}>
        {kpis.map((k) => (
          <div className="kpi" key={k.lbl}>
            <div className="ic" style={{ background: k.bg, color: k.st }}><Icon name={k.ic} /></div>
            <div className="val">{k.val}</div>
            <div className="lbl">{k.lbl}</div>
          </div>
        ))}
      </div>

      {/* how check-in works */}
      <div className="info-box" style={{ marginBottom: 18, alignItems: "center" }}>
        <div style={{ color: "var(--t6)", flexShrink: 0, display: "flex" }}><Icon name="qr" size={18} /></div>
        <div>
          Subscribers check in by opening <b>Invite Karoo</b> and scanning the event QR at the venue entry. Each check-in
          appears here in real time — no manual marking needed.
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1.4fr", alignItems: "start" }}>
        {/* Attendance by function/programme */}
        <div className="card">
          <div className="card-h"><div className="ttl"><Icon name="chart" /> Attendance by function</div>
            {byProgramme.length > 0 && <span className="chip ca">{byProgramme.length} function{byProgramme.length === 1 ? "" : "s"}</span>}
          </div>
          {byProgramme.length === 0 ? (
            <div className="empty"><Icon name="chart" size={44} /><div className="t">No check-ins yet</div><div className="s">Counts appear here as subscribers scan event QRs.</div></div>
          ) : byProgramme.map((row, i) => (
            <div key={row.programme} style={{ padding: "10px 0", borderBottom: i === byProgramme.length - 1 ? "none" : "1px solid var(--bd)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.programme}</div>
                  {(row.venue || row.date) && <div className="mono" style={{ fontSize: ".6rem", color: "var(--ink4)", marginTop: 1 }}>{[row.date ? fmtDate(row.date) : "", row.venue].filter(Boolean).join(" · ")}</div>}
                </div>
                <span className="mono" style={{ fontSize: ".95rem", fontWeight: 700, color: "var(--t7)", flexShrink: 0 }}>{row.n}</span>
              </div>
              <div className="bar-track"><div className="bar-fill" style={{ width: (maxCount ? Math.round((row.n / maxCount) * 100) : 0) + "%" }} /></div>
            </div>
          ))}
        </div>

        {/* Recent check-ins table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="card-h" style={{ padding: 16, margin: 0 }}>
            <div className="ttl"><Icon name="check" /> Recent check-ins</div>
            <span className="chip cp">{att.length} total</span>
          </div>
          {recent.length === 0 ? (
            <div className="empty" style={{ paddingBottom: 30 }}><Icon name="qr" size={44} /><div className="t">No one has checked in yet</div><div className="s">Scans from the app will show up here live.</div></div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr><th>Subscriber</th><th>Function</th><th>Venue</th><th>Checked in</th></tr>
                </thead>
                <tbody>
                  {recent.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <div className="u-cell">
                          <div className="av-sm" style={{ background: colorFor(a.name) }}>{initials(a.name)}</div>
                          <div><div className="nm">{a.name || "Guest"}</div>{a.code && <div className="sb mono">{a.code}</div>}</div>
                        </div>
                      </td>
                      <td>{a.programme || "—"}</td>
                      <td>{a.venue || "—"}</td>
                      <td className="mono" style={{ whiteSpace: "nowrap", color: "var(--ink3)" }}>{a.at || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
