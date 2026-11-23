import { ImageResponse } from "next/og";
import { getLocalPostBySlug } from "@/data/blog-posts";

export const alt = "Figures guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded share card for each blog post, with the post title on it. */
export default async function BlogOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getLocalPostBySlug(slug);
  const title = post?.title ?? "UK tax and accounting guides";
  const category = post?.category ?? "Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#FFFFFF",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 800, letterSpacing: -2 }}>figures</div>
          <div
            style={{
              display: "flex",
              background: "#FFDD4F",
              color: "#0A0A0A",
              fontSize: 26,
              fontWeight: 800,
              padding: "10px 22px",
              borderRadius: 999,
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 56 : 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#B5B5B5" }}>tryfigures.com/blog</div>
      </div>
    ),
    size
  );
}
