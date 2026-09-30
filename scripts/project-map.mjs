import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const relative = (root, file) => path.relative(root, file).split(path.sep).join("/");

export async function readOwners(root) {
  const source = await readFile(path.join(root, "docs/ARCHITECTURE.md"), "utf8");
  const tables = marked.lexer(source).filter(token => token.type === "table" && token.header.map(cell => cell.text).join("|") === "Task|Start here|Focused check");
  if (tables.length !== 1) throw new Error("docs/ARCHITECTURE.md must contain one Task / Start here / Focused check table.");
  const code = cell => {
    const values = [];
    marked.walkTokens(cell.tokens, token => { if (token.type === "codespan") values.push(token.text); });
    return values;
  };
  return tables[0].rows.map(([task, files, checks]) => ({ task:task.text, files:code(files), checks:code(checks) }));
}

export async function validateOwners(root) {
  const owners = await readOwners(root);
  const { scripts = {} } = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  const failures = [];
  const seen = new Set();
  const checkPath = async (file, context, directory = false) => {
    const resolved = path.resolve(root, file);
    const name = relative(root, resolved);
    if (name.startsWith("../") || path.isAbsolute(file) || !name) {
      failures.push(`${context}: use a repository-relative path: ${file}`);
      return;
    }
    try {
      const info = await stat(resolved);
      if (!(directory ? info.isDirectory() : info.isFile())) failures.push(`${context}: expected ${directory ? "directory" : "file"}: ${file}`);
    } catch { failures.push(`${context}: missing ${file}`); }
  };
  if (!owners.length) failures.push("Owner map must not be empty.");
  for (const owner of owners) {
    const context = `Code map (${owner.task})`;
    if (seen.has(owner.task)) failures.push(`${context}: duplicate task`);
    seen.add(owner.task);
    if (!owner.files.length || !owner.checks.length) failures.push(`${context}: provide owner paths and a focused check in backticks`);
    for (const file of owner.files) await checkPath(file, context, file.endsWith("/"));
    for (const command of owner.checks) {
      const npm = /^npm run ([\w:-]+)$/.exec(command);
      if (npm) {
        if (!Object.hasOwn(scripts, npm[1])) failures.push(`${context}: unknown npm command ${npm[1]}`);
      } else if (/^node (?:--test )?[^\s]+(?:\s+[^\s]+)*$/.test(command)) {
        const files = command.split(/\s+/).slice(command.startsWith("node --test ") ? 2 : 1);
        for (const file of files) await checkPath(file, context);
      } else failures.push(`${context}: use an explicit npm run or node check: ${command}`);
    }
  }
  return failures;
}

async function moduleFiles(root) {
  const files = ["server.mjs", "dev-server.mjs"];
  const visit = async directory => {
    for (const entry of await readdir(path.join(root, directory), { withFileTypes:true })) {
      const file = `${directory}/${entry.name}`;
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile() && /\.(?:js|mjs)$/.test(entry.name)) files.push(file);
    }
  };
  for (const directory of ["src", "scripts", "tests"]) await visit(directory);
  return files.sort();
}

export async function inspectModule(root, file) {
  const files = await moduleFiles(root);
  const matches = files.includes(file) ? [file] : files.filter(name => !file.includes("/") && path.basename(name) === file);
  if (!matches.length) throw new Error(`Not an indexed JavaScript file: ${file}`);
  if (matches.length > 1) throw new Error(`Ambiguous filename '${file}'; use one of:\n${matches.join("\n")}`);
  file = matches[0];
  const { default:ts } = await import("typescript");
  const modules = await Promise.all(files.map(async name => {
    const source = await readFile(path.join(root, name), "utf8");
    const parsed = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const imports = [], exports = [];
    const line = node => parsed.getLineAndCharacterOfPosition(node.getStart(parsed)).line + 1;
    const inspect = node => {
      const specifier = (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) ? node.moduleSpecifier
        : ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword ? node.arguments[0] : null;
      if (specifier && ts.isStringLiteralLike(specifier)) {
        const target = specifier.text.startsWith(".") ? relative(root, path.resolve(root, path.dirname(name), specifier.text)) : null;
        imports.push({ specifier:specifier.text, target, line:line(node) });
      }
      ts.forEachChild(node, inspect);
    };
    inspect(parsed);
    for (const node of parsed.statements) {
      let names = [];
      if (ts.isExportDeclaration(node)) names = node.exportClause && ts.isNamedExports(node.exportClause)
        ? node.exportClause.elements.map(item => item.name.text) : [node.exportClause?.name?.text || "*"];
      else if (ts.isExportAssignment(node) || node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) names = ["default"];
      else if (node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
        names = ts.isVariableStatement(node) ? node.declarationList.declarations.map(item => item.name.getText(parsed)) : [node.name?.text].filter(Boolean);
      }
      for (const name of names) exports.push({ name, line:line(node) });
    }
    return { file:name, imports, exports };
  }));
  return {
    ...modules.find(module => module.file === file),
    importers:modules.flatMap(module => module.imports.filter(item => item.target === file).map(item => ({ file:module.file, line:item.line }))),
  };
}

async function main(query) {
  const owners = await readOwners(projectRoot);
  if (!query || query === "--help") {
    console.log("Usage: npm run map -- <topic-or-file>\nExamples: progress | subject-progress-store.js\nUse an exact path when a filename is ambiguous.\n\nTasks (docs/ARCHITECTURE.md):");
    for (const owner of owners) console.log(`- ${owner.task}`);
    return;
  }
  const requested = query.replace(/^\.\//, "");
  const module = /\.(?:js|mjs)$/.test(requested) ? await inspectModule(projectRoot, requested) : null;
  const file = module?.file || requested;
  const matching = owners.filter(owner => module
    ? owner.files.some(entry => entry === file || entry.endsWith("/") && file.startsWith(entry))
    : [owner.task, ...owner.files].join(" ").toLowerCase().includes(query.toLowerCase()));
  if (module) {
    console.log(`File: ${file}\nTasks: ${matching.map(owner => owner.task).join("; ") || "no explicit owner row; inspect importers"}`);
    const checks = [...new Set(matching.flatMap(owner => owner.checks))];
    if (checks.length) console.log(`Check: ${checks.join("; ")}`);
    console.log("Exports (L = line in this file):");
    for (const item of module.exports) console.log(`  L${item.line} ${item.name}`);
    console.log("Imports (literal JavaScript only; L = line in this file):");
    for (const item of module.imports) console.log(`  L${item.line} -> ${item.target || item.specifier}`);
    console.log("Direct importers (including tests; not a complete impact analysis):");
    for (const item of module.importers) console.log(`  ${item.file}:${item.line}`);
  } else {
    if (!matching.length) throw new Error(`No task matches '${query}'. Run npm run map for task names, or pass a JavaScript filename.`);
    for (const owner of matching) console.log(`${owner.task}\n  Owners: ${owner.files.join(", ")}\n  Check: ${owner.checks.join("; ")}\n`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await main(process.argv.slice(2).join(" ").trim()); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
