import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sourcePath = path.join(publicDir, "figures-favicon-source.png");

// Generate .ico (16, 32, 48) for browser favicon
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((size) =>
    sharp(sourcePath).resize(size, size).png().toBuffer()
  )
);
const ico = await pngToIco(pngs);
fs.writeFileSync(path.join(publicDir, "figures-favicon.ico"), ico);
console.log("Wrote public/figures-favicon.ico");

// Copy source as PNG for Apple touch icon (same image, no resize)
fs.copyFileSync(sourcePath, path.join(publicDir, "figures-icon.png"));
console.log("Wrote public/figures-icon.png");
