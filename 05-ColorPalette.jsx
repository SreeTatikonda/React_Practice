import { useState } from "react";

const randHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
const genPalette = () => Array.from({ length: 5 }, randHex);

export default function ColorPalette() {
  const [colors, setColors] = useState(genPalette());
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [copied, setCopied] = useState(null);

  const regen = () => setColors((c) => c.map((v, i) => (locked[i] ? v : randHex())));
  const copy = (c) => { navigator.clipboard?.writeText(c); setCopied(c); setTimeout(() => setCopied(null), 1500); };
  const toggleLock = (i) => setLocked((l) => l.map((v, j) => (j === i ? !v : v)));

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 20 }}>🎨 Color Palette Generator</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {colors.map((c, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div onClick={() => copy(c)}
              style={{ height: 100, background: c, borderRadius: 10, cursor: "pointer", border: `3px solid ${copied === c ? "#fff" : "transparent"}`, transition: "border 0.2s", position: "relative" }}>
              {copied === c && (
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", borderRadius: 7, fontSize: 18, color: "#fff" }}>✓</span>
              )}
            </div>
            <p style={{ fontSize: 9, color: "#5a5a7a", fontFamily: "monospace", marginTop: 4, textAlign: "center" }}>{c}</p>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => toggleLock(i)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: locked[i] ? "#fff" : "#5a5a7a" }}>
                {locked[i] ? "🔒" : "🔓"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={regen}
          style={{ flex: 1, padding: 12, background: "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          ↺ Generate
        </button>
        <button onClick={() => copy(colors.join(", "))}
          style={{ padding: "12px 16px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>
          Copy All
        </button>
      </div>
      <p style={{ fontSize: 11, color: "#5a5a7a", marginTop: 10, textAlign: "center" }}>Click swatch to copy • 🔒 lock color • Space to regenerate</p>
    </div>
  );
}
