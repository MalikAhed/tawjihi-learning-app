import ts from "typescript";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { builtinModules } from "node:module";
import { fileURLToPath } from "node:url";
import { COURSE_SUBJECTS, TOTAL_SUBJECTS } from "../src/data/course.js";
import { createLessonLoader } from "../src/data/lessons/load-lessons.js";
import { lessonRegistry } from "../src/data/lessons/lesson-registry.js";
import { loadSubjectLesson, subjectLessonRegistry } from "../src/data/lessons/subject-lesson-registry.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function assertFile(relativePath, context) {
  try {
    await access(path.join(projectRoot, relativePath));
  } catch {
    failures.push(`${context}: missing ${relativePath}`);
  }
}

async function collectJavaScript(directory, result = []) {
  const entries = await readdir(directory, { withFileTypes:true });
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() && target !== path.join(projectRoot,"src/server")) await collectJavaScript(target, result);
    else if (entry.isFile() && /\.(?:js|mjs)$/.test(entry.name)) result.push(target);
  }
  return result;
}

assert(TOTAL_SUBJECTS > 0, "the subject catalog must not be empty");
assert(new Set(COURSE_SUBJECTS.map(({ id }) => id)).size === TOTAL_SUBJECTS, "every subject must have a unique id");
assert(COURSE_SUBJECTS.every(({ name, status }) => name && ["available", "unpublished"].includes(status)), "every subject must have a name and an explicit publication status");
assert(COURSE_SUBJECTS.filter(({ status }) => status === "available").map(({ id }) => id).join() === "ict", "ICT must be the only published subject");

const indexHtml = await readFile(path.join(projectRoot, "index.html"), "utf8");
for (const match of indexHtml.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const reference = match[1];
  if (/^(?:https?:|data:)/.test(reference)) continue;
  await assertFile(reference, "index.html");
}

// Keep the maintained agent entry points navigable; historical reports are not
// a second source map and are deliberately outside this small link check.
for (const document of ["README.md", "AGENTS.md", "docs/ARCHITECTURE.md"]) {
  const source = await readFile(path.join(projectRoot, document), "utf8");
  for (const match of source.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
    const reference = match[1].split("#", 1)[0];
    if (!reference || /^[a-z][a-z\d+.-]*:/i.test(reference)) continue;
    const target = path.join(path.dirname(document), decodeURIComponent(reference));
    const line = source.slice(0, match.index).split("\n").length;
    await assertFile(target, `${document}:${line}`);
  }
}

for (const file of await collectJavaScript(path.join(projectRoot, "src"))) {
  const source = await readFile(file, "utf8");
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const inspect = (node) => {
    const specifier = (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) ? node.moduleSpecifier
      : ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword ? node.arguments[0] : null;
    const location = () => `${path.relative(projectRoot, file)}:${parsed.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
    if (specifier && ts.isStringLiteral(specifier)) {
      const name = specifier.text;
      const target = path.resolve(path.dirname(file), name);
      const relative = path.relative(projectRoot, target).replaceAll("\\", "/");
      if (name.startsWith("node:") || builtinModules.includes(name) || relative.startsWith("src/server/")) failures.push(`${location()}: browser code cannot import server module ${name}`);
      if (file.includes(`${path.sep}domain${path.sep}`) && /^(src\/(ui|services)\/)/.test(relative)) failures.push(`${location()}: domain rules cannot import ${name}`);
      if (name.startsWith(".")) imports.push({ target, context:location() });
    }
    if (file.includes(`${path.sep}domain${path.sep}`) && ts.isIdentifier(node) && ["localStorage", "sessionStorage", "indexedDB", "window", "document"].includes(node.text)) {
      failures.push(`${location()}: domain rules cannot access browser state ${node.text}`);
    }
    ts.forEachChild(node, inspect);
  };
  const imports = [];
  inspect(parsed);
  for (const { target, context } of imports) {
    try { await access(target); }
    catch { failures.push(`${context}: missing import ${path.relative(projectRoot, target)}`); }
  }
}

const loadLesson = createLessonLoader();
let candidateLessons = 0;
let publishedLessons = 0;
for (const day of lessonRegistry.keys()) {
  assert(Number.isInteger(day) && day >= 1, `lesson registry contains invalid lesson key ${day}`);
  const lesson = await loadLesson(day);
  if (lesson?.status === "candidate") candidateLessons += 1;
  if (lesson?.status === "published") publishedLessons += 1;
}
for (const key of subjectLessonRegistry.keys()) {
  const [subjectId, lessonId, extra] = key.split(":");
  assert(!extra && COURSE_SUBJECTS.some(({ id }) => id === subjectId) && lessonId, `subject lesson registry contains invalid lesson key ${key}`);
  const lesson = await loadSubjectLesson(subjectId, lessonId);
  if (lesson?.status === "candidate") candidateLessons += 1;
  if (lesson?.status === "published") publishedLessons += 1;
}

if (failures.length) {
  console.error(`Static application validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Static application validation passed: ${TOTAL_SUBJECTS} subjects, ${candidateLessons} candidate lessons, ${publishedLessons} published lessons.`);
