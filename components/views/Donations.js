"use client";
import { useEffect, useState } from "react";
import { watchSub, addSub, deleteSubDoc, money } from "@/lib/db";
import Icon from "../Icon";

function colorFor(s) {
  let h = 0; for (let i = 0; i < (s || "").length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return `hsl(${h},52%,48%)`;
}
const initials = (s) => (s || "?").split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2).toUpperCase();

export default function Donations({ community, toast }) {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ donor: "", amount: "", note: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!community) return;
    return watchSub(community.id, "donations", setRows, { orderByField: "createdAt", desc: true });
  }, [community]);

  const total = rows.reduce((s, d) => s + Number(d.amount || 0), 0);
  const contributors = new Set(rows.map((d) => (d.donor || "").trim()).filter(Boolean)).size;
  const avg = rows.length ? Math.round(total / rows.length) : 0;
  const top = rows.slice().sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0))[0];
  const ledger = rows.slice().sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0));

  async function add() {
    if (!String(form.donor || "").trim()) return toast("Donor name required");
    if (!(Number(form.amount) > 0)) return toast("Enter a valid amount");
    setBusy(true);
    try {
      await addSub(community.id, "donations", {
        donor: form.donor.trim(),
        amount: Number(form.amount),
        note: String(form.note || "").trim(),
      });
      toast("Donation recorded");
      setForm({ donor: "", amount: "", note: "" });
    } catch (e) { toast("Error: " + (e.message || e)); }
    setBusy(false);
  }

  const kpis = [
    { ic: "rupee", bg: "var(--in1)", st: "var(--in)", val: money(total), lbl: "Total raised" },
    { ic: "users", bg: "var(--t1)", st: "var(--t7)", val: contributors, lbl: "Contributors" },
    { ic: "chart", bg: "var(--ok1)", st: "#16A34A", val: money(avg), lbl: "Avg donation" },
    { ic: "award", bg: "var(--g1)", st: "var(--g5)", val: top ? (top.donor || "—").split(" ")[0] : "—", lbl: "Top donor" },
  ];

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

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card-h"><div className="ttl"><Icon name="plus" /> Record donation</div></div>
        <div className="row" style={{ alignItems: "flex-end" }}>
          <div>
            <label className="flbl">Donor</label>
            <input className="input" value={form.donor} placeholder="Donor name"
              onChange={(e) => setForm((f) => ({ ...f, donor: e.target.value }))} />
          </div>
          <div>
            <label className="flbl">Amount (₹)</label>
            <input className="input" type="number" value={form.amount} placeholder="0"
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} />
          </div>
        </div>
        <label className="flbl">Note</label>
        <input className="input" value={form.note} placeholder="Purpose / mode (optional)"
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} />
        <button className="btn btn-p" style={{ marginTop: 12 }} disabled={busy} onClick={add}>
          <Icon name="plus" size={14} stroke="#fff" /> Record donation
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="card-h" style={{ padding: 16, margin: 0 }}>
          <div className="ttl"><Icon name="rupee" /> Donation ledger · {rows.length}</div>
          <span className="chip ca">{money(total)} raised</span>
        </div>
        {rows.length === 0 ? (
          <div className="empty" style={{ padding: 30 }}>
            <Icon name="rupee" size={40} />
            <div className="t" style={{ marginTop: 10 }}>No donations recorded yet</div>
            <div className="s">Record your first contribution above.</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 480 }}>
              <thead><tr><th>Donor</th><th>Amount</th><th>Note</th><th /></tr></thead>
              <tbody>
                {ledger.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div className="u-cell">
                        <div className="av-sm" style={{ background: colorFor(d.donor) }}>{initials(d.donor)}</div>
                        <div className="nm">{d.donor || "—"}</div>
                      </div>
                    </td>
                    <td className="mono" style={{ fontWeight: 700, color: "var(--ink)" }}>{money(d.amount)}</td>
                    <td>{d.note ? d.note : <span style={{ color: "var(--ink4)" }}>—</span>}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => deleteSubDoc(community.id, "donations", d.id)}>
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
