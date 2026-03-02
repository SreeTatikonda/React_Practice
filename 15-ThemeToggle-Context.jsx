import { useState, createContext, useContext } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const theme = {
    dark,
    toggle: () => setDark((d) => !d),
    bg:     dark ? "#0d0d12"  : "#f0f0f8",
    card:   dark ? "#13131a"  : "#ffffff",
    card2:  dark ? "#1a1a2a"  : "#f4f4fc",
    border: dark ? "#1f1f2e"  : "#ddddf0",
    text:   dark ? "#e2e0f5"  : "#1a1a2a",
    muted:  dark ? "#5a5a7a"  : "#8888aa",
    accent: "#6366f1",
  };
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

function useTheme() { return useContext(ThemeContext); }

function Card({ children, style }) {
  const t = useTheme();
  return (
    <div style={{ background: t.card2, border: `1px solid ${t.border}`, borderRadius: 10, padding: 16, ...style }}>
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", onClick }) {
  const t = useTheme();
  const styles = {
    primary:   { background: t.accent, color: "#fff", border: "none" },
    secondary: { background: "transparent", color: t.text, border: `1px solid ${t.border}` },
    danger:    { background: "#ef444420", color: "#ef4444", border: "1px solid #ef444450" },
  };
  return (
    <button onClick={onClick}
      style={{ ...styles[variant], borderRadius: 8, padding: "9px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}

function DemoUI() {
  const t = useTheme();
  return (
    <div style={{ background: t.bg, minHeight: "100vh", padding: 32, fontFamily: "sans-serif", transition: "all 0.3s", color: t.text }}>
      {/* Nav */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: t.accent }}>MyApp</span>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary">Docs</Button>
          <Button variant="primary" onClick={t.toggle}>
            {t.dark ? "☀️ Light" : "🌙 Dark"} Mode
          </Button>
        </div>
      </div>

      {/* Hero */}
      <Card style={{ marginBottom: 24, textAlign: "center", padding: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: t.text }}>Theme Context Demo</h1>
        <p style={{ color: t.muted, fontSize: 14, marginBottom: 20 }}>Using React Context to propagate theme across the component tree.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Card>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {["useState", "useEffect", "useContext"].map((hook) => (
          <Card key={hook}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>⚛️</div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: t.accent }}>{hook}</h3>
            <p style={{ fontSize: 12, color: t.muted, lineHeight: 1.5 }}>Essential React hook for building modern components.</p>
          </Card>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: t.muted }}>Current theme: <strong style={{ color: t.accent }}>{t.dark ? "Dark" : "Light"}</strong></p>
    </div>
  );
}

export default function ThemeToggle() {
  return (
    <ThemeProvider>
      <DemoUI />
    </ThemeProvider>
  );
}
