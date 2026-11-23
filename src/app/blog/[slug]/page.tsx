import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { getLocalPostBySlug } from "@/data/blog-posts";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { seoDescription, seoTitle } from "@/lib/seo";
import { getAllPosts, readMinutes } from "@/components/redesign/posts";
import { BLOG_TOPICS } from "@/components/redesign/topics";
import { Arrow, Btn, C, Crumbs, CtaBand, TextLink, WRAP } from "@/components/redesign/ui";

type Props = { params: Promise<{ slug: string }> };

type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string | null;
  publishedAt: string;
  mainImage: string | null;
  body: PortableTextBlock[] | null;
  excerpt: string | null;
};

async function getPostFromSanity(slug: string): Promise<SanityPost | null> {
  try {
    return await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityPost = await getPostFromSanity(slug);
  const canonical = `/blog/${slug}`;
  if (sanityPost)
    return {
      title: seoTitle(sanityPost.title),
      description: seoDescription(sanityPost.excerpt),
      alternates: { canonical },
      openGraph: { type: "article", publishedTime: sanityPost.publishedAt },
    };
  const localPost = getLocalPostBySlug(slug);
  if (localPost)
    return {
      title: seoTitle(localPost.title),
      description: seoDescription(localPost.excerpt),
      alternates: { canonical },
      openGraph: {
        type: "article",
        publishedTime: localPost.publishedAt,
        modifiedTime: localPost.updatedAt ?? localPost.publishedAt,
      },
    };
  return { title: "Post not found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const sanityPost = await getPostFromSanity(slug);
  const localPost = sanityPost ? null : getLocalPostBySlug(slug);
  const post = sanityPost ?? localPost;
  if (!post) notFound();

  const updatedAt = localPost?.updatedAt ?? null;
  const shownDate = new Date(updatedAt ?? post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const words = localPost?.body ? localPost.body.split(/\s+/).length : 0;
  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug.current !== slug && p.category === post.category).slice(0, 3);
  const topic = BLOG_TOPICS.find((t) => t.category === post.category);

  return (
    <>
      <ArticleJsonLd title={post.title} description={post.excerpt} slug={slug} publishedAt={post.publishedAt} updatedAt={updatedAt} image={post.mainImage} />
      <section style={{ padding: "48px 0 96px", background: "#FFFFFF" }}>
        <div style={{ ...WRAP, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <article style={{ flex: "999 1 560px", minWidth: 0, maxWidth: 760 }}>
            <Crumbs items={[{ label: "Blog", href: "/blog" }, ...(topic ? [{ label: topic.label, href: `/blog?topic=${topic.slug}` }] : []), { label: "This guide" }]} />
            <h1 style={{ margin: 0, fontSize: "clamp(34px, 4vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 800 }}>{post.title}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 28, padding: "16px 0", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/redesign/logo-black.png" alt="" style={{ width: 52, height: 52, borderRadius: 12, objectFit: "contain", background: "#FFFFFF", border: `1px solid ${C.line}`, padding: 8, boxSizing: "border-box" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 15 }}>
                  By the <strong>Figures team</strong>
                </span>
                <span style={{ fontSize: 14, color: C.mute }}>
                  {updatedAt ? "Updated" : "Published"} <time dateTime={updatedAt ?? post.publishedAt}>{shownDate}</time>
                  {words > 0 && <> &middot; {readMinutes(words)} min read</>}
                </span>
              </div>
            </div>

            {post.mainImage && (
              <div style={{ position: "relative", marginTop: 32, aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 20, background: C.alt }}>
                <Image src={post.mainImage} alt="" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 760px" />
              </div>
            )}

            <div className="blog-prose" style={{ marginTop: 36 }}>
              {sanityPost ? (
                sanityPost.body ? (
                  <PortableText value={sanityPost.body} />
                ) : sanityPost.excerpt ? (
                  <p>{sanityPost.excerpt}</p>
                ) : null
              ) : localPost?.body ? (
                localPost.body.includes("##") ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{localPost.body}</ReactMarkdown>
                ) : (
                  localPost.body.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)
                )
              ) : localPost?.excerpt ? (
                <p>{localPost.excerpt}</p>
              ) : null}
            </div>

            <div style={{ marginTop: 40, background: C.ink, borderRadius: 20, padding: 28, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
              <div style={{ flex: "1 1 360px" }}>
                <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>Want this off your desk?</p>
                <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.6, color: C.dim }}>Fixed fee, done properly, and explained in plain English. We respond within 1 business day.</p>
              </div>
              <Btn kind="yellow" big={false}>
                Book a free call <Arrow />
              </Btn>
            </div>

            <p style={{ margin: "24px 0 0", fontSize: 14, lineHeight: 1.6, color: C.mute }}>This guide is general information, not advice for your situation. Tax rules change, so book a call if you want us to look at your own position.</p>

            {related.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Related guides</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {related.map((r) => (
                    <TextLink key={r._id} href={`/blog/${r.slug.current}`}>
                      {r.title}
                    </TextLink>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="lg:sticky lg:top-28" style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/redesign/josh.jpg" alt="" style={{ width: 64, height: 64, borderRadius: 999, objectFit: "cover" }} />
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Talk to a Chartered Accountant</p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: C.mute }}>Fixed fees. Plain English. A reply within 1 business day.</p>
              <Btn big={false}>Book a free call</Btn>
            </div>
            <div style={{ background: C.alt, borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ background: C.yellow, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", padding: "5px 10px", borderRadius: 6 }}>FREE PDF</span>
              <p style={{ margin: "12px 0 6px", fontSize: 18, fontWeight: 800 }}>Free accounting checklists</p>
              <p style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.55, color: C.mute }}>Year-end, Self Assessment and new company checklists.</p>
              <TextLink href="/checklists">Download free</TextLink>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand title="Ready for accounting that's oddly satisfying?" text="Book a free discovery call. We'll chat about your situation and how we can help, with no obligation." />
    </>
  );
}
