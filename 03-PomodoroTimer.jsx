import { useState, useEffect, useRef } from "react";

const PRESETS = { work: [25, 0], short: [5, 0], long: [15, 0] };

export default function PomodoroTimer() {
  const [mins, setMins] = useState(25);
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [sessions, setSessions] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSecs((s) => {
          if (s > 0) return s - 1;
          setMins((m) => {
            if (m > 0) return m - 1;
            setRunning(false);
            if (mode === "work") setSessions((n) => n + 1);
            clearInterval(ref.current);
            return 0;
          });
          return 59;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current);
  }, [running, mode]);

  const setPreset = (m) => { setMode(m); setMins(PRESETS[m][0]); setSecs(0); setRunning(false); };

  const total = mode === "work" ? 25 * 60 : mode === "short" ? 5 * 60 : 15 * 60;
  const pct = 1 - (mins * 60 + secs) / total;
  const r = 54, circ = 2 * Math.PI * r;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 360, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5", textAlign: "center" }}>
      <h2 style={{ marginBottom: 16 }}>🍅 Pomodoro Timer</h2>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
        {Object.keys(PRESETS).map((m) => (
          <button key={m} onClick={() => setPreset(m)}
            style={{ padding: "4px 14px", background: mode === m ? "#6366f1" : "#1a1a2a", border: `1px solid ${mode === m ? "#6366f1" : "#1f1f2e"}`, borderRadius: 20, color: "#e2e0f5", fontSize: 12, fontWeight: mode === m ? 700 : 400, cursor: "pointer" }}>
            {m === "work" ? "Focus" : m === "short" ? "Short" : "Long"}
          </button>
        ))}
      </div>

      <svg width={130} height={130} style={{ display: "block", margin: "0 auto" }}>
        <circle cx={65} cy={65} r={r} fill="none" stroke="#1a1a2a" strokeWidth={8} />
        <circle cx={65} cy={65} r={r} fill="none" stroke={mode === "work" ? "#6366f1" : "#22c55e"} strokeWidth={8}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
          transform="rotate(-90 65 65)" style={{ transition: "stroke-dashoffset 0.5s" }} />
        <text x={65} y={60} textAnchor="middle" fill="#e2e0f5" fontSize={22} fontWeight={700} fontFamily="monospace">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </text>
        <text x={65} y={78} textAnchor="middle" fill="#5a5a7a" fontSize={10}>{mode.toUpperCase()}</text>
      </svg>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "16px 0" }}>
        <button onClick={() => setRunning((r) => !r)}
          style={{ padding: "10px 28px", background: running ? "#3f0a0a" : "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setRunning(false); setPreset(mode); }}
          style={{ padding: "10px 16px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>↺</button>
      </div>
      <p style={{ color: "#5a5a7a", fontSize: 13 }}>🍅 Sessions completed: <strong style={{ color: "#e2e0f5" }}>{sessions}</strong></p>
    </div>
  );
}
