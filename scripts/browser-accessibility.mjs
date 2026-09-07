import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function installAccessibility(send) {
  const source = await readFile(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
  await send("Page.addScriptToEvaluateOnNewDocument", { source });
}
export async function auditAccessibility(evaluate, name, { selector = null, reportOnly = false } = {}) {
  const result = await evaluate(`(async()=>{
    await Promise.all(document.getAnimations().filter(a=>a.effect?.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})));
    // axe 4.13 fetches relative CSS imports against the document instead of the
    // containing stylesheet. Normalize that read during the audit, retaining
    // all rules, CSS preloading, actual styles and resource-failure checks.
    const href=Object.getOwnPropertyDescriptor(CSSImportRule.prototype,'href');
    Object.defineProperty(CSSImportRule.prototype,'href',{...href,get(){return new URL(href.get.call(this),this.parentStyleSheet.href||document.baseURI).href;}});
    let result;
    try {
      result=await axe.run(${selector ? `document.querySelector(${JSON.stringify(selector)})` : 'document'},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
    } finally {Object.defineProperty(CSSImportRule.prototype,'href',href);}
    return {page:{route:location.pathname+location.search,mode:document.querySelector('meta[name=learn-account-mode]')?.content,viewport:{width:innerWidth,height:innerHeight},focus:document.activeElement?.tagName},violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.filter(v=>v.id==='color-contrast').map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))};
  })()`);
  const evidenceDirectory = process.env.BROWSER_A11Y_REPORT_DIR || process.env.BROWSER_SCREENSHOT_DIR;
  if (evidenceDirectory) {
    await mkdir(evidenceDirectory, { recursive:true });
    await writeFile(path.join(evidenceDirectory, `${path.basename(name)}.a11y.json`), JSON.stringify(result, null, 2));
  }
  if (result.violations.length && !reportOnly) throw new Error(`Accessibility: ${name}\n${JSON.stringify(result, null, 2)}`);
  console.log(`Accessibility ${result.violations.length ? "violations" : "passed"}: ${name}`);
  if(result.incomplete.length) console.log(`Contrast review — ${name}: ${JSON.stringify(result.incomplete.flatMap(rule=>rule.nodes))}`);
  return result;
}
