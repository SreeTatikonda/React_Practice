import { useState, useEffect, useCallback } from "react";

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const sets = [
      opts.upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      opts.lower ? "abcdefghijklmnopqrstuvwxyz" : "",
      opts.nums  ? "0123456789" : "",
      opts.syms  ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "",
    ].filter(Boolean).join("");
    if (!sets) { setPw("Select at least one option"); return; }
    setPw(Array.from({ length: len }, () => sets[Math.floor(Math.random() * sets.length)]).join(""));
  }, [len, opts]);

  useEffect(() => { generate(); }, [generate]);

  const copy = () => { navigator.clipboard?.writeText(pw); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const strength = [opts.upper, opts.lower, opts.nums, opts.syms].filter(Boolean).length;
  const sColor = ["", "#ef4444", "#eab308", "#22c55e", "#22c55e"][strength];
  const sLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 420, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 20 }}>🔐 Password Generator</h2>

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ flex: 1, fontFamily: "monospace", fontSize: 14, wordBreak: "break-all" }}>{pw}</span>
        <button onClick={copy}
          style={{ background: copied ? "#22c55e" : "#6366f1", border: "none", borderRadius: 6, padding: "8px 14px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: "#5a5a7a" }}>Length</span>
          <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{len}</span>
        </div>
        <input type="range" min={6} max={64} value={len} onChange={(e) => setLen(+e.target.value)} style={{ width: "100%", accentColor: "#6366f1" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[["upper", "A–Z  Uppercase"], ["lower", "a–z  Lowercase"], ["nums", "0–9  Numbers"], ["syms", "!@#  Symbols"]].map(([k, l]) => (
          <label key={k}
            style={{ display: "flex", alignItems: "center", gap: 8, background: opts[k] ? "#1a1a2e" : "#0d0d18", border: `1px solid ${opts[k] ? "#6366f1" : "#1f1f2e"}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 13, userSelect: "none" }}>
            <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))} style={{ accentColor: "#6366f1" }} />
            {l}
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={generate}
          style={{ flex: 1, padding: 12, background: "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>
          ↺ Regenerate
        </button>
        <span style={{ fontWeight: 700, color: sColor, minWidth: 50 }}>{sLabel}</span>
      </div>
    </div>
  );
}
