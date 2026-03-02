import { useState } from "react";

// ── Project 11: Weather Widget ─────────────────────────────────────────────────
const WEATHER = {
  "New York": { temp: 22, feels: 20, humidity: 65, wind: 14, icon: "⛅", desc: "Partly Cloudy" },
  "London":   { temp: 14, feels: 12, humidity: 78, wind: 22, icon: "🌧️", desc: "Light Rain" },
  "Tokyo":    { temp: 28, feels: 30, humidity: 72, wind: 8,  icon: "☀️", desc: "Sunny" },
  "Mumbai":   { temp: 34, feels: 38, humidity: 88, wind: 12, icon: "🌤️", desc: "Humid & Warm" },
  "Ames":     { temp: 8,  feels: 4,  humidity: 55, wind: 18, icon: "🌬️", desc: "Windy & Cool" },
};

export function WeatherWidget() {
  const [city, setCity] = useState("Ames");
  const [unit, setUnit] = useState("C");
  const w = WEATHER[city];
  const conv = (t) => unit === "C" ? t : Math.round(t * 9 / 5 + 32);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 360, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>🌤️ Weather Widget</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <select value={city} onChange={(e) => setCity(e.target.value)}
          style={{ flex: 1, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "8px 12px", color: "#e2e0f5", fontSize: 13 }}>
          {Object.keys(WEATHER).map((c) => <option key={c}>{c}</option>)}
        </select>
        <button onClick={() => setUnit((u) => u === "C" ? "F" : "C")}
          style={{ padding: "8px 14px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#e2e0f5", fontWeight: 700, cursor: "pointer" }}>°{unit}</button>
      </div>
      <div style={{ background: "linear-gradient(135deg,#111130,#1a0a2e)", borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 56 }}>{w.icon}</div>
        <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}>{conv(w.temp)}°{unit}</div>
        <div style={{ color: "#8888aa", marginTop: 4 }}>{w.desc}</div>
        <div style={{ color: "#5a5a7a", fontSize: 13 }}>Feels like {conv(w.feels)}°{unit}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[["💧 Humidity", `${w.humidity}%`], ["💨 Wind", `${w.wind} km/h`]].map(([l, v]) => (
          <div key={l} style={{ background: "#111120", border: "1px solid #1f1f2e", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, color: "#5a5a7a" }}>{l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeatherWidget;
