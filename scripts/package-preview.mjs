import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const previewDirectory = path.join(root, "_site");
export async function packagePreview() {
  await rm(previewDirectory, { recursive:true, force:true });
  await mkdir(previewDirectory, { recursive:true });
  for (const entry of ["src", "assets", ".nojekyll"]) {
    await cp(path.join(root, entry), path.join(previewDirectory, entry), {
      recursive:true, filter:(source) => source !== path.join(root, "src/server"),
    });
  }
  const html = (await readFile(path.join(root, "index.html"), "utf8"))
    .replace('<meta name="learn-account-mode" content="http" />', '<meta name="learn-account-mode" content="fixture" />');
  if (!html.includes('name="learn-account-mode" content="fixture"')) throw new Error("Static preview requires explicit fixture mode.");
  await writeFile(path.join(previewDirectory, "index.html"), html);
  for (const dependency of ["dompurify/dist/purify.es.mjs", "@highlightjs/cdn-assets/es/highlight.min.js", "marked/lib/marked.esm.js", "@vscode/codicons/dist/codicon.ttf"]) {
    const target = path.join(previewDirectory, "node_modules", dependency);
    await mkdir(path.dirname(target), { recursive:true });
    await cp(path.join(root, "node_modules", dependency), target);
  }
  console.log(`Packaged fixture preview: ${previewDirectory}`);
  return previewDirectory;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await packagePreview();
