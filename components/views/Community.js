"use client";
import { useState } from "react";
import { updateCommunity } from "@/lib/db";
import Icon from "../Icon";

const FIELDS = [
  ["name", "Community name", "text"],
  ["about", "About", "area"],
  ["recurrence", "Recurrence (e.g. Annual)", "text"],
  ["city", "City", "text"],
  ["area", "Area", "text"],
  ["venue", "Current venue", "text"],
  ["venueAddr", "Venue address", "text"],
  ["guru", "Guru / Speaker", "text"],
  ["guruDesc", "Guru description", "text"],
  ["youtube", "YouTube live link", "text"],
  ["helpline", "Helpline number", "text"],
  ["editionLabel", "Edition label (e.g. Edition 2)", "text"],
  ["editionStart", "Edition start", "date"],
  ["editionEnd", "Edition end", "date"],
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
    <div className="card" style={{ maxWidth: 720 }}>
      <div className="card-h" style={{ marginBottom: 6 }}>
        <div className="ttl"><Icon name="flower" /> Community Profile</div>
        <span className="muted">Drives search, venue & community pages in the app</span>
      </div>
      {FIELDS.map(([k, label, type]) => (
        <div key={k}>
          <label className="label">{label}</label>
          {type === "area"
            ? <textarea className="input" rows={3} value={f[k] || ""} onChange={(e) => set(k, e.target.value)} />
            : <input className="input" type={type} value={f[k] || ""} onChange={(e) => set(k, e.target.value)} />}
        </div>
      ))}
      <label className="label">Amenities (comma-separated)</label>
      <input className="input" value={f.amenities || ""} onChange={(e) => set("amenities", e.target.value)} placeholder="Parking, Wheelchair access, Prasad / Bhojan, Live stream" />
      <button className="btn btn-p" style={{ marginTop: 16 }} disabled={busy} onClick={save}>
        <Icon name="check" size={15} stroke="#fff" /> {busy ? "Saving…" : "Save profile"}
      </button>
    </div>
  );
}
