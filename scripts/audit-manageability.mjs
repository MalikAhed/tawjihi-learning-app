import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

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

const [
  indexHtml, mainSource, developmentViewsSource, designLoaderSource, designViewSource,
  designManifest, browserSmokeSource, devServerSource, prototypeServiceSource,
  visitorFlowSource, securityHeadersSource,
] = await Promise.all([
  readFile(path.join(projectRoot, "index.html"), "utf8"),
  readFile(path.join(projectRoot, "src/main.js"), "utf8"),
  readFile(path.join(projectRoot, "src/ui/development-views.js"), "utf8"),
  readFile(path.join(projectRoot, "src/ui/design-system-loader.js"), "utf8"),
  readFile(path.join(projectRoot, "src/ui/design-system-view.js"), "utf8"),
  readFile(path.join(projectRoot, "src/styles/design-system.css"), "utf8"),
  readFile(path.join(projectRoot, "scripts/browser-smoke.mjs"), "utf8"),
  readFile(path.join(projectRoot, "dev-server.mjs"), "utf8"),
  readFile(path.join(projectRoot, "src/services/prototype-service.js"), "utf8"),
  readFile(path.join(projectRoot, "src/ui/visitor-flow.js"), "utf8"),
  readFile(path.join(projectRoot, "src/server/security-headers.mjs"), "utf8"),
]);

assert(!indexHtml.includes("design-system.css"), "index.html must not preload the development-only Design System stylesheet");
assert(indexHtml.includes('data-more-tab="ui-lab"'), "More must expose the UI Lab tab");
assert(indexHtml.includes('data-more-tab="ship-ready"'), "More must expose the Ship Ready tab");
assert(indexHtml.includes('data-more-tab="design-system"'), "More must expose the Design System tab");
assert(!indexHtml.includes("prismjs"), "index.html must not preload Prism on routes without code examples");
assert(indexHtml.includes("src/styles/week-theme.css"), "index.html must load the shared week-theme token layer");
assert(mainSource.includes('from "./ui/development-views.js"'), "src/main.js is missing the development-view boundary");
assert(developmentViewsSource.includes('from "./design-system-loader.js"'), "development views are missing the guarded Design System loader");
assert(designLoaderSource.includes('import("./design-system-view.js")'), "the Design System loader is missing its dynamic view import");
assert(!mainSource.includes("openLesson"), "the subject-only product must not expose lesson or day routes yet");
assert(!indexHtml.includes("112"), "the retired 112-day course count must not appear in the product shell");
assert(mainSource.includes("DEVELOPMENT_GALLERY_ENABLED"), "the Design System gallery must remain guarded outside development");
assert(!mainSource.includes("lesson-studio"), "src/main.js still references the removed Lesson Studio");
assert(!indexHtml.includes("game-overview") && !indexHtml.includes("sidebar.css"), "index.html still contains the retired game overview");
assert(!securityHeadersSource.match(/script-src[^\n]*unsafe-inline/), "the development server must not allow inline scripts");
assert(designViewSource.includes("data-markdown-feature"), "the Design System must retain its Markdown-style lesson reference");
assert(designViewSource.includes("mountShowcaseFrames"), "the Design System must retain expandable showcases");
assert((designManifest.match(/@import/g) || []).length === 12, "the Design System manifest must load its twelve owned style modules");

const sourceBudgets = [
  ["src/main.js", mainSource, 300, "extract a cohesive controller"],
  ["dev-server.mjs", devServerSource, 120, "move server concerns into src/server"],
  ["src/services/prototype-service.js", prototypeServiceSource, 220, "extract a service boundary"],
  ["src/ui/visitor-flow.js", visitorFlowSource, 300, "extract markup or a flow controller"],
  ["scripts/browser-smoke.mjs", browserSmokeSource, 550, "extract a stable browser-test helper or scenario"],
];
for (const [file, source, maximum, remedy] of sourceBudgets) {
  const lines = lineCount(source);
  assert(lines <= maximum, `${file} has ${lines} lines; ${remedy} before exceeding the ${maximum}-line growth budget`);
}

for (const retiredFile of [
  "src/styles/sidebar.css",
  "src/ui/course-map-editor.js",
  "src/ui/game-progress.js",
  "src/ui/ui-lab-library.js",
]) {
  try {
    await access(path.join(projectRoot, retiredFile));
    failures.push(`${retiredFile} is retired and should not be restored without a product decision`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

const assetFiles = await collectFiles(path.join(projectRoot, "assets"));
let assetBytes = 0;
let oversizedAssets = 0;
for (const file of assetFiles) {
  const { size } = await stat(file);
  assetBytes += size;
  if (size > 2 * 1024 * 1024) oversizedAssets += 1;
}
if (oversizedAssets) warnings.push(`${oversizedAssets} active assets exceed 2 MiB; optimize deliberately without replacing approved artwork`);

if (failures.length) {
  console.error(`Manageability audit failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Manageability audit passed: runtime entry points stay small, retired UI remains absent, and development views stay lazy.");
console.log(`Runtime asset inventory: ${(assetBytes / 1024 / 1024).toFixed(1)} MiB across ${assetFiles.length} files.`);
warnings.forEach((warning) => console.warn(`Manageability warning: ${warning}.`));
