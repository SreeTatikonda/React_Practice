import { useState, useEffect, useCallback } from "react";

const GALLERY = [
  { emoji: "🌄", title: "Mountain Sunrise",  desc: "Golden light breaking over the peaks" },
  { emoji: "🏙️", title: "City Skyline",      desc: "Urban landscape at dusk" },
  { emoji: "🌊", title: "Ocean Waves",       desc: "Serene coastal scenery" },
  { emoji: "🌸", title: "Cherry Blossoms",   desc: "Spring in full bloom" },
  { emoji: "🦋", title: "Butterfly Garden",  desc: "Nature's living artwork" },
  { emoji: "🌌", title: "Galaxy",            desc: "Stars across the cosmos" },
  { emoji: "🏔️", title: "Snow Peak",         desc: "Alpine wilderness" },
  { emoji: "🌅", title: "Sunset Beach",      desc: "End of a perfect day" },
  { emoji: "🎨", title: "Color Splash",      desc: "Abstract expressionism" },
  { emoji: "🌿", title: "Forest Path",       desc: "Through the ancient trees" },
  { emoji: "🦅", title: "Eagle Flight",      desc: "Freedom in motion" },
  { emoji: "🌙", title: "Moonrise",          desc: "Night falls peacefully" },
];

export default function ImageGallery() {
  const [selected, setSelected] = useState(null);

  const prev = useCallback(() => setSelected((i) => (i - 1 + GALLERY.length) % GALLERY.length), []);
  const next = useCallback(() => setSelected((i) => (i + 1) % GALLERY.length), []);

  useEffect(() => {
    const handler = (e) => {
      if (selected === null) return;
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, prev, next]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>🖼️ Image Gallery + Lightbox</h2>
      <p style={{ color: "#5a5a7a", fontSize: 12, marginBottom: 16 }}>Click any image • Arrow keys to navigate • Escape to close</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {GALLERY.map((img, i) => (
          <button key={i} onClick={() => setSelected(i)}
            style={{ aspectRatio: "1", background: `hsl(${i * 30}, 30%, 12%)`, border: `1px solid hsl(${i * 30}, 30%, 20%)`, borderRadius: 10, fontSize: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            {img.emoji}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: "#1a1a2a", borderRadius: 16, padding: 40, textAlign: "center", maxWidth: 340, width: "90%" }}>
            <div style={{ fontSize: 100, lineHeight: 1, marginBottom: 16 }}>{GALLERY[selected].emoji}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{GALLERY[selected].title}</h3>
            <p style={{ color: "#5a5a7a", fontSize: 14, marginBottom: 20 }}>{GALLERY[selected].desc}</p>
            <p style={{ color: "#5a5a7a", fontSize: 11, marginBottom: 16 }}>{selected + 1} / {GALLERY.length}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={prev} style={{ padding: "8px 18px", background: "#111118", border: "1px solid #1f1f2e", borderRadius: 8, color: "#e2e0f5", cursor: "pointer" }}>← Prev</button>
              <button onClick={() => setSelected(null)} style={{ padding: "8px 14px", background: "#2a2a3a", border: "1px solid #3a3a4a", borderRadius: 8, color: "#e2e0f5", cursor: "pointer" }}>✕</button>
              <button onClick={next} style={{ padding: "8px 18px", background: "#111118", border: "1px solid #1f1f2e", borderRadius: 8, color: "#e2e0f5", cursor: "pointer" }}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
