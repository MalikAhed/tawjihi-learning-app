// Only current questions contribute. Retired teaching and historical completion flags
// remain stored, but cannot fill a ring for newly added questions.
export function getLessonQuestionProgress(lesson, getPartProgress, getPartQuestionIds) {
  const parts = (lesson.parts || []).map(part => {
    const ids = [...new Set(part.questionIds || getPartQuestionIds?.(lesson, part) || [])];
    const record = getPartProgress?.(lesson, part);
    const completed = new Set(record?.completedStepIds || []);
    const attempted = new Set((record?.review || []).map(item => item.stepId));
    const solved = new Set((record?.review || []).filter(item => item.solved).map(item => item.stepId));
    return { part, ids, completed:ids.filter(id => completed.has(id)), solved:ids.filter(id => solved.has(id) || completed.has(id) && !attempted.has(id)) };
  });
  const total = parts.reduce((sum, part) => sum + part.ids.length, 0);
  const solved = parts.reduce((sum, part) => sum + part.solved.length, 0);
  return {
    total, solved, percent:total ? solved / total * 100 : 0,
    completed:total > 0 && solved === total,
    nextPart:parts.find(part => part.completed.length < part.ids.length)?.part || parts[0]?.part,
  };
}
