import { useState } from "react";

const PROFILE = {
  name: "Yashu Mittal",
  handle: "yashu-mittal",
  bio: "MCS @ Iowa State | AI/ML | RAG Systems | Building cool things",
  avatar: "🧑‍💻",
  location: "Ames, Iowa",
  company: "CDS Global (Intern)",
};

const STATS = [
  { label: "Repositories", value: 42,  icon: "📁", trend: "+3 this month", color: "#6366f1" },
  { label: "Total Stars",  value: 234, icon: "⭐", trend: "+18 this week",  color: "#eab308" },
  { label: "Commits",      value: 847, icon: "📈", trend: "Streak: 12d",    color: "#22c55e" },
  { label: "PRs Merged",   value: 56,  icon: "🔀", trend: "4 open",         color: "#06b6d4" },
  { label: "Issues",       value: 112, icon: "✅", trend: "3 open",          color: "#f97316" },
  { label: "Followers",    value: 89,  icon: "👥", trend: "+7 this week",   color: "#a855f7" },
];

const LANGS = [
  { name: "Python",     pct: 38, color: "#3776ab" },
  { name: "JavaScript", pct: 25, color: "#f7df1e" },
  { name: "TypeScript", pct: 18, color: "#3178c6" },
  { name: "Java",       pct: 10, color: "#f89820" },
  { name: "C#",         pct: 6,  color: "#68217a" },
  { name: "Other",      pct: 3,  color: "#5a5a7a" },
];

const REPOS = [
  { name: "ai-tutoring-system",    stars: 48, lang: "Python",     desc: "RAG-based AI tutoring with 94% citation accuracy" },
  { name: "rag-document-qa",       stars: 35, lang: "Python",     desc: "Document Q&A using ChromaDB + LLaMA" },
  { name: "ecommerce-dotnet",      stars: 22, lang: "C#",         desc: "Full-stack .NET e-commerce platform" },
  { name: "mood-music-recommender",stars: 19, lang: "JavaScript", desc: "Emotion-based song recommender" },
];

const HEATMAP = Array.from({ length: 52 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ({ week: w, day: d, count: Math.random() > 0.5 ? Math.floor(Math.random() * 8) : 0 }))
);

function heatColor(c) {
  if (c === 0) return "#161b22";
  if (c < 3)  return "#0e4429";
  if (c < 6)  return "#006d32";
  return "#26a641";
}

export default function GitHubStats() {
  const [activeRepo, setActiveRepo] = useState(null);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "40px auto", padding: 24, background: "#0d1117", borderRadius: 16, color: "#e6edf3" }}>
      {/* Profile */}
      <div style={{ display: "flex", gap: 20, marginBottom: 24, padding: 20, background: "#161b22", borderRadius: 12, border: "1px solid #30363d" }}>
        <div style={{ fontSize: 60, lineHeight: 1 }}>{PROFILE.avatar}</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{PROFILE.name}</h2>
          <p style={{ color: "#8b949e", margin: "2px 0", fontFamily: "monospace" }}>@{PROFILE.handle}</p>
          <p style={{ fontSize: 13, color: "#c9d1d9", margin: "8px 0 6px" }}>{PROFILE.bio}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#8b949e" }}>
            <span>📍 {PROFILE.location}</span>
            <span>🏢 {PROFILE.company}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "monospace" }}>{s.value}</span>
            </div>
            <div style={{ fontSize: 12, color: "#8b949e", marginTop: 3 }}>{s.label}</div>
            <div style={{ fontSize: 10, color: "#22c55e", marginTop: 2 }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#8b949e" }}>TOP LANGUAGES</h3>
        <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
          {LANGS.map((l) => <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} title={`${l.name}: ${l.pct}%`} />)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {LANGS.map((l) => (
            <span key={l.name} style={{ fontSize: 12, color: "#c9d1d9", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, display: "inline-block" }} />
              {l.name} <span style={{ color: "#8b949e" }}>{l.pct}%</span>
            </span>
          ))}
        </div>
      </div>

      {/* Contribution Heatmap */}
      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 10, padding: 16, marginBottom: 16, overflowX: "auto" }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#8b949e" }}>CONTRIBUTION ACTIVITY</h3>
        <div style={{ display: "flex", gap: 2 }}>
          {HEATMAP.map((week, w) => (
            <div key={w} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {week.map((day, d) => (
                <div key={d} title={`${day.count} contributions`}
                  style={{ width: 10, height: 10, borderRadius: 2, background: heatColor(day.count) }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Top Repos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {REPOS.map((r) => (
          <div key={r.name} onClick={() => setActiveRepo(activeRepo === r.name ? null : r.name)}
            style={{ background: "#161b22", border: `1px solid ${activeRepo === r.name ? "#6366f1" : "#30363d"}`, borderRadius: 10, padding: 14, cursor: "pointer", transition: "border-color 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1" }}>📦 {r.name}</span>
              <span style={{ fontSize: 12, color: "#eab308" }}>⭐ {r.stars}</span>
            </div>
            <p style={{ fontSize: 11, color: "#8b949e", lineHeight: 1.4, margin: 0 }}>{r.desc}</p>
            <span style={{ fontSize: 10, color: "#c9d1d9", marginTop: 6, display: "block" }}>{r.lang}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
