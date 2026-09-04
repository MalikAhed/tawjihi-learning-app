import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
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
    if (entry.isDirectory()) await collectJavaScript(target, result);
    else if (entry.name.endsWith(".js")) result.push(target);
  }
  return result;
}

assert(TOTAL_SUBJECTS === 8, `expected 8 subjects, found ${TOTAL_SUBJECTS}`);
assert(new Set(COURSE_SUBJECTS.map(({ id }) => id)).size === TOTAL_SUBJECTS, "every subject must have a unique id");
assert(COURSE_SUBJECTS.every(({ name, status }) => name && ["in-progress", "locked"].includes(status)), "every subject must have a name and a supported status");
assert(COURSE_SUBJECTS.filter(({ status }) => status === "in-progress").map(({ id }) => id).join() === "ict", "ICT must be the only unlocked subject");

const indexHtml = await readFile(path.join(projectRoot, "index.html"), "utf8");
for (const match of indexHtml.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const reference = match[1];
  if (/^(?:https?:|data:)/.test(reference)) continue;
  await assertFile(reference, "index.html");
}

for (const file of await collectJavaScript(path.join(projectRoot, "src"))) {
  const source = (await readFile(file, "utf8"))
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  for (const match of source.matchAll(/(?:from\s+|import\()(["'])(\.\.?\/[^"']+)\1/g)) {
    const target = path.resolve(path.dirname(file), match[2]);
    try {
      await access(target);
    } catch {
      failures.push(`${path.relative(projectRoot, file)} imports missing ${path.relative(projectRoot, target)}`);
    }
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
