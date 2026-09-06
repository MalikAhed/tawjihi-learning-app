import { calculateStreak } from "../domain/progression.js";
const PREFIX = "tawjihi:subject-parts:v1:";
const keyFor = (subjectId, lessonId, partId) => JSON.stringify([subjectId, lessonId, partId]);
const empty = () => ({ completedStepIds:[], completed:false });

function validReview(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item?.stepId === "string" && Number.isSafeInteger(item.misses) && item.misses >= 0 && typeof item.active === "boolean").map((item) => ({ ...item })) : [];
}

// A local prototype adapter. Completion evidence stays separate from XP and mastery.
export function createSubjectProgressStore({ storage = null, onError = () => {} } = {}) {
  const owners = new Map();
  function recordsFor(ownerId) {
    if (owners.has(ownerId)) return owners.get(ownerId);
    const records = new Map();
    try {
      const saved = JSON.parse(storage?.getItem(PREFIX + encodeURIComponent(ownerId)) || "null");
      if (saved?.version === 1 && Array.isArray(saved.records)) {
        for (const [key, value] of saved.records) {
          if (typeof key !== "string" || !Array.isArray(value?.completedStepIds)
            || !value.completedStepIds.every((id) => typeof id === "string")
            || typeof value.completed !== "boolean") continue;
          records.set(key, { completedStepIds:[...new Set(value.completedStepIds)], completed:value.completed, review:validReview(value.review), completedDate:typeof value.completedDate === "string" ? value.completedDate : null, rewardXp:value.rewardXp === 10 ? 10 : 0 });
        }
      }
    } catch (error) { onError(error); }
    owners.set(ownerId, records);
    return records;
  }
  function get({ ownerId, subjectId, lessonId, partId }) {
    const record = recordsFor(ownerId).get(keyFor(subjectId, lessonId, partId)) || empty();
    return { completedStepIds:[...record.completedStepIds], completed:record.completed };
  }
  function record({ ownerId, subjectId, lessonId, partId, stepIds, completedStepIds, isComplete, date = localDateKey() }) {
    const records = recordsFor(ownerId);
    const key = keyFor(subjectId, lessonId, partId);
    const previous = records.get(key) || empty();
    const allowed = new Set(stepIds);
    const completed = new Set([...previous.completedStepIds, ...completedStepIds].filter((id) => allowed.has(id)));
    const firstCompletion = !previous.completed && isComplete === true && allowed.size > 0 && [...allowed].every((id) => completed.has(id));
    records.set(key, {
      ...previous,
      completedDate:firstCompletion ? date : previous.completedDate,
      rewardXp:firstCompletion ? 10 : previous.rewardXp,
      completedStepIds:[...completed],
      completed:previous.completed || (isComplete === true && allowed.size > 0 && [...allowed].every((id) => completed.has(id))),
    });
    try {
      storage?.setItem(PREFIX + encodeURIComponent(ownerId), JSON.stringify({ version:1, records:[...records] }));
    } catch (error) { onError(error); }
    return get({ ownerId, subjectId, lessonId, partId });
  }
  function getReview(key) {
    return validReview(recordsFor(key.ownerId).get(keyFor(key.subjectId, key.lessonId, key.partId))?.review);
  }
  function recordAnswer({ stepId, correct, reviewing = false, ...key }) {
    if (typeof stepId !== "string" || typeof correct !== "boolean") return;
    const records = recordsFor(key.ownerId);
    const id = keyFor(key.subjectId, key.lessonId, key.partId);
    const previous = records.get(id) || empty();
    const review = getReview(key);
    const item = review.find((item) => item.stepId === stepId) || { stepId, misses:0, active:false };
    if (!review.includes(item)) review.push(item);
    if (!correct) { item.misses += 1; item.active = item.active || item.misses >= 2; }
    else if (reviewing) { item.active = false; item.misses = 0; }
    records.set(id, { ...previous, review });
    try { storage?.setItem(PREFIX + encodeURIComponent(key.ownerId), JSON.stringify({ version:1, records:[...records] })); }
    catch (error) { onError(error); }
  }
  function getOutcome({ ownerId, subjectId, totalParts, partId, lessonId, preview = false, date = localDateKey() }) {
    const subjectRecords = [...recordsFor(ownerId)].filter(([key]) => { try { return JSON.parse(key)[0] === subjectId; } catch { return false; } }).map(([, value]) => value);
    const completed = subjectRecords.filter((record) => record.completed).length;
    const dates = subjectRecords.map((record) => record.completedDate).filter(Boolean);
    const streak = calculateStreak(dates, date);
    const alreadyCompleted = get({ ownerId, subjectId, partId, lessonId }).completed;
    const gain = preview && !alreadyCompleted ? 1 : 0;
    return { totalXp:subjectRecords.reduce((sum, record) => sum + (record.rewardXp || 0), 0) + gain * 10,
      streak:gain ? calculateStreak([...dates, date], date).current : streak.current,
      activeToday:gain ? true : streak.activeToday, completed:completed + gain, totalParts,
      progress:totalParts ? Math.round((completed + gain) / totalParts * 100) : 0 };
  }
  return Object.freeze({ get, record, getReview, recordAnswer, getOutcome });
}

export function getUnitPartProgress(unit, getPartProgress = () => empty()) {
  const parts = unit.lessons.flatMap((lesson) => (lesson.parts || []).map((part) => ({ lesson, part })));
  const completed = parts.filter(({ lesson, part }) => part.startStepId && getPartProgress(lesson, part)?.completed).length;
  return { completed, total:parts.length, percent:parts.length ? Math.round(completed / parts.length * 100) : 0 };
}

export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
