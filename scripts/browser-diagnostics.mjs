import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";

// Isolated test pages only. Keep five failure bundles, with no form/account payloads.
export async function createFailureDirectory(name) {
  const root = path.join(tmpdir(), "learn-browser-failures");
  await mkdir(root, { recursive:true });
  const previous = (await readdir(root)).sort();
  for (const entry of previous.slice(0, Math.max(0, previous.length - 4))) await rm(path.join(root, entry), { recursive:true, force:true });
  const directory = path.join(root, `${Date.now()}-${name.replace(/[^a-z0-9-]/gi, "-").slice(0, 70)}`);
  await mkdir(directory);
  return directory;
}

export async function saveBrowserFailure({ send, name, error, failures = [] }) {
  const directory = await createFailureDirectory(name);
  const page = await send("Runtime.evaluate", { expression:`({route:location.pathname+location.search,mode:document.querySelector('meta[name=learn-account-mode]')?.content,viewport:{width:innerWidth,height:innerHeight},focus:document.activeElement?.tagName,pending:[...document.querySelectorAll('[aria-busy=true],.media-pending')].map(e=>e.className)})`, returnByValue:true }).catch(() => null);
  const evidence = { name, expected:error?.message || String(error), actual:page?.result?.value || "Browser did not respond", failures:failures.slice(-20) };
  await writeFile(path.join(directory, "failure.json"), JSON.stringify(evidence, null, 2));
  const screenshot = await send("Page.captureScreenshot", { format:"png" }).catch(() => null);
  if (screenshot?.data) await writeFile(path.join(directory, "failure.png"), Buffer.from(screenshot.data, "base64"));
  console.error(`Browser failure evidence: ${directory}\n${JSON.stringify(evidence)}`);
}
