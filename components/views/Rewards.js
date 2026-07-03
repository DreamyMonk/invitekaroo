"use client";
import { useEffect, useState } from "react";
import { watchSub, addSub, deleteSubDoc } from "@/lib/db";
import Icon from "../Icon";

function colorFor(s) {
  let h = 0; for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();
const GIFTS = ["Gold memento", "Silver coin", "Books set", "Shawl & shriphal", "₹5,000 cash"];

export default function Rewards({ community, toast }) {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ devotee: "", gift: "", reason: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!community) return;
    return watchSub(community.id, "rewards", setRows, { orderByField: "createdAt", desc: true });
  }, [community]);

  async function add() {
    if (!String(form.devotee || "").trim()) return toast("Devotee required");
    if (!String(form.gift || "").trim()) return toast("Gift required");
    setBusy(true);
    try {
      await addSub(community.id, "rewards", {
        devotee: form.devotee.trim(),
        gift: form.gift.trim(),
        reason: String(form.reason || "").trim(),
      });
      toast(`Gift “${form.gift.trim()}” given to ${form.devotee.trim()} 🎁`);
      setForm({ devotee: "", gift: "", reason: "" });
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }

  return (
    <>
      <div className="info-box" style={{ marginBottom: 18 }}>
        <Icon name="gift" />
        <div>The community decides the gift — it can be <b>anything</b> (cash, books, a memento, a shawl…).
          Assign a reward to any devotee below and record why they earned it.</div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card-h"><div className="ttl"><Icon name="award" /> Assign gift</div></div>
        <div className="row" style={{ alignItems: "flex-end" }}>
          <div>
            <label className="flbl">Devotee</label>
            <input className="input" value={form.devotee} placeholder="Devotee name"
              onChange={(e) => setForm((f) => ({ ...f, devotee: e.target.value }))} />
          </div>
          <div>
            <label className="flbl">Gift (community decides)</label>
            <input className="input" value={form.gift} placeholder="e.g. Silver coin, Books set, ₹5,000 cash"
              onChange={(e) => setForm((f) => ({ ...f, gift: e.target.value }))} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {GIFTS.map((g) => (
            <span key={g} className="chip cn" style={{ cursor: "pointer", padding: "6px 11px" }}
              onClick={() => setForm((f) => ({ ...f, gift: g }))}>{g}</span>
          ))}
        </div>
        <label className="flbl">Reason</label>
        <input className="input" value={form.reason} placeholder="Why they earned it (optional)"
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} />
        <button className="btn btn-gold" style={{ marginTop: 12 }} disabled={busy} onClick={add}>
          <Icon name="gift" size={14} stroke="#fff" /> Give gift
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="card-h" style={{ padding: 16, margin: 0 }}>
          <div className="ttl"><Icon name="gift" /> Rewards given · {rows.length}</div>
        </div>
        {rows.length === 0 ? (
          <div className="empty" style={{ padding: 30 }}>
            <Icon name="gift" size={40} />
            <div className="t" style={{ marginTop: 10 }}>No rewards given yet</div>
            <div className="s">Assign your first gift above.</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 480 }}>
              <thead><tr><th>Devotee</th><th>Gift</th><th>Reason</th><th /></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="u-cell">
                        <div className="av-sm" style={{ background: colorFor(r.devotee) }}>{initials(r.devotee)}</div>
                        <div className="nm">{r.devotee || "—"}</div>
                      </div>
                    </td>
                    <td><span className="chip ca"><Icon name="gift" size={12} /> {r.gift || "—"}</span></td>
                    <td>{r.reason ? r.reason : <span style={{ color: "var(--ink4)" }}>—</span>}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => deleteSubDoc(community.id, "rewards", r.id)}>
                        <Icon name="trash" size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
