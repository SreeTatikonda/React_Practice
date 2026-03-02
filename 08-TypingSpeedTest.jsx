import { useState } from "react";

const TEXTS = [
  "The quick brown fox jumps over the lazy dog near the river bank.",
  "React hooks allow function components to have state and lifecycle methods.",
  "Master students build projects that demonstrate real-world engineering skills.",
  "Retrieval augmented generation combines search with language model generation.",
];

export default function TypingTest() {
  const [textIdx] = useState(() => Math.floor(Math.random() * TEXTS.length));
  const target = TEXTS[textIdx];
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState(null);
  const [done, setDone] = useState(false);

  const elapsed = start ? (Date.now() - start) / 1000 : 0;
  const wpm = start && typed.length > 0 ? Math.round(typed.split(" ").length / (elapsed / 60)) : 0;
  const acc = typed.length > 0 ? Math.round([...typed].filter((c, i) => c === target[i]).length / typed.length * 100) : 100;

  const onChange = (e) => {
    const v = e.target.value;
    if (!start && v.length > 0) setStart(Date.now());
    if (v.length <= target.length) setTyped(v);
    if (v === target) setDone(true);
  };

  const reset = () => { setTyped(""); setStart(null); setDone(false); };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>⌨️ Typing Speed Test</h2>

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 16, marginBottom: 12, fontFamily: "monospace", fontSize: 15, lineHeight: 2 }}>
        {[...target].map((c, i) => {
          const color = i >= typed.length ? "#5a5a7a" : typed[i] === c ? "#22c55e" : "#ef4444";
          const bg    = i >= typed.length ? "transparent" : typed[i] === c ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.15)";
          return <span key={i} style={{ color, background: bg, borderRadius: 2 }}>{c}</span>;
        })}
      </div>

      <textarea value={typed} onChange={onChange} disabled={done}
        placeholder="Start typing here..."
        style={{ width: "100%", background: "#1a1a2a", border: `1px solid ${done ? "#22c55e" : "#1f1f2e"}`, borderRadius: 8, padding: 12, color: "#e2e0f5", fontSize: 14, resize: "none", height: 70, fontFamily: "monospace", boxSizing: "border-box" }} />

      {done && <p style={{ color: "#22c55e", fontWeight: 700, marginBottom: 8 }}>✓ Complete!</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
        {[["WPM", wpm, "#6366f1"], ["Accuracy", `${acc}%`, acc > 90 ? "#22c55e" : "#eab308"], ["Time", `${elapsed.toFixed(1)}s`, "#5a5a7a"], ["Chars", typed.length, "#5a5a7a"]].map(([l, v, c]) => (
          <div key={l} style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 10, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: c, fontFamily: "monospace" }}>{v}</div>
            <div style={{ fontSize: 11, color: "#5a5a7a", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <button onClick={reset}
        style={{ width: "100%", marginTop: 12, padding: 10, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer", fontSize: 14 }}>
        ↺ New Test
      </button>
    </div>
  );
}
