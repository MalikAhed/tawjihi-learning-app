import assert from "node:assert/strict";
import test from "node:test";
import { parseLessonMarkdown } from "../src/markdown/lesson-authoring.js";
import { compileLessonMarkdown } from "../src/markdown/lesson-model.js";

const body = `اقرأ الجدول ثم أجب عن البندين كما وردا.

Patients:

| Num | Name | Mark |
| --- | --- | --- |
| 101 | علي | 90 |
| 102 | سارة | 80 |

1. اكتب نتيجة الاستعلام.
2. وضح وظيفة الشرط.

\`\`\`sql
SELECT Name, Mark
FROM Student
WHERE Mark >= 80;
\`\`\`

![شكل السؤال الأصلي](assets/lessons/ict/exams/book-p54-bmi.webp)`;
const solution = `Result:

السجلان 101 و102 يحققان الشرط.

\`\`\`sql
WHERE Mark >= 80;
\`\`\``;
const source = `:::exam-question
id: original-written-question
title: تدريب كتابي من المصدر
question: أجب عن السؤال الأصلي
reference: ورقة المصدر، PDF ص 3، السؤال 2
answer-label: حل للمراجعة الذاتية
body:
${body}
solution:
${solution}
guidance:
افحص كل سجل ثم قارن الناتج دون تغيير أسماء الحقول.
:::`;

test("written source questions retain multiline prompts, tables, SQL and figures without becoming graded choices", () => {
  const parsed = parseLessonMarkdown(source, { published:true });
  assert.deepEqual(parsed.issues, []);
  assert.equal(parsed.steps.length, 1);
  const [step] = parsed.steps;
  assert.equal(step.id, "original-written-question");
  assert.equal(step.type, "exam-question");
  assert.equal(step.content.body, body);
  assert.equal(step.content.solution, solution);
  assert.match(step.content.body, /Patients:\n\n\| Num/);
  assert.match(step.content.solution, /^Result:\n\n/);
  assert.equal(step.content.reference, "ورقة المصدر، PDF ص 3، السؤال 2");
  assert.equal(step.content.answerLabel, "حل للمراجعة الذاتية");
  assert.equal(step.content.answers, undefined);
  const compiled = compileLessonMarkdown(source, { published:true });
  assert.deepEqual(compiled.issues, []);
  assert.equal(compiled.steps[0].type, "activity");
  assert.equal(compiled.steps[0].question, undefined, "written self-review has no automatic answer key");
});

test("published written questions require attribution and a disclosed solution source", () => {
  for (const [field, expected] of [["reference", "reference"], ["answer-label", "answerLabel"]]) {
    const missing = source.replace(new RegExp(`^${field}:.*\\n`, "m"), "");
    assert.ok(parseLessonMarkdown(missing, { published:true }).issues.some(issue => issue.includes(`needs ${expected}`)));
  }
  for (const section of ["body", "solution"]) {
    const missing = source.replace(`${section}:\n${section === "body" ? body : solution}`, `${section}:`);
    assert.ok(parseLessonMarkdown(missing, { published:true }).issues.some(issue => issue.includes(`needs ${section}`)));
  }
  const unsafe = source.replace(body, '<img src=x onerror="alert(1)">');
  assert.ok(parseLessonMarkdown(unsafe, { published:true }).issues.some(issue => issue.includes("raw HTML")));
});
