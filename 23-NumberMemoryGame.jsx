import { useState, useEffect } from "react";

export default function NumberMemory() {
  const [level, setLevel]   = useState(1);
  const [seq, setSeq]       = useState("");
  const [phase, setPhase]   = useState("idle"); // idle | show | input | result
  const [input, setInput]   = useState("");
  const [correct, setCorrect] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const startLevel = (lvl) => {
    const digits = lvl + 2;
    const s = Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join("");
    setSeq(s); setInput(""); setPhase("show"); setLevel(lvl);
    setTimeout(() => setPhase("input"), digits * 600 + 300);
  };

  const check = () => {
    const ok = input === seq;
    setCorrect(ok);
    setPhase("result");
    if (ok && level > highScore) setHighScore(level);
    setTimeout(() => {
      if (ok) startLevel(level + 1);
      else    startLevel(1);
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5", textAlign: "center" }}>
      <h2 style={{ marginBottom: 8 }}>🎯 Number Memory Game</h2>
      <p style={{ color: "#5a5a7a", fontSize: 13, marginBottom: 20 }}>Memorize the number, then type it back!</p>

      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
        {[["Level", level, "#6366f1"], ["Digits", level + 2, "#e2e0f5"], ["Best", highScore, "#22c55e"]].map(([l, v, c]) => (
          <div key={l}>
            <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: "#5a5a7a" }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 12, padding: 32, marginBottom: 20, minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        {phase === "idle" && <p style={{ color: "#5a5a7a" }}>Press Start to play</p>}

        {phase === "show" && (
          <div style={{ fontFamily: "monospace", fontSize: Math.max(20, 40 - seq.length * 2), fontWeight: 800, letterSpacing: 8, color: "#6366f1" }}>
            {seq}
          </div>
        )}

        {phase === "input" && (
          <div style={{ width: "100%" }}>
            <p style={{ color: "#5a5a7a", fontSize: 12, marginBottom: 10 }}>What was the number?</p>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && check()}
              autoFocus inputMode="numeric" pattern="[0-9]*"
              style={{ width: "100%", background: "#1a1a2a", border: "1px solid #6366f1", borderRadius: 8, padding: 12, color: "#e2e0f5", fontSize: 22, fontFamily: "monospace", textAlign: "center", letterSpacing: 6, boxSizing: "border-box" }} />
          </div>
        )}

        {phase === "result" && (
          <div>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{correct ? "🎉" : "😞"}</div>
            <div style={{ fontFamily: "monospace", fontSize: 22, color: correct ? "#22c55e" : "#ef4444", marginBottom: 6 }}>{seq}</div>
            <p style={{ color: "#5a5a7a", fontSize: 12 }}>{correct ? `Level ${level + 1} coming up!` : "Back to Level 1…"}</p>
          </div>
        )}
      </div>

      {(phase === "idle" || phase === "result") && (
        <button onClick={() => startLevel(phase === "idle" ? 1 : level)}
          style={{ padding: "12px 32px", background: "#6366f1", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          {phase === "idle" ? "Start Game" : "Continue"}
        </button>
      )}
      {phase === "input" && (
        <button onClick={check}
          style={{ padding: "12px 32px", background: "#6366f1", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          Submit ✓
        </button>
      )}
    </div>
  );
}
