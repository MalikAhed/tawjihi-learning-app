import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";

// Optional refactor evidence: compare the archived stylesheet on the same DOM.
// Supply the pre-change CSS path; animation/transition state is excluded.
const original = await readFile(process.env.CSS_BASELINE || "artifacts/refactor-2026-09-06/styles/lesson-before.css", "utf8");
const checks = [];
const system = process.env.CSS_OWNER === "system";
await withBrowserPage(async ({ base, send, evaluate, waitFor }) => {
  for (const width of [1440, 390, 320]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:false });
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"reduce"}] });
    for (const view of (system ? ["design-system","ui-lab","home"] : ["ship-ready", "ship-ready-mcq", "ship-ready-response", "ship-ready-sequence", "ship-ready-fill-blanks", "ship-ready-spot-bug"])) {
      await send("Page.navigate", { url:base + (view === "home" ? "?page=learn" : "?view=" + view) });
      await waitFor(system ? "document.querySelector('.current-system .system-hero, .playground, .subject-map') && !document.querySelector('.app-loading, .media-pending')" : "document.querySelector('.level-layout-preview') && !document.querySelector('.app-loading')");
      const differences = await evaluate(`(async () => {
        const links = [...document.querySelectorAll('link[rel=stylesheet]')].filter(link => ${system ? "/styles\\/(?:system|current-system|playground)\\.css/" : "/styles\\/lesson(?:\\.css|\\/)/"}.test(link.href));
        const baseline = document.createElement('style');
        baseline.textContent = ${JSON.stringify(original)};
        links[0].before(baseline);
        baseline.disabled = true;
        const nodes = [...document.querySelectorAll(${JSON.stringify(system ? 'main,main *,.playground,.playground *' : '#lesson-content, #lesson-content *')})];
        const snapshot = () => nodes.map(node => {
          const style = getComputedStyle(node);
          return Object.fromEntries([...style].filter(key => !key.startsWith("--") && !/animation|transition/.test(key)).map(key => [key, style.getPropertyValue(key)]));
        });
        const current = snapshot();
        links.forEach(link => { link.disabled = true; });
        baseline.disabled = false;
        const before = snapshot();
        const changes = [];
        before.forEach((values,index) => Object.keys(values).forEach(key => {
          if (values[key] !== current[index][key]) changes.push({element:nodes[index].className,key,before:values[key],after:current[index][key]});
        }));
        return changes.slice(0,15);
      })()`);
      checks.push({ width, view, differences });
    }
  }
});
const failures = checks.filter(check => check.differences.length);
console.log(JSON.stringify(failures.length ? failures : { comparisons:checks.length, differences:0 }, null, 2));
assert.equal(failures.length, 0, "CSS refactor changed computed styles");
