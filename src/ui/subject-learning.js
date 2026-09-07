import { getCourseSubject } from "../data/course.js";
import { loadSubjectLessonPart } from "../data/lessons/subject-lesson-registry.js";
import { getSubjectRoadmap } from "../data/subject-roadmaps.js";
import { getSubjectPartAccess } from "../domain/subject-access.js";
import { escapeHtml, prefersReducedMotion } from "../lib/dom.js";
import { renderLessonError, renderLessonLoading } from "./lesson/status.js";
import { mountSubjectRoadmap } from "./subject-roadmap.js";
import { getShellViewportBounds } from "./app-shell.js";

export function createSubjectLearningController({
  elements,
  productService,
  progressStore,
  appTitle,
  viewLifecycle,
  setDevelopmentViewMode,
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
    setDevelopmentViewMode("subject");
    elements.lessonShell.dataset.subject = subject.id;
    elements.lessonTitle.textContent = subject.name;
    elements.lessonStatus.textContent = "مسار المادة";
    elements.lessonContent.removeAttribute("aria-busy");
    const roadmap = getSubjectRoadmap(subject.id);
    const { ownerId, store } = progressContext();
    if (store.getSaveState(ownerId) === "loading") {
      renderLessonLoading(elements.lessonContent, subject.name);
      showContentView();
      await store.ready(ownerId);
      if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
    }
    const banned = productService.getAccountType() === "banned";
    let mountedRoadmap = null;
    if (roadmap && !banned) {
      mountedRoadmap = mountSubjectRoadmap({
          container: elements.lessonContent,
          roadmap,
          initialReviewUnit:reviewUnitId,
          onReviewTabChange:(unitId) => { reviewUnitId = unitId; },
          getPartProgress: (lesson, part) =>
            store.get({
              ownerId,
              subjectId: subject.id,
              lessonId: lesson.id,
              partId: part.id,
            }),
          getPartReview: (lesson, part) =>
            store.getReview({
              ownerId,
              subjectId: subject.id,
              lessonId: lesson.id,
              partId: part.id,
            }),
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
    setDevelopmentViewMode();
    elements.lessonContent.setAttribute("aria-busy", "true");
    elements.lessonTitle.textContent = reference;
    elements.lessonStatus.textContent = "جارٍ التحميل";
    renderLessonLoading(elements.lessonContent, reference);
    showContentView();
    window.scrollTo({ top: 0, behavior: "auto" });

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
          loadSubjectLessonPart(nextSubjectId, nextLessonId, partId),
          import("./lesson-view.js"),
        ]);
        if (!operation.isCurrent() || ownerId !== productService.getLearnerProgressOwner()) return;
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonTitle.textContent = lesson?.title || reference;
        elements.lessonStatus.textContent = lesson ? "درس منشور" : "قيد التقدم";
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
        const saved = store.get(recordKey);
        const totalParts = getSubjectRoadmap(nextSubjectId)
          .units.flatMap((unit) => unit.lessons)
          .flatMap((lesson) => lesson.parts || []).length;
        const outcomeKey = { ...recordKey, totalParts };
        let before = store.getOutcome(outcomeKey);
        const outcome = () => {
          const after = store.getOutcome(outcomeKey);
          const result = {
            ...after,
            xpGain: after.totalXp - before.totalXp,
            progressGain: after.progress - before.progress,
            streakGain: Math.max(0, after.streak - before.streak),
            preview:false,
          };
          before = after;
          return result;
        };
        const rendered = renderLesson(
          elements.lessonContent,
          reference,
          lesson,
          {
            isLessonPart: true,
            mode:"learner",
            allowTestPass: false,
            getCompletionOutcome: outcome,
            onExitLesson: returnToRoadmap,
            reviewStepId,
            onReviewComplete: returnToRoadmap,
            onAnswer: ({ stepId, correct }) =>
              store.recordAnswer({
                ...recordKey,
                stepId,
                correct,
                reviewing: stepId === reviewStepId,
              }),
            progress: {
              completedStepIds: saved.completedStepIds,
              completedAt: null,
            },
            async onProgress({ completedStepIds, isComplete }) {
              if (reviewStepId) return;
              await store.record({
                ...recordKey,
                stepIds: lesson.steps.map(({ id }) => id),
                completedStepIds,
                isComplete,
              });
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
        document.title = `${lesson?.title || "الدرس غير متاح"} · ${appTitle}`;
        elements.lessonContent.focus({ preventScroll: true });
      } catch (error) {
        if (!operation.isCurrent()) return;
        console.error("The subject lesson could not be loaded.", error);
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonStatus.textContent = "غير متاح";
        const rendered = renderLessonError(
          elements.lessonContent,
          reference,
          load,
        );
        operation.add(rendered.destroy);
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
