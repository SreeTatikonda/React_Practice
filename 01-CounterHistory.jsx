import { useState } from "react";

export default function CounterHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const act = (n) => {
    const next = count + n;
    setCount(next);
    setHistory((h) => [...h.slice(-9), next]);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Counter + History</h2>
      <div style={{ fontSize: 72, fontWeight: 800, color: "#6366f1", textAlign: "center", lineHeight: 1 }}>{count}</div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "20px 0" }}>
        {[-10, -1, 1, 10].map((n) => (
          <button key={n} onClick={() => act(n)}
            style={{ padding: "8px 16px", background: n > 0 ? "#1a1a2e" : "#1a0a0a", border: `1px solid ${n > 0 ? "#3333aa" : "#aa3333"}`, borderRadius: 8, color: "#e2e0f5", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            {n > 0 ? "+" : ""}{n}
          </button>
        ))}
        <button onClick={() => { setCount(0); setHistory([0]); }}
          style={{ padding: "8px 16px", background: "#1a1a1a", border: "1px solid #2a2a3a", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>
          Reset
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60, justifyContent: "center" }}>
        {history.map((v, i) => {
          const max = Math.max(...history.map(Math.abs), 1);
          const h = Math.max(4, (Math.abs(v) / max) * 56);
          return (
            <div key={i} title={String(v)}
              style={{ width: 16, height: h, background: v >= 0 ? "#6366f1" : "#ef4444", borderRadius: 3, opacity: 0.4 + 0.6 * (i / history.length), transition: "height 0.3s" }} />
          );
        })}
      </div>
      <p style={{ textAlign: "center", color: "#5a5a7a", fontSize: 12, marginTop: 8 }}>Last {history.length} values</p>
    </div>
  );
}
