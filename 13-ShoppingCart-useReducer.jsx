import { useReducer } from "react";

const PRODUCTS = [
  { id: 1, name: "React Course",    price: 29, emoji: "⚛️" },
  { id: 2, name: "TypeScript Book", price: 18, emoji: "📘" },
  { id: 3, name: "VSCode Theme",    price: 5,  emoji: "🎨" },
  { id: 4, name: "GitHub Copilot",  price: 10, emoji: "🤖" },
  { id: 5, name: "Docker Tutorial", price: 22, emoji: "🐳" },
  { id: 6, name: "AWS Basics",      price: 35, emoji: "☁️" },
];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state.find((i) => i.id === action.id)
        ? state.map((i) => i.id === action.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state, { ...PRODUCTS.find((p) => p.id === action.id), qty: 1 }];
    case "REMOVE":
      return state.map((i) => i.id === action.id ? { ...i, qty: i.qty - 1 } : i).filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export default function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>🛒 Shopping Cart</h2>
        {count > 0 && <span style={{ background: "#6366f1", borderRadius: 20, padding: "2px 10px", fontSize: 13, fontWeight: 700 }}>{count} items</span>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {PRODUCTS.map((p) => {
          const inCart = cart.find((i) => i.id === p.id);
          return (
            <button key={p.id} onClick={() => dispatch({ type: "ADD", id: p.id })}
              style={{ background: inCart ? "#1a1a3a" : "#111118", border: `1px solid ${inCart ? "#6366f1" : "#1f1f2e"}`, borderRadius: 10, padding: "12px 10px", color: "#e2e0f5", textAlign: "left", cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
              {inCart && <span style={{ position: "absolute", top: 6, right: 8, background: "#6366f1", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>×{inCart.qty}</span>}
              <div style={{ fontSize: 24, marginBottom: 4 }}>{p.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 14, color: "#6366f1", fontWeight: 700, marginTop: 2 }}>${p.price}</div>
            </button>
          );
        })}
      </div>

      <div style={{ background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 10, padding: 14, minHeight: 80 }}>
        {cart.length === 0
          ? <p style={{ color: "#5a5a7a", textAlign: "center", padding: "12px 0" }}>Cart is empty — click products to add</p>
          : cart.map((i) => (
            <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #1f1f2e" }}>
              <span>{i.emoji}</span>
              <span style={{ flex: 1, fontSize: 13 }}>{i.name}</span>
              <button onClick={() => dispatch({ type: "REMOVE", id: i.id })}
                style={{ background: "#2a1a1a", border: "none", borderRadius: 4, width: 22, height: 22, color: "#ef4444", cursor: "pointer" }}>−</button>
              <span style={{ fontSize: 13, fontFamily: "monospace", width: 20, textAlign: "center" }}>{i.qty}</span>
              <button onClick={() => dispatch({ type: "ADD", id: i.id })}
                style={{ background: "#1a2a1a", border: "none", borderRadius: 4, width: 22, height: 22, color: "#22c55e", cursor: "pointer" }}>+</button>
              <span style={{ fontSize: 13, color: "#6366f1", fontFamily: "monospace", width: 44, textAlign: "right" }}>${i.price * i.qty}</span>
            </div>
          ))
        }
      </div>

      {cart.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <button onClick={() => dispatch({ type: "CLEAR" })}
            style={{ padding: "8px 16px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", cursor: "pointer" }}>Clear All</button>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#5a5a7a" }}>Total</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "monospace", color: "#6366f1" }}>${total}</div>
          </div>
        </div>
      )}
    </div>
  );
}
