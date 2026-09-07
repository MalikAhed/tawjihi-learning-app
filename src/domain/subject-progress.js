// @ts-check
import { calculateStreak, getRankProgress } from "./progression.js";

/** @typedef {{ownerId:string, subjectId:string, lessonId:string, partId:string}} ProgressKey */
/** @typedef {{stepId:string, misses:number, active:boolean, solved?:boolean}} ReviewItem */
/** @typedef {{completedStepIds:string[], completed:boolean, review:ReviewItem[], completedDate:string|null, rewardXp:number, revision?:number}} PartRecord */
/** @typedef {ProgressKey & {stepIds:string[], completedStepIds:string[], isComplete:boolean, date?:string}} CompletionUpdate */
/** @typedef {ProgressKey & {stepId:string, correct:boolean, reviewing?:boolean}} AnswerUpdate */
/** @typedef {{type:'completion', value:CompletionUpdate, id?:string} | {type:'answer', value:AnswerUpdate, id?:string}} ProgressUpdate */

/** @returns {PartRecord} */
export const emptyPart = () => ({ completedStepIds:[], completed:false, review:[], completedDate:null, rewardXp:0 });
/** @param {Pick<ProgressKey, 'subjectId'|'lessonId'|'partId'>} key */
export const partKey = ({ subjectId, lessonId, partId }) => JSON.stringify([subjectId, lessonId, partId]);

/** @param {unknown} value @returns {ReviewItem[]} */
export function validReview(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item?.stepId === "string" && Number.isSafeInteger(item.misses) && item.misses >= 0 && typeof item.active === "boolean")
    .map(({ stepId, misses, active, solved }) => ({ stepId, misses, active, ...(solved === true ? { solved:true } : {}) })) : [];
}

// Each entry is validated independently, including the persisted identity tuple.
/** @param {unknown} saved @param {(error:unknown)=>void} onError @returns {Map<string,PartRecord>} */
export function restorePartEntries(saved, onError) {
  /** @type {Map<string,PartRecord>} */
  const records = new Map();
  if (saved === null) return records;
  if (!saved || typeof saved !== "object" || !("version" in saved) || saved.version !== 1 || !("records" in saved) || !Array.isArray(saved.records)) throw new Error("Unsupported progress version; original data has been retained.");
  for (const entry of saved.records) {
    try {
      if (!Array.isArray(entry) || entry.length !== 2) throw new Error("Invalid progress entry.");
      const [key, value] = entry;
      const ids = JSON.parse(key);
      if (!Array.isArray(ids) || ids.length !== 3 || !ids.every((id) => typeof id === "string" && id)
        || !Array.isArray(value?.completedStepIds) || !value.completedStepIds.every((id) => typeof id === "string")
        || typeof value.completed !== "boolean") throw new Error("Invalid progress entry.");
      records.set(key, { completedStepIds:[...new Set(value.completedStepIds)], completed:value.completed,
        review:validReview(value.review), completedDate:/^\d{4}-\d{2}-\d{2}$/.test(value.completedDate) ? value.completedDate : null,
        rewardXp:value.completed && value.rewardXp === 10 ? 10 : 0 });
    } catch (error) { onError(error); }
  }
  return records;
}

/** @param {PartRecord} previous @param {ProgressUpdate} update @returns {PartRecord} */
export function applyProgressUpdate(previous, update) {
  if (update.type === "answer") {
    const { stepId, correct, reviewing = false } = update.value;
    const review = validReview(previous.review);
    const item = review.find((item) => item.stepId === stepId) || { stepId, misses:0, active:false };
    if (!review.includes(item)) review.push(item);
    if (!correct) { item.misses += 1; item.active ||= item.misses >= 2; }
    else { item.solved = true; if (reviewing) { item.active = false; item.misses = 0; } }
    return { ...previous, review };
  }
  const { stepIds, completedStepIds, isComplete, date = localDateKey() } = update.value;
  const allowed = new Set(stepIds);
  const completed = [...new Set([...previous.completedStepIds, ...completedStepIds])].filter((id) => allowed.has(id));
  const finished = isComplete && allowed.size > 0 && [...allowed].every((id) => completed.includes(id));
  const first = !previous.completed && finished;
  return { ...previous, completedStepIds:completed, completed:previous.completed || finished,
    completedDate:first ? date : previous.completedDate, rewardXp:first ? 10 : previous.rewardXp };
}

// Existing records win mutable review state during import. Completion is monotonic.
/** @param {PartRecord|undefined} current @param {PartRecord} imported @returns {PartRecord} */
export function mergeImportedPart(current, imported) {
  if (!current) return imported;
  return { ...current, completed:current.completed || imported.completed,
    completedStepIds:[...new Set([...current.completedStepIds, ...imported.completedStepIds])],
    completedDate:current.completedDate || imported.completedDate,
    rewardXp:Math.max(current.rewardXp, imported.rewardXp) };
}

/** @param {Iterable<PartRecord>} records @param {number} totalParts */
export function summarizeParts(records, totalParts, date = localDateKey()) {
  const values = [...records];
  const completed = values.filter((record) => record.completed).length;
  const streak = calculateStreak(values.map((record) => record.completedDate).filter(Boolean), date);
  return { totalXp:values.reduce((sum, record) => sum + record.rewardXp, 0), streak:streak.current,
    activeToday:streak.activeToday, completed, totalParts, progress:totalParts ? Math.round(completed / totalParts * 100) : 0,
    questionsSolved:values.reduce((sum, record) => sum + record.review.filter((item) => item.solved).length, 0),
    mustReviewCount:values.reduce((sum, record) => sum + record.review.filter((item) => item.active).length, 0) };
}

/** @typedef {{subjectId:string, units:readonly {lessons:readonly {id:string, parts:readonly {id:string, startStepId?:string}[]}[]}[]}} ProgressRoadmap */
/** @param {Map<string,PartRecord>} records @param {ProgressRoadmap[]} roadmaps */
export function homeLearningSummary(records, roadmaps, date = localDateKey()) {
  const lessons = roadmaps.flatMap((roadmap) => roadmap.units.flatMap((unit) => unit.lessons.map((lesson) => ({ ...lesson, subjectId:roadmap.subjectId }))));
  const parts = lessons.flatMap((lesson) => lesson.parts.map((part) => ({ ...part, subjectId:lesson.subjectId, lessonId:lesson.id, partId:part.id })));
  const values = parts.filter((part) => part.startStepId).map((part) => records.get(partKey(part)) || emptyPart());
  const summary = summarizeParts(values, parts.length, date);
  const rank = getRankProgress(summary.totalXp);
  return { ...summary, publishedPartsTotal:values.length, hasStarted:values.some((record) => record.completedStepIds.length > 0 || record.review.length > 0), xp:rank.rankXp, level:rank.rank.number, levelXpGoal:rank.rankXpTarget,
    dailyStreak:summary.streak, curriculumLessonsTotal:parts.length, requiredLessonsCompleted:summary.completed };
}

/** @param {{lessons: {parts?:{startStepId?:string}[]}[]}} unit @param {(lesson:object, part:object)=>{completed:boolean}} [getPartProgress] */
export function getUnitPartProgress(unit, getPartProgress = () => emptyPart()) {
  const parts = unit.lessons.flatMap((lesson) => (lesson.parts || []).map((part) => ({ lesson, part })));
  const completed = parts.filter(({ lesson, part }) => part.startStepId && getPartProgress(lesson, part)?.completed).length;
  return { completed, total:parts.length, percent:parts.length ? Math.round(completed / parts.length * 100) : 0 };
}

export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
