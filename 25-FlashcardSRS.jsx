import { useState } from "react";

const DECK = [
  { id: 1, q: "What is memoization?",    a: "Caching function results for the same inputs to avoid recomputation — used in useMemo and useCallback." },
  { id: 2, q: "Explain closures",         a: "A function that remembers variables from its outer scope even after the outer function has returned." },
  { id: 3, q: "What is tree shaking?",    a: "Dead code elimination in bundlers — unused exports are removed from the final bundle at build time." },
  { id: 4, q: "Explain the event loop",   a: "JS is single-threaded. The event loop processes the call stack, then microtasks, then macrotasks in a loop." },
  { id: 5, q: "What is a pure function?", a: "A function that always returns the same output for the same inputs and has no side effects." },
  { id: 6, q: "What is idempotency?",     a: "An operation that produces the same result regardless of how many times it is applied." },
  { id: 7, q: "Explain Big O notation",   a: "A mathematical notation to describe the limiting behavior (time/space complexity) of an algorithm as input grows." },
  { id: 8, q: "What is REST?",            a: "Representational State Transfer — an architectural style using HTTP verbs (GET/POST/PUT/DELETE) and stateless requests." },
];

// SM-2 simplified: ease factor & interval
function computeNext(card, quality) {
  const ef = Math.max(1.3, (card.ef || 2.5) + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const interval = quality < 3 ? 1 : card.interval ? Math.round(card.interval * ef) : quality < 4 ? 1 : 4;
  return { ...card, ef, interval, dueIn: interval, lastQ: quality };
}

export default function FlashcardSRS() {
  const [cards, setCards] = useState(DECK.map((c) => ({ ...c, ef: 2.5, interval: null, dueIn: 0, lastQ: null })));
  const [idx, setIdx]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown]     = useState(new Set());
  const [session, setSession] = useState({ reviewed: 0, correct: 0 });

  const card = cards[idx % cards.length];

  const rate = (quality) => {
    setCards((cs) => cs.map((c) => c.id === card.id ? computeNext(c, quality) : c));
    if (quality >= 3) setKnown((k) => new Set([...k, card.id]));
    else              setKnown((k) => { const n = new Set(k); n.delete(card.id); return n; });
    setSession((s) => ({ reviewed: s.reviewed + 1, correct: s.correct + (quality >= 3 ? 1 : 0) }));
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  const progress = (known.size / cards.length) * 100;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 500, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>🃏 Flashcard SRS</h2>
        <span style={{ fontSize: 12, color: "#5a5a7a" }}>{known.size}/{cards.length} known</span>
      </div>

      {/* Progress */}
      <div style={{ height: 6, background: "#1a1a2a", borderRadius: 3, marginBottom: 6, overflow: "hidden" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "#22c55e", borderRadius: 3, transition: "width 0.4s" }} />
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#5a5a7a", marginBottom: 20 }}>
        <span>Reviewed: {session.reviewed}</span>
        <span>Correct: {session.correct}</span>
        <span>Acc: {session.reviewed > 0 ? Math.round((session.correct / session.reviewed) * 100) : 0}%</span>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped((f) => !f)}
        style={{ background: flipped ? "#0a1a2a" : "#0d0d18", border: `2px solid ${flipped ? "#6366f1" : "#1f1f2e"}`, borderRadius: 14, padding: "32px 24px", minHeight: 160, textAlign: "center", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: flipped ? "#6366f1" : "#5a5a7a", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>{flipped ? "✦ Answer" : "Question"}</div>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#e2e0f5", margin: 0 }}>{flipped ? card.a : card.q}</p>
        {!flipped && <p style={{ color: "#5a5a7a", fontSize: 11, marginTop: 16 }}>Tap to reveal answer</p>}
        {card.lastQ !== null && !flipped && (
          <span style={{ marginTop: 12, fontSize: 10, color: card.lastQ >= 3 ? "#22c55e" : "#ef4444" }}>
            {card.dueIn > 1 ? `Due in ${card.dueIn} days` : "Due now"}
          </span>
        )}
      </div>

      {/* Rating buttons */}
      {flipped && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            [1, "Blackout",   "#2a0a0a", "#ef4444"],
            [2, "Hard",       "#2a1a0a", "#f97316"],
            [3, "Good",       "#0a2a0a", "#22c55e"],
            [4, "Easy",       "#0a1a2a", "#6366f1"],
          ].map(([q, label, bg, color]) => (
            <button key={q} onClick={() => rate(q)}
              style={{ padding: "10px 6px", background: bg, border: `1px solid ${color}`, borderRadius: 8, color, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Card list */}
      <div style={{ marginTop: 16, maxHeight: 120, overflowY: "auto" }}>
        {cards.map((c) => (
          <div key={c.id} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 11, borderBottom: "1px solid #1f1f2e", alignItems: "center" }}>
            <span style={{ color: known.has(c.id) ? "#22c55e" : "#ef4444" }}>{known.has(c.id) ? "✓" : "○"}</span>
            <span style={{ flex: 1, color: "#5a5a7a" }}>{c.q}</span>
            {c.interval && <span style={{ color: "#5a5a7a", fontFamily: "monospace" }}>{c.interval}d</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
