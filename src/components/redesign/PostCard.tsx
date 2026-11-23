import Link from "next/link";
import type { PostListItem } from "@/lib/blog-posts-merge";
import { C } from "./ui";

const pill = { display: "inline-flex", alignItems: "center", minHeight: 30, boxSizing: "border-box", padding: "0 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" } as const;

export function PostCard({ post, big = false }: { post: PostListItem; big?: boolean }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <Link href={`/blog/${post.slug.current}`} style={{ flex: big ? "2 1 560px" : "1 1 320px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12, padding: big ? 36 : 26, background: "#FFFFFF", border: `1px solid ${C.line}`, borderRadius: 20, textDecoration: "none", color: C.ink }}>
      {post.category && <span style={{ ...pill, alignSelf: "flex-start", background: C.ink, color: "#FFFFFF" }}>{post.category}</span>}
      {big ? (
        <h2 style={{ margin: "4px 0 0", fontSize: 30, lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.015em" }}>{post.title}</h2>
      ) : (
        <h3 style={{ margin: "4px 0 0", fontSize: 20, lineHeight: 1.3, fontWeight: 800, letterSpacing: "-0.015em" }}>{post.title}</h3>
      )}
      {post.excerpt && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: C.mute }}>{post.excerpt}</p>}
      <span style={{ marginTop: "auto", paddingTop: 10, fontSize: 14, color: C.mute }}>
        By the <strong style={{ color: C.ink }}>Figures team</strong> &middot; <time dateTime={post.publishedAt}>{date}</time>
      </span>
    </Link>
  );
}
