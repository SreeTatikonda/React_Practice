import { useState } from "react";

const CAT_COLORS = { Food: "#f97316", Travel: "#06b6d4", Tech: "#6366f1", Health: "#22c55e", Other: "#5a5a7a" };

export default function ExpenseTracker() {
  const [items, setItems] = useState([
    { id: 1, label: "Coffee",       amount: 4.5,  cat: "Food" },
    { id: 2, label: "Uber",         amount: 12,   cat: "Travel" },
    { id: 3, label: "LeetCode Pro", amount: 8,    cat: "Tech" },
    { id: 4, label: "Gym",          amount: 25,   cat: "Health" },
  ]);
  const [label, setLabel] = useState("");
  const [amt, setAmt]     = useState("");
  const [cat, setCat]     = useState("Food");

  const add = () => {
    if (!label || !amt) return;
    setItems((i) => [...i, { id: Date.now(), label, amount: +amt, cat }]);
    setLabel(""); setAmt("");
  };

  const total  = items.reduce((s, i) => s + i.amount, 0);
  const byCat  = Object.keys(CAT_COLORS).map((c) => ({ c, total: items.filter((i) => i.cat === c).reduce((s, i) => s + i.amount, 0) })).filter((x) => x.total > 0);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>💸 Expense Tracker</h2>

      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Description"
          style={{ flex: 2, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px 10px", color: "#e2e0f5", fontSize: 13 }} />
        <input value={amt} onChange={(e) => setAmt(e.target.value)} type="number" placeholder="$0"
          style={{ flex: 1, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px 10px", color: "#e2e0f5", fontSize: 13 }} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}
          style={{ background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px", color: "#e2e0f5", fontSize: 12 }}>
          {Object.keys(CAT_COLORS).map((c) => <option key={c}>{c}</option>)}
        </select>
        <button onClick={add}
          style={{ background: "#6366f1", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>+</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5, maxHeight: 180, overflowY: "auto", marginBottom: 12 }}>
        {items.map((i) => (
          <div key={i.id}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLORS[i.cat], flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13 }}>{i.label}</span>
            <span style={{ fontSize: 11, color: CAT_COLORS[i.cat] }}>{i.cat}</span>
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>${i.amount.toFixed(2)}</span>
            <button onClick={() => setItems((x) => x.filter((x) => x.id !== i.id))}
              style={{ background: "none", border: "none", color: "#5a5a7a", fontSize: 16, cursor: "pointer" }}>×</button>
          </div>
        ))}
      </div>

      <div style={{ background: "#0d0d18", borderRadius: 10, padding: 14, border: "1px solid #1f1f2e" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: "#5a5a7a" }}>Total Spent</span>
          <span style={{ fontWeight: 800, fontSize: 20, fontFamily: "monospace" }}>${total.toFixed(2)}</span>
        </div>
        {byCat.map(({ c, total: t }) => (
          <div key={c} style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
              <span style={{ color: CAT_COLORS[c] }}>{c}</span>
              <span style={{ color: "#5a5a7a" }}>${t.toFixed(2)} ({Math.round((t / total) * 100)}%)</span>
            </div>
            <div style={{ height: 4, background: "#1a1a2a", borderRadius: 2 }}>
              <div style={{ width: `${(t / total) * 100}%`, height: "100%", background: CAT_COLORS[c], borderRadius: 2, transition: "width 0.3s" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
