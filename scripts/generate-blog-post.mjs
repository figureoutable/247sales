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
- Prefer OUTDOOR UK scenes in soft natural daylight (high street, pavement outside offices, worksite exterior, cafe terrace, brick commercial buildings, shop fronts, yards).
- Natural, realistic colours — not oversaturated, neon, or heavily colour-graded.
- People: aim for people in about two out of every three images. When included, casual or everyday workwear only — never corporate suits.
- Scenes without people can use places, buildings, tools, vehicles, or props that fit the topic.
- Avoid indoor desk setups, glowing laptop/monitor screens, green backlights, and studio lighting.
- Avoid forced navy/cobalt/coral schemes and cinematic teal-and-orange grading.
- Suitable for a wide 16:9 web hero; clear subject, simple composition.`;

function getHeroScene(post, topic) {
  if (typeof post.heroImagePrompt === "string" && post.heroImagePrompt.trim()) {
    return post.heroImagePrompt.trim();
  }
  return `Outdoor UK editorial photo related to: ${topic.topic}. Soft natural daylight, natural colours. No computer screens.`;
}

function buildHeroImagePrompt(post, topic) {
  return `${HERO_IMAGE_VISUAL_RULES}\n\nScene and composition:\n${getHeroScene(post, topic)}`;
}

/** About 2 in 3 posts include people (casual wear); every 3rd is place/props only. */
function shouldIncludePeople(id) {
  return id % 3 !== 0;
}

/** Shorter prose prompt works better for fal/Flux than the bullet-style rules doc. */
function buildFalImagePrompt(post, topic, id) {
  const withPeople = shouldIncludePeople(id);
  const peopleLine = withPeople
    ? "Include 1-2 people in casual or everyday workwear (jeans, jumpers, hi-vis if relevant) — NEVER business suits, blazers, ties, or boardroom attire."
    : "Do NOT include any people. Focus on place, architecture, vehicles, tools, or props only.";

  return [
    "Editorial wide 16:9 blog hero photograph for a UK accounting firm website.",
    "OUTDOOR scene only: UK high street, pavement outside offices, worksite exterior, shop front, yard, or similar real-world location.",
    "Soft natural daylight, natural realistic colours — not oversaturated or heavily colour-graded.",
    peopleLine,
    "No indoor offices, no desks, no laptop or monitor screens, no green glow, no studio lighting.",
    "Avoid cinematic teal-and-orange grading, neon saturation, and forced navy, cobalt, or coral colour schemes.",
    "No text, logos, or watermarks.",
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

function getExistingTopicsList() {
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  return topics.map((t) => t.topic);
}

/** UK tax year label, e.g. 2026/27 (runs 6 April → 5 April). */
function getCurrentUkTaxYear(date = new Date()) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-11
  const day = date.getUTCDate();
  const startedThisCalendarYear = month > 3 || (month === 3 && day >= 6);
  const startYear = startedThisCalendarYear ? year : year - 1;
  const endYearShort = String(startYear + 1).slice(-2);
  return `${startYear}/${endYearShort}`;
}

function parseJsonContent(content) {
  let text = content.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(text);
}

async function openaiJson(messages, { maxCompletionTokens = 4096 } = {}) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      messages,
      max_completion_tokens: maxCompletionTokens,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${err}`);
  }
  const data = await res.json();
  return parseJsonContent(data.choices[0].message.content);
}

/* ---------- topic queue (auto-researches forever) ---------- */

const CATEGORIES = [
  "Tax",
  "Compliance",
  "VAT",
  "Payroll",
  "Bookkeeping",
  "Cash Flow",
  "Reporting",
  "FP&A",
  "Systems",
  "Leadership",
];

const TOPIC_TOP_UP = 20;
const TOPIC_MIN_UNUSED = 5;

function countUnusedTopics() {
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  return topics.filter((t) => !t.used).length;
}

async function researchNewTopics(count, existingTopics, existingTitles) {
  console.log(`Researching ${count} new blog topics...`);
  const taxYear = getCurrentUkTaxYear();
  const todayIso = new Date().toISOString().slice(0, 10);

  const result = await openaiJson(
    [
      {
        role: "system",
        content: `You research SEO blog topics for Figures, a UK accounting firm serving small businesses, founders and limited company directors.

Return ONLY valid JSON (no markdown fences) as:
{ "topics": [ { "topic": string, "primaryKeyword": string, "secondaryKeywords": [string, string, string], "category": string } ] }

Rules:
- Topics must be timely for today (${todayIso}) and UK tax year ${taxYear}
- Prefer practical how-to / explainer angles on current HMRC, Companies House, payroll, VAT, corporation tax, MTD, and finance ops
- Avoid near-duplicates of existing topics or titles
- category must be one of: ${CATEGORIES.join(", ")}
- primaryKeyword should be a natural UK search phrase
- Keep topic titles clear and specific (include UK where helpful)`,
      },
      {
        role: "user",
        content: `Propose ${count} new unused blog topics.

Existing topics (do not repeat):
${existingTopics.map((t) => `- ${t}`).join("\n")}

Existing published titles (do not overlap):
${existingTitles.map((t) => `- ${t}`).join("\n")}`,
      },
    ],
    { maxCompletionTokens: 8192 }
  );

  const raw = Array.isArray(result.topics) ? result.topics : [];
  const existingLower = new Set(existingTopics.map((t) => t.toLowerCase()));
  const cleaned = [];
  for (const item of raw) {
    if (!item?.topic || !item?.primaryKeyword || !item?.category) continue;
    const topic = String(item.topic).trim();
    if (existingLower.has(topic.toLowerCase())) continue;
    if (!CATEGORIES.includes(item.category)) continue;
    const secondary = Array.isArray(item.secondaryKeywords)
      ? item.secondaryKeywords.map(String).slice(0, 3)
      : [];
    while (secondary.length < 3) secondary.push(item.primaryKeyword);
    cleaned.push({
      topic,
      primaryKeyword: String(item.primaryKeyword).trim(),
      secondaryKeywords: secondary,
      category: item.category,
      used: false,
    });
    existingLower.add(topic.toLowerCase());
  }
  if (cleaned.length === 0) {
    throw new Error("Topic research returned no usable topics");
  }
  return cleaned;
}

async function ensureTopicSupply() {
  let unused = countUnusedTopics();
  if (unused >= TOPIC_MIN_UNUSED) return;

  const existingTopics = getExistingTopicsList();
  const existingTitles = getExistingTitles();
  const needed = Math.max(TOPIC_TOP_UP, TOPIC_MIN_UNUSED - unused);
  const fresh = await researchNewTopics(needed, existingTopics, existingTitles);
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  topics.push(...fresh);
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + "\n");
  console.log(
    `Added ${fresh.length} researched topics (${countUnusedTopics()} unused now)`
  );
}

async function getNextTopic() {
  await ensureTopicSupply();
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  return topics.find((t) => !t.used) ?? null;
}

function markTopicUsed(topic) {
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
  const match = topics.find((t) => t.topic === topic.topic);
  if (match) match.used = true;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + "\n");
}

/* ---------- GOV.UK research ---------- */

async function fetchGovUkSources(query) {
  try {
    const url = `https://www.gov.uk/api/search.json?count=5&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.warn(`GOV.UK search ${res.status} — continuing without live sources`);
      return [];
    }
    const data = await res.json();
    const results = Array.isArray(data.results) ? data.results : [];
    return results.slice(0, 5).map((r) => ({
      title: r.title || "GOV.UK",
      link: r.link?.startsWith("http")
        ? r.link
        : `https://www.gov.uk${r.link || ""}`,
      description: (r.description || "").replace(/\s+/g, " ").trim(),
    }));
  } catch (err) {
    console.warn(`GOV.UK search failed — continuing: ${err.message}`);
    return [];
  }
}

/* ---------- OpenAI ---------- */

function buildSystemPrompt() {
  const taxYear = getCurrentUkTaxYear();
  const todayIso = new Date().toISOString().slice(0, 10);
  return `You are an expert SEO content writer for Figures, a UK accounting and advisory firm based in Surrey. Write blog posts for UK small business owners, founders, and limited company directors.

Today's date: ${todayIso}
Current UK tax year: ${taxYear}

Currency / accuracy rules:
- Prefer the latest published UK rules, rates and thresholds for tax year ${taxYear}
- When live GOV.UK sources are provided in the user message, align the article with them and link to them
- Do not invent precise rates, thresholds or deadlines. If unsure, state the principle and tell readers to confirm on GOV.UK or with an accountant
- Call out recent or upcoming changes (MTD, rates, allowances, filings) where relevant

Strict rules:
- Write in UK English (e.g. "organise" not "organize", "colour" not "color", "recognise" not "recognize")
- Minimum 1,500 words
- Use markdown: ## for H2, ### for H3, **bold** for emphasis
- Put a blank line before and after every heading
- Use bullet lists (- item) for any list of 2+ points; never write list items as plain paragraphs
- Use short paragraphs (2-4 sentences). Avoid long walls of text
- NO em dashes. Use en dashes or restructure the sentence
- NO curly/smart quotes. Use straight apostrophes and straight double quotes only
- NO backtick characters anywhere in the output
- Do NOT start with an H1 heading (the title is rendered separately by the app)
- Start with a strong opening paragraph (2-3 sentences) that includes the primary keyword naturally

Required sections in order:
1. Opening paragraphs introducing the topic
2. Several H2 sections covering the topic in depth (use H3 for subsections where helpful)
3. "## UK tax and legal accuracy" - disclaimer noting "This article is for informational purposes only and does not constitute professional tax or financial advice. Please speak to a qualified accountant before taking action." Explicitly name tax year ${taxYear}.
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
- Prefer an OUTDOOR UK scene in soft natural daylight that fits the article topic.
- Natural realistic colours — not neon, not oversaturated, not cinematic colour grading.
- People are optional. You may describe places, buildings, vehicles, tools, or props instead.
- If people appear, use casual or everyday workwear — not suits.
- Do NOT describe indoor desks, laptops, monitors, or green screen glow.
- Tie the scene to the article topic and UK small business context.`;
}

async function generatePost(topic, existingTitles, govSources) {
  const taxYear = getCurrentUkTaxYear();
  const sourcesBlock =
    govSources.length > 0
      ? `Live GOV.UK sources to prefer (link to at least one in the article):\n${govSources
          .map(
            (s, i) =>
              `${i + 1}. ${s.title}\n   ${s.link}\n   ${s.description}`
          )
          .join("\n")}`
      : "No live GOV.UK results were fetched — still include at least one accurate GOV.UK link if you know a stable URL for this topic.";

  const userPrompt = `Write a blog post about: ${topic.topic}

Primary keyword: ${topic.primaryKeyword}
Secondary keywords: ${topic.secondaryKeywords.join(", ")}
Category: ${topic.category}
UK tax year to use: ${taxYear}

${sourcesBlock}

Existing blog post titles (avoid overlap):
${existingTitles.map((t) => `- ${t}`).join("\n")}

Return ONLY a valid JSON object (no markdown fences, no explanation) with these fields:
{
  "title": "SEO title including the primary keyword (50-65 chars)",
  "slug": "url-friendly-slug-with-keyword",
  "excerpt": "Meta description with primary keyword (150-160 characters)",
  "body": "Full markdown body (1500+ words, no H1, opening paragraph first)",
  "heroImagePrompt": "One paragraph: outdoor UK natural-daylight scene matching this article (no indoor screens)"
}`;

  return openaiJson(
    [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: userPrompt },
    ],
    { maxCompletionTokens: 16384 }
  );
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

  const topic = await getNextTopic();
  if (!topic) {
    console.error("Failed to obtain a topic after research");
    process.exit(1);
  }
  console.log(`Topic: ${topic.topic}`);
  console.log(`Primary keyword: ${topic.primaryKeyword}`);
  console.log(`UK tax year: ${getCurrentUkTaxYear()}\n`);

  console.log("Fetching GOV.UK sources...");
  const govSources = await fetchGovUkSources(
    `${topic.primaryKeyword} ${topic.topic}`
  );
  if (govSources.length) {
    console.log(`Found ${govSources.length} GOV.UK results`);
  }

  console.log("Calling OpenAI...");
  const post = await generatePost(topic, getExistingTitles(), govSources);
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
      buildFalImagePrompt(post, topic, nextId)
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
