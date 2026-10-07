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

// Behavioral tests own correctness. Budgets catch accidental repository growth;
// change them deliberately when a real content/feature requirement warrants it.
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

const failures = [];
// The published course now spans seven subject paths with source-grounded
// figures. Full source archives stay separate from the runtime package.
if (assetBytes > 64 * 1024 * 1024) failures.push("Runtime assets exceed the 64 MiB question-course budget. Review compression and runtime use before adding large files.");
const rootDocuments = (await readdir(projectRoot)).filter(name => name.endsWith(".md"));
for (const name of rootDocuments) {
  if (!["README.md", "AGENTS.md", "SECURITY.md"].includes(name)) failures.push(`${name}: update an existing guide in docs/ instead of adding a root handoff/plan.`);
}
const documents = (await collectFiles(path.join(projectRoot, "docs"))).filter(file => file.endsWith(".md"));
let documentBytes = 0;
for (const file of [...documents, ...rootDocuments.map(name => path.join(projectRoot, name))]) documentBytes += (await stat(file)).size;
console.log(`Documentation: ${documents.length} guides + ${rootDocuments.length} entry documents, ${(documentBytes / 1024).toFixed(1)} KiB.`);
if (documents.length > 12 || documentBytes > 160 * 1024) failures.push("Documentation exceeds 12 guides or 160 KiB. Consolidate repeated guidance; keep task history in Git/PRs.");
const manifest = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"));
const { PUBLIC_DEPENDENCIES } = await import("../src/server/static-files.mjs");
const packagedDependencies = new Set([...PUBLIC_DEPENDENCIES].map(file => {
  const parts = file.split("/").slice(2);
  return parts.slice(0, parts[0].startsWith("@") ? 2 : 1).join("/");
}));
for (const dependency of Object.keys(manifest.dependencies || {})) {
  if (!packagedDependencies.has(dependency)) failures.push(`${dependency}: runtime dependencies must have an explicit packaging/serving decision.`);
}
if (failures.length) {
  console.error(`Manageability checks failed:\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
}
