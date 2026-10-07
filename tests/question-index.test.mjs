import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";
import { getIctPartQuestions } from "../src/data/lessons/ict/exam-lessons.js";
import { getIctPartQuestionIds } from "../src/data/lessons/ict/question-index.js";

test("lightweight question identities exactly match the published bank and its ordering", () => {
  const parts = getSubjectRoadmap("ict").units.flatMap(unit => unit.lessons.flatMap(lesson => lesson.parts));
  for (const part of parts) {
    assert.deepEqual(getIctPartQuestionIds(part.id), getIctPartQuestions(part.id).map(question => question.id),
      `${part.id}: regenerate the index after changing the question catalog`);
  }
  assert.deepEqual(getIctPartQuestionIds("unknown-part"), []);
});

test("Home has no eager dependency on question content or the lesson parser", async () => {
  const visited = new Set();
  async function visit(file) {
    if (visited.has(file.href)) return;
    visited.add(file.href);
    const source = await readFile(file, "utf8");
    const parsed = ts.createSourceFile(file.pathname, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    for (const statement of parsed.statements) {
      if (!(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))) continue;
      const target = statement.moduleSpecifier;
      if (target && ts.isStringLiteral(target) && target.text.startsWith(".")) await visit(new URL(target.text, file));
    }
  }
  await visit(new URL("../src/main.js", import.meta.url));
  for (const file of visited) {
    assert.doesNotMatch(file, /\/lessons\/ict\/(?:exam-lessons|.*bank|book-practice)\.js$|\/markdown\/lesson-model\.js$/);
  }
});
