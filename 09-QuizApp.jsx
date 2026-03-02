import { useState } from "react";

const QUESTIONS = [
  { q: "What hook replaces componentDidMount?",        opts: ["useEffect", "useState", "useRef", "useMemo"],     correct: 0 },
  { q: "Which is NOT a React lifecycle phase?",        opts: ["Mounting", "Compiling", "Updating", "Unmounting"], correct: 1 },
  { q: "What does useCallback return?",                opts: ["A value", "A memoized fn", "A ref", "A reducer"],  correct: 1 },
  { q: "Which hook reads from Context?",               opts: ["useContext", "useStore", "useGlobal", "useProp"],  correct: 0 },
  { q: "What is the second arg of useEffect?",         opts: ["Cleanup fn", "Dep array", "Initial state", "Ref"],correct: 1 },
  { q: "Which method triggers a re-render?",           opts: ["setState", "forceRender", "rerender", "refresh"], correct: 0 },
];

export default function QuizApp() {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === QUESTIONS[qi].correct) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      if (qi + 1 >= QUESTIONS.length) setDone(true);
      else setQi((q) => q + 1);
    }, 1000);
  };

  const reset = () => { setQi(0); setScore(0); setPicked(null); setDone(false); };

  if (done) return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 420, margin: "40px auto", padding: 32, background: "#13131a", borderRadius: 16, color: "#e2e0f5", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>{score === QUESTIONS.length ? "🏆" : score >= 4 ? "🎉" : "📚"}</div>
      <div style={{ fontSize: 52, fontWeight: 800, color: score >= 4 ? "#22c55e" : "#eab308" }}>{score}/{QUESTIONS.length}</div>
      <p style={{ color: "#5a5a7a", marginTop: 8 }}>{score === QUESTIONS.length ? "Perfect score!" : score >= 4 ? "Great job!" : "Keep learning!"}</p>
      <button onClick={reset}
        style={{ marginTop: 20, padding: "10px 28px", background: "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>
        Retry Quiz
      </button>
    </div>
  );

  const q = QUESTIONS[qi];
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "#5a5a7a" }}>Question {qi + 1} / {QUESTIONS.length}</span>
        <span style={{ fontSize: 12, color: "#6366f1", fontWeight: 700 }}>Score: {score}</span>
      </div>

      <div style={{ height: 4, background: "#1a1a2a", borderRadius: 2, marginBottom: 20 }}>
        <div style={{ width: `${(qi / QUESTIONS.length) * 100}%`, height: "100%", background: "#6366f1", borderRadius: 2, transition: "width 0.3s" }} />
      </div>

      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, lineHeight: 1.5 }}>{q.q}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isWrong   = picked === i && !isCorrect;
          const bg     = picked === null ? "#1a1a2a" : isCorrect ? "#0a2a0a" : isWrong ? "#2a0a0a" : "#1a1a2a";
          const border = picked === null ? "#1f1f2e" : isCorrect ? "#22c55e" : isWrong ? "#ef4444" : "#1f1f2e";
          return (
            <button key={i} onClick={() => answer(i)}
              style={{ padding: "12px 16px", background: bg, border: `1px solid ${border}`, borderRadius: 8, color: "#e2e0f5", fontSize: 14, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ color: "#5a5a7a", marginRight: 10, fontFamily: "monospace" }}>{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
