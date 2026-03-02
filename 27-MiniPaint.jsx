import { useRef, useState, useEffect } from "react";

const COLORS = ["#6366f1","#ef4444","#22c55e","#eab308","#06b6d4","#f97316","#a855f7","#ec4899","#ffffff","#000000"];

export default function MiniPaint() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor]     = useState("#6366f1");
  const [size, setSize]       = useState(8);
  const [tool, setTool]       = useState("pen");
  const [history, setHistory] = useState([]);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0d0d12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / r.width;
    const scaleY = canvasRef.current.height / r.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return [(clientX - r.left) * scaleX, (clientY - r.top) * scaleY];
  };

  const startDraw = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    setHistory((h) => [...h.slice(-19), imageData]);
    setDrawing(true);
    const pos = getPos(e);
    lastPos.current = pos;
    if (tool === "fill") { floodFill(pos); return; }
    if (tool === "shape") return;
    draw(pos, pos);
  };

  const draw = (from, to) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.strokeStyle = tool === "eraser" ? "#0d0d12" : color;
    ctx.lineWidth   = tool === "eraser" ? size * 3 : size;
    ctx.lineCap  = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const onMove = (e) => {
    e.preventDefault();
    if (!drawing || tool === "fill") return;
    const pos = getPos(e);
    draw(lastPos.current, pos);
    lastPos.current = pos;
  };

  const floodFill = ([x, y]) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const px = (Math.round(x) + Math.round(y) * canvas.width) * 4;
    const target = [data.data[px], data.data[px+1], data.data[px+2], data.data[px+3]];
    const fill = hexToRgb(color);
    if (target.every((v, i) => v === fill[i])) return;
    const stack = [[Math.round(x), Math.round(y)]];
    while (stack.length) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue;
      const i = (cx + cy * canvas.width) * 4;
      if ([0,1,2,3].every((j) => Math.abs(data.data[i+j] - target[j]) < 20)) {
        [fill[0], fill[1], fill[2], 255].forEach((v, j) => data.data[i+j] = v);
        stack.push([cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1]);
      }
    }
    ctx.putImageData(data, 0, 0);
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return [r, g, b, 255];
  };

  const undo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    canvasRef.current.getContext("2d").putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#0d0d12";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "painting.png"; a.click();
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 620, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 14 }}>🖌️ Mini Paint</h2>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {/* Tools */}
        {[["pen","✏️ Pen"],["eraser","⬜ Eraser"],["fill","🪣 Fill"]].map(([t,l]) => (
          <button key={t} onClick={() => setTool(t)}
            style={{ padding: "6px 12px", background: tool === t ? "#6366f1" : "#1a1a2a", border: `1px solid ${tool === t ? "#6366f1" : "#1f1f2e"}`, borderRadius: 8, color: "#e2e0f5", fontSize: 12, cursor: "pointer" }}>{l}</button>
        ))}

        {/* Size */}
        <input type="range" min={1} max={30} value={size} onChange={(e) => setSize(+e.target.value)}
          style={{ width: 80, accentColor: color }} title="Brush size" />
        <span style={{ fontSize: 12, color: "#5a5a7a", minWidth: 20 }}>{size}px</span>

        {/* Actions */}
        <button onClick={undo}
          style={{ padding: "6px 12px", background: "#1a1a2a", border: "1px solid #1f1f2e", borderRadius: 8, color: "#5a5a7a", fontSize: 12, cursor: "pointer" }}>↩ Undo</button>
        <button onClick={clear}
          style={{ padding: "6px 12px", background: "#2a0a0a", border: "1px solid #ef4444", borderRadius: 8, color: "#ef4444", fontSize: 12, cursor: "pointer" }}>🗑 Clear</button>
        <button onClick={download}
          style={{ padding: "6px 12px", background: "#0a2a0a", border: "1px solid #22c55e", borderRadius: 8, color: "#22c55e", fontSize: 12, cursor: "pointer" }}>⬇ Save</button>
      </div>

      {/* Color Palette */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center" }}>
        {COLORS.map((c) => (
          <button key={c} onClick={() => { setColor(c); setTool("pen"); }}
            style={{ width: 24, height: 24, background: c, border: `2px solid ${color === c ? "#fff" : "transparent"}`, borderRadius: 4, cursor: "pointer", flexShrink: 0 }} />
        ))}
        <input type="color" value={color} onChange={(e) => { setColor(e.target.value); setTool("pen"); }}
          style={{ width: 34, height: 28, border: "1px solid #1f1f2e", borderRadius: 6, background: "transparent", cursor: "pointer" }} />
        <span style={{ fontSize: 11, color: "#5a5a7a", fontFamily: "monospace" }}>{color}</span>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} width={560} height={320}
        onMouseDown={startDraw} onMouseMove={onMove} onMouseUp={() => setDrawing(false)} onMouseLeave={() => setDrawing(false)}
        onTouchStart={startDraw} onTouchMove={onMove} onTouchEnd={() => setDrawing(false)}
        style={{ width: "100%", borderRadius: 10, border: "1px solid #1f1f2e", cursor: tool === "eraser" ? "cell" : tool === "fill" ? "crosshair" : "crosshair", display: "block", touchAction: "none" }} />
    </div>
  );
}
