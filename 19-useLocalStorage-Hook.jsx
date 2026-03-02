import { useState } from "react";

// ── Custom Hook ────────────────────────────────────────────────────────────────
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("useLocalStorage error:", error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn("useLocalStorage error:", error);
    }
  };

  return [storedValue, setValue, removeValue];
}

// ── Demo App ───────────────────────────────────────────────────────────────────
export default function LocalStorageDemo() {
  const [name,  setName,  removeName]  = useLocalStorage("demo-name",  "");
  const [color, setColor, removeColor] = useLocalStorage("demo-color", "#6366f1");
  const [count, setCount, removeCount] = useLocalStorage("demo-count", 0);

  const clearAll = () => { removeName(); removeColor(); removeCount(); };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 460, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 6 }}>💾 useLocalStorage Hook</h2>
      <p style={{ color: "#5a5a7a", fontSize: 13, marginBottom: 20 }}>Values persist across page refreshes. Refresh the page to verify!</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, color: "#5a5a7a", display: "block", marginBottom: 4 }}>Your Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name..."
            style={{ width: "100%", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "10px 12px", color: "#e2e0f5", fontSize: 14, boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#5a5a7a", display: "block", marginBottom: 4 }}>Accent Color</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
              style={{ width: 48, height: 42, border: "1px solid #1f1f2e", borderRadius: 8, background: "transparent", cursor: "pointer" }} />
            <span style={{ fontSize: 13, color: "#5a5a7a", fontFamily: "monospace" }}>{color}</span>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#5a5a7a", display: "block", marginBottom: 4 }}>Persistent Counter</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setCount((c) => c - 1)}
              style={{ padding: "8px 16px", background: "#2a1a1a", border: "1px solid #aa3333", borderRadius: 8, color: "#ef4444", fontWeight: 700, cursor: "pointer" }}>−</button>
            <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "monospace", flex: 1, textAlign: "center", color }}>{count}</span>
            <button onClick={() => setCount((c) => c + 1)}
              style={{ padding: "8px 16px", background: "#1a2a1a", border: "1px solid #336633", borderRadius: 8, color: "#22c55e", fontWeight: 700, cursor: "pointer" }}>+</button>
          </div>
        </div>
      </div>

      {name && (
        <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 12, padding: "14px 18px", textAlign: "center", marginBottom: 16 }}>
          <span style={{ color, fontWeight: 700, fontSize: 16 }}>Hello, {name}! 👋</span>
        </div>
      )}

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 11, color: "#5a5a7a", marginBottom: 12 }}>
        <div>localStorage["demo-name"]  → <span style={{ color: "#a5b4fc" }}>"{name}"</span></div>
        <div>localStorage["demo-color"] → <span style={{ color: "#a5b4fc" }}>"{color}"</span></div>
        <div>localStorage["demo-count"] → <span style={{ color: "#a5b4fc" }}>{count}</span></div>
      </div>

      <button onClick={clearAll}
        style={{ width: "100%", padding: 10, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer", fontSize: 13 }}>
        🗑 Clear All Storage
      </button>
    </div>
  );
}
