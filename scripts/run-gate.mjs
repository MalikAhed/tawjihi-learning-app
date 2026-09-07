import { spawn } from "node:child_process";

const scope = process.argv[2] || "verify";
const shortcuts = Object.keys(process.env).filter((key) =>
  (/^BROWSER_.*_ONLY$/.test(key) || ["BROWSER_SCREENSHOT_FILTER", "BROWSER_RENDER_BASELINE"].includes(key)) && process.env[key] && process.env[key] !== "0");
if (shortcuts.length) throw new Error(`The ${scope} gate cannot run with scope-shortening flags: ${shortcuts.join(", ")}. Use a focused test command instead.`);
const commands = ["check", "test:a11y", "test:ui-fixes", "test:progress-storage", "test:render", "test:assets"];
if (scope === "release") commands.push("package:preview", "test:preview", "test:compat");
console.log(`Gate scope: ${scope}; ${commands.join(" → ")}. Chromium uses isolated HTTP accounts; preview/compat also test the packaged fixture mode.`);
for (const command of commands) {
  const status = await new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", command], { stdio:"inherit", env:process.env });
    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });
  if (status !== 0) process.exit(Number(status));
}
console.log(`${scope} gate passed in full.`);
