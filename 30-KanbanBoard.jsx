import { useState } from "react";

const INITIAL = {
  backlog: [
    { id: 1, text: "Setup project structure",  tag: "setup", priority: "med" },
    { id: 2, text: "Design database schema",   tag: "design", priority: "high" },
    { id: 3, text: "Write API documentation",  tag: "docs",  priority: "low" },
  ],
  todo: [
    { id: 4, text: "Build auth system",        tag: "feature", priority: "high" },
    { id: 5, text: "Create React components",  tag: "feature", priority: "med" },
  ],
  doing: [
    { id: 6, text: "Implement RAG pipeline",   tag: "feature", priority: "high" },
    { id: 7, text: "Write unit tests",          tag: "testing", priority: "med" },
  ],
  done: [
    { id: 8, text: "Plan architecture",        tag: "design", priority: "high" },
    { id: 9, text: "Create wireframes",        tag: "design", priority: "low" },
  ],
};

const COL_META = {
  backlog: { label: "📋 Backlog", color: "#5a5a7a" },
  todo:    { label: "📌 To Do",   color: "#6366f1" },
  doing:   { label: "⚡ Doing",   color: "#eab308" },
  done:    { label: "✅ Done",    color: "#22c55e" },
};

const TAG_COLORS  = { setup: "#6366f1", design: "#a855f7", docs: "#06b6d4", feature: "#f97316", testing: "#22c55e" };
const PRIO_COLORS = { high: "#ef4444", med: "#eab308", low: "#22c55e" };

export default function KanbanBoard() {
  const [cols, setCols]       = useState(INITIAL);
  const [dragging, setDragging] = useState(null); // { col, id }
  const [over, setOver]       = useState(null);
  const [input, setInput]     = useState("");
  const [tag, setTag]         = useState("feature");
  const [prio, setPrio]       = useState("med");
  const [editId, setEditId]   = useState(null);
  const [editText, setEditText] = useState("");

  const move = (toCol) => {
    if (!dragging) return;
    const { col: fromCol, id } = dragging;
    if (fromCol === toCol) return;
    setCols((c) => {
      const card = c[fromCol].find((i) => i.id === id);
      if (!card) return c;
      return { ...c, [fromCol]: c[fromCol].filter((i) => i.id !== id), [toCol]: [...c[toCol], card] };
    });
    setDragging(null); setOver(null);
  };

  const addCard = () => {
    if (!input.trim()) return;
    setCols((c) => ({ ...c, backlog: [...c.backlog, { id: Date.now(), text: input, tag, priority: prio }] }));
    setInput("");
  };

  const deleteCard = (col, id) => setCols((c) => ({ ...c, [col]: c[col].filter((i) => i.id !== id) }));

  const saveEdit = (col, id) => {
    if (!editText.trim()) return;
    setCols((c) => ({ ...c, [col]: c[col].map((i) => i.id === id ? { ...i, text: editText } : i) }));
    setEditId(null);
  };

  const total = Object.values(cols).reduce((s, col) => s + col.length, 0);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "40px auto", padding: 24, background: "#0d0d12", borderRadius: 16, color: "#e2e0f5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>📌 Kanban Board</h2>
        <span style={{ fontSize: 12, color: "#5a5a7a" }}>{total} cards total</span>
      </div>

      {/* Add Card */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCard()}
          placeholder="New card title..."
          style={{ flex: 2, minWidth: 180, background: "#13131a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "9px 12px", color: "#e2e0f5", fontSize: 13 }} />
        <select value={tag} onChange={(e) => setTag(e.target.value)}
          style={{ background: "#13131a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "9px", color: "#e2e0f5", fontSize: 12 }}>
          {Object.keys(TAG_COLORS).map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={prio} onChange={(e) => setPrio(e.target.value)}
          style={{ background: "#13131a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "9px", color: "#e2e0f5", fontSize: 12 }}>
          {["high", "med", "low"].map((p) => <option key={p}>{p}</option>)}
        </select>
        <button onClick={addCard}
          style={{ padding: "9px 18px", background: "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>+ Add</button>
      </div>

      {/* Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {Object.entries(cols).map(([colId, cards]) => {
          const meta = COL_META[colId];
          return (
            <div key={colId}
              onDragOver={(e) => { e.preventDefault(); setOver(colId); }}
              onDrop={() => move(colId)}
              style={{ background: over === colId ? "#1a1a2e" : "#13131a", border: `1px solid ${over === colId ? "#6366f1" : "#1f1f2e"}`, borderRadius: 12, padding: 10, minHeight: 240, transition: "all 0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>{meta.label}</span>
                <span style={{ fontSize: 11, background: "#1a1a2a", borderRadius: 4, padding: "2px 6px", color: "#5a5a7a" }}>{cards.length}</span>
              </div>

              {cards.map((card) => (
                <div key={card.id}
                  draggable={editId !== card.id}
                  onDragStart={() => setDragging({ col: colId, id: card.id })}
                  onDragEnd={() => { setDragging(null); setOver(null); }}
                  style={{ background: dragging?.id === card.id ? "#0d0d18" : "#0d0d18", border: `1px solid ${dragging?.id === card.id ? "#6366f1" : "#1f1f2e"}`, borderRadius: 8, padding: "8px 10px", marginBottom: 6, cursor: "grab", opacity: dragging?.id === card.id ? 0.5 : 1, userSelect: "none", transition: "opacity 0.15s" }}>

                  {editId === card.id ? (
                    <div>
                      <input value={editText} onChange={(e) => setEditText(e.target.value)} autoFocus
                        onKeyDown={(e) => { if (e.key === "Enter") saveEdit(colId, card.id); if (e.key === "Escape") setEditId(null); }}
                        style={{ width: "100%", background: "#1a1a2a", border: "1px solid #6366f1", borderRadius: 4, padding: "4px 6px", color: "#e2e0f5", fontSize: 12, boxSizing: "border-box" }} />
                      <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                        <button onClick={() => saveEdit(colId, card.id)} style={{ fontSize: 11, padding: "2px 6px", background: "#22c55e", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer" }}>✓</button>
                        <button onClick={() => setEditId(null)} style={{ fontSize: 11, padding: "2px 6px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 4, color: "#5a5a7a", cursor: "pointer" }}>✕</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4, flex: 1 }}>{card.text}</p>
                        <div style={{ display: "flex", gap: 3, marginLeft: 4 }}>
                          <button onClick={() => { setEditId(card.id); setEditText(card.text); }}
                            style={{ background: "none", border: "none", color: "#5a5a7a", cursor: "pointer", fontSize: 12, padding: 0, lineHeight: 1 }}>✏</button>
                          <button onClick={() => deleteCard(colId, card.id)}
                            style={{ background: "none", border: "none", color: "#5a5a7a", cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <span style={{ fontSize: 9, background: `${TAG_COLORS[card.tag]}22`, color: TAG_COLORS[card.tag], border: `1px solid ${TAG_COLORS[card.tag]}44`, borderRadius: 3, padding: "1px 5px", fontWeight: 600 }}>{card.tag}</span>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIO_COLORS[card.priority], flexShrink: 0 }} title={`${card.priority} priority`} />
                      </div>
                    </>
                  )}
                </div>
              ))}

              {cards.length === 0 && (
                <div style={{ textAlign: "center", color: "#333350", fontSize: 12, padding: "20px 8px", border: "1px dashed #1f1f2e", borderRadius: 8 }}>
                  Drop cards here
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 12, fontSize: 12, color: "#5a5a7a" }}>
        <span>Drag cards between columns • Click ✏ to edit • × to delete • Enter to confirm</span>
      </div>
    </div>
  );
}
