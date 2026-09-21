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
const GENERATED_IMAGES_DIR = path.join(ROOT, "public/blog/generated");
const FAL_MODEL = "fal-ai/flux/dev";

/** Load .env.local for local runs (does not override existing env vars). */
function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const FAL_KEY = process.env.FAL_KEY;
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

function getHeroScene(post, topic) {
  if (typeof post.heroImagePrompt === "string" && post.heroImagePrompt.trim()) {
    return post.heroImagePrompt.trim();
  }
  return `Editorial hero image for a UK accounting and small-business article about: ${topic.topic}. Use props or settings that suggest finance, growth, or clarity, with a bright multi-colour palette (no beige or neutral-dominant office scenes).`;
}

function buildHeroImagePrompt(post, topic) {
  return `${HERO_IMAGE_VISUAL_RULES}\n\nScene and composition:\n${getHeroScene(post, topic)}`;
}

/** Shorter prose prompt works better for fal/Flux than the bullet-style rules doc. */
function buildFalImagePrompt(post, topic) {
  return [
    "Editorial wide 16:9 blog hero photograph for a UK accounting firm website.",
    "Vivid high-saturation colours with cobalt or navy, teal or emerald, and coral or amber accents.",
    "Bright directional lighting, clean contrast, professional UK small-business context.",
    "Avoid beige, cream, taupe, sepia, grey-washed, and bland neutral stock-office aesthetics.",
    "No text, logos, watermarks, or readable UI screens.",
    getHeroScene(post, topic),
  ].join(" ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a hero image with fal.ai and save under public/blog/generated/.
 * Returns the public path on success, or null on failure (caller should fall back).
 */
async function generateHeroImageWithFal(id, prompt) {
  if (!FAL_KEY) {
    console.warn("FAL_KEY not set — skipping fal image generation");
    return null;
  }

  const authHeaders = {
    Authorization: `Key ${FAL_KEY}`,
    "Content-Type": "application/json",
  };

  console.log(`Calling fal (${FAL_MODEL})...`);
  const submitRes = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      prompt,
      image_size: "landscape_16_9",
      num_images: 1,
      output_format: "jpeg",
      enable_safety_checker: true,
    }),
  });

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`fal submit ${submitRes.status}: ${err}`);
  }

  const submitted = await submitRes.json();
  const statusUrl = submitted.status_url;
  const responseUrl = submitted.response_url;
  if (!statusUrl || !responseUrl) {
    throw new Error(`fal submit missing status/response URLs: ${JSON.stringify(submitted)}`);
  }

  let status = submitted.status || "IN_QUEUE";
  for (let attempt = 0; attempt < 60; attempt++) {
    if (status === "COMPLETED") break;
    if (status === "FAILED") {
      throw new Error(`fal generation failed: ${JSON.stringify(submitted)}`);
    }
    await sleep(2000);
    const statusRes = await fetch(statusUrl, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });
    if (!statusRes.ok) {
      const err = await statusRes.text();
      throw new Error(`fal status ${statusRes.status}: ${err}`);
    }
    const statusBody = await statusRes.json();
    status = statusBody.status;
    if (attempt % 5 === 0) {
      console.log(`  fal status: ${status}`);
    }
    if (status === "COMPLETED") break;
    if (status === "FAILED") {
      throw new Error(`fal generation failed: ${JSON.stringify(statusBody)}`);
    }
  }

  if (status !== "COMPLETED") {
    throw new Error(`fal timed out waiting for image (last status: ${status})`);
  }

  const resultRes = await fetch(responseUrl, {
    headers: { Authorization: `Key ${FAL_KEY}` },
  });
  if (!resultRes.ok) {
    const err = await resultRes.text();
    throw new Error(`fal result ${resultRes.status}: ${err}`);
  }

  const result = await resultRes.json();
  const imageUrl = result?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`fal result missing image URL: ${JSON.stringify(result)}`);
  }

  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) {
    throw new Error(`Failed to download fal image: ${imageRes.status}`);
  }

  const buffer = Buffer.from(await imageRes.arrayBuffer());
  fs.mkdirSync(GENERATED_IMAGES_DIR, { recursive: true });
  const fileName = `local-${id}.jpg`;
  const filePath = path.join(GENERATED_IMAGES_DIR, fileName);
  fs.writeFileSync(filePath, buffer);
  console.log(`Hero image saved: public/blog/generated/${fileName} (${buffer.length} bytes)`);
  return `/blog/generated/${fileName}`;
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

function getTodayUtc9() {
  const today = new Date();
  today.setUTCHours(9, 0, 0, 0);
  return today;
}

/**
 * Next Mon/Wed/Fri publish slot.
 * Normal mode: never schedules in the past (skips gaps).
 * Catch-up mode (CATCH_UP=1): fills from the latest published date, including past slots up to today.
 */
function getNextPublishDate({ catchUp = false } = {}) {
  const combined = readAllSources();
  const matches = [...combined.matchAll(/publishedAt:\s*"([^"]+)"/g)];
  const latestInFile = new Date(
    Math.max(...matches.map((m) => new Date(m[1]).getTime()))
  );
  const today = getTodayUtc9();
  const start = catchUp
    ? latestInFile
    : latestInFile > today
      ? latestInFile
      : today;
  const d = new Date(start);
  d.setDate(d.getDate() + 1);
  while (![1, 3, 5].includes(d.getDay())) {
    d.setDate(d.getDate() + 1);
  }
  d.setUTCHours(9, 0, 0, 0);
  return d;
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
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_completion_tokens: 16384,
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

function updateManifest(id, post, publishDate, category, imagePath) {
  const image = imagePath || pickImage(category, id);

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

  const catchUp = process.env.CATCH_UP === "1";
  if (catchUp) console.log("Catch-up mode: filling missed Mon/Wed/Fri slots\n");

  const nextId = getNextId();
  console.log(`Next ID: local-${nextId}`);

  const publishDateObj = getNextPublishDate({ catchUp });
  const today = getTodayUtc9();
  if (catchUp && publishDateObj.getTime() > today.getTime()) {
    console.log(
      `Catch-up complete — next slot ${publishDateObj.toISOString()} is after today.`
    );
    process.exit(0);
  }
  const publishDate = publishDateObj.toISOString();
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

  let imagePath = null;
  try {
    imagePath = await generateHeroImageWithFal(
      nextId,
      buildFalImagePrompt(post, topic)
    );
  } catch (err) {
    console.warn(
      `fal image generation failed — falling back to stock image: ${err.message}`
    );
  }

  if (!imagePath) {
    imagePath = pickImage(topic.category, nextId);
    console.log(`Using stock hero image: ${imagePath}`);
  }

  updateManifest(nextId, post, publishDate, topic.category, imagePath);
  console.log("Manifest updated: src/data/generated-posts.ts");

  markTopicUsed(topic);
  console.log("Topic marked as used\n");

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
