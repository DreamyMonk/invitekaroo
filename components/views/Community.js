"use client";
import { useState } from "react";
import { updateCommunity } from "@/lib/db";
import Icon from "../Icon";

// Discovery attributes — each maps to a search filter in the subscriber app.
const DISCOVERY = [
  { k: "city", ic: "pin", lbl: "City", hint: "Shown under “Location” search" },
  { k: "area", ic: "pin", lbl: "Area", hint: "Shown under “Area” search" },
  { k: "venue", ic: "pin", lbl: "Current venue", hint: "Shown under “Venue” search" },
  { k: "guru", ic: "user", lbl: "Guru / Speaker", hint: "Shown under “Guru” search" },
];

export default function Community({ community, toast, onSaved }) {
  const [f, setF] = useState({ ...community, amenities: (community.amenities || []).join(", ") });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  async function save() {
    if (!f.name?.trim()) return toast("Community name required");
    setBusy(true);
    try {
      const data = { ...f, amenities: String(f.amenities || "").split(",").map((s) => s.trim()).filter(Boolean) };
      delete data.id; delete data.ownerUid; delete data.createdAt;
      await updateCommunity(community.id, data);
      toast("Community profile saved — updated across the app");
      onSaved && onSaved();
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }

  return (
    <>
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", alignItems: "start", gap: 16 }}>
        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Community identity */}
          <div className="card">
            <div className="card-h">
              <div className="ttl"><Icon name="flower" /> Community identity</div>
              <span className="eyebrow">Drives search & pages</span>
            </div>
            <div className="grid g2" style={{ gap: 14 }}>
              <div>
                <label className="flbl">Community name</label>
                <input className="input" value={f.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Jain Community Sammelan" />
              </div>
              <div>
                <label className="flbl">Recurrence</label>
                <input className="input" value={f.recurrence || ""} onChange={(e) => set("recurrence", e.target.value)} placeholder="e.g. Annual" />
              </div>
            </div>
            <label className="flbl" style={{ marginTop: 6 }}>About</label>
            <textarea className="input" rows={3} value={f.about || ""} onChange={(e) => set("about", e.target.value)} placeholder="Tell subscribers what this community is about" />
            <label className="flbl" style={{ marginTop: 12 }}>Logo & cover images</label>
            <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
              <div style={{ width: 84, height: 84, borderRadius: 14, background: "linear-gradient(135deg,#3D2582,#7C5CBF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                <Icon name="flower" stroke="#fff" size={30} />
              </div>
              <div style={{ flex: 1, height: 84, border: "1.5px dashed var(--bd2)", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--ink4)", gap: 4 }}>
                <Icon name="layers" size={18} />
                <span style={{ fontSize: ".66rem", fontWeight: 600 }}>Upload cover photos</span>
              </div>
            </div>
          </div>

          {/* Discovery setup */}
          <div className="card">
            <div className="card-h">
              <div className="ttl"><Icon name="search" /> Discovery setup</div>
              <span className="chip cp">One-time</span>
            </div>
            <div className="info-box" style={{ marginBottom: 14 }}>
              <Icon name="chart" size={15} />
              <div>These attributes decide <b>who can find and subscribe</b> to your community. A subscriber searching by any of these — city, area, venue or guru — will see your community in Invite Karoo.</div>
            </div>
            <div className="grid g2" style={{ gap: 14 }}>
              {DISCOVERY.map((d) => (
                <div key={d.k}>
                  <label className="flbl"><Icon name={d.ic} size={12} /> {d.lbl}</label>
                  <input className="input" value={f[d.k] || ""} onChange={(e) => set(d.k, e.target.value)} />
                  <div className="hint">{d.hint}</div>
                </div>
              ))}
            </div>
            <label className="flbl" style={{ marginTop: 12 }}>Venue address</label>
            <input className="input" value={f.venueAddr || ""} onChange={(e) => set("venueAddr", e.target.value)} />
            <div className="hint">Full address shown on the community & venue page.</div>
            <label className="flbl" style={{ marginTop: 12 }}>Guru description</label>
            <input className="input" value={f.guruDesc || ""} onChange={(e) => set("guruDesc", e.target.value)} placeholder="Short line about the guru / speaker" />
          </div>
        </div>

        {/* ── Right column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Amenities */}
          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="layers" /> Amenities</div></div>
            <label className="flbl">Amenities (comma-separated)</label>
            <input className="input" value={f.amenities || ""} onChange={(e) => set("amenities", e.target.value)} placeholder="Parking, Wheelchair access, Prasad / Bhojan, Live stream" />
            <div className="hint">Displayed as chips on the community page in the app.</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {String(f.amenities || "").split(",").map((s) => s.trim()).filter(Boolean).map((a, i) => (
                <span key={i} className="chip ca">{a}</span>
              ))}
            </div>
          </div>

          {/* Broadcast & links */}
          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="cal" /> Broadcast & contact</div></div>
            <label className="flbl">YouTube live link</label>
            <input className="input" value={f.youtube || ""} onChange={(e) => set("youtube", e.target.value)} placeholder="https://youtube.com/@…/live" />
            <label className="flbl" style={{ marginTop: 12 }}>Helpline number</label>
            <input className="input" value={f.helpline || ""} onChange={(e) => set("helpline", e.target.value)} placeholder="e.g. +91 98765 43210" />
          </div>

          {/* Current edition */}
          <div className="card">
            <div className="card-h"><div className="ttl"><Icon name="gear" /> Current edition</div></div>
            <label className="flbl">Edition label</label>
            <input className="input" value={f.editionLabel || ""} onChange={(e) => set("editionLabel", e.target.value)} placeholder="e.g. Edition 2" />
            <div className="grid g2" style={{ gap: 14, marginTop: 4 }}>
              <div>
                <label className="flbl">Edition start</label>
                <input className="input" type="date" value={f.editionStart || ""} onChange={(e) => set("editionStart", e.target.value)} />
              </div>
              <div>
                <label className="flbl">Edition end</label>
                <input className="input" type="date" value={f.editionEnd || ""} onChange={(e) => set("editionEnd", e.target.value)} />
              </div>
            </div>
            <div className="hint">Subscribers stay subscribed across editions and are auto-notified before each begins.</div>
          </div>
        </div>
      </div>

      <button className="btn btn-p" style={{ marginTop: 18 }} disabled={busy} onClick={save}>
        <Icon name="check" size={15} stroke="#fff" /> {busy ? "Saving…" : "Save profile"}
      </button>
    </>
  );
}
