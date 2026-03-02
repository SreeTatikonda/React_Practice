import { useState } from "react";

const INITIAL_ITEMS = [
  { id: 1, text: "Master React Hooks",       icon: "⚛️" },
  { id: 2, text: "Build portfolio projects", icon: "🏗️" },
  { id: 3, text: "Write technical blogs",    icon: "✍️" },
  { id: 4, text: "Practice LeetCode daily",  icon: "🧠" },
  { id: 5, text: "Deploy to production",     icon: "🚀" },
  { id: 6, text: "Land dream job",           icon: "🎯" },
  { id: 7, text: "Celebrate! 🎉",            icon: "🥂" },
];

export default function DragDropList() {
  const [items, setItems]     = useState(INITIAL_ITEMS);
  const [dragging, setDragging] = useState(null);
  const [over, setOver]         = useState(null);
  const [input, setInput]       = useState("");

  const onDrop = (targetId) => {
    if (dragging === null || dragging === targetId) return;
    const next = [...items];
    const fromIdx = next.findIndex((i) => i.id === dragging);
    const toIdx   = next.findIndex((i) => i.id === targetId);
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setItems(next);
    setDragging(null);
    setOver(null);
  };

  const addItem = () => {
    if (!input.trim()) return;
    setItems((i) => [...i, { id: Date.now(), text: input, icon: "📌" }]);
    setInput("");
  };

  const remove = (id) => setItems((i) => i.filter((x) => x.id !== id));

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 8 }}>⠿ Drag & Drop List</h2>
      <p style={{ color: "#5a5a7a", fontSize: 13, marginBottom: 16 }}>Drag items to reorder your goals</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add a new goal..."
          style={{ flex: 1, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px 12px", color: "#e2e0f5", fontSize: 13 }} />
        <button onClick={addItem}
          style={{ background: "#6366f1", border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>+</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => setDragging(item.id)}
            onDragOver={(e) => { e.preventDefault(); setOver(item.id); }}
            onDrop={() => onDrop(item.id)}
            onDragEnd={() => { setDragging(null); setOver(null); }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px",
              background: over === item.id && dragging !== item.id ? "#1a1a3a" : "#111118",
              border: `1px solid ${over === item.id && dragging !== item.id ? "#6366f1" : "#1f1f2e"}`,
              borderRadius: 10,
              cursor: "grab",
              opacity: dragging === item.id ? 0.35 : 1,
              transition: "all 0.15s",
              userSelect: "none",
            }}>
            <span style={{ color: "#5a5a7a", fontSize: 16, cursor: "grab" }}>⠿</span>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: 14 }}>{item.text}</span>
            <span style={{ background: "#1a1a2a", borderRadius: 4, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#5a5a7a" }}>{idx + 1}</span>
            <button onClick={() => remove(item.id)}
              style={{ background: "none", border: "none", color: "#5a5a7a", fontSize: 16, cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
          </div>
        ))}
      </div>
      <p style={{ color: "#5a5a7a", fontSize: 12, marginTop: 12, textAlign: "center" }}>{items.length} items</p>
    </div>
  );
}
