import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const iconPath = path.join(projectRoot, "public", "icon.png");
const outPath = path.join(projectRoot, "public", "favicon.ico");

const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((size) =>
    sharp(iconPath)
      .resize(size, size)
      .png()
      .toBuffer()
  )
);

const ico = await pngToIco(pngs);
fs.writeFileSync(outPath, ico);
console.log("Wrote public/favicon.ico");
