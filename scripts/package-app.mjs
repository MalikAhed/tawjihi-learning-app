import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_DEPENDENCIES } from "../src/server/static-files.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const previewDirectory = path.join(root, "_site");
const runtimeExtensions = new Set([".js", ".mjs", ".css", ".html", ".json", ".png", ".jpg", ".jpeg", ".svg", ".webp", ".ttf", ".woff", ".woff2"]);

async function includeRuntimeFile(source) {
  if (source === path.join(root, "src/server")) return false;
  if ((await stat(source)).isDirectory()) return true;
  const name = path.basename(source);
  // Coverage ledgers and crop provenance are authoring evidence, not runtime data.
  if (path.extname(source) === ".json" && source !== path.join(root, "assets/app/manifest.json")) return false;
  if ([".nojekyll", "OFL.txt", "SOURCES.md"].includes(name)) return true;
  return runtimeExtensions.has(path.extname(name)) && !name.endsWith(".scene.json");
}

export async function packageApp({ server = false } = {}) {
  const outputDirectory = server ? path.join(root, "_server") : previewDirectory;
  await rm(outputDirectory, { recursive:true, force:true });
  await mkdir(outputDirectory, { recursive:true });
  for (const entry of ["src", "assets", ".nojekyll"]) {
    await cp(path.join(root, entry), path.join(outputDirectory, entry), {
      recursive:true, filter:includeRuntimeFile,
    });
  }
  const mode = server ? "http" : "fixture";
  let html = (await readFile(path.join(root, "index.html"), "utf8"))
    .replace('<meta name="learn-account-mode" content="http" />', `<meta name="learn-account-mode" content="${mode}" />`);
  if (!html.includes(`name="learn-account-mode" content="${mode}"`)) throw new Error(`Package requires explicit ${mode} account mode.`);
  await writeFile(path.join(outputDirectory, "index.html"), html);
  if (server) {
    await cp(path.join(root, "src/server"), path.join(outputDirectory, "src/server"), { recursive:true });
    await cp(path.join(root, "server.mjs"), path.join(outputDirectory, "server.mjs"));
    const { name, engines } = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
    await writeFile(path.join(outputDirectory, "package.json"), JSON.stringify({ name, private:true, type:"module", engines, scripts:{ start:"node server.mjs" } }, null, 2) + "\n");
  }
  const packages = new Set();
  for (const dependency of PUBLIC_DEPENDENCIES) {
    const relative = dependency.slice(1);
    const target = path.join(outputDirectory, relative);
    await mkdir(path.dirname(target), { recursive:true });
    await cp(path.join(root, relative), target);
    const segments = relative.split("/");
    packages.add(segments.slice(0, segments[1].startsWith("@") ? 3 : 2).join("/"));
  }
  for (const directory of packages) {
    for (const name of await readdir(path.join(root, directory))) {
      if (/^(?:LICEN[CS]E|COPYING|NOTICE)(?:[.-]|$)/i.test(name)) {
        await cp(path.join(root, directory, name), path.join(outputDirectory, directory, name));
      }
    }
  }
  let bytes = 0;
  const entries = await readdir(outputDirectory, { recursive:true, withFileTypes:true });
  const files = entries.filter(entry => entry.isFile());
  for (const file of files) bytes += (await stat(path.join(file.parentPath, file.name))).size;
  // Original documents stay in the source archive; student delivery stays small.
  if (bytes > 25 * 1024 * 1024) throw new Error("Packaged app exceeds the 25 MiB lightweight budget. Review asset use before deliberately adjusting the budget.");
  console.log(`Packaged ${mode} app: ${outputDirectory} (${files.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MiB)`);
  return outputDirectory;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await packageApp({ server:process.argv.includes("--server") });
