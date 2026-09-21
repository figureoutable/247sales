#!/usr/bin/env node
/**
 * One-off: regenerate hero images for specific local-* IDs with the updated fal style prompt.
 * Usage: node scripts/regenerate-hero-images.mjs 98 99 100 101 102
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FAL_MODEL = "fal-ai/flux/dev";

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

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY");
  process.exit(1);
}

const HERO_IMAGE_VISUAL_RULES = `Blog hero image — global style (apply every time):
- Prefer OUTDOOR UK scenes in soft natural daylight (high street, pavement outside offices, worksite exterior, cafe terrace, brick commercial buildings, shop fronts, yards).
- Natural, realistic colours — not oversaturated, neon, or heavily colour-graded.
- People: aim for people in about two out of every three images. When included, casual or everyday workwear only — never corporate suits.
- Scenes without people can use places, buildings, tools, vehicles, or props that fit the topic.
- Avoid indoor desk setups, glowing laptop/monitor screens, green backlights, and studio lighting.
- Avoid forced navy/cobalt/coral schemes and cinematic teal-and-orange grading.
- Suitable for a wide 16:9 web hero; clear subject, simple composition.`;

const FAL_STYLE_BASE = [
  "Editorial wide 16:9 blog hero photograph for a UK accounting firm website.",
  "OUTDOOR scene only: UK high street, pavement outside offices, worksite exterior, shop front, yard, or similar real-world location.",
  "Soft natural daylight, natural realistic colours — not oversaturated or heavily colour-graded.",
  "No indoor offices, no desks, no laptop or monitor screens, no green glow, no studio lighting.",
  "Avoid cinematic teal-and-orange grading, neon saturation, and forced navy, cobalt, or coral colour schemes.",
  "No text, logos, or watermarks.",
];

/** About 2 in 3 posts include people; every 3rd id is place/props only. */
function shouldIncludePeople(id) {
  return id % 3 !== 0;
}

function falStyleForId(id) {
  const peopleLine = shouldIncludePeople(id)
    ? "Include 1-2 people in casual or everyday workwear (jeans, jumpers, coats, hi-vis if relevant) — NEVER business suits, blazers, ties, or boardroom attire."
    : "Do NOT include any people. Focus on place, architecture, vehicles, tools, or props only.";
  return [...FAL_STYLE_BASE.slice(0, 3), peopleLine, ...FAL_STYLE_BASE.slice(3)].join(" ");
}

const OUTDOOR_SCENES = {
  // 100 % 3 = 1 → people (casual)
  100: "A man and a woman in casual UK high-street clothes (jeans, jumpers, coats — not suits) standing outside small brick shop fronts on a British pavement, looking at a folder of papers together, soft natural daylight, realistic natural colours, no computers or screens.",
  // 102 % 3 = 0 → no people
  102: "Outdoor UK business park courtyard between red brick commercial buildings in soft natural daylight, planters and a courier van in the distance suggesting cross-border trade, realistic natural colours, completely empty of people, no computers or screens.",
};

function softenScene(scene) {
  return scene
    .replace(/\bhigh[- ]saturation\b/gi, "natural colour")
    .replace(/\bvivid(?:ly)?\b/gi, "natural")
    .replace(/\bvibrant(?:ly)?\b/gi, "natural")
    .replace(/\bindoor\b/gi, "outdoor")
    .replace(/\bdesk\b/gi, "clipboard")
    .replace(/\blaptop\b/gi, "folder of papers")
    .replace(/\bmonitor\b/gi, "clipboard")
    .replace(/\bscreen\b/gi, "papers")
    .replace(/\bcobalt(?:-blue)?\b/gi, "blue")
    .replace(/\bnavy\b/gi, "dark blue")
    .replace(/\bteal\b/gi, "soft blue")
    .replace(/\bneon\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractScene(promptText) {
  const marker = "Scene and composition:";
  const idx = promptText.indexOf(marker);
  if (idx >= 0) return promptText.slice(idx + marker.length).trim();
  return promptText.trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateFalImage(prompt) {
  const authHeaders = {
    Authorization: `Key ${FAL_KEY}`,
    "Content-Type": "application/json",
  };

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
    throw new Error(`fal submit ${submitRes.status}: ${await submitRes.text()}`);
  }

  const submitted = await submitRes.json();
  const { status_url: statusUrl, response_url: responseUrl } = submitted;
  if (!statusUrl || !responseUrl) {
    throw new Error(`fal submit missing urls: ${JSON.stringify(submitted)}`);
  }

  let status = submitted.status || "IN_QUEUE";
  for (let attempt = 0; attempt < 60; attempt++) {
    if (status === "COMPLETED") break;
    if (status === "FAILED") {
      throw new Error(`fal failed: ${JSON.stringify(submitted)}`);
    }
    await sleep(2000);
    const statusRes = await fetch(statusUrl, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });
    if (!statusRes.ok) {
      throw new Error(`fal status ${statusRes.status}: ${await statusRes.text()}`);
    }
    const statusBody = await statusRes.json();
    status = statusBody.status;
    if (status === "FAILED") {
      throw new Error(`fal failed: ${JSON.stringify(statusBody)}`);
    }
  }
  if (status !== "COMPLETED") {
    throw new Error(`fal timed out (last status: ${status})`);
  }

  const resultRes = await fetch(responseUrl, {
    headers: { Authorization: `Key ${FAL_KEY}` },
  });
  if (!resultRes.ok) {
    throw new Error(`fal result ${resultRes.status}: ${await resultRes.text()}`);
  }
  const result = await resultRes.json();
  const imageUrl = result?.images?.[0]?.url;
  if (!imageUrl) throw new Error(`missing image url: ${JSON.stringify(result)}`);

  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) throw new Error(`download failed: ${imageRes.status}`);
  return Buffer.from(await imageRes.arrayBuffer());
}

async function regenerate(id) {
  const promptPath = path.join(ROOT, "scripts/hero-image-prompts", `local-${id}.txt`);
  // Prefer *b.jpg cache-bust names when present in the site manifest pattern
  const bPath = path.join(ROOT, "public/blog/generated", `local-${id}b.jpg`);
  const plainPath = path.join(ROOT, "public/blog/generated", `local-${id}.jpg`);
  const imagePath = fs.existsSync(bPath) || process.env.FORCE_B_SUFFIX === "1" ? bPath : plainPath;
  if (!fs.existsSync(promptPath)) {
    throw new Error(`missing prompt file: ${promptPath}`);
  }

  const oldPrompt = fs.readFileSync(promptPath, "utf8");
  const scene =
    OUTDOOR_SCENES[id] ||
    softenScene(extractScene(oldPrompt));
  const falPrompt = `${falStyleForId(id)} ${scene}`;
  const savedPrompt = `${HERO_IMAGE_VISUAL_RULES}\n\nScene and composition:\n${scene}\n`;

  console.log(`\n=== local-${id} (${shouldIncludePeople(id) ? "with people" : "no people"}) ===`);
  console.log(`Fal prompt: ${falPrompt.slice(0, 180)}...`);
  const buffer = await generateFalImage(falPrompt);
  fs.writeFileSync(imagePath, buffer);
  fs.writeFileSync(promptPath, savedPrompt);
  console.log(`Saved ${path.relative(ROOT, imagePath)} (${buffer.length} bytes)`);
}

const ids = process.argv.slice(2).map((x) => parseInt(x, 10)).filter(Boolean);
if (ids.length === 0) {
  console.error("Pass local IDs, e.g. node scripts/regenerate-hero-images.mjs 98 99 100 101 102");
  process.exit(1);
}

for (const id of ids) {
  await regenerate(id);
}
console.log("\nDone.");
