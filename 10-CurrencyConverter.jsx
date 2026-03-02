import { useState } from "react";

const RATES = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, INR: 83.2, CAD: 1.36, AUD: 1.53, CNY: 7.24, SGD: 1.34, CHF: 0.89 };
const FLAGS  = { USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", INR: "🇮🇳", CAD: "🇨🇦", AUD: "🇦🇺", CNY: "🇨🇳", SGD: "🇸🇬", CHF: "🇨🇭" };

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom]     = useState("USD");
  const [to, setTo]         = useState("INR");

  const result   = ((amount / RATES[from]) * RATES[to]).toFixed(2);
  const rate     = (RATES[to] / RATES[from]).toFixed(4);
  const invRate  = (RATES[from] / RATES[to]).toFixed(4);

  const swap = () => { const t = from; setFrom(to); setTo(t); };

  const S = {
    wrap:   { fontFamily: "sans-serif", maxWidth: 420, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" },
    input:  { width: "100%", background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: "12px 14px", color: "#e2e0f5", fontSize: 22, fontWeight: 700, boxSizing: "border-box" },
    select: { flex: 1, background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, padding: "10px", color: "#e2e0f5", fontSize: 14 },
    btn:    { padding: "10px 14px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#e2e0f5", fontSize: 20, cursor: "pointer" },
  };

  return (
    <div style={S.wrap}>
      <h2 style={{ marginBottom: 20 }}>💱 Currency Converter</h2>

      <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} style={S.input} />

      <div style={{ display: "flex", gap: 8, margin: "12px 0", alignItems: "center" }}>
        <select value={from} onChange={(e) => setFrom(e.target.value)} style={S.select}>
          {Object.keys(RATES).map((c) => <option key={c} value={c}>{FLAGS[c]} {c}</option>)}
        </select>
        <button onClick={swap} style={S.btn}>⇄</button>
        <select value={to} onChange={(e) => setTo(e.target.value)} style={S.select}>
          {Object.keys(RATES).map((c) => <option key={c} value={c}>{FLAGS[c]} {c}</option>)}
        </select>
      </div>

      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#0d0d1e)", border: "1px solid #1f1f2e", borderRadius: 12, padding: 24, textAlign: "center", margin: "16px 0" }}>
        <p style={{ fontSize: 13, color: "#5a5a7a", marginBottom: 4 }}>{FLAGS[from]} {amount} {from} =</p>
        <p style={{ fontSize: 40, fontWeight: 800, color: "#6366f1", fontFamily: "monospace" }}>{result}</p>
        <p style={{ fontSize: 15, color: "#5a5a7a", marginTop: 4 }}>{FLAGS[to]} {to}</p>
      </div>

      <div style={{ background: "#0d0d18", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#5a5a7a" }}>
        <div>1 {from} = {rate} {to}</div>
        <div>1 {to} = {invRate} {from}</div>
        <div style={{ marginTop: 4, fontSize: 10, color: "#333350" }}>* Rates are static for demo purposes</div>
      </div>
    </div>
  );
}
