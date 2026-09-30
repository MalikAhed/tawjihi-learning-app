import { getCourseSubject } from "../data/course.js";
import { loadSubjectLesson, loadSubjectLessonPart } from "../data/lessons/subject-lesson-registry.js";
import { getSubjectRoadmap } from "../data/subject-roadmaps.js";
import { getIctPartQuestionIds } from "../data/lessons/ict/question-index.js";
import { getSubjectPartAccess } from "../domain/subject-access.js";
import { escapeHtml, prefersReducedMotion } from "../lib/dom.js";
import { renderLessonError } from "./lesson/status.js";
import { mountSubjectRoadmap } from "./subject-roadmap.js";
import { getShellViewportBounds } from "./app-shell.js";

export function createSubjectLearningController({
  elements,
  productService,
  progressStore,
  appTitle,
  viewLifecycle,
  setViewMode,
  showContentView,
  writeRoute,
  onRequireAccount,
  onReturnToRoadmap,
}) {
  const progressContext = () => ({ ownerId:productService.getLearnerProgressOwner(), store:progressStore });
  let selectedPartId = null;
  let mapScrollPosition = 0;
  let subjectId = null;
  let lessonId = null;
  let opener = null;
  let pathScrollPosition = 0;
  let reviewUnitId = null;
  const requiresAccount = (id) => Boolean(productService.getGuestTrialState?.().active &&
    !["course-introduction", "database-management"].includes(id));

  function reset() {
    reviewUnitId = null;
    selectedPartId = null;
    subjectId = null;
    lessonId = null;
    opener = null;
  }

  function getState() {
    return Object.freeze({ subjectId, lessonId, partId:selectedPartId, opener, pathScrollPosition });
  }

  async function openSubject(
    nextSubjectId,
    nextOpener = null,
    { historyMode = "push", focusContent = false, restoreMap = false, lessonId:targetLessonId = null, partId:targetPartId = null, explainPart = null } = {},
  ) {
    const subject = getCourseSubject(nextSubjectId);
    if (!subject) return;
    if (targetLessonId === "course-introduction" && nextSubjectId === "ict") {
      targetLessonId = "database-management";
      targetPartId = "access-basics";
      historyMode = "replace";
    }
    if (targetLessonId && targetPartId) {
      return openLesson({ subjectId:subject.id, lessonId:targetLessonId, partId:targetPartId, historyMode });
    }
    const operation = viewLifecycle.begin();
    if (nextOpener) {
      opener = nextOpener;
      pathScrollPosition = window.scrollY;
    }
    if (subjectId !== subject.id) reviewUnitId = null;
    subjectId = subject.id;
    lessonId = null;
    writeRoute({ subject:subject.id }, historyMode);
    setViewMode("subject");
    elements.lessonShell.dataset.subject = subject.id;
    elements.lessonTitle.textContent = subject.name;
    elements.lessonStatus.textContent = "مسار المادة";
    elements.lessonContent.removeAttribute("aria-busy");
    const roadmap = getSubjectRoadmap(subject.id);
    const { ownerId, store } = progressContext();
    if (store.getSaveState(ownerId) === "loading") {
      elements.lessonContent.innerHTML = "";
      showContentView();
      await store.ready(ownerId);
      if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
    }
    const banned = productService.getAccountType() === "banned";
    let mountedRoadmap = null;
    if (roadmap && !banned) {
      const getPartQuestionIds = subject.id === "ict"
        ? (_lesson, part) => getIctPartQuestionIds(part.id)
        : roadmap.questionsOnly ? (_lesson, part) => part.questionIds || [] : undefined;
      if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
      mountedRoadmap = mountSubjectRoadmap({
          container: elements.lessonContent,
          roadmap,
          getPartQuestionIds,
          initialReviewUnit:reviewUnitId,
          onReviewTabChange:(unitId) => { reviewUnitId = unitId; },
          getPartProgress: (lesson, part) => {
            const key = { ownerId, subjectId:subject.id, lessonId:lesson.id, partId:part.id };
            return { ...store.get(key), review:store.getReview(key) };
          },
          getPartReview: (lesson, part) =>
            store.getReview({
              ownerId,
              subjectId: subject.id,
              lessonId: lesson.id,
              partId: part.id,
            }).filter(item => !getPartQuestionIds || getPartQuestionIds(lesson, part).includes(item.stepId)),
          isLessonLocked: (_unit, lesson) => requiresAccount(lesson.id),
          onRequireAccount,
          onStartLesson({
            lessonId: nextLessonId,
            lessonLabel,
            partId,
            reviewStepId,
          }) {
            mapScrollPosition = window.scrollY;
            selectedPartId = partId;
            void openLesson({
              subjectId: subject.id,
              lessonId: nextLessonId,
              lessonLabel,
              partId,
              reviewStepId,
            });
          },
        });
      operation.add(mountedRoadmap.destroy);
    } else
      elements.lessonContent.innerHTML = `<section class="subject-status-view" data-subject="${escapeHtml(subject.id)}" aria-labelledby="subject-status-title"><p>${escapeHtml(subject.name)}</p><h1 id="subject-status-title">${banned ? "الحساب محظور" : "قيد الإعداد"}</h1><p class="subject-status-message">${banned ? "لا يمكن فتح المادة بهذا الحساب حاليًا." : "نعمل حاليًا على إعداد محتوى هذه المادة."}</p></section>`;
    document.title = `${subject.name} · ${appTitle}`;
    showContentView();
    window.scrollTo({
      top: restoreMap ? mapScrollPosition : 0,
      behavior: restoreMap || prefersReducedMotion() ? "auto" : "smooth",
    });
    if (restoreMap) {
      const selected = reviewUnitId ? elements.lessonContent.querySelector('.roadmap-review-panel:not([hidden])') : [
        ...elements.lessonContent.querySelectorAll("[data-roadmap-part]"),
      ].find((button) => button.dataset.roadmapPart === selectedPartId);
      (selected || elements.lessonContent).focus({ preventScroll: true });
      const frame = requestAnimationFrame(() => {
        if (!operation.isCurrent() || !selected || document.activeElement !== selected) return;
        const bounds = getShellViewportBounds();
        const rect = selected.getBoundingClientRect();
        if (rect.top < bounds.top || rect.bottom > bounds.bottom || rect.left < bounds.left || rect.right > bounds.right)
          selected.scrollIntoView({ block:"center", behavior:"instant" });
      });
      operation.add(() => cancelAnimationFrame(frame));
    } else if (nextOpener || focusContent)
      elements.lessonContent.focus({ preventScroll: true });
    if (explainPart && mountedRoadmap) {
      const frame = requestAnimationFrame(() => {
        if (operation.isCurrent()) mountedRoadmap.openPart(explainPart);
      });
      operation.add(() => cancelAnimationFrame(frame));
    }
    return mountedRoadmap;
  }

  function openFromCard(nextSubjectId, nextOpener) {
    openSubject(nextSubjectId, nextOpener);
  }

  async function openLesson({
    subjectId: nextSubjectId,
    lessonId: nextLessonId,
    lessonLabel,
    partId,
    reviewStepId,
    historyMode = "push",
  }) {
    const roadmap = getSubjectRoadmap(nextSubjectId);
    const target = getSubjectPartAccess(roadmap, { lessonId:nextLessonId, partId });
    if (!target) return openSubject(nextSubjectId, null, { historyMode:"replace", focusContent:true });
    const operation = viewLifecycle.begin();
    const { ownerId, store } = progressContext();
    const reference = lessonLabel || target.part.label;
    subjectId = nextSubjectId;
    lessonId = nextLessonId;
    selectedPartId = partId;
    writeRoute({ subject:nextSubjectId, lesson:nextLessonId, part:partId }, historyMode);

    const load = async () => {
      try {
        await store.ready(ownerId);
        if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
        const access = getSubjectPartAccess(roadmap, {
          lessonId:nextLessonId, partId,
          getPartProgress:(lesson, part) => store.get({ ownerId, subjectId:nextSubjectId, lessonId:lesson.id, partId:part.id }),
          accountRequired:requiresAccount(nextLessonId),
        });
        if (productService.getAccountType() === "banned" || !["available", "in-progress", "completed"].includes(access.state)) {
          if (onReturnToRoadmap?.({ subjectId:nextSubjectId, lessonId:nextLessonId, partId, explainAccess:true })) return;
          const map = await openSubject(nextSubjectId, null, { historyMode:"replace", focusContent:true, restoreMap:true });
          if (subjectId === nextSubjectId && lessonId === null) map?.openPart({ lessonId:nextLessonId, partId });
          return;
        }
        const [lesson, { renderLesson }] = await Promise.all([
          loadSubjectLesson(nextSubjectId, nextLessonId),
          import("./lesson-view.js"),
        ]);
        if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
        // Old review URLs still open their part after source exercises replace
        // retired practice. Historical answers stay stored, not silently relabelled.
        if (reviewStepId && !lesson?.steps.some(step => step.id === reviewStepId)) reviewStepId = null;
        const isGuestTrialLesson =
          productService.getGuestTrialState?.().active &&
          nextSubjectId === "ict" &&
          nextLessonId === "course-introduction";
        const recordKey = {
          ownerId,
          subjectId: nextSubjectId,
          lessonId: nextLessonId,
          partId,
        };
        // Keep each question in its published part record while displaying one full lesson.
        const partLessons = await Promise.all(target.lesson.parts.map(async part => ({
          part, lesson:await loadSubjectLessonPart(nextSubjectId, nextLessonId, part.id),
        })));
        if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
        const questionParts = new Map(partLessons.flatMap(({ part, lesson }) => lesson.steps.map(step => [step.id, part.id])));
        const records = partLessons.map(({ part }) => {
          const key = { ...recordKey, partId:part.id };
          return { ...store.get(key), review:store.getReview(key) };
        });
        const saved = {
          completedStepIds:records.flatMap(record => record.completedStepIds),
          completed:lesson.steps.every(step => records.some(record => record.completedStepIds.includes(step.id))),
        };
        const totalParts = getSubjectRoadmap(nextSubjectId)
          .units.flatMap((unit) => unit.lessons)
          .flatMap((lesson) => lesson.parts || []).length;
        const outcomeKey = { ...recordKey, totalParts };
        const currentOutcome = () => {
          const outcome = store.getOutcome(outcomeKey);
          const home = store.getHomeLearning(ownerId, [roadmap]);
          return { ...outcome, progress:home.progress, completed:home.requiredLessonsCompleted, totalParts:home.curriculumLessonsTotal,
            completedQuestions:home.currentQuestionsSolved, totalQuestions:home.currentQuestionsTotal,
            lessonShare:home.currentQuestionsTotal ? Math.round(lesson.steps.length / home.currentQuestionsTotal * 100) : undefined };
        };
        let before = currentOutcome();
        const outcome = () => {
          const after = currentOutcome();
          const result = {
            ...after,
            xpGain: after.totalXp - before.totalXp,
            progressGain: after.progress - before.progress,
            streakGain: Math.max(0, after.streak - before.streak),
            alreadyCompleted:saved.completed,
          };
          before = after;
          return result;
        };
        // Keep the roadmap visible until every lesson dependency is ready. The
        // chrome and first question then replace it in the same browser frame.
        setViewMode();
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonShell.dataset.subject = nextSubjectId;
        elements.lessonTitle.textContent = lesson?.title || reference;
        elements.lessonStatus.textContent = lesson ? "درس منشور" : "قيد التقدم";
        elements.lessonStatus.hidden = true;
        const rendered = renderLesson(
          elements.lessonContent,
          reference,
          lesson,
          {
            isLessonPart: true,
            getCompletionOutcome: outcome,
            onExitLesson: returnToRoadmap,
            onFinishLesson: () => openSubject(nextSubjectId, null, {
              historyMode:"replace", focusContent:true, restoreMap:true,
            }),
            reviewStepId,
            onReviewComplete: returnToRoadmap,
            onAnswer: ({ stepId, correct, reviewing = false }) =>
              store.recordAnswer({
                ...recordKey,
                partId:questionParts.get(stepId) || partId,
                stepId,
                correct,
                reviewing: reviewing || stepId === reviewStepId,
              }),
            progress: {
              completedStepIds: saved.completedStepIds,
              mistakeStepIds: records.flatMap(record => record.review.filter(item => item.misses > 0).map(item => item.stepId)),
              completedAt: null,
            },
            async onProgress({ completedStepIds }) {
              if (reviewStepId) return;
              if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
              const completedIds = new Set(completedStepIds);
              for (const { part, lesson:partLesson } of partLessons) {
                const stepIds = partLesson.steps.map(step => step.id);
                const done = stepIds.filter(id => completedIds.has(id));
                const previous = store.get({ ...recordKey, partId:part.id });
                if (!done.length || done.every(id => previous.completedStepIds.includes(id)) && (previous.completed || done.length < stepIds.length)) continue;
                if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
                await store.record({ ...recordKey, partId:part.id, stepIds,
                  completedStepIds:done, isComplete:done.length === stepIds.length });
              }
              const parts =
                getSubjectRoadmap(nextSubjectId)
                  ?.units.flatMap(({ lessons }) => lessons)
                  .find(({ id }) => id === nextLessonId)?.parts || [];
              if (
                isGuestTrialLesson &&
                parts.length &&
                parts.every(
                  (part) =>
                    store.get({ ...recordKey, partId: part.id }).completed,
                )
              ) {
                productService.completeGuestFirstLesson?.();
              }
            },
          },
        );
        operation.add(rendered.destroy);
        showContentView({ animate:false });
        window.scrollTo({ top:0, behavior:"auto" });
        document.title = `${lesson?.title || "الدرس غير متاح"} · ${appTitle}`;
        elements.lessonContent.focus({ preventScroll: true });
      } catch (error) {
        if (!operation.isCurrent()) return;
        console.error("The subject lesson could not be loaded.", error);
        setViewMode();
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonTitle.textContent = reference;
        elements.lessonStatus.textContent = "غير متاح";
        elements.lessonStatus.hidden = false;
        const rendered = renderLessonError(
          elements.lessonContent,
          reference,
          load,
        );
        operation.add(rendered.destroy);
        showContentView({ animate:false });
        window.scrollTo({ top:0, behavior:"auto" });
        document.title = rendered.title;
        elements.lessonContent.focus({ preventScroll: true });
      }
    };
    await load();
  }

  function returnToRoadmap() {
    if (!subjectId || !lessonId) return false;
    if (onReturnToRoadmap?.({ subjectId })) return true;
    openSubject(subjectId, null, {
      historyMode: "replace",
      focusContent: true,
      restoreMap: true,
    });
    return true;
  }

  return Object.freeze({
    getState,
    openFromCard,
    openSubject,
    reset,
    returnToRoadmap,
  });
}
