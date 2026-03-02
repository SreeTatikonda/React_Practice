// ── 22: Stopwatch ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

export function Stopwatch() {
  const [ms, setMs]         = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps]     = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (running) ref.current = setInterval(() => setMs((m) => m + 10), 10);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);

  const fmt = (m) =>
    `${String(Math.floor(m / 60000)).padStart(2, "0")}:${String(Math.floor((m % 60000) / 1000)).padStart(2, "0")}.${String(Math.floor((m % 1000) / 10)).padStart(2, "0")}`;

  const reset = () => { setMs(0); setRunning(false); setLaps([]); };
  const best  = laps.length ? Math.min(...laps) : null;
  const worst = laps.length ? Math.max(...laps) : null;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5", textAlign: "center" }}>
      <h2 style={{ marginBottom: 20 }}>⏱️ Stopwatch</h2>
      <div style={{ fontSize: 44, fontWeight: 800, fontFamily: "monospace", color: running ? "#22c55e" : "#e2e0f5", marginBottom: 20, transition: "color 0.3s" }}>{fmt(ms)}</div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
        <button onClick={() => setRunning((r) => !r)}
          style={{ padding: "10px 28px", background: running ? "#3f0a0a" : "#6366f1", border: `1px solid ${running ? "#ef4444" : "#6366f1"}`, borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>
          {running ? "Stop" : "Start"}
        </button>
        {running && (
          <button onClick={() => setLaps((l) => [...l, ms])}
            style={{ padding: "10px 16px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>Lap</button>
        )}
        {!running && ms > 0 && (
          <button onClick={reset}
            style={{ padding: "10px 16px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>Reset</button>
        )}
      </div>

      {laps.length > 0 && (
        <div style={{ maxHeight: 200, overflowY: "auto", textAlign: "left" }}>
          {laps.map((l, i) => {
            const isBest  = l === best;
            const isWorst = l === worst && laps.length > 1;
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 12px", fontSize: 13, fontFamily: "monospace", borderTop: "1px solid #1f1f2e" }}>
                <span style={{ color: "#5a5a7a" }}>Lap {i + 1}</span>
                <span style={{ color: isBest ? "#22c55e" : isWorst ? "#ef4444" : "#e2e0f5" }}>{fmt(l)}</span>
                {i > 0 && <span style={{ color: "#5a5a7a" }}>+{fmt(l - laps[i - 1])}</span>}
                {isBest  && <span style={{ color: "#22c55e", fontSize: 10 }}>BEST</span>}
                {isWorst && <span style={{ color: "#ef4444", fontSize: 10 }}>WORST</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Stopwatch;
