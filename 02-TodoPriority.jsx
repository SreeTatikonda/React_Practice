import { useState } from "react";

const PRIORITY_COLORS = {
  high: { bg: "#3f0a0a", border: "#aa2222", label: "HIGH" },
  med:  { bg: "#3f2a00", border: "#aa7700", label: "MED" },
  low:  { bg: "#0a2a0a", border: "#226622", label: "LOW" },
};

export default function TodoPriority() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Review thesis draft", priority: "high", done: false },
    { id: 2, text: "Update GitHub README", priority: "med",  done: false },
    { id: 3, text: "Apply to Cisco",       priority: "high", done: true  },
  ]);
  const [input, setInput] = useState("");
  const [prio, setPrio] = useState("med");

  const add = () => {
    if (!input.trim()) return;
    setTodos((t) => [...t, { id: Date.now(), text: input, priority: prio, done: false }]);
    setInput("");
  };
  const toggle = (id) => setTodos((t) => t.map((x) => x.id === id ? { ...x, done: !x.done } : x));
  const remove = (id) => setTodos((t) => t.filter((x) => x.id !== id));

  const sorted = [...todos].sort((a, b) => ({ high: 0, med: 1, low: 2 }[a.priority] - { high: 0, med: 1, low: 2 }[b.priority]));

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>✅ Todo with Priorities</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="New task..."
          style={{ flex: 1, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px 12px", color: "#e2e0f5", fontSize: 13 }} />
        <select value={prio} onChange={(e) => setPrio(e.target.value)}
          style={{ background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px", color: "#e2e0f5", fontSize: 13 }}>
          {["high", "med", "low"].map((p) => <option key={p} value={p}>{p.toUpperCase()}</option>)}
        </select>
        <button onClick={add}
          style={{ background: "#6366f1", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>+</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {sorted.map((t) => {
          const pc = PRIORITY_COLORS[t.priority];
          return (
            <div key={t.id}
              style={{ display: "flex", alignItems: "center", gap: 8, background: t.done ? "#0d0d0d" : pc.bg, border: `1px solid ${t.done ? "#1f1f2e" : pc.border}`, borderRadius: 8, padding: "8px 12px", opacity: t.done ? 0.5 : 1, transition: "all 0.2s" }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} style={{ accentColor: "#6366f1", width: 16, height: 16 }} />
              <span style={{ flex: 1, fontSize: 13, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: pc.border, fontFamily: "monospace" }}>{pc.label}</span>
              <button onClick={() => remove(t.id)} style={{ background: "none", border: "none", color: "#5a5a7a", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
          );
        })}
      </div>
      <p style={{ color: "#5a5a7a", fontSize: 12, marginTop: 10 }}>{todos.filter((t) => !t.done).length} remaining</p>
    </div>
  );
}
