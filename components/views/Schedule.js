"use client";
import { useEffect, useState } from "react";
import { watchPrograms, addProgram, updateProgram, deleteProgram, pushNotify, fmtDate } from "@/lib/db";
import Icon from "../Icon";

const EMPTY = { title: "", date: "", time: "", venue: "", area: "", status: "scheduled", description: "", youtube: "", published: true };
const STATUS = ["scheduled", "live", "done", "postponed", "cancelled"];
const chipClass = (s) => ({ live: "chip-live", scheduled: "chip-up", done: "chip-end", postponed: "chip-up", cancelled: "chip-end" }[s] || "chip-end");

export default function Schedule({ community, toast }) {
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(null); // {mode:'add'|'edit', form}
  const [busy, setBusy] = useState(false);

  useEffect(() => community ? watchPrograms(community.id, setRows) : undefined, [community]);

  const byDate = {};
  rows.forEach((r) => { (byDate[r.date] = byDate[r.date] || []).push(r); });
  const dates = Object.keys(byDate).sort();

  function open(mode, row) {
    setModal({ mode, id: row?.id, form: row ? { ...EMPTY, ...row } : { ...EMPTY } });
  }
  function setF(k, v) { setModal((m) => ({ ...m, form: { ...m.form, [k]: v } })); }

  async function save() {
    const f = modal.form;
    if (!f.title.trim()) return toast("Programme title required");
    if (!f.date) return toast("Pick a date");
    setBusy(true);
    try {
      if (modal.mode === "edit") {
        await updateProgram(modal.id, f);
        toast("Programme updated — live in the app");
      } else {
        await addProgram(community, f);
        toast("Published — live in the app ✓");
        if (f.published) pushNotify(`New programme: ${f.title}`, `${community.name} · ${fmtDate(f.date)}${f.time ? " · " + f.time : ""}`);
      }
      setModal(null);
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }

  async function remove(id) {
    if (!confirm("Delete this programme? It disappears from the app.")) return;
    await deleteProgram(id);
    toast("Deleted");
  }
  async function togglePub(r) {
    await updateProgram(r.id, { published: !r.published });
  }

  return (
    <>
      <div className="card-h" style={{ marginBottom: 16 }}>
        <div className="ttl"><Icon name="cal" /> Schedule · {rows.length} programme{rows.length === 1 ? "" : "s"}</div>
        <button className="btn btn-gold" onClick={() => open("add")}><Icon name="plus" size={15} stroke="#fff" /> Add programme</button>
      </div>

      {dates.length === 0 && (
        <div className="card"><div className="empty"><Icon name="cal" size={40} /><div style={{ marginTop: 10 }}>No programmes yet.<br />Add one — it appears in the app instantly.</div></div></div>
      )}

      {dates.map((d) => (
        <div key={d} style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: ".95rem", margin: "4px 0 10px" }}>{fmtDate(d)}</div>
          {byDate[d].sort((a, b) => (a.time || "").localeCompare(b.time || "")).map((r) => (
            <div className="prog" key={r.id} style={{ borderLeftColor: r.status === "live" ? "#16A34A" : r.status === "cancelled" || r.status === "done" ? "#94A3B8" : "#F5A623", opacity: r.published ? 1 : 0.55 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <div className="t">{r.title}</div>
                <span className={`chip ${chipClass(r.status)}`}>{r.status}</span>
              </div>
              <div className="meta">{r.time || "—"}{r.venue ? ` · ${r.venue}${r.area ? ", " + r.area : ""}` : ""}</div>
              {r.description && <div className="meta">{r.description}</div>}
              {!r.published && <div className="meta" style={{ color: "#B45309", fontWeight: 700 }}>Hidden from app</div>}
              <div className="acts">
                <button className="btn btn-ghost btn-sm" onClick={() => open("edit", r)}><Icon name="edit" size={13} /> Edit</button>
                <button className="btn btn-ghost btn-sm" onClick={() => togglePub(r)}>{r.published ? "Unpublish" : "Publish"}</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(r.id)}><Icon name="trash" size={13} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {modal && (
        <div className="ov on" onMouseDown={(e) => e.target.classList.contains("ov") && setModal(null)}>
          <div className="modal wide">
            <div className="modal-h"><div className="ttl">{modal.mode === "edit" ? "Edit programme" : "Add programme"}</div><div className="x" onClick={() => setModal(null)}><Icon name="x" size={16} /></div></div>
            <div className="modal-b">
              <label className="flbl">Title <span className="req">*</span></label>
              <input className="input" value={modal.form.title} onChange={(e) => setF("title", e.target.value)} placeholder="e.g. Morning Pravachan" />
              <div className="grid g3" style={{ gap: 12, marginTop: 12 }}>
                <div><label className="flbl">Date</label><input className="input" type="date" value={modal.form.date} onChange={(e) => setF("date", e.target.value)} /></div>
                <div><label className="flbl">Time</label><input className="input" value={modal.form.time} onChange={(e) => setF("time", e.target.value)} placeholder="7:00 AM" /></div>
                <div><label className="flbl">Status</label>
                  <select className="input" value={modal.form.status} onChange={(e) => setF("status", e.target.value)}>{STATUS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                </div>
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
