import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { PHYSICS_LESSONS } from "../src/data/lessons/physics/physics-course.js";
import { loadSubjectLessonPart } from "../src/data/lessons/subject-lesson-registry.js";
import { parseLessonMarkdown } from "../src/markdown/lesson-authoring.js";
import { createSubjectProgressStore } from "../src/services/subject-progress-store.js";
import { createLearnerSession } from "../src/services/learner-session.js";

test("the imported Physics bank reconciles every archive question without exposing exclusions or blockers", async () => {
  const coverage = JSON.parse(await readFile(new URL("../src/data/lessons/physics/source-coverage.json", import.meta.url)));
  const { totals, questions, excluded, duplicates, blocked } = coverage;
  assert.equal(totals.archiveQuestions, 612);
  assert.equal(totals.included, 565);
  assert.equal(totals.blocked, 36);
  const archiveQuestions = questions.filter(question => question.archiveMember);
  assert.equal(totals.archiveQuestions, archiveQuestions.length + excluded.length + duplicates.length + blocked.length);
  const ids = PHYSICS_LESSONS.flatMap(lesson => lesson.questionIds);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual([...new Set(ids)].sort(), [...new Set(questions.map(question => question.id))].sort());
  const dispositions = [...archiveQuestions.map(q => q.id), ...excluded.map(q => q.id), ...duplicates.map(q => q.id), ...blocked.map(q => q.id)];
  assert.equal(new Set(dispositions).size, 612);
  assert.equal(excluded.filter(q => q.sourceChapter === 3).length, 71);
  for (const id of ["physics-tawjihi-2025-p004-q003", "physics-tawjihi-2025-p015-q093", "physics-tawjihi-2025-p021-q128"]) {
    assert.ok(blocked.some(question => question.id === id), `${id} must stay withheld until its source answer is resolved`);
  }
  assert.deepEqual(PHYSICS_LESSONS.map(lesson => lesson.sourceChapter), [1, 2, 4, 5, 6, 7, 8]);
  for (const duplicate of duplicates) assert.ok(ids.includes(duplicate.canonicalId));

  let mcqs = 0, cards = 0;
  for (const item of PHYSICS_LESSONS) {
    const lesson = await loadSubjectLessonPart("physics", item.id, `${item.id}-practice`);
    assert.deepEqual(lesson.steps.map(step => step.id), item.questionIds);
    const parsed = parseLessonMarkdown(lesson.authoringSource, { published:true });
    assert.deepEqual(parsed.issues, []);
    assert.doesNotMatch(lesson.authoringSource, /\]\(sources\/|بانتظار فهرس|physics-latex-/);
    assert.ok(parsed.steps.every(step => ["mcq", "exam-question"].includes(step.type)));
    mcqs += parsed.steps.filter(step => step.type === "mcq").length;
    cards += parsed.steps.filter(step => step.type === "exam-question").length;
  }
  assert.equal(mcqs, totals.mcq);
  assert.equal(cards, totals.examQuestions);
});

test("textbook questions lead every lesson in book order and changed-number variants remain", async () => {
  const coverage = JSON.parse(await readFile(new URL("../src/data/lessons/physics/source-coverage.json", import.meta.url)));
  const book = coverage.questions.filter(question => question.bookSource);
  assert.equal(book.length, 81);
  assert.equal(coverage.textbook.reviewedPages.length, 75);
  for (const item of PHYSICS_LESSONS) {
    const first = book.filter(question => question.lessonId === item.id);
    assert.ok(first.length > 0);
    assert.deepEqual(item.questionIds.slice(0, first.length), first.map(question => question.id));
    assert.deepEqual(first.map(question => question.bookSource.pdfPage), first.map(question => question.bookSource.pdfPage).sort((a,b) => a-b));
  }
  const ids = PHYSICS_LESSONS.flatMap(lesson => lesson.questionIds);
  // Different energy ratios, masses, requested quantities and resistor values stay distinct.
  for (const id of ["physics-tawjihi-2025-p005-q010", "physics-tawjihi-2025-p007-q028", "physics-tawjihi-2025-p004-q005", "physics-tawjihi-2025-p053-q329", "physics-tawjihi-2025-p055-q339"]) assert.ok(ids.includes(id));
  for (const replacement of coverage.textbook.replacedSupplementalOccurrences) {
    assert.equal(ids.filter(id => id === replacement.canonicalId).length, 1);
    assert.ok(replacement.canonicalIds.every(id => ids.includes(id)));
  }
  assert.ok(ids.includes("physics-tawjihi-2025-p088-q529"));
});

test("the source question with multiple correct options stays a review card with its original choices", async () => {
  const lesson = await loadSubjectLessonPart("physics", "magnetic-force", "magnetic-force-practice");
  const question = parseLessonMarkdown(lesson.authoringSource).steps.find(step => step.id === "physics-tawjihi-2025-p083-q496");
  assert.equal(question.type, "exam-question");
  const source = lesson.authoringSource.split("id: physics-tawjihi-2025-p083-q496")[1].split(":::")[0];
  for (const choice of ["سرعة الجسيم.", "كتلة الجسيم وشحنته.", "كتلة الجسيم فقط.", "نصف قطر السيكلترون."]) assert.ok(source.includes(choice));
  assert.match(source, /أكثر من إجابة صحيحة/);
});

test("every retained Physics figure exists and has source crop provenance", async () => {
  const coverage = JSON.parse(await readFile(new URL("../src/data/lessons/physics/source-coverage.json", import.meta.url)));
  const crops = JSON.parse(await readFile(new URL("../assets/lessons/physics/source-crops/sources.json", import.meta.url)));
  const files = new Set(crops.map(crop => crop.file));
  const referenced = new Set(coverage.questions.flatMap(question => question.figures));
  assert.deepEqual(files, referenced);
  assert.equal(files.size, coverage.totals.figureCrops);
  for (const crop of crops) {
    await access(new URL(`../${crop.file}`, import.meta.url));
    assert.ok(crop.clips.length > 0 && crop.clips.every(clip => clip.page > 0 && clip.rect.length === 4));
    assert.match(crop.encoding, /lossless/);
  }
});

test("member Home counts retained Physics questions and preserves subject and learner isolation", async () => {
  const store = createSubjectProgressStore();
  const session = createLearnerSession({ progressStore:store });
  await session.signIn({ identifier:"free", password:"Learn123" });
  const ownerId = session.getLearnerProgressOwner();
  const lesson = PHYSICS_LESSONS[0];
  await store.recordAnswer({ ownerId, subjectId:"physics", lessonId:lesson.id, partId:`${lesson.id}-practice`, stepId:lesson.questionIds[0], correct:true });
  const learning = session.getLearnerHomeSnapshot().learning.subjects;
  assert.equal(learning.physics.currentQuestionsSolved, 1);
  assert.equal(learning.physics.currentQuestionsTotal, 565);
  assert.equal(learning.ict.currentQuestionsSolved, 0);
  await session.signIn({ identifier:"subscribed", password:"Learn123" });
  assert.equal(session.getLearnerHomeSnapshot().learning.subjects.physics.currentQuestionsSolved, 0);
  await store.close();
});
