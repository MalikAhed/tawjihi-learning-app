import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function lineCount(source) {
  return source.split(/\r?\n/).length - (source.endsWith("\n") ? 1 : 0);
}

async function collectFiles(directory, result = []) {
  for (const entry of await readdir(directory, { withFileTypes:true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectFiles(target, result);
    else result.push(target);
  }
  return result;
}

// Behavior belongs in Node/browser tests; this report only helps review ownership.
const sourceFiles = [path.join(projectRoot, "dev-server.mjs")];
for (const directory of ["src", "scripts"]) {
  sourceFiles.push(...await collectFiles(path.join(projectRoot, directory)));
}
const sources = [];
for (const file of sourceFiles.filter((file) => /\.(?:js|mjs|css)$/.test(file))) {
  const source = await readFile(file, "utf8");
  sources.push({ file: path.relative(projectRoot, file), lines: lineCount(source), bytes: Buffer.byteLength(source) });
}
sources.sort((a, b) => b.lines - a.lines || a.file.localeCompare(b.file));
console.log(`Manageability inventory: ${sources.length} source files (advisory).`);
console.log("Largest files by line count; review responsibilities before deciding to split:");
for (const { file, lines, bytes } of sources.slice(0, 5)) {
  console.log(`- ${file}: ${lines} lines, ${(bytes / 1024).toFixed(1)} KiB`);
}

const assetFiles = await collectFiles(path.join(projectRoot, "assets"));
let assetBytes = 0;
let oversizedAssets = 0;
for (const file of assetFiles) {
  const { size } = await stat(file);
  assetBytes += size;
  if (size > 2 * 1024 * 1024) oversizedAssets += 1;
}
console.log(`Runtime asset inventory: ${(assetBytes / 1024 / 1024).toFixed(1)} MiB across ${assetFiles.length} files.`);
if (oversizedAssets) console.warn(`Manageability warning: ${oversizedAssets} active assets exceed 2 MiB; optimize deliberately without replacing approved artwork.`);
