import { writeFile } from "node:fs/promises";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";
import { getIctPartQuestions } from "../src/data/lessons/ict/exam-lessons.js";

const parts = getSubjectRoadmap("ict").units.flatMap(unit => unit.lessons.flatMap(lesson => lesson.parts));
const entries = parts.map(part => `  ${JSON.stringify(part.id)}:${JSON.stringify(getIctPartQuestions(part.id).map(question => question.id))}`).join(",\n");
const source = `// Question identities only: Home and the roadmap never download the question banks.
// Regenerate after curriculum edits: node scripts/update-ict-question-index.mjs
const PART_QUESTION_IDS = Object.freeze({
${entries}
});

export function getIctPartQuestionIds(partId) {
  return PART_QUESTION_IDS[partId] || [];
}
`;
await writeFile(new URL("../src/data/lessons/ict/question-index.js", import.meta.url), source);
console.log("Updated the ICT question identity index.");
