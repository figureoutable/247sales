import { getAllPosts } from "./posts";
import { PostCard } from "./PostCard";
import { C, Eyebrow, H2, Pill, Row, Section, TextLink } from "./ui";
import { BLOG_TOPICS } from "./topics";

export async function HomeBlog() {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;
  return (
    <Section pad="96px 0">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
        <div>
          <Eyebrow>From the blog</Eyebrow>
          <H2>Plain-English tax and accounting guides</H2>
        </div>
        <TextLink href="/blog">All {posts.length} guides</TextLink>
      </div>
      <Row mt={48}>
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Row>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 32 }}>
        <span style={{ fontSize: 15, fontWeight: 700, marginRight: 6, color: C.ink }}>Browse by topic:</span>
        {BLOG_TOPICS.map((t) => (
          <Pill key={t.slug} href={`/blog?topic=${t.slug}`}>
            {t.label}
          </Pill>
        ))}
      </div>
    </Section>
  );
}
