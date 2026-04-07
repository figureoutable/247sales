#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BLOG_POSTS_FILE = path.join(ROOT, "src/data/blog-posts.ts");
const GENERATED_FILE = path.join(ROOT, "src/data/generated-posts.ts");
const BODIES_DIR = path.join(ROOT, "src/data/blog-post-bodies");
const TOPICS_FILE = path.join(__dirname, "blog-topics.json");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable");
  process.exit(1);
}

const CATEGORY_IMAGES = {
  Compliance: ["/blog/year-end-accounts.jpg", "/blog/statutory-accounts.jpg"],
  "Cash Flow": ["/blog/cash-flow-13-weeks.jpg", "/blog/quarterly-forecast.jpg"],
  VAT: ["/blog/vat-digital-services.jpg", "/blog/vat-schemes.jpg"],
  Reporting: [
    "/blog/management-accounts-do.jpg",
    "/blog/investor-reporting.jpg",
    "/blog/read-pl-five-mins.jpg",
  ],
  Payroll: ["/blog/paye-payroll.jpg"],
  "FP&A": ["/blog/budgeting-growth.jpg"],
  Tax: [
    "/blog/corporation-tax-year-end.jpg",
    "/blog/making-tax-digital.jpg",
    "/blog/self-assessment-deadline.jpg",
  ],
  Leadership: ["/blog/fractional-cfo.jpg"],
  Bookkeeping: ["/blog/xero-bookkeeping.jpg"],
  Systems: ["/blog/finance-stack.jpg"],
};

function pickImage(category, id) {
  const images =
    CATEGORY_IMAGES[category] || Object.values(CATEGORY_IMAGES).flat();
  return images[id % images.length];
}

/** Prepended to every saved hero-image prompt (AI tools, designers, future image pipelines). */
const HERO_IMAGE_VISUAL_RULES = `Blog hero image — global style (apply every time):
- Use a vivid, high-saturation palette with at least 3 distinct colours (for example: cobalt or navy, teal or emerald, and coral or amber accents).
- Keep colour temperature lively and modern; prefer bright directional lighting and clean contrast over muted or dusty tones.
- Avoid beige, taupe, cream-heavy, tan, sepia, grey-washed, or brown-on-brown scenes. Do not default to bland neutral office stock-photo aesthetics.
- Include colourful environmental elements where relevant (screens, charts, stationery, lighting, signage, plants, clothing accents) to keep the frame energetic.
- Suitable for a wide 16:9 or 3:2 web hero; professional, UK-relevant small-business context.`;

function buildHeroImagePrompt(post, topic) {
  const scene =
    typeof post.heroImagePrompt === "string" && post.heroImagePrompt.trim()
      ? post.heroImagePrompt.trim()
      : `Editorial hero image for a UK accounting and small-business article about: ${topic.topic}. Use props or settings that suggest finance, growth, or clarity, with a bright multi-colour palette (no beige or neutral-dominant office scenes).`;
  return `${HERO_IMAGE_VISUAL_RULES}\n\nScene and composition:\n${scene}`;
}

/* ---------- state helpers ---------- */

function readAllSources() {
  const main = fs.readFileSync(BLOG_POSTS_FILE, "utf8");
  const gen = fs.existsSync(GENERATED_FILE)
    ? fs.readFileSync(GENERATED_FILE, "utf8")
    : "";
  return main + "\n" + gen;
}

function getNextId() {
  const combined = readAllSources();
  const matches = [...combined.matchAll(/_id:\s*"local-(\d+)"/g)];
  if (matches.length === 0) return 1;
  return Math.max(...matches.map((m) => parseInt(m[1], 10))) + 1;
}

function getNextPublishDate() {
  const combined = readAllSources();
  const matches = [...combined.matchAll(/publishedAt:\s*"([^"]+)"/g)];
  const latest = new Date(
    Math.max(...matches.map((m) => new Date(m[1]).getTime()))
  );
  const d = new Date(latest);
  d.setDate(d.getDate() + 1);
  while (![1, 3, 5].includes(d.getDay())) {
    d.setDate(d.getDate() + 1);
  }
  d.setUTCHours(9, 0, 0, 0);
  return d.toISOString();
}

function getExistingTitles() {
  const combined = readAllSources();
  return [...combined.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/* ---------- topic queue ---------- */

function getNextTopic() {
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  return topics.find((t) => !t.used) ?? null;
}

function markTopicUsed(topic) {
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  const match = topics.find((t) => t.topic === topic.topic);
  if (match) match.used = true;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + "\n");
}

/* ---------- OpenAI ---------- */

const SYSTEM_PROMPT = `You are an expert SEO content writer for Figures, a UK accounting and advisory firm based in Surrey. Write blog posts for UK small business owners, founders, and limited company directors.

Strict rules:
- Write in UK English (e.g. "organise" not "organize", "colour" not "color", "recognise" not "recognize")
- Minimum 1,500 words
- Use markdown: ## for H2, ### for H3, **bold** for emphasis
- Use bullet lists where appropriate
- NO em dashes. Use en dashes or restructure the sentence
- NO curly/smart quotes. Use straight apostrophes and straight double quotes only
- NO backtick characters anywhere in the output
- Do NOT start with an H1 heading (the title is rendered separately by the app)
- Start with a strong opening paragraph (2-3 sentences) that includes the primary keyword naturally

Required sections in order:
1. Opening paragraphs introducing the topic
2. Several H2 sections covering the topic in depth (use H3 for subsections where helpful)
3. "## UK tax and legal accuracy" - disclaimer noting "This article is for informational purposes only and does not constitute professional tax or financial advice. Please speak to a qualified accountant before taking action." Include the relevant tax year.
4. "## Frequently asked questions" - 4-5 Q&A pairs using **bold** for questions
5. "## Summary and next steps" - brief recap with a CTA to Figures

Internal links to include (pick 2-3 that are relevant):
- [Statutory Accounts & Tax](/services#statutory-accounts-tax)
- [Payroll & PAYE](/services#payroll-paye)
- [Bookkeeping & Xero](/services#bookkeeping-xero)
- [Fractional CFO](/services#fractional-cfo)
- [Management Reporting](/services#management-reporting)
- [VAT](/services#vat)
- [Cash Flow Management](/services#cash-flow-management)
- [Budgeting & Forecasting](/services#budgeting-forecasting)
- [Board & Investor Reporting](/services#board-investor-reporting)
- [book a discovery call](/)

Include at least one external link to GOV.UK or another authoritative UK source.
Use the primary keyword 3-5 times naturally throughout. Use secondary keywords where they fit.

Hero image prompt (for AI or human designers generating the blog thumbnail/hero):
- Also return a field "heroImagePrompt": one focused paragraph describing ONLY the visual scene for a wide hero image.
- The scene must feel colourful and energetic: name specific colours (e.g. teal dashboard, cobalt sky, green plants, warm accent lighting) — not vague "professional office".
- Explicitly avoid beige-only, cream-washed, or all-grey stock-photo moods; do not describe bland neutral open-plan offices as the whole frame.
- Tie the visual metaphor to the article topic and UK small business context (founders, limited companies, finance clarity).`;

async function generatePost(topic, existingTitles) {
  const userPrompt = `Write a blog post about: ${topic.topic}

Primary keyword: ${topic.primaryKeyword}
Secondary keywords: ${topic.secondaryKeywords.join(", ")}
Category: ${topic.category}

Existing blog post titles (avoid overlap):
${existingTitles.map((t) => `- ${t}`).join("\n")}

Return ONLY a valid JSON object (no markdown fences, no explanation) with these fields:
{
  "title": "SEO title including the primary keyword (50-65 chars)",
  "slug": "url-friendly-slug-with-keyword",
  "excerpt": "Meta description with primary keyword (150-160 characters)",
  "body": "Full markdown body (1500+ words, no H1, opening paragraph first)",
  "heroImagePrompt": "One paragraph: vivid, non-beige hero image scene matching this article (colours and metaphor specified; no beige stock-office clichés)"
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 16384,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${err}`);
  }

  const data = await res.json();
  let content = data.choices[0].message.content.trim();

  if (content.startsWith("```")) {
    content = content.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(content);
}

/* ---------- file writers ---------- */

function writeBodyFile(id, body) {
  fs.mkdirSync(BODIES_DIR, { recursive: true });
  const escaped = body
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
  const filePath = path.join(BODIES_DIR, `local-${id}.ts`);
  fs.writeFileSync(filePath, `export const body = \`${escaped}\`;\n`);
  return filePath;
}

function writeHeroImagePromptFile(id, fullPrompt) {
  const dir = path.join(ROOT, "scripts", "hero-image-prompts");
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `local-${id}.txt`);
  fs.writeFileSync(filePath, fullPrompt + "\n");
  return filePath;
}

function updateManifest(id, post, publishDate, category) {
  const image = pickImage(category, id);

  let src = fs.readFileSync(GENERATED_FILE, "utf8");

  const importLine = `import { body as bodyLocal${id} } from "./blog-post-bodies/local-${id}";\n`;
  src = src.replace(
    "// GENERATED_IMPORTS",
    importLine + "// GENERATED_IMPORTS"
  );

  const entry = `  {
    _id: "local-${id}",
    title: ${JSON.stringify(post.title)},
    slug: { current: ${JSON.stringify(post.slug)} },
    category: ${JSON.stringify(category)},
    publishedAt: ${JSON.stringify(publishDate)},
    mainImage: ${JSON.stringify(image)},
    excerpt: ${JSON.stringify(post.excerpt)},
    body: bodyLocal${id},
  },\n`;
  src = src.replace(
    "  // GENERATED_ENTRIES",
    entry + "  // GENERATED_ENTRIES"
  );

  fs.writeFileSync(GENERATED_FILE, src);
}

/* ---------- main ---------- */

async function main() {
  console.log("=== Blog post generator ===\n");

  const nextId = getNextId();
  console.log(`Next ID: local-${nextId}`);

  const publishDate = getNextPublishDate();
  console.log(`Publish date: ${publishDate}`);

  const topic = getNextTopic();
  if (!topic) {
    console.log(
      "No unused topics remaining. Add more to scripts/blog-topics.json"
    );
    process.exit(0);
  }
  console.log(`Topic: ${topic.topic}`);
  console.log(`Primary keyword: ${topic.primaryKeyword}\n`);

  console.log("Calling OpenAI...");
  const post = await generatePost(topic, getExistingTitles());
  console.log(`Generated: "${post.title}"`);
  console.log(`Slug: ${post.slug}`);
  console.log(`Excerpt: ${post.excerpt}\n`);

  writeBodyFile(nextId, post.body);
  console.log(`Body file: src/data/blog-post-bodies/local-${nextId}.ts`);

  const heroPrompt = buildHeroImagePrompt(post, topic);
  const heroPath = writeHeroImagePromptFile(nextId, heroPrompt);
  console.log(`Hero image prompt: ${path.relative(ROOT, heroPath)}`);
  console.log("\n--- Copy for your image generator (colourful, not beige) ---\n");
  console.log(heroPrompt);
  console.log("\n--- End hero image prompt ---\n");

  updateManifest(nextId, post, publishDate, topic.category);
  console.log("Manifest updated: src/data/generated-posts.ts");

  markTopicUsed(topic);
  console.log("Topic marked as used\n");

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
