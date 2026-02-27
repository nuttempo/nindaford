import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_DIR = path.resolve("src/assets/images");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".JPG", ".JPEG", ".png", ".PNG"]);

async function getImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getImageFiles(fullPath);
      }
      if (!EXTENSIONS.has(path.extname(entry.name))) {
        return [];
      }
      return [fullPath];
    })
  );

  return files.flat();
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function convertToWebp(filePath) {
  const outputPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
  const inputStat = await fs.stat(filePath);

  await sharp(filePath)
    .rotate()
    .webp({ quality: 78, effort: 5 })
    .toFile(outputPath);

  const outputStat = await fs.stat(outputPath);
  const savedBytes = inputStat.size - outputStat.size;

  return {
    filePath,
    outputPath,
    inputSize: inputStat.size,
    outputSize: outputStat.size,
    savedBytes,
  };
}

async function run() {
  const files = await getImageFiles(IMAGE_DIR);

  if (files.length === 0) {
    console.log("No JPG/PNG files found.");
    return;
  }

  const results = [];
  for (const filePath of files) {
    const result = await convertToWebp(filePath);
    results.push(result);
    console.log(
      `${path.basename(result.filePath)} -> ${path.basename(result.outputPath)} (${formatKB(result.inputSize)} -> ${formatKB(result.outputSize)})`
    );
  }

  const totalInput = results.reduce((sum, item) => sum + item.inputSize, 0);
  const totalOutput = results.reduce((sum, item) => sum + item.outputSize, 0);
  const saved = totalInput - totalOutput;
  const percent = totalInput > 0 ? (saved / totalInput) * 100 : 0;

  console.log(`\nConverted ${results.length} file(s).`);
  console.log(`Total: ${formatKB(totalInput)} -> ${formatKB(totalOutput)} (saved ${formatKB(saved)}, ${percent.toFixed(1)}%)`);
}

run().catch((error) => {
  console.error("Image conversion failed:", error);
  process.exit(1);
});
