"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PostListItem } from "@/lib/blog-posts-merge";
import { PostCard } from "./PostCard";
import { BLOG_TOPICS } from "./topics";

const PAGE = 12;

/** Search box, topic filters and the post grid for the blog page. */
export function BlogBrowser({ posts }: { posts: PostListItem[] }) {
  const params = useSearchParams();
  const initial = BLOG_TOPICS.find((t) => t.slug === params.get("topic"))?.slug ?? "all";
  const [topic, setTopic] = useState<string>(initial);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const category = BLOG_TOPICS.find((t) => t.slug === topic)?.category;
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (!category || p.category === category) && (!q || p.title.toLowerCase().includes(q) || (p.excerpt ?? "").toLowerCase().includes(q)));
  }, [posts, topic, query]);

  const pill = (active: boolean) =>
    ({ display: "inline-flex", alignItems: "center", minHeight: 44, boxSizing: "border-box", padding: "0 18px", borderRadius: 999, fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", background: active ? "#0A0A0A" : "#FFFFFF", color: active ? "#FFFFFF" : "#0A0A0A", border: "1px solid #0A0A0A" }) as const;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div role="group" aria-label="Filter by topic" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button type="button" aria-pressed={topic === "all"} onClick={() => { setTopic("all"); setShown(PAGE); }} style={pill(topic === "all")}>
            All guides
          </button>
          {BLOG_TOPICS.map((t) => (
            <button key={t.slug} type="button" aria-pressed={topic === t.slug} onClick={() => { setTopic(t.slug); setShown(PAGE); }} style={pill(topic === t.slug)}>
              {t.label}
            </button>
          ))}
        </div>
        <label style={{ flex: "1 1 260px", maxWidth: 380, display: "flex" }}>
          <span className="sr-only">Search the guides</span>
          <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }} placeholder={`Search ${posts.length} guides`} style={{ flex: "1 1 auto", minHeight: 50, boxSizing: "border-box", padding: "0 18px", border: "2px solid #0A0A0A", borderRadius: 999, fontFamily: "inherit", fontSize: 16, background: "#FFFFFF" }} />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p style={{ margin: "40px 0 0", fontSize: 17, color: "#525252" }}>No guides match that search. Try a different word or topic.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 36 }}>
          {filtered.slice(0, shown).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {filtered.length > shown && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <button type="button" onClick={() => setShown((n) => n + PAGE)} style={{ minHeight: 52, padding: "0 28px", borderRadius: 999, border: "2px solid #0A0A0A", background: "transparent", fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer", color: "#0A0A0A" }}>
            Load more guides
          </button>
        </div>
      )}
    </div>
  );
}
