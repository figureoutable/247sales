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
- Aim for naturally colourful, inviting photography with real-world colours — not oversaturated or heavily colour-graded.
- Keep the scene bright, friendly, and professional for a UK small-business audience.
- Avoid dull beige-only, grey-washed, or monochrome stock-office looks.
- Avoid forced navy/cobalt/coral schemes, cinematic teal-and-orange grading, and neon saturation.
- Suitable for a wide 16:9 or 3:2 web hero; clear subject, simple composition.`;

const FAL_STYLE = [
  "Editorial wide 16:9 blog hero photograph for a UK accounting firm website.",
  "Naturally colourful and inviting with real-world colours — not oversaturated or heavily colour-graded.",
  "Bright, friendly, professional UK small-business context.",
  "Avoid dull beige-only, grey-washed, or monochrome stock-office looks.",
  "Avoid cinematic teal-and-orange grading, neon saturation, and forced navy, cobalt, or coral colour schemes.",
  "No text, logos, watermarks, or readable UI screens.",
].join(" ");

function softenScene(scene) {
  return scene
    .replace(/\bhigh[- ]saturation\b/gi, "natural colour")
    .replace(/\bvivid(?:ly)?\b/gi, "colourful")
    .replace(/\bvibrant(?:ly)?\b/gi, "colourful")
    .replace(/\bcobalt(?:-blue)?\b/gi, "blue")
    .replace(/\bnavy\b/gi, "blue")
    .replace(/\bteal\b/gi, "green")
    .replace(/\bemerald\b/gi, "green")
    .replace(/\bcoral\b/gi, "warm")
    .replace(/\bamber\b/gi, "warm")
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
  const imagePath = path.join(ROOT, "public/blog/generated", `local-${id}.jpg`);
  if (!fs.existsSync(promptPath)) {
    throw new Error(`missing prompt file: ${promptPath}`);
  }

  const oldPrompt = fs.readFileSync(promptPath, "utf8");
  const scene = softenScene(extractScene(oldPrompt));
  const falPrompt = `${FAL_STYLE} ${scene}`;
  const savedPrompt = `${HERO_IMAGE_VISUAL_RULES}\n\nScene and composition:\n${scene}\n`;

  console.log(`\n=== local-${id} ===`);
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
