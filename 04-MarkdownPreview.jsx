import { useState } from "react";

function renderMarkdown(t) {
  return t
    .replace(/^### (.+)/gm, '<h3 style="margin:8px 0 4px;color:#c4c4ff;font-size:15px">$1</h3>')
    .replace(/^## (.+)/gm,  '<h2 style="margin:10px 0 4px;color:#d4d4ff;font-size:17px">$1</h2>')
    .replace(/^# (.+)/gm,   '<h1 style="margin:10px 0 6px;color:#e8e8ff;font-size:20px;font-weight:800">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#a5b4fc">$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em style="color:#c4b5fd">$1</em>')
    .replace(/`([^`]+)`/g,     '<code style="background:#1e1e3a;padding:1px 5px;border-radius:3px;font-family:monospace;color:#a5f3fc;font-size:12px">$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="background:#1a1a2e;border:1px solid #2a2a4e;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;color:#a5f3fc;overflow-x:auto;margin:6px 0">$1</pre>')
    .replace(/^> (.+)/gm,  '<blockquote style="border-left:3px solid #6366f1;padding-left:10px;margin:6px 0;color:#8888aa;font-style:italic">$1</blockquote>')
    .replace(/^- (.+)/gm,  '<li style="margin:2px 0;padding-left:4px;color:#c0c0e0">• $1</li>')
    .replace(/\n/g, "<br/>");
}

const DEFAULT_MD = `# Hello World

This is **bold** and *italic* text.

## Code Example
\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("React"));
\`\`\`

## List
- Item one
- Item two
- Item three

> A useful blockquote here

Inline \`code\` looks like this.
`;

export default function MarkdownPreview() {
  const [md, setMd] = useState(DEFAULT_MD);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <h2 style={{ marginBottom: 16 }}>📝 Markdown Preview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: 500 }}>
        <div>
          <p style={{ fontSize: 11, color: "#5a5a7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Editor</p>
          <textarea value={md} onChange={(e) => setMd(e.target.value)}
            style={{ width: "100%", height: "calc(100% - 24px)", background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, color: "#e2e0f5", fontSize: 13, resize: "none", fontFamily: "monospace", lineHeight: 1.6 }} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#5a5a7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Preview</p>
          <div style={{ height: "calc(100% - 24px)", background: "#0d0d18", border: "1px solid #1f1f2e", borderRadius: 8, padding: 12, overflow: "auto", fontSize: 13, lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
        </div>
      </div>
    </div>
  );
}
