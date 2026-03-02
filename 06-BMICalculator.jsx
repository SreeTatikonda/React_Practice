import { useState } from "react";

export default function BMICalc() {
  const [h, setH] = useState(175);
  const [w, setW] = useState(70);

  const bmi = (w / (h / 100) ** 2).toFixed(1);
  const cat =
    bmi < 18.5 ? "Underweight" :
    bmi < 25   ? "Normal" :
    bmi < 30   ? "Overweight" :
                 "Obese";
  const catColor = { Underweight: "#60a5fa", Normal: "#22c55e", Overweight: "#eab308", Obese: "#ef4444" }[cat];
  const pct = Math.min(100, ((bmi - 10) / 30) * 100);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 20 }}>⚖️ BMI Calculator</h2>

      {[["Height (cm)", h, setH, 100, 250], ["Weight (kg)", w, setW, 30, 200]].map(([label, val, set, min, max]) => (
        <div key={label} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: "#5a5a7a" }}>{label}</span>
            <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "monospace" }}>{val}</span>
          </div>
          <input type="range" min={min} max={max} value={val} onChange={(e) => set(+e.target.value)}
            style={{ width: "100%", accentColor: "#6366f1" }} />
        </div>
      ))}

      <div style={{ background: "#0d0d18", border: `1px solid ${catColor}44`, borderRadius: 12, padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: catColor, lineHeight: 1 }}>{bmi}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: catColor, marginTop: 6 }}>{cat}</div>

        <div style={{ marginTop: 16, height: 8, background: "#1a1a2a", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#60a5fa,#22c55e,#eab308,#ef4444)", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#5a5a7a", marginTop: 4 }}>
          <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
        {[["Underweight", "< 18.5"], ["Normal", "18.5–24.9"], ["Overweight", "25–29.9"], ["Obese", "≥ 30"]].map(([c, r]) => (
          <div key={c} style={{ background: cat === c ? `${catColor}20` : "#0d0d18", border: `1px solid ${cat === c ? catColor : "#1f1f2e"}`, borderRadius: 8, padding: "6px 10px", fontSize: 11 }}>
            <span style={{ color: { Underweight: "#60a5fa", Normal: "#22c55e", Overweight: "#eab308", Obese: "#ef4444" }[c] }}>{c}</span>
            <span style={{ color: "#5a5a7a", marginLeft: 6 }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
