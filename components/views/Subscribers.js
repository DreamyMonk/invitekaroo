"use client";
import { useEffect, useMemo, useState } from "react";
import { watchSub, deleteSubDoc, fmtDate } from "@/lib/db";
import Icon from "../Icon";

function colorFor(s) {
  let h = 0; for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();

export default function Subscribers({ community, toast }) {
  const [subs, setSubs] = useState([]);
  const [att, setAtt] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!community) return;
    const us = [
      watchSub(community.id, "subscribers", setSubs),
      watchSub(community.id, "attendance", setAtt),
    ];
    return () => us.forEach((u) => u && u());
  }, [community]);

  // Attendance count per subscriber, grouped by name.
  const attByName = useMemo(() => {
    const m = {};
    att.forEach((a) => { const n = a.name || ""; if (n) m[n] = (m[n] || 0) + 1; });
    return m;
  }, [att]);

  const checkedIn = subs.filter((s) => (attByName[s.name] || 0) > 0).length;
  const totalAtt = att.length;
  const avgAtt = subs.length ? Math.round((totalAtt / subs.length) * 10) / 10 : 0;

  const kpis = [
    { ic: "users", bg: "var(--t1)", st: "var(--t7)", val: subs.length, lbl: "Total subscribers" },
    { ic: "check", bg: "var(--ok1)", st: "#16A34A", val: `${checkedIn} / ${subs.length}`, lbl: "Checked in" },
    { ic: "qr", bg: "var(--g1)", st: "var(--g5)", val: totalAtt, lbl: "Total check-ins" },
    { ic: "chart", bg: "var(--in1)", st: "var(--in)", val: avgAtt, lbl: "Avg per subscriber" },
  ];

  const maxAtt = Math.max(1, ...subs.map((s) => attByName[s.name] || 0));

  const q = query.trim().toLowerCase();
  const qd = q.replace(/\D/g, "");
  const rows = subs.filter((s) => {
    const cnt = attByName[s.name] || 0;
    if (filter === "checked" && cnt === 0) return false;
    if (filter === "new" && cnt > 0) return false;
    if (!q) return true;
    if ((s.name || "").toLowerCase().indexOf(q) > -1) return true;
    if (qd && String(s.mobile || "").replace(/\D/g, "").indexOf(qd) > -1) return true;
    return false;
  });

  async function remove(s) {
    if (!confirm(`Remove "${s.name || "this subscriber"}"? This deletes their record.`)) return;
    try { await deleteSubDoc(community.id, "subscribers", s.id); toast("Subscriber removed"); }
    catch (e) { toast("Error: " + (e.message || e)); }
  }

  return (
    <>
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {kpis.map((k) => (
          <div className="kpi" key={k.lbl}>
            <div className="ic" style={{ background: k.bg, color: k.st }}><Icon name={k.ic} /></div>
            <div className="val">{k.val}</div><div className="lbl">{k.lbl}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--bd)", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink4)", display: "flex" }}><Icon name="search" size={16} /></span>
            <input className="input" placeholder="Search name or number…" style={{ paddingLeft: 38 }} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="seg">
            {[["all", "All"], ["checked", "Checked in"], ["new", "New"]].map(([k, l]) => (
              <div key={k} className={`s${filter === k ? " on" : ""}`} onClick={() => setFilter(k)}>{l}</div>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <span className="mono" style={{ fontSize: ".72rem", color: "var(--ink4)" }}>{rows.length} shown</span>
        </div>

        {rows.length === 0 ? (
          <div className="empty">
            <Icon name="users" size={44} />
            <div className="t">{subs.length ? "No subscribers match" : "No subscribers yet"}</div>
            <div className="s">{subs.length ? "Try a different search or filter." : "Subscribers appear here once people join your community."}</div>
          </div>
        ) : (
          <table>
            <thead><tr>
              <th>Subscriber</th><th>Since</th><th>Attendance</th><th style={{ width: 60 }}></th>
            </tr></thead>
            <tbody>
              {rows.map((s) => {
                const cnt = attByName[s.name] || 0;
                const pct = Math.round((cnt / maxAtt) * 100);
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="u-cell">
                        <div className="av-sm" style={{ background: colorFor(s.name) }}>{initials(s.name)}</div>
                        <div>
                          <div className="nm">{s.name || "Unnamed"}</div>
                          <div className="sb mono">{s.mobile || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.since ? fmtDate(s.since) : "—"}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="bar-track" style={{ width: 58 }}><div className="bar-fill" style={{ width: pct + "%" }} /></div>
                        <span className="mono" style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--ink2)" }}>{cnt}</span>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-icon btn-s" title="Remove" style={{ color: "var(--er)" }} onClick={() => remove(s)}><Icon name="trash" size={13} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
