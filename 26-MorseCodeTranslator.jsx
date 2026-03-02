import { useState } from "react";

const MORSE = {
  A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",
  K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",
  U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....",
  "6":"-....","7":"--...","8":"---..","9":"----.",
  " ":"/",".".".-.-.-",",":",--..--","?":"..--..","!":"-.-.--",
};

const REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export default function MorseCode() {
  const [text, setText] = useState("HELLO REACT");
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState("encode"); // encode | decode

  const encoded = text.toUpperCase().split("").map((c) => MORSE[c] || "").join(" ");
  const decoded = text.split(" / ").map((word) =>
    word.split(" ").map((sym) => REVERSE[sym] || "?").join("")
  ).join(" ");

  const playMorse = async () => {
    if (!window.AudioContext && !window.webkitAudioContext) { alert("Web Audio not supported"); return; }
    setPlaying(true);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let t = ctx.currentTime;
    const DOT = 0.08, DASH = DOT * 3, GAP = DOT, CHAR_GAP = DOT * 3;

    for (const sym of encoded) {
      if (sym === "." || sym === "-") {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 700; g.gain.value = 0.3;
        o.start(t); o.stop(t + (sym === "." ? DOT : DASH));
        t += sym === "." ? DOT : DASH; t += GAP;
      } else if (sym === " ") { t += CHAR_GAP; }
      else if (sym === "/")   { t += CHAR_GAP * 2; }
    }
    setTimeout(() => { setPlaying(false); ctx.close(); }, (t - ctx.currentTime) * 1000 + 200);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 6 }}>📡 Morse Code Translator</h2>
      <p style={{ color: "#5a5a7a", fontSize: 13, marginBottom: 16 }}>Translate text ↔ morse code with audio playback</p>

      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["encode", "decode"].map((m) => (
          <button key={m} onClick={() => { setMode(m); setText(""); }}
            style={{ flex: 1, padding: 9, background: mode === m ? "#6366f1" : "#1a1a2a", border: `1px solid ${mode === m ? "#6366f1" : "#1f1f2e"}`, borderRadius: 8, color: "#e2e0f5", fontWeight: mode === m ? 700 : 400, cursor: "pointer" }}>
            {m === "encode" ? "Text → Morse" : "Morse → Text"}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: "#5a5a7a", display: "block", marginBottom: 4 }}>
          {mode === "encode" ? "Input Text" : "Input Morse (use space between symbols, / between words)"}
        </label>
        <textarea value={text} onChange={(e) => setText(mode === "encode" ? e.target.value.toUpperCase() : e.target.value)}
          placeholder={mode === "encode" ? "Type text here..." : ".- / -... / -.-. ..."}
          style={{ width: "100%", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, color: "#e2e0f5", fontSize: 14, fontFamily: "monospace", resize: "none", height: 70, boxSizing: "border-box" }} />
      </div>

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <p style={{ fontSize: 11, color: "#5a5a7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
          {mode === "encode" ? "Morse Output" : "Text Output"}
        </p>
        <p style={{ fontFamily: "monospace", fontSize: mode === "encode" ? 15 : 20, color: "#6366f1", wordBreak: "break-all", lineHeight: 1.8 }}>
          {mode === "encode" ? (encoded || "—") : (decoded || "—")}
        </p>
      </div>

      {mode === "encode" && (
        <button onClick={playMorse} disabled={playing || !text}
          style={{ width: "100%", padding: 12, background: playing ? "#1a1a2a" : "#6366f1", border: "none", borderRadius: 8, color: playing ? "#5a5a7a" : "#fff", fontWeight: 700, cursor: playing ? "not-allowed" : "pointer", fontSize: 15, transition: "all 0.2s" }}>
          {playing ? "🔊 Playing..." : "▶ Play as Audio"}
        </button>
      )}

      <div style={{ marginTop: 14 }}>
        <p style={{ fontSize: 11, color: "#5a5a7a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Reference Chart</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxHeight: 80, overflowY: "auto" }}>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("").map((c) => (
            <span key={c} style={{ fontSize: 10, fontFamily: "monospace", color: "#5a5a7a", background: "#1a1a2a", borderRadius: 3, padding: "2px 5px" }}>
              {c}:{MORSE[c]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
