import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/components/redesign/posts";
import { PostCard } from "@/components/redesign/PostCard";
import { BlogBrowser } from "@/components/redesign/BlogBrowser";
import { Btn, C, CtaBand, Eyebrow, H1, H2, Lead, Row, Section } from "@/components/redesign/ui";

export const metadata: Metadata = {
  title: "UK Tax & Accounting Guides for Small Businesses",
  alternates: { canonical: "/blog" },
  description: "Plain-English UK tax and accounting guides for small businesses, startups and founders, from the team at Figures.",
};

const KEY_DATES = [
  { month: 1, day: 31, label: "31 Jan", text: "Self Assessment return and balancing payment due" },
  { month: 4, day: 5, label: "5 Apr", text: "End of the tax year" },
  { month: 7, day: 31, label: "31 Jul", text: "Second payment on account due" },
  { month: 10, day: 5, label: "5 Oct", text: "Deadline to register for Self Assessment" },
];

/** The four key dates, starting with the next one coming up. */
function upcomingDates() {
  const now = new Date();
  const today = (now.getMonth() + 1) * 100 + now.getDate();
  const next = KEY_DATES.findIndex((d) => d.month * 100 + d.day >= today);
  const start = next === -1 ? 0 : next;
  return [...KEY_DATES.slice(start), ...KEY_DATES.slice(0, start)];
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Section pad="64px 0 40px">
        <Eyebrow>The Figures blog</Eyebrow>
        <H1>UK tax and accounting guides, in plain English</H1>
        <Lead>Practical guides for UK small businesses, startups and founders, written by the team at Figures.</Lead>
      </Section>

      {featured && (
        <Section pad="0 0 64px">
          <Row mt={0}>
            <PostCard post={featured} big />
            <div style={{ flex: "1 1 320px", boxSizing: "border-box", background: C.ink, borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.yellow }}>Key dates coming up</p>
              {upcomingDates().map((d) => (
                <div key={d.label} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: "1px solid #2E2E2E" }}>
                  <strong style={{ flex: "none", width: 70, fontSize: 15, color: "#FFFFFF" }}>{d.label}</strong>
                  <span style={{ fontSize: 15, lineHeight: 1.45, color: C.dim }}>{d.text}</span>
                </div>
              ))}
              <div style={{ marginTop: "auto" }}>
                <Btn kind="yellow" big={false}>
                  Get your return done
                </Btn>
              </div>
            </div>
          </Row>
        </Section>
      )}

      <Section bg={C.alt}>
        <Eyebrow>All guides</Eyebrow>
        <H2>Find the guide for your situation</H2>
        <div style={{ marginTop: 36 }}>
          <Suspense fallback={null}>
            <BlogBrowser posts={rest} />
          </Suspense>
        </div>
      </Section>

      <CtaBand title="Rather hand it all over?" text="Book a free discovery call. We'll look at your situation and give you a fixed quote." />
    </>
  );
}
