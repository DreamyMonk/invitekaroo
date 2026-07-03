"use client";
import { useEffect, useMemo, useState } from "react";
import { watchPrograms, addProgram, updateProgram, deleteProgram, pushNotify, fmtDate } from "@/lib/db";
import Icon from "../Icon";

const EMPTY = { title: "", date: "", time: "", venue: "", area: "", status: "scheduled", description: "", youtube: "", published: true };
const STATUS = ["scheduled", "live", "done", "postponed", "cancelled", "ended"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const chipCls = (s) => ({ live: "cg", scheduled: "ca", postponed: "ca", done: "cn", ended: "cn", cancelled: "ce" }[s] || "cn");
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function t24(t) { const m = (t || "").match(/(\d+):(\d+)\s*(AM|PM)/i); if (!m) return 0; let h = +m[1]; if (/pm/i.test(m[3]) && h !== 12) h += 12; if (/am/i.test(m[3]) && h === 12) h = 0; return h * 60 + +m[2]; }

export default function Schedule({ community, toast }) {
  const [rows, setRows] = useState([]);
  const [sel, setSel] = useState(iso(new Date()));
  const [modal, setModal] = useState(null);
  const [busy, setBusy] = useState(false);
  const [nowMin, setNowMin] = useState(() => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); });

  useEffect(() => community ? watchPrograms(community.id, setRows) : undefined, [community]);
  useEffect(() => { const t = setInterval(() => { const n = new Date(); setNowMin(n.getHours() * 60 + n.getMinutes()); }, 1000); return () => clearInterval(t); }, []);

  const todayIso = iso(new Date());
  const fnsOn = (d) => rows.filter((r) => r.date === d);

  // Edition day list: edition window if set, else the distinct programme dates.
  const days = useMemo(() => {
    const out = [];
    const s = community.editionStart ? new Date(community.editionStart) : null;
    let n = 0;
    if (s && (community.editionEnd || community.editionDays)) {
      const end = community.editionEnd ? new Date(community.editionEnd) : new Date(s.getTime() + (Number(community.editionDays) - 1) * 86400000);
      for (let dt = new Date(s); dt <= end; dt.setDate(dt.getDate() + 1)) { out.push(iso(new Date(dt))); n++; if (n > 120) break; }
    }
    // ensure any programme dates + today are present
    const set = new Set(out);
    rows.forEach((r) => r.date && set.add(r.date));
    set.add(todayIso);
    return [...set].sort();
  }, [community, rows, todayIso]);

  const doneDays = days.filter((d) => d < todayIso).length;
  const pct = days.length ? Math.round((doneDays / days.length) * 100) : 0;

  function open(mode, row, date) { setModal({ mode, id: row?.id, form: row ? { ...EMPTY, ...row } : { ...EMPTY, date: date || sel } }); }
  const setF = (k, v) => setModal((m) => ({ ...m, form: { ...m.form, [k]: v } }));

  async function save() {
    const f = modal.form;
    if (!f.title.trim()) return toast("Programme title required");
    if (!f.date) return toast("Pick a date");
    setBusy(true);
    try {
      if (modal.mode === "edit") { await updateProgram(modal.id, f); toast("Programme updated — live in the app"); }
      else {
        await addProgram(community, f); toast("Published — live in the app ✓");
        if (f.published) pushNotify(`New programme: ${f.title}`, `${community.name} · ${fmtDate(f.date)}${f.time ? " · " + f.time : ""}`);
      }
      setModal(null);
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }
  async function setStatus(r, status, extra) {
    try {
      await updateProgram(r.id, { status, ...(extra || {}) });
      const msgs = { postponed: "Postponed", cancelled: "Cancelled", ended: "Turned off — shows as ended in the app", scheduled: "Reactivated — visible in the app" };
      toast(msgs[status] || "Updated");
    } catch (e) { toast("Error: " + (e.message || e)); }
  }
  async function remove(r) { if (!confirm(`Delete "${r.title}"? It disappears from the app.`)) return; try { await deleteProgram(r.id); toast("Deleted"); } catch (e) { toast("Error: " + (e.message || e)); } }

  // Selected-day panel data
  const dayFns = fnsOn(sel).slice().sort((a, b) => t24(a.time) - t24(b.time));
  const selDate = (() => { const [y, m, d] = sel.split("-").map(Number); return new Date(y, m - 1, d); })();
  const isToday = sel === todayIso;
  const live = dayFns.find((f) => f.status === "live");
  const upcoming = dayFns.filter((f) => f.status === "scheduled" || f.status === "postponed");
  const next = isToday ? (upcoming.find((f) => t24(f.time) >= nowMin) || upcoming[0]) : upcoming[0];
  const doneN = dayFns.filter((f) => f.status === "done").length;

  // Countdown to next (today only)
  let cd = null;
  if (isToday && next) { let rem = Math.max(0, t24(next.time) * 60 - (nowMin * 60 + new Date().getSeconds())); cd = { h: Math.floor(rem / 3600), m: Math.floor((rem % 3600) / 60), s: rem % 60 }; }

  return (
    <>
      {/* edition header */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">{community.editionLabel || "Edition"} · {community.editionStatus || "Active"}</div>
            <div className="disp" style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: 3 }}>{days.length}-day edition</div>
            <div className="mono" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 9, fontSize: ".76rem", color: "var(--ink2)" }}>
              {community.editionStart && <span style={{ color: "var(--t7)", fontWeight: 600 }}><Icon name="cal" size={12} /> {fmtDate(community.editionStart)}</span>}
              {community.editionEnd && <><span style={{ color: "var(--ink4)" }}><Icon name="arrowR" size={12} /></span><span style={{ color: "var(--g5)", fontWeight: 600 }}>{fmtDate(community.editionEnd)}</span></>}
            </div>
          </div>
          <button className="btn btn-p btn-sm" onClick={() => open("add", null, sel)}><Icon name="plus" size={15} stroke="#fff" /> Add function</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
          <div className="bar-track" style={{ flex: 1 }}><div className="bar-fill" style={{ width: pct + "%" }} /></div>
          <span className="mono" style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--ink2)", whiteSpace: "nowrap" }}>Day {Math.min(doneDays + 1, days.length || 1)} of {days.length}</span>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "252px 1fr", gap: 16, alignItems: "start" }}>
        {/* day list */}
        <div className="card" style={{ padding: 10 }}>
          <div style={{ padding: "5px 8px 9px" }}><span className="eyebrow">All {days.length} days</span></div>
          <div style={{ maxHeight: 610, overflowY: "auto" }}>
            {days.map((d) => {
              const fns = fnsOn(d); const act = fns.filter((f) => f.status !== "cancelled" && f.status !== "ended");
              const dt = (() => { const [y, mo, da] = d.split("-").map(Number); return new Date(y, mo - 1, da); })();
              const on = d === sel, tday = d === todayIso, hasLive = fns.some((f) => f.status === "live");
              return (
                <div key={d} className={`vday${on ? " on" : ""}${tday ? " today" : ""}`} onClick={() => setSel(d)}>
                  <div className="vd-date"><span className="dn">{dt.getDate()}</span><span className="mo">{MON[dt.getMonth()]}</span></div>
                  <div className="vd-mid">
                    <div className="wd">{WD[dt.getDay()]} · Day {days.indexOf(d) + 1}{tday ? " · Today" : ""}</div>
                    <div className={`vd-sub${fns.length ? "" : " none"}`}>{fns.length ? `${act.length} function${act.length === 1 ? "" : "s"}` : "No functions yet"}</div>
                  </div>
                  {hasLive ? <span className="vd-live"><i />Live</span> : fns.length ? <span className="vd-cnt">{act.length}</span> : <span className="vd-add">+</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* day panel */}
        <div className="card">
          <div className="card-h">
            <div>
              <div className="disp" style={{ fontSize: "1.05rem", fontWeight: 800 }}>{WD[selDate.getDay()]}, {selDate.getDate()} {MONL[selDate.getMonth()]} {selDate.getFullYear()}</div>
              <div style={{ fontSize: ".7rem", color: "var(--ink3)", marginTop: 1 }}>{dayFns.length} function{dayFns.length === 1 ? "" : "s"}{isToday ? " · Today" : ""}</div>
            </div>
            <button className="btn btn-gold btn-sm" onClick={() => open("add", null, sel)}><Icon name="plus" size={14} stroke="#fff" /> Add to this day</button>
          </div>

          {dayFns.length > 0 && (
            <div className="sstrip">
              {live && <span className="si cg"><Icon name="clock" size={11} /> Live now</span>}
              <span className="si ci"><Icon name="cal" size={11} /> {upcoming.length} upcoming</span>
              {doneN > 0 && <span className="si cn"><Icon name="check" size={11} /> {doneN} done</span>}
            </div>
          )}

          {isToday && (live || next) && (
            <div className="now-banner">
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {live && (
                  <div style={{ flex: 1, minWidth: 170 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", animation: "pulse 1.3s infinite" }} /><span style={{ fontSize: ".56rem", fontWeight: 800, color: "#86EFAC", letterSpacing: ".7px" }}>LIVE NOW</span></div>
                    <div style={{ fontFamily: "var(--fd)", fontSize: "1.05rem", fontWeight: 800, marginTop: 3 }}>{live.title}</div>
                    <div style={{ fontSize: ".66rem", color: "rgba(255,255,255,.6)" }}>{live.time} · {live.venue}</div>
                  </div>
                )}
                {next && next !== live && (
                  <div style={{ flex: 1, minWidth: 200, borderLeft: live ? "1px solid rgba(255,255,255,.15)" : "none", paddingLeft: live ? 16 : 0 }}>
                    <div style={{ fontSize: ".56rem", fontWeight: 800, color: "rgba(255,255,255,.5)", letterSpacing: ".7px" }}>UP NEXT</div>
                    <div style={{ fontFamily: "var(--fd)", fontSize: "1.05rem", fontWeight: 800, marginTop: 3 }}>{next.title}</div>
                    <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.55)", marginTop: 1 }}>{next.time} · {next.venue}</div>
                    {cd && (
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginTop: 9 }}>
                        {[["HRS", cd.h], ["MIN", cd.m], ["SEC", cd.s]].map(([lbl, v], i) => (
                          <span key={lbl} style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                            {i > 0 && <span className="mono" style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,.35)", paddingBottom: 14 }}>:</span>}
                            <span style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 10, padding: "7px 0 5px", width: 48, textAlign: "center" }}>
                              <span className="mono" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FDE68A", display: "block", lineHeight: 1 }}>{String(v).padStart(2, "0")}</span>
                              <span style={{ fontSize: ".46rem", fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: 1 }}>{lbl}</span>
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {dayFns.length === 0 ? (
            <div className="empty"><Icon name="cal" size={44} /><div className="t">No functions yet for this day</div><div className="s">Add the first programme — subscribers see it instantly.</div><button className="btn btn-p btn-sm" style={{ marginTop: 14 }} onClick={() => open("add", null, sel)}><Icon name="plus" size={14} stroke="#fff" /> Add function</button></div>
          ) : dayFns.map((f, i) => {
            const off = f.status === "ended" || f.status === "cancelled";
            return (
              <div className={`fn ${f.status}`} key={f.id}>
                <div className="seq">{i + 1}</div>
                <div className="tm">{f.time || "—"}</div>
                <div className="body">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><span className="nm">{f.title}</span><span className={`chip ${chipCls(f.status)}`}>{f.status}</span>{f.published === false && <span className="chip cn">hidden</span>}</div>
                  <div className="meta"><Icon name="pin" size={11} /> {f.venue || "—"}{f.area ? `, ${f.area}` : ""}{f.description ? <><span>·</span> {f.description}</> : null}</div>
                </div>
                <div className="acts">
                  {!off && <button className="btn btn-icon btn-s" title="Edit" onClick={() => open("edit", f)}><Icon name="edit" size={13} /></button>}
                  {f.status === "scheduled" && <button className="btn btn-icon btn-s" title="Postpone" style={{ color: "var(--g5)" }} onClick={() => setStatus(f, "postponed")}><Icon name="clock" size={13} /></button>}
                  {(f.status === "scheduled" || f.status === "postponed" || f.status === "live") && <button className="btn btn-icon btn-s" title="Turn off (end in app)" onClick={() => setStatus(f, "ended", { published: false })}><Icon name="x" size={13} /></button>}
                  {off && <button className="btn btn-icon btn-s" title="Reactivate" style={{ color: "#16A34A" }} onClick={() => setStatus(f, "scheduled", { published: true })}><Icon name="check" size={13} /></button>}
                  {(f.status === "scheduled" || f.status === "postponed" || f.status === "live") && <button className="btn btn-icon btn-s" title="Cancel" style={{ color: "var(--er)" }} onClick={() => setStatus(f, "cancelled")}><Icon name="x" size={13} /></button>}
                  <button className="btn btn-icon btn-s" title="Delete" onClick={() => remove(f)}><Icon name="trash" size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="ov on" onMouseDown={(e) => e.target.classList.contains("ov") && setModal(null)}>
          <div className="modal wide">
            <div className="modal-h"><div className="ttl">{modal.mode === "edit" ? "Edit function" : "Add function"}</div><div className="x" onClick={() => setModal(null)}><Icon name="x" size={16} /></div></div>
            <div className="modal-b">
              <label className="flbl">Title <span className="req">*</span></label>
              <input className="input" value={modal.form.title} onChange={(e) => setF("title", e.target.value)} placeholder="e.g. Morning Pravachan" />
              <div className="grid g3" style={{ gap: 12, marginTop: 12 }}>
                <div><label className="flbl">Date</label><input className="input" type="date" value={modal.form.date} onChange={(e) => setF("date", e.target.value)} /></div>
                <div><label className="flbl">Time</label><input className="input" value={modal.form.time} onChange={(e) => setF("time", e.target.value)} placeholder="7:00 AM" /></div>
                <div><label className="flbl">Status</label><select className="input" value={modal.form.status} onChange={(e) => setF("status", e.target.value)}>{STATUS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
              </div>
              <div className="grid g2" style={{ gap: 12, marginTop: 12 }}>
                <div><label className="flbl">Venue</label><input className="input" value={modal.form.venue} onChange={(e) => setF("venue", e.target.value)} /></div>
                <div><label className="flbl">Area</label><input className="input" value={modal.form.area} onChange={(e) => setF("area", e.target.value)} /></div>
              </div>
              <label className="flbl" style={{ marginTop: 12 }}>Description</label>
              <textarea className="input" rows={2} value={modal.form.description} onChange={(e) => setF("description", e.target.value)} />
              <label className="flbl" style={{ marginTop: 12 }}>YouTube live link</label>
              <input className="input" value={modal.form.youtube} onChange={(e) => setF("youtube", e.target.value)} placeholder="https://youtube.com/@…/live" />
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: ".84rem", fontWeight: 600 }}>
                <input type="checkbox" style={{ width: "auto" }} checked={modal.form.published} onChange={(e) => setF("published", e.target.checked)} /> Published (visible in app)
              </label>
            </div>
            <div className="modal-f">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-p" disabled={busy} onClick={save}><Icon name="check" size={15} stroke="#fff" /> {modal.mode === "edit" ? "Save changes" : "Publish to app"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
