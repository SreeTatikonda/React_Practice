import { useState, useEffect } from "react";

const DATA = [
  "Apple","Apricot","Avocado","Banana","Blueberry","Cherry","Coconut",
  "Dragonfruit","Fig","Grape","Guava","Jackfruit","Kiwi","Lemon","Lime",
  "Lychee","Mango","Melon","Orange","Papaya","Peach","Pear","Pineapple",
  "Plum","Pomegranate","Raspberry","Starfruit","Strawberry","Watermelon","Yuzu",
];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function DebounceSearch() {
  const [query, setQuery]         = useState("");
  const [rawCalls, setRawCalls]   = useState(0);
  const [debCalls, setDebCalls]   = useState(0);
  const debounced = useDebounce(query, 400);

  useEffect(() => { if (query) setRawCalls((c) => c + 1); }, [query]);
  useEffect(() => { if (debounced) setDebCalls((c) => c + 1); }, [debounced]);

  const results = DATA.filter((d) => d.toLowerCase().includes(debounced.toLowerCase()));
  const saved   = Math.max(0, rawCalls - debCalls);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 6 }}>🔍 Debounce Search</h2>
      <p style={{ color: "#5a5a7a", fontSize: 13, marginBottom: 16 }}>400ms debounce — avoids API call on every keystroke</p>

      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search fruits..."
        style={{ width: "100%", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "10px 14px", color: "#e2e0f5", fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[["Raw calls", rawCalls, "#f97316"], ["API calls", debCalls, "#6366f1"], ["Saved", saved, "#22c55e"]].map(([l, v, c]) => (
          <div key={l} style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: c, fontFamily: "monospace" }}>{v}</div>
            <div style={{ fontSize: 11, color: "#5a5a7a", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 10, maxHeight: 220, overflowY: "auto" }}>
        {query === "" ? (
          <p style={{ color: "#5a5a7a", fontSize: 13, textAlign: "center", padding: 12 }}>Start typing to search…</p>
        ) : results.length === 0 ? (
          <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", padding: 12 }}>No results for "{debounced}"</p>
        ) : results.map((f) => (
          <div key={f} style={{ padding: "7px 8px", fontSize: 14, borderBottom: "1px solid #1f1f2e" }}>
            {f.split(new RegExp(`(${debounced})`, "gi")).map((part, i) =>
              part.toLowerCase() === debounced.toLowerCase()
                ? <mark key={i} style={{ background: "rgba(99,102,241,0.35)", color: "#e2e0f5", borderRadius: 2, padding: "0 1px" }}>{part}</mark>
                : <span key={i}>{part}</span>
            )}
          </div>
        ))}
      </div>
      {results.length > 0 && query && (
        <p style={{ fontSize: 12, color: "#5a5a7a", marginTop: 8 }}>{results.length} result{results.length !== 1 ? "s" : ""}</p>
      )}
    </div>
  );
}
