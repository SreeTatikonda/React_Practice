import { useState } from "react";

const PRESETS = [
  { label: "Email",    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL",      pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z]{2,6}", flags: "gi" },
  { label: "Phone",    pattern: "\\+?[\\d\\s\\-().]{7,}", flags: "g" },
  { label: "Hashtag",  pattern: "#[a-zA-Z]\\w*", flags: "g" },
  { label: "PascalCase", pattern: "\\b[A-Z][a-z]+(?:[A-Z][a-z]+)*\\b", flags: "g" },
  { label: "Numbers",  pattern: "-?\\d+(\\.\\d+)?", flags: "g" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b[A-Z][a-z]+\\b");
  const [flags, setFlags]     = useState("g");
  const [text, setText]       = useState(
    "Hello World! React is Amazing.\nContact us at hello@example.com or +1-555-0123.\nVisit https://react.dev for docs.\n#ReactJS #TypeScript are trending."
  );
  const [error, setError] = useState(null);

  let regex = null, matches = [];
  try {
    regex = new RegExp(pattern, flags);
    matches = [...text.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))];
    if (error) setError(null);
  } catch (e) {
    if (!error) setError(e.message);
  }

  const highlight = () => {
    if (!regex || error) return <span style={{ color: "#e2e0f5" }}>{text}</span>;
    try {
      const safeFlags = flags.includes("g") ? flags : flags + "g";
      const parts = [];
      let last = 0;
      const r = new RegExp(pattern, safeFlags);
      let m;
      while ((m = r.exec(text)) !== null) {
        if (m.index > last) parts.push(<span key={last}>{text.slice(last, m.index)}</span>);
        parts.push(<mark key={m.index} style={{ background: "rgba(99,102,241,0.35)", color: "#e2e0f5", borderRadius: 2, padding: "0 1px" }}>{m[0]}</mark>);
        last = m.index + m[0].length;
        if (m[0].length === 0) { r.lastIndex++; }
      }
      parts.push(<span key={last}>{text.slice(last)}</span>);
      return parts;
    } catch { return <span>{text}</span>; }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 680, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>🔎 Regex Tester</h2>

      {/* Presets */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => { setPattern(p.pattern); setFlags(p.flags); setError(null); }}
            style={{ padding: "4px 10px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 6, color: "#6366f1", fontSize: 12, cursor: "pointer" }}>{p.label}</button>
        ))}
      </div>

      {/* Regex input */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#1a1a2a", border: `1px solid ${error ? "#ef4444" : "#6366f1"}`, borderRadius: 8, padding: "0 12px" }}>
          <span style={{ color: "#5a5a7a", fontFamily: "monospace", marginRight: 4, fontSize: 18 }}>/</span>
          <input value={pattern} onChange={(e) => { setPattern(e.target.value); setError(null); }}
            style={{ flex: 1, background: "transparent", border: "none", color: "#a5b4fc", fontSize: 14, fontFamily: "monospace", outline: "none", padding: "10px 0" }} />
          <span style={{ color: "#5a5a7a", fontFamily: "monospace", marginLeft: 4, fontSize: 18 }}>/</span>
        </div>
        <input value={flags} onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, "").slice(0, 6))}
          placeholder="flags" maxLength={6}
          style={{ width: 64, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "10px", color: "#5a5a7a", fontSize: 14, fontFamily: "monospace", textAlign: "center" }} />
      </div>

      {error && <div style={{ background: "#2a0a0a", border: "1px solid #ef4444", borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "#ef4444", marginBottom: 10 }}>⚠ {error}</div>}

      {/* Text area */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 11, color: "#5a5a7a", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Test String</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, color: "#e2e0f5", fontSize: 13, resize: "none", height: 100, fontFamily: "monospace", boxSizing: "border-box" }} />
      </div>

      {/* Highlighted output */}
      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, fontSize: 13, fontFamily: "monospace", lineHeight: 1.8, whiteSpace: "pre-wrap", marginBottom: 12, minHeight: 80 }}>
        {highlight()}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <div style={{ background: matches.length > 0 ? "#0a2a0a" : "#1a1a2a", border: `1px solid ${matches.length > 0 ? "#22c55e" : "#1f1f2e"}`, borderRadius: 6, padding: "6px 14px", fontSize: 13 }}>
          <span style={{ color: matches.length > 0 ? "#22c55e" : "#5a5a7a", fontWeight: 700 }}>{matches.length} match{matches.length !== 1 ? "es" : ""}</span>
        </div>
        {matches.slice(0, 6).map((m, i) => (
          <div key={i} style={{ background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#a5b4fc", fontFamily: "monospace", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            "{m[0]}"
          </div>
        ))}
        {matches.length > 6 && <span style={{ fontSize: 12, color: "#5a5a7a", alignSelf: "center" }}>+{matches.length - 6} more</span>}
      </div>

      {/* Groups */}
      {matches.length > 0 && matches[0].length > 1 && (
        <div style={{ marginTop: 10, background: "#0d0d18", borderRadius: 8, padding: 10, fontSize: 12 }}>
          <p style={{ color: "#5a5a7a", marginBottom: 6 }}>Capture Groups (first match):</p>
          {[...matches[0]].slice(1).map((g, i) => g && (
            <div key={i} style={{ color: "#fbbf24" }}>Group {i + 1}: "{g}"</div>
          ))}
        </div>
      )}
    </div>
  );
}
