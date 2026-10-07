import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";
import { loadSubjectLessonPart } from "../src/data/lessons/subject-lesson-registry.js";
import { parseLessonMarkdown } from "../src/markdown/lesson-authoring.js";
import { ICT_PAST_PAPER_QUESTIONS } from "../src/data/lessons/ict/past-paper-bank.js";
import { ICT_EXAM_QUESTIONS } from "../src/data/lessons/ict/exam-bank.js";
import { ICT_BOOK_PRACTICE } from "../src/data/lessons/ict/book-practice.js";
import { ICT_CLASSIFIED_UNIT1_QUESTIONS } from "../src/data/lessons/ict/classified-unit1-bank.js";
import { ICT_CLASSIFIED_UNIT2_QUESTIONS } from "../src/data/lessons/ict/classified-unit2-bank.js";
import { ICT_CLASSIFIED_OSI_QUESTIONS } from "../src/data/lessons/ict/classified-osi-bank.js";

const classifiedQuestions = [
  ...ICT_CLASSIFIED_UNIT1_QUESTIONS,
  ...ICT_CLASSIFIED_UNIT2_QUESTIONS,
  ...ICT_CLASSIFIED_OSI_QUESTIONS,
];

test("source questions replace synthetic practice without rewriting their original prompts or choices", async () => {
  const questions = [...ICT_EXAM_QUESTIONS, ...ICT_BOOK_PRACTICE, ...ICT_PAST_PAPER_QUESTIONS, ...classifiedQuestions];
  const byId = new Map(questions.map(question => [question.id, question]));
  assert.equal(byId.size, questions.length);
  const used = new Set();
  for (const lesson of getSubjectRoadmap("ict").units.flatMap(unit => unit.lessons)) {
    if (lesson.id === "course-introduction") { assert.equal(lesson.optional, true); continue; }
    for (const part of lesson.parts) {
      const content = await loadSubjectLessonPart("ict", lesson.id, part.id);
      const parsed = parseLessonMarkdown(content.authoringSource, { published:true });
      assert.deepEqual(parsed.issues, []);
      for (const step of parsed.steps) {
        const source = byId.get(step.id);
        assert.ok(source, `${step.id}: every active prompt comes from a supplied source`);
        assert.equal(source.lessonId, lesson.id);
        assert.equal(source.partId, part.id);
        assert.ok(!used.has(step.id), `${step.id}: one owner for each question`);
        used.add(step.id);
        assert.ok(source.sourcePage >= 1 && source.sourcePage <= (source.sourceDocument === "book" ? 62 : source.sourceFile ? 142 : 86));
        assert.ok(source.bookPages.length && source.bookPages.every(page => page >= 3 && page <= 60));
        if (step.type === "mcq") {
          assert.equal(step.content.prompt, source.question);
          assert.deepEqual(step.content.answers.map(answer => answer.text), source.choices);
          assert.equal(step.content.answers.findIndex(answer => answer.correct), source.correctChoiceIndex);
          if (source.figureNeeded) assert.ok(source.figure && step.content.example.includes(source.figure));
          if (source.sourceConflict) assert.ok(step.content.correctFeedback.includes(source.sourceConflict));
        } else {
          assert.equal(step.type, "exam-question");
          assert.ok(!source.choices, `${step.id}: original choices must be selectable`);
          assert.ok(step.content.body.startsWith(source.question), `${step.id}: original wording remains intact`);
          assert.equal(step.content.solution, source.answer);
          if (source.figureNeeded) assert.ok(source.figure && step.content.body.includes(source.figure));
          if (source.sourceConflict) assert.ok(step.content.guidance.includes(source.sourceConflict));
        }
      }
    }
  }
  assert.deepEqual(used, new Set(byId.keys()));
  assert.equal(ICT_EXAM_QUESTIONS.some(question => question.lessonId === "osi-model-layers"), false, "semester papers do not falsely claim OSI coverage");
  const accessParts = getSubjectRoadmap("ict").units[0].lessons.find(lesson => lesson.id === "database-management").parts.map(part => part.id);
  assert.ok(accessParts.indexOf("build-and-integrity") < accessParts.indexOf("education-center"));
});

test("five textbook lessons expose questions only, including legacy part links", async () => {
  const lessons = getSubjectRoadmap("ict").units.flatMap(unit => unit.lessons).filter(lesson => !lesson.hidden);
  assert.equal(lessons.length, 5);
  for (const lesson of lessons) for (const part of lesson.parts) {
    const content = await loadSubjectLessonPart("ict", lesson.id, part.id);
    const { steps, issues } = parseLessonMarkdown(content.authoringSource, { published:true });
    assert.deepEqual(issues, []);
    assert.ok(steps.length && steps.every(step => ["mcq", "exam-question"].includes(step.type)));
    assert.doesNotMatch(content.authoringSource, /presentation:|youtube\.com|assets\/lessons\/ict\/summary\//);
  }
});

test("source archive records retain the supplied document identities", async () => {
  const sources = {
    ict:"4c9fbe32f1b76d840d213badacfb5b7830722d0e3569595a4f2b224544c64aba",
    summary:"51d3885f88b6f0fb9cb55ae081c9da941cd9a265ff345efaedc45bc504af8e6b",
    exams:"4fdff8b18d8ce8c9dedec604e7e8738ad99b722397fe8ad7490f95a4f8c22ec1",
  };
  for (const [name, digest] of Object.entries(sources)) {
    const ledger = JSON.parse(await readFile(new URL('../src/data/lessons/ict/source-documents.json', import.meta.url), 'utf8'));
    assert.equal(ledger.documents[name].sha256, digest, `${name}: page numbers refer to the audited original`);
    assert.equal(ledger.documents[name].archived, true);
    await assert.rejects(readFile(new URL(`../assets/books/${name}.pdf`, import.meta.url)), {code:'ENOENT'});
  }
});

test("the full classified collection keeps its original pages and avoids repeated source questions", async () => {
  const ledger = JSON.parse(await readFile(new URL('../src/data/lessons/ict/source-documents.json', import.meta.url), 'utf8'));
  assert.equal(ledger.documents['ict-classified-2023'].sha256, 'f98a49d719f0f7b5d26524ee7f6116b59d0c4bd3761163045abd635af2ce7685');
  assert.equal(ledger.documents['ict-classified-2023'].pageCount, 142);
  const existing = [...ICT_EXAM_QUESTIONS, ...ICT_BOOK_PRACTICE, ...ICT_PAST_PAPER_QUESTIONS];
  const signature = question => [question.question, ...(question.choices || []), question.figure || ""]
    .join(" ").replace(/\s+/g, " ").trim().toLowerCase();
  const seen = new Set(existing.map(signature));
  for (const question of classifiedQuestions) {
    assert.equal(question.sourceFile, "ict-classified-2023");
    assert.ok(question.sourcePage >= 1 && question.sourcePage <= 142);
    assert.ok(question.answerPage >= 1 && question.answerPage <= 142);
    assert.equal(question.answerProvenance, "source-key-reviewed");
    const key = signature(question);
    assert.ok(!seen.has(key), `${question.id}: repeated source question`);
    seen.add(key);
    if (question.figureNeeded) {
      assert.ok(question.figure, `${question.id}: original figure is required`);
      const figure = await readFile(new URL(`../${question.figure}`, import.meta.url));
      assert.ok(figure.length > 100, `${question.id}: original figure is present`);
    }
  }
});

test("classified question figures are exact, traceable crops or the original embedded image", async () => {
  const root = new URL("../assets/lessons/ict/exams/", import.meta.url);
  const unit1 = JSON.parse(await readFile(new URL("classified-crops.json", root), "utf8"));
  const unit2 = JSON.parse(await readFile(new URL("classified-unit2-figures.json", root), "utf8"));
  const osi = JSON.parse(await readFile(new URL("classified-osi-figure.json", root), "utf8"));
  const figures = new Map([
    ...Object.entries(unit1.crops).map(([name, record]) => [`${name}.webp`, record]),
    ...unit2.figures.map(record => [record.file, record]),
    [osi.file, osi],
  ]);
  const used = new Set();
  for (const question of classifiedQuestions.filter(item => item.figureNeeded)) {
    const file = question.figure.split("/").at(-1);
    const record = figures.get(file);
    assert.ok(record, `${question.id}: figure has crop provenance`);
    assert.equal(record.sourcePage, question.sourcePage, `${question.id}: figure belongs to its question page`);
    const bytes = await readFile(new URL(file, root));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), record.sha256, `${file}: optimized figure matches its provenance record`);
    assert.equal(file.endsWith(".webp") ? bytes.toString("ascii", 8, 12) : bytes.subarray(0, 2).toString("hex"),
      file.endsWith(".webp") ? "WEBP" : "ffd8");
    used.add(file);
  }
  assert.deepEqual(used, new Set(figures.keys()), "only figures used by classified questions ship");
});

test("exam review covers every source page and every shipped figure retains its provenance", async () => {
  const manifest = JSON.parse(await readFile(new URL("../assets/lessons/ict/exams/sources.json", import.meta.url), "utf8"));
  assert.deepEqual(manifest.pages.map(page => page.page), Array.from({ length:86 }, (_, index) => index + 1));
  assert.ok(manifest.pages.every(page => page.reviewedVisually && page.disposition));
  const questions = [...ICT_EXAM_QUESTIONS, ...ICT_BOOK_PRACTICE];
  const figures = new Map(manifest.figures.map(figure => [figure.file, figure]));
  assert.equal(figures.size, manifest.figures.length);
  const used = new Set();
  for (const question of questions) {
    if (question.sourceDocument !== "book") {
      assert.ok(manifest.pages[question.sourcePage - 1].questionIds.includes(question.id));
    }
    const text = [question.question, question.answer, question.figure || ""].join("\n");
    for (const [file] of text.matchAll(/assets\/lessons\/ict\/exams\/[\w-]+\.webp/g)) {
      assert.ok(figures.has(file), `${file}: used figure has a source record`);
      used.add(file);
    }
  }
  assert.deepEqual(used, new Set(figures.keys()), "only figures used in lessons ship");
  for (const figure of figures.values()) {
    const source = manifest.sources[figure.sourceDocument];
    assert.ok(source && figure.sourcePage >= 1 && figure.sourcePage <= source.pageCount);
    assert.ok(figure.rect.length === 4 && figure.rect.every(Number.isFinite));
    assert.ok(figure.rect[0] >= 0 && figure.rect[1] >= 0 && figure.rect[2] > figure.rect[0] && figure.rect[3] > figure.rect[1]);
    const bytes = await readFile(new URL(`../${figure.file}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), figure.sha256, `${figure.file}: optimized figure matches its provenance record`);
    assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
  }
});

test("new past papers and original figure crops retain their checked source identity", async () => {
  const manifest = JSON.parse(await readFile(new URL("../assets/lessons/ict/exams/past-paper-sources.json", import.meta.url), "utf8"));
  const ledger = JSON.parse(await readFile(new URL('../src/data/lessons/ict/source-documents.json', import.meta.url), 'utf8'));
  assert.equal(ledger.documents['ict-past-papers-selected'].sha256, manifest.sourceSha256);
  const used = new Set();
  for (const question of ICT_PAST_PAPER_QUESTIONS) {
    assert.ok(question.sourcePage > 0 && question.sourcePage <= manifest.pageCount);
    assert.ok(question.answerPage > 0 && question.answerPage <= manifest.pageCount);
    assert.equal(question.answerProvenance, "source-key-reviewed");
    for (const [file] of [question.figure || "", question.answer].join("\n").matchAll(/assets\/lessons\/ict\/exams\/[\w-]+\.webp/g)) used.add(file);
  }
  assert.deepEqual(used, new Set(manifest.figures.map(figure => figure.file)));
  for (const figure of manifest.figures) {
    const bytes = await readFile(new URL(`../${figure.file}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), figure.sha256);
    assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
  }
  const corrected = ICT_PAST_PAPER_QUESTIONS.find(question => question.id === "past-p74-q1-20");
  assert.equal(corrected.correctChoiceIndex, 1);
  assert.ok(corrected.sourceConflict, "a wrong printed key must never silently become an app answer");
});

test("every source tag has a shipped original crop with traceable PDF coordinates", async () => {
  const root = new URL("../assets/lessons/ict/exams/source-crops/", import.meta.url);
  const manifest = JSON.parse(await readFile(new URL("sources.json", root), "utf8"));
  const crops = new Map(manifest.images.map(image => [image.file, image]));
  const questions = [...ICT_EXAM_QUESTIONS, ...ICT_BOOK_PRACTICE, ...ICT_PAST_PAPER_QUESTIONS];
  for (const question of questions) {
    for (const kind of ["question", ...(question.answerPage ? ["answer"] : [])]) {
      const imageKind = kind === "answer" && question.answerPage === question.sourcePage ? "question" : kind;
      const file = `${question.id}-${imageKind}.webp`;
      const crop = crops.get(file);
      assert.ok(crop, `${file}: missing provenance`);
      assert.equal(crop.clips[0].page, kind === "question" ? question.sourcePage : question.answerPage);
      assert.equal(crop.source, `${question.sourceFile || (question.sourceDocument === "book" ? "ict" : "exams")}.pdf`);
      assert.ok(crop.clips.every(({ page, rect }) => page > 0 && rect.length === 4 && rect[0] < rect[2] && rect[1] < rect[3]));
      const bytes = await readFile(new URL(file, root));
      assert.equal(bytes.toString("ascii", 8, 12), "WEBP", `${file}: invalid image`);
    }
  }
});

test('classified source links resolve to complete, traceable lightweight pages without PDFs',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../assets/lessons/ict/exams/source-pages/source-pages.json',import.meta.url),'utf8'));
  const expectedPages=[...new Set(classifiedQuestions.flatMap(question=>[question.sourcePage,question.answerPage]).filter(Boolean))].sort((a,b)=>a-b);
  assert.deepEqual(manifest.pages.map(record=>record.page).sort((a,b)=>a-b),expectedPages);
  assert.equal(manifest.sourcePDF.sha256,'f98a49d719f0f7b5d26524ee7f6116b59d0c4bd3761163045abd635af2ce7685');
  for(const record of manifest.pages){
    assert.ok(record.width>=1100&&record.height>=1500,'source text keeps readable native resolution');
    const bytes=await readFile(new URL(`../${record.file}`,import.meta.url));
    assert.equal(bytes.subarray(8,12).toString(),'WEBP');
    assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha256);
    assert.equal(record.sourcePDFsha256,manifest.sourcePDF.sha256);
  }
  const lessons=getSubjectRoadmap('ict').units.flatMap(unit=>unit.lessons).filter(lesson=>!lesson.hidden);
  const references=new Set();
  for(const lesson of lessons)for(const part of lesson.parts){
    const content=await loadSubjectLessonPart('ict',lesson.id,part.id);
    assert.doesNotMatch(content.authoringSource,/assets\/books\/[^)\s]+\.pdf/);
    for(const [reference] of content.authoringSource.matchAll(/assets\/lessons\/ict\/exams\/source-pages\/classified-p\d+\.webp/g))references.add(reference);
  }
  assert.deepEqual(references,new Set(manifest.pages.map(record=>record.file)));
});
