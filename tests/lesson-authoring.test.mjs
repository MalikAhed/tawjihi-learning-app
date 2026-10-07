import assert from "node:assert/strict";
import test from "node:test";
import { parseLessonMarkdown } from "../src/markdown/lesson-authoring.js";
import { compileLessonMarkdown, defineMarkdownLesson } from "../src/markdown/lesson-model.js";
import { LESSON_MARKDOWN as ICT_DATABASE_MARKDOWN, SIDE_QUEST_MARKDOWN, ALL_LESSON_MARKDOWN } from "../src/data/lessons/ict/database-management.js";
import { LESSON_MARKDOWN as ICT_SQL_MARKDOWN } from "../src/data/lessons/ict/sql-queries.js";
import { getSubjectRoadmapLesson } from "../src/data/subject-roadmaps.js";

test("MCQ options keep only their answer text when source includes Arabic option markers", () => {
  const source = `:::mcq
id: arabic-option-markers
title: Options
question: اختر الإجابة.
- [x] أ — الإجابة الأولى
- [ ] ب- الإجابة الثانية
- [ ] (ج) الإجابة الثالثة
- [ ] د. الإجابة الرابعة
explanation: الإجابة الأولى.
hint: اقرأ الخيارات.
:::`;
  const parsed = parseLessonMarkdown(source, { published:true });
  assert.deepEqual(parsed.steps[0].content.answers.map(answer => answer.text), [
    "الإجابة الأولى", "الإجابة الثانية", "الإجابة الثالثة", "الإجابة الرابعة",
  ]);
});

test("question table examples survive parsing and compilation without becoming choices", () => {
  const source = `:::mcq
id: table-example
title: Course key
question: Which field identifies a course?
- [x] id | Course number
- [ ] fee | Fee
explanation: Course numbers are unique.
hint: Fees may repeat.
example:
### Courses

| Number | Fee |
| --- | --- |
| 101 | 150 |
| 102 | 150 |
:::`;
  const parsed = parseLessonMarkdown(source, { published:true });
  assert.deepEqual(parsed.issues, []);
  assert.equal(parsed.steps[0].content.answers.length, 2);
  assert.match(parsed.steps[0].content.example, /\| 102 \| 150 \|/);
  const lesson = defineMarkdownLesson({ title:"Tables", summary:"Read the course table.", status:"published" }, source);
  assert.equal(lesson.steps[0].question.example, parsed.steps[0].content.example);
  assert.ok(parseLessonMarkdown(source.replace("### Courses", "<script>alert(1)</script>"), { published:true }).issues.length > 0);
});

test("parses Markdown and existing interactive patterns into ordered steps", () => {
  const source = `# Request flow

Normal **Markdown** stays normal.

:::mcq
title: Status
question: Which one is missing?
- [ ] ok | 200
- [x] missing | 404
explanation: Correct status.
:::

:::true-false
title: Fragment
question: A fragment reaches the server.
answer: false
:::`;
  const result = parseLessonMarkdown(source);
  assert.deepEqual(result.steps.map((step) => step.type), ["markdown", "mcq", "mcq"]);
  assert.deepEqual(result.steps[1].content.answers.map(({ id, correct }) => ({ id, correct })), [
    { id:"ok", correct:false }, { id:"missing", correct:true },
  ]);
  assert.equal(result.steps[2].content.answers.find((answer) => answer.correct).id, "false");
  assert.deepEqual(result.issues, []);
});

test("compiles stable Markdown and practice MCQ ids into the published lesson model", () => {
  const source = `<!-- step-id: request-lesson -->
# Requests

The browser sends a request.

:::mcq
id: request-check
title: Check requests
question: Who sends the request?
- [x] browser | The browser
- [ ] server | The server
explanation: Correct.
hint: The client starts it.
:::`;
  const compiled = compileLessonMarkdown(source);
  assert.deepEqual(compiled.steps.map((step) => step.id), ["request-lesson", "request-check"]);
  assert.equal(compiled.steps[0].blocks[0].type, "markdown");
  assert.doesNotMatch(compiled.steps[0].blocks[0].source, /^# Requests/m);
  assert.doesNotMatch(compiled.steps[0].blocks[0].source, /step-id/);
  assert.equal(compiled.steps[1].question.phase, "practice");
  assert.equal(compiled.steps[1].question.critical, false);
  assert.deepEqual(compiled.issues, []);
  const lesson = defineMarkdownLesson({ title:"Requests", summary:"Follow a request." }, source, { day:1 });
  assert.equal(lesson.authoringSource, source);
  assert.equal(Object.isFrozen(lesson), true);
});

test("rejects unsupported directives, fields, raw HTML, and noncanonical true-false choices", () => {
  const parsed = parseLessonMarkdown(`# Unsafe authoring

<div class="custom-card">Do not author lesson UI.</div>

:::matching
title: Invented component
:::

:::mcq
title: Ignored checkpoint
question: Which answer is correct?
phase: checkpoint
- [x] yes | Yes
- [ ] no | No
:::

:::true-false
title: Duplicate syntax
question: Use the canonical answer field.
- [x] true | True
- [ ] false | False
:::`);
  assert.ok(parsed.issues.some((issue) => issue.includes("must not contain raw HTML")));
  assert.ok(parsed.issues.some((issue) => issue.includes("Unsupported lesson directive :::matching")));
  assert.ok(parsed.issues.some((issue) => issue.includes("unsupported field “phase”")));
  assert.ok(parsed.issues.some((issue) => issue.includes("must use answer: true")));
});

test("rejects raw or nested directive content and malformed content callouts", () => {
  const parsed = parseLessonMarkdown(`:::note Unclosed callout
Keep reading.

:::mcq
title: Nested source
question: Which one?
- [x] yes | <span>Yes</span>
- [ ] no | No
:::tip Nested callout
Inside a question.
:::
:::`);
  assert.ok(parsed.issues.some((issue) => issue.includes("missing its closing")));
  assert.ok(parsed.issues.some((issue) => issue.includes("must not contain raw HTML")));
  assert.ok(parsed.issues.some((issue) => issue.includes("must not contain a nested lesson directive")));
});

test("requires stable ids and complete fields when defining a published lesson", () => {
  const source = `# Requests

The browser asks for a resource.

:::mcq
title: Check requests
question: Who starts the request?
- [x] browser | Browser
- [ ] server | Server
explanation: The browser client starts it.
:::`;
  assert.throws(
    () => defineMarkdownLesson({ title:"Requests", summary:"Follow a request." }, source, { day:1 }),
    /Published explanation step 1 needs.*Published step 2 \(mcq\) needs a non-empty id.*Published step 2 \(mcq\) needs a non-empty hint/s,
  );
  assert.doesNotThrow(() => defineMarkdownLesson({ status:"candidate", title:"Requests", summary:"Follow a request." }, source, { day:1 }));
});

test("plain URL answer choices are displayed as non-navigating code", () => {
  const parsed = parseLessonMarkdown(`:::mcq
title: Origins
question: Which URL matches?
- [x] same | https://example.com:443/settings
- [ ] other | https://example.com:8443/settings
:::`);
  assert.deepEqual(parsed.steps[0].content.answers.map((answer) => answer.text), [
    "`https://example.com:443/settings`",
    "`https://example.com:8443/settings`",
  ]);
});

test("the first ICT lesson is a focused database-management lesson", () => {
  const parsed = parseLessonMarkdown(ICT_DATABASE_MARKDOWN);
  const types = parsed.steps.map((step) => step.type);
  assert.deepEqual(parsed.issues, []);
  assert.deepEqual(new Set(types), new Set(["markdown", "mcq"]));
  assert.equal(parsed.steps.filter((step) => step.presentation === "video-intro").length, getSubjectRoadmapLesson("ict", "database-management").parts.length);
  assert.equal(parsed.steps.filter((step) => step.presentation === "lesson-summary").length, getSubjectRoadmapLesson("ict", "database-management").parts.length);
  assert.equal(parsed.steps.filter((step) => step.type === "mcq").every((step) => step.content.answers.length === 3), true);
  ["database-management-mission", "dbms-responsibilities", "dbms-task-check", "access-characteristics", "access-tradeoff-check", "access-components", "component-purpose-check", "tables-fields-records", "row-column-check", "field-data-types", "data-type-fill", "keys-identity", "primary-key-truth", "relationships-cardinality", "relationship-type-check", "education-center-model", "junction-key-check", "schema-design-bug", "referential-integrity", "access-build-order", "access-build-sequence", "hospital-transfer", "hospital-schema-response", "lesson-recap"].forEach((id) => {
    assert.equal([...parsed.steps, ...parseLessonMarkdown(SIDE_QUEST_MARKDOWN).steps].some((step) => step.id === id), true, `Lesson 1 must preserve the ${id} step id`);
  });
  assert.equal(new Set(parsed.steps.map((step) => step.id)).size, parsed.steps.length);
  const compiled = compileLessonMarkdown(ICT_DATABASE_MARKDOWN);
  assert.equal(compiled.steps.length, parsed.steps.length);
  assert.deepEqual(compiled.issues, []);
});

test("every SQL roadmap part has an introduction, focused summary, and answerable MCQ practice", () => {
  const parsed = parseLessonMarkdown(ICT_SQL_MARKDOWN, { published:true });
  assert.deepEqual(parsed.issues, []);
  assert.equal(new Set(parsed.steps.map(step => step.id)).size, parsed.steps.length);
  const parts = getSubjectRoadmapLesson("ict", "sql-queries").parts;
  assert.deepEqual(parts.map(part => part.id), [
    "sql-introduction", "select-order", "where-conditions", "order-practice", "related-tables",
    "count-parameters", "update-queries", "insert-queries", "delete-review", "sql-questions", "sql-practical",
  ]);
  assert.deepEqual(parsed.steps.filter(step => step.presentation === "video-intro").map(step => step.id), parts.map(part => part.startStepId));
  for (const [index, part] of parts.entries()) {
    const start = parsed.steps.findIndex(step => step.id === part.startStepId);
    const end = parts[index + 1] ? parsed.steps.findIndex(step => step.id === parts[index + 1].startStepId) : parsed.steps.length;
    const steps = parsed.steps.slice(start, end);
    assert.equal(steps[0].presentation, "video-intro", part.id);
    assert.equal(steps[1].presentation, "lesson-summary", part.id);
    assert.ok(steps.length > 2, `${part.id} must have practice`);
    for (const step of steps.slice(2)) {
      assert.equal(step.type, "mcq", part.id);
      assert.equal(step.content.answers.length, 3, step.id);
      assert.equal(step.content.answers.filter(answer => answer.correct).length, 1, step.id);
      assert.ok(step.content.correctFeedback && step.content.wrongFeedback, step.id);
    }
  }
  assert.deepEqual(compileLessonMarkdown(ICT_SQL_MARKDOWN, { published:true }).issues, []);
});

test("Access core practice and reserved side quests preserve every original question", () => {
  const active = parseLessonMarkdown(ICT_DATABASE_MARKDOWN);
  const reserved = parseLessonMarkdown(SIDE_QUEST_MARKDOWN);
  const original = parseLessonMarkdown(ALL_LESSON_MARKDOWN);
  assert.deepEqual(reserved.issues, []);
  assert.equal(reserved.steps.length, 12);
  assert.ok(reserved.steps.every(step => step.type === "mcq"));
  const firstPartEnd = active.steps.findIndex(step => step.id === "tables-fields-records");
  assert.equal(active.steps.slice(0, firstPartEnd).filter(step => step.type === "mcq").length, 9);
  const combined = [...active.steps, ...reserved.steps];
  assert.equal(new Set(combined.map(step => step.id)).size, original.steps.length);
  for (const step of original.steps) {
    const retained = combined.find(candidate => candidate.id === step.id);
    // The parser's positional preview ID changes; persisted step IDs and content must not.
    const normalize = value => value.type === "mcq"
      ? { ...value, content:{ ...value.content, authoringId:undefined } } : value;
    assert.deepEqual(normalize(retained), normalize(step));
  }
});

test("illustrated dialogue presentation is reusable across stable explanation IDs", () => {
  const dialogue = (id) => `<!-- step-id: ${id} -->\n<!-- presentation: rocky-dialogue -->\n# Welcome\n\n![Rocky waves](assets/mascot/rocky-wave.svg)\n\n:::note Hello\nLet’s learn together.\n:::`;
  const result = compileLessonMarkdown(`${dialogue("first-welcome")}\n<!-- lesson-step -->\n${dialogue("another-welcome")}`, { published:true });
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.parsed.steps.map((step) => step.id), ["first-welcome", "another-welcome"]);
  for (const step of result.parsed.steps) {
    assert.equal(step.presentation, "rocky-dialogue");
    assert.equal(step.dialogue.source, "Let’s learn together.");
    assert.match(step.dialogue.image, /rocky-wave\.svg/);
  }
  assert.equal(result.steps[0].presentation, "rocky-dialogue");
  assert.match(compileLessonMarkdown(dialogue("valid-id").replace("presentation: rocky-dialogue", "presentation: arbitrary-layout")).issues.join(" "), /unsupported presentation/);
  assert.match(compileLessonMarkdown(dialogue("valid-id").replace(/!\[[^\n]+\n/, "")).issues.join(" "), /one image/);
});

test("video openings accept one player URL and a compact page and chapter guide", () => {
  const source = `<!-- step-id: guide-opening -->
<!-- presentation: video-intro -->
# قواعد البيانات

https://youtu.be/AlkDbnbv7dk

الكتاب: الصفحات 42–45، الجداول والسجلات.

- [صفحة الكتاب 42](assets/books/ict.pdf#page=42)
- [ملخص الدرس](assets/books/summary.pdf#page=8)
- [الجداول (02:15)](https://www.youtube.com/watch?v=AlkDbnbv7dk&t=135s)`;
  const parsed = parseLessonMarkdown(source, { published:true });
  assert.deepEqual(parsed.issues, []);
  assert.equal(parsed.steps[0].presentation, "video-intro");
  assert.equal(parsed.steps[0].source, source);
  assert.deepEqual(parseLessonMarkdown(source.split("\n").slice(0, 3).join("\n"), { published:true }).issues, []);
});

test("video openings reject extra players and unsupported resource blocks", () => {
  const opening = `<!-- step-id: guide-opening -->\n<!-- presentation: video-intro -->\n# Video\n\nhttps://youtu.be/AlkDbnbv7dk\n\n`;
  for (const extra of [
    "https://youtu.be/d3gaYsONaIc",
    "## Second heading",
    "![Image](assets/image.png)",
    ":::note Extra block\nCopy\n:::"
  ]) {
    const parsed = parseLessonMarkdown(opening + extra);
    assert.match(parsed.issues.join(" "), /may include only paragraphs and bullet links/);
  }
  const invalid = parseLessonMarkdown(opening.replace("AlkDbnbv7dk", "bad-id"));
  assert.match(invalid.issues.join(" "), /supported YouTube URL/);
});
