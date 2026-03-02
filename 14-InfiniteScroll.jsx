import { useState, useEffect, useRef, useCallback } from "react";

function makePost(id) {
  const topics = ["React Hooks", "TypeScript Generics", "RAG Systems", "System Design", "GraphQL", "Docker", "CI/CD", "Microservices"];
  const topic = topics[id % topics.length];
  return { id, title: `${topic} — Part ${Math.ceil(id / topics.length)}`, body: `Deep dive into ${topic} with practical examples, code snippets, and real-world patterns you can use today.`, likes: Math.floor(Math.random() * 80) + 5, comments: Math.floor(Math.random() * 20), date: new Date(Date.now() - id * 86400000).toLocaleDateString() };
}

export default function InfiniteScroll() {
  const [posts, setPosts]     = useState(() => Array.from({ length: 6 }, (_, i) => makePost(i + 1)));
  const [loading, setLoading] = useState(false);
  const [page, setPage]       = useState(1);
  const loaderRef = useRef(null);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts((p) => [...p, ...Array.from({ length: 4 }, (_, i) => makePost(p.length + i + 1))]);
      setPage((p) => p + 1);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !loading) loadMore(); }, { threshold: 0.5 });
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [loadMore, loading]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 540, margin: "40px auto", padding: 24, background: "#13131a", borderRadius: 16, color: "#e2e0f5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>♾️ Infinite Scroll Feed</h2>
        <span style={{ fontSize: 12, color: "#5a5a7a" }}>{posts.length} posts • page {page}</span>
      </div>

      <div style={{ maxHeight: 500, overflowY: "auto" }}>
        {posts.map((p) => (
          <div key={p.id}
            style={{ background: "#111118", border: "1px solid #1f1f2e", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, marginRight: 12 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: "#5a5a7a", lineHeight: 1.5 }}>{p.body}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 12, color: "#5a5a7a" }}>
              <span>♥ {p.likes}</span>
              <span>💬 {p.comments}</span>
              <span style={{ marginLeft: "auto" }}>{p.date}</span>
            </div>
          </div>
        ))}

        <div ref={loaderRef} style={{ textAlign: "center", padding: 16, color: "#5a5a7a", fontSize: 13 }}>
          {loading ? (
            <span>⏳ Loading more posts...</span>
          ) : (
            <span>↓ Scroll for more</span>
          )}
        </div>
      </div>
    </div>
  );
}
