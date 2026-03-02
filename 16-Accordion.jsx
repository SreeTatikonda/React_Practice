// ── 16: Accordion ─────────────────────────────────────────────────────────────
import { useState } from "react";

const FAQS = [
  { q: "What is JSX?", a: "JSX is a syntax extension for JavaScript that looks like HTML. React transforms it into React.createElement() calls under the hood." },
  { q: "When to use useCallback?", a: "Use useCallback to memoize functions passed as props to child components, preventing unnecessary re-renders when the parent re-renders." },
  { q: "What is the Virtual DOM?", a: "A lightweight in-memory copy of the real DOM. React uses it to diff changes and batch updates, making UI updates efficient." },
  { q: "Context vs Redux?", a: "Context is great for small apps with infrequent global state updates. Redux suits complex apps with many consumers needing predictable state." },
  { q: "What is reconciliation?", a: "React's process of comparing the previous and new virtual DOM trees to determine the minimal set of changes to apply to the real DOM." },
];

export default function Accordion() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>❓ Accordion FAQ</h2>
      {FAQS.map((f, i) => (
        <div key={i}
          style={{ marginBottom: 8, border: `1px solid ${open === i ? "#6366f1" : "#1f1f2e"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
          <button onClick={() => setOpen((o) => o === i ? null : i)}
            style={{ width: "100%", padding: "14px 18px", background: "#1a1a2a", border: "none", color: "#e2e0f5", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            {f.q}
            <span style={{ color: "#6366f1", fontSize: 18, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.25s", display: "inline-block", lineHeight: 1 }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 18px 14px", background: "#111118", color: "#5a5a7a", fontSize: 13, lineHeight: 1.7, borderTop: "1px solid #1f1f2e" }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
