// Publication, account access, and sequence are separate from earned progress.
export function getNextSubjectPart(roadmap, getPartProgress) {
  return roadmap?.units.flatMap((unit) => unit.lessons.flatMap((lesson) =>
    (lesson.parts || []).map((part) => ({ unit, lesson, part }))))
    .find(({ lesson, part }) => !lesson.optional &&
      (!part.startStepId || !getPartProgress?.(lesson, part)?.completed)) || null;
}

export function getSubjectPartAccess(roadmap, {
  lessonId, partId, getPartProgress, accountRequired = false,
} = {}) {
  const unit = roadmap?.units.find(({ lessons }) => lessons.some(({ id }) => id === lessonId));
  const lesson = unit?.lessons.find(({ id }) => id === lessonId);
  const part = lesson?.parts?.find(({ id }) => id === partId);
  if (!part) return null;
  const progress = getPartProgress?.(lesson, part);
  const previous = getNextSubjectPart(roadmap, getPartProgress);
  const state = !part.startStepId ? "unpublished"
    : accountRequired ? "account-required"
    : progress?.completed ? "completed"
    : !lesson.optional && part !== previous?.part ? "previous-required"
    : progress?.completedStepIds?.length ? "in-progress" : "available";
  return { unit, lesson, part, state, previous };
}
