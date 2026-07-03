"use client";
import { useEffect, useMemo, useState } from "react";
import { watchSub } from "@/lib/db";
import Icon from "../Icon";

function colorFor(s) {
  let h = 0; for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();
const nf = (n) => Number(n || 0).toLocaleString("en-IN");

const FILTERS = [
  { k: "all", lbl: "All" },
  { k: "going", lbl: "Going" },
  { k: "not_going", lbl: "Not going" },
];

export default function RSVP({ community, toast }) {
  const [rsvps, setRsvps] = useState([]);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!community) return;
    return watchSub(community.id, "rsvps", setRsvps);
  }, [community]);

  const stats = useMemo(() => {
    let going = 0, notGoing = 0, heads = 0;
    rsvps.forEach((r) => {
      if (r.status === "going") { going++; heads += Number(r.guests || 0); }
      else if (r.status === "not_going") notGoing++;
    });
    return { total: rsvps.length, going, notGoing, heads };
  }, [rsvps]);

  const shown = useMemo(() => {
    const qq = q.trim().toLowerCase();
    const qd = qq.replace(/\D/g, "");
    return rsvps.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!qq) return true;
      if ((r.name || "").toLowerCase().indexOf(qq) > -1) return true;
      if (qd && String(r.mobile || "").replace(/\D/g, "").indexOf(qd) > -1) return true;
      return false;
    });
  }, [rsvps, filter, q]);

  const kpis = [
    { ic: "users", bg: "var(--t1)", st: "var(--t7)", val: nf(stats.total), lbl: "Total RSVPs", delta: stats.total ? "responses" : null },
    { ic: "check", bg: "var(--ok1)", st: "#16A34A", val: nf(stats.going), lbl: "Going", delta: stats.total ? `${Math.round((stats.going / stats.total) * 100)}%` : null, up: stats.going > 0 ? 1 : 0 },
    { ic: "user", bg: "var(--g1)", st: "var(--g5)", val: nf(stats.heads), lbl: "People expected", delta: stats.heads ? "incl. companions" : null },
    { ic: "x", bg: "var(--er1)", st: "var(--er)", val: nf(stats.notGoing), lbl: "Not going", delta: stats.notGoing ? "declined" : null },
  ];

  return (
    <>
      {/* intro banner */}
      <div className="card" style={{ marginBottom: 18, background: "linear-gradient(135deg,#1A0E3D,#3D2582)", border: "none", color: "#fff", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="send" stroke="#fff" size={18} /></div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontWeight: 700, fontSize: ".92rem" }}>Collect RSVPs</div>
          <div style={{ fontSize: ".66rem", color: "rgba(255,255,255,.65)" }}>Ask subscribers to confirm attendance &amp; how many they&rsquo;re bringing &mdash; so you can plan food &amp; water accurately.</div>
        </div>
        <button className="btn btn-gold btn-sm" onClick={() => toast && toast("RSVP requests go out from the app")}><Icon name="send" size={14} stroke="#fff" /> Send RSVP request</button>
      </div>

      {/* KPI row */}
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {kpis.map((k) => (
          <div className="kpi" key={k.lbl}>
            {k.delta && <div className={`delta ${k.up ? "up" : ""}`} style={{ fontSize: ".6rem", color: "var(--ink4)", marginBottom: 6 }}>{k.delta}</div>}
            <div className="ic" style={{ background: k.bg, color: k.st }}><Icon name={k.ic} /></div>
            <div className="val">{k.val}</div><div className="lbl">{k.lbl}</div>
          </div>
        ))}
      </div>

      {/* filter + search */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0 14px", flexWrap: "wrap" }}>
        <div className="seg">
          {FILTERS.map((f) => (
            <div key={f.k} className={`s${filter === f.k ? " on" : ""}`} onClick={() => setFilter(f.k)}>
              {f.lbl}{f.k === "going" && stats.going ? ` · ${nf(stats.going)}` : f.k === "not_going" && stats.notGoing ? ` · ${nf(stats.notGoing)}` : ""}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 160, maxWidth: 280, position: "relative" }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--ink4)", display: "flex" }}><Icon name="search" size={15} /></span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or mobile…" style={{ padding: "8px 8px 8px 34px" }} />
        </div>
      </div>

      {/* list */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {shown.length === 0 ? (
          <div className="empty">
            <Icon name="users" size={44} />
            <div className="t">{rsvps.length === 0 ? "No RSVPs yet" : "No matching responses"}</div>
            <div className="s">{rsvps.length === 0 ? "Send an RSVP request — responses show up here instantly." : "Try a different filter or search."}</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 560 }}>
              <thead>
                <tr>
                  <th>Subscriber</th>
                  <th>Programme</th>
                  <th>People</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => {
                  const going = r.status === "going";
                  return (
                    <tr key={r.id}>
                      <td>
                        <div className="u-cell">
                          <div className="av-sm" style={{ background: colorFor(r.name) }}>{initials(r.name)}</div>
                          <div>
                            <div className="nm">{r.name || "Guest"}</div>
                            <div className="sb mono">{r.mobile || "—"}</div>
                          </div>
                        </div>
                      </td>
                      <td>{r.programme || "—"}</td>
                      <td className="mono" style={{ fontWeight: 700, color: going ? "var(--g5)" : "var(--ink4)" }}>
                        {going ? `${nf(r.guests || 0)} ${Number(r.guests) === 1 ? "person" : "people"}` : "—"}
                      </td>
                      <td>
                        <span className={`chip ${going ? "cg" : "ce"}`}>{going ? "Going" : "Not going"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
