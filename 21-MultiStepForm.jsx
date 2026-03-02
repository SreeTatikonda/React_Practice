import { useState } from "react";

const STEPS = [
  { title: "Personal Info",  fields: [{ key: "name", label: "Full Name", type: "text", placeholder: "Yashu Mittal" }, { key: "email", label: "Email", type: "email", placeholder: "yashu@example.com" }] },
  { title: "Professional",   fields: [{ key: "role", label: "Current Role", type: "text", placeholder: "MCS Student" }, { key: "years", label: "Years of Experience", type: "number", placeholder: "2" }] },
  { title: "Skills",         fields: [{ key: "stack", label: "Tech Stack", type: "text", placeholder: "React, Python, PyTorch..." }, { key: "goal", label: "Career Goal", type: "text", placeholder: "AI/ML Engineer" }] },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", email: "", role: "", years: "", stack: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const valid  = STEPS[step].fields.every((f) => data[f.key].trim() !== "");
  const pct    = ((step) / STEPS.length) * 100;

  if (submitted) return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 460, margin: "40px auto", padding: 32, background: "#13131a", borderRadius: 16, color: "#e2e0f5", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
      <h2 style={{ fontWeight: 800, marginBottom: 12 }}>All set, {data.name}!</h2>
      <div style={{ background: "#0d0d18", borderRadius: 10, padding: 16, textAlign: "left", marginBottom: 20 }}>
        {Object.entries(data).map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 13, borderBottom: "1px solid #1f1f2e" }}>
            <span style={{ color: "#5a5a7a", textTransform: "capitalize", minWidth: 60 }}>{k}:</span>
            <span style={{ color: "#6366f1", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={() => { setSubmitted(false); setStep(0); setData({ name: "", email: "", role: "", years: "", stack: "", goal: "" }); }}
        style={{ padding: "10px 24px", background: "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>
        Start Over
      </button>
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 460, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 20 }}>📋 Multi-Step Form</h2>

      {/* Progress */}
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, height: 4, background: i <= step ? "#6366f1" : "#1a1a2a", borderRadius: 2, transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#6366f1" }}>{STEPS[step].title}</h3>
        <span style={{ fontSize: 12, color: "#5a5a7a" }}>Step {step + 1} / {STEPS.length}</span>
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {STEPS[step].fields.map((f) => (
          <div key={f.key}>
            <label style={{ fontSize: 12, color: "#5a5a7a", display: "block", marginBottom: 5 }}>{f.label}</label>
            <input type={f.type} value={data[f.key]} onChange={(e) => update(f.key, e.target.value)} placeholder={f.placeholder}
              style={{ width: "100%", background: "#1a1a2a", border: `1px solid ${data[f.key] ? "#6366f1" : "#1f1f2e"}`, borderRadius: 8, padding: "10px 14px", color: "#e2e0f5", fontSize: 14, boxSizing: "border-box", transition: "border-color 0.2s" }} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)}
            style={{ flex: 1, padding: 12, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer", fontSize: 14 }}>← Back</button>
        )}
        <button disabled={!valid} onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : setSubmitted(true)}
          style={{ flex: 2, padding: 12, background: valid ? "#6366f1" : "#1a1a2a", border: "none", borderRadius: 8, color: valid ? "#fff" : "#5a5a7a", fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", fontSize: 14, transition: "all 0.2s" }}>
          {step === STEPS.length - 1 ? "Submit ✓" : "Next →"}
        </button>
      </div>
    </div>
  );
}
