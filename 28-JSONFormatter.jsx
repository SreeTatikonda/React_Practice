import { useState } from "react";

function syntaxHighlight(json) {
  return json
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = "number";
      if (/^"/.test(match)) cls = /:$/.test(match) ? "key" : "string";
      else if (/true|false/.test(match)) cls = "boolean";
      else if (/null/.test(match)) cls = "null";
      const colors = { key: "#a5b4fc", string: "#86efac", number: "#fca5a5", boolean: "#fbbf24", null: "#94a3b8" };
      return `<span style="color:${colors[cls]}">${match}</span>`;
    });
}

const EXAMPLES = {
  User: '{"name":"Yashu Mittal","role":"MCS Student","skills":["React","RAG","PyTorch"],"gpa":3.9,"university":"Iowa State"}',
  API:  '{"status":200,"data":{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}],"total":2,"page":1}}',
  Flat: '{"x":1,"y":2,"z":3,"active":true,"label":null,"tags":["a","b"]}',
};

export default function JSONFormatter() {
  const [raw, setRaw]         = useState(EXAMPLES.User);
  const [formatted, setFormatted] = useState("");
  const [error, setError]     = useState(null);
  const [indent, setIndent]   = useState(2);
  const [copied, setCopied]   = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(raw);
      setFormatted(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (e) { setError(e.message); setFormatted(""); }
  };

  const minify = () => {
    try {
      setRaw(JSON.stringify(JSON.parse(raw)));
      setFormatted(""); setError(null);
    } catch (e) { setError(e.message); }
  };

  const validate = () => {
    try { JSON.parse(raw); setError(null); alert("✅ Valid JSON!"); }
    catch (e) { setError(e.message); }
  };

  const copy = () => {
    navigator.clipboard?.writeText(formatted || raw);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  const stats = (() => {
    try {
      const p = JSON.parse(raw);
      const keys = (o) => typeof o === "object" && o !== null ? Object.keys(o).length + Object.values(o).reduce((s, v) => s + keys(v), 0) : 0;
      return { valid: true, keys: keys(p), bytes: new Blob([raw]).size };
    } catch { return { valid: false, keys: 0, bytes: 0 }; }
  })();

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>{"{}"} JSON Formatter</h2>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#5a5a7a" }}>Indent:</span>
          {[2, 4].map((n) => (
            <button key={n} onClick={() => setIndent(n)}
              style={{ padding: "3px 8px", background: indent === n ? "#6366f1" : "#1a1a2a", border: `1px solid ${indent === n ? "#6366f1" : "#1f1f2e"}`, borderRadius: 4, color: "#e2e0f5", fontSize: 12, cursor: "pointer" }}>{n}</button>
          ))}
        </div>
      </div>

      {/* Example buttons */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#5a5a7a", alignSelf: "center" }}>Examples:</span>
        {Object.keys(EXAMPLES).map((k) => (
          <button key={k} onClick={() => { setRaw(EXAMPLES[k]); setFormatted(""); setError(null); }}
            style={{ padding: "4px 10px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 6, color: "#6366f1", fontSize: 12, cursor: "pointer" }}>{k}</button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button onClick={format}
          style={{ flex: 1, padding: 10, background: "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>Format ↕</button>
        <button onClick={minify}
          style={{ flex: 1, padding: 10, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>Minify →</button>
        <button onClick={validate}
          style={{ flex: 1, padding: 10, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>Validate ✓</button>
        <button onClick={copy}
          style={{ padding: "10px 16px", background: copied ? "#22c55e" : "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: copied ? "#fff" : "#5a5a7a", cursor: "pointer", transition: "all 0.2s" }}>
          {copied ? "✓" : "📋"}
        </button>
      </div>

      {error && (
        <div style={{ background: "#2a0a0a", border: "1px solid #ef4444", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#ef4444", marginBottom: 10 }}>
          ⚠ Parse error: {error}
        </div>
      )}

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 12, color: "#5a5a7a" }}>
        <span style={{ color: stats.valid ? "#22c55e" : "#ef4444" }}>{stats.valid ? "✓ Valid" : "✗ Invalid"}</span>
        <span>Keys: {stats.keys}</span>
        <span>Size: {stats.bytes} bytes</span>
        <span>Chars: {raw.length}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <p style={{ fontSize: 11, color: "#5a5a7a", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Input</p>
          <textarea value={raw} onChange={(e) => { setRaw(e.target.value); setFormatted(""); setError(null); }}
            style={{ width: "100%", background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 10, color: "#e2e0f5", fontSize: 12, fontFamily: "monospace", resize: "none", height: 280, boxSizing: "border-box" }} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#5a5a7a", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Formatted Output</p>
          <div style={{ background: "#0a1a0a", border: "1px solid #1f1f2e", borderRadius: 8, padding: 10, height: 280, overflow: "auto" }}>
            {formatted
              ? <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: syntaxHighlight(formatted) }} />
              : <p style={{ color: "#5a5a7a", fontSize: 12, margin: 0 }}>Press Format to see output</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
