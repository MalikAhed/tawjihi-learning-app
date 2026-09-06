import { getCourseSubject } from "../data/course.js";
import { loadSubjectLessonPart } from "../data/lessons/subject-lesson-registry.js";
import { createSubjectProgressStore } from "../data/subject-progress-store.js";
import { getSubjectRoadmap } from "../data/subject-roadmaps.js";
import { escapeHtml, prefersReducedMotion } from "../lib/dom.js";
import { renderLesson, renderLessonError, renderLessonLoading } from "./lesson-view.js";
import { mountSubjectRoadmap } from "./subject-roadmap.js";

export function createSubjectLearningController({
  elements,
  productService,
  appTitle,
  beginRequest,
  isCurrentRequest,
  disposeActiveContent,
  useContentLifecycle,
  setActiveContentCleanup,
  setDevelopmentViewMode,
  showContentView,
  writeRoute,
  onRequireAccount,
}) {
  const browserStorage = (name) => { try { return window[name]; } catch { return null; } };
  const memberProgress = createSubjectProgressStore({ storage:browserStorage("localStorage") });
  const guestProgress = createSubjectProgressStore({ storage:browserStorage("sessionStorage") });
  const progressContext = () => {
    const ownerId = productService.getLearnerProgressOwner();
    return { ownerId, store:ownerId === "guest" ? guestProgress : memberProgress };
  };
  let selectedPartId = null;
  let mapScrollPosition = 0;
  let subjectId = null;
  let lessonId = null;
  let opener = null;
  let pathScrollPosition = 0;

  function reset() {
    selectedPartId = null;
    subjectId = null;
    lessonId = null;
    opener = null;
  }

  function getState() {
    return Object.freeze({ subjectId, lessonId, opener, pathScrollPosition });
  }

  function openSubject(nextSubjectId, nextOpener = null, { historyMode = "push", focusContent = false, restoreMap = false } = {}) {
    const subject = getCourseSubject(nextSubjectId);
    if (!subject) return;
    beginRequest();
    if (nextOpener) {
      opener = nextOpener;
      pathScrollPosition = window.scrollY;
    }
    subjectId = subject.id;
    lessonId = null;
    disposeActiveContent();
    setDevelopmentViewMode("subject");
    elements.lessonShell.dataset.subject = subject.id;
    elements.lessonTitle.textContent = subject.name;
    elements.lessonStatus.textContent = "قيد التقدم";
    elements.lessonContent.removeAttribute("aria-busy");
    const banned = productService.getAccountType() === "banned";
    const guestTrial = productService.getGuestTrialState?.();
    const roadmap = getSubjectRoadmap(subject.id);
    const { ownerId, store } = progressContext();
    if (roadmap && !banned) useContentLifecycle(mountSubjectRoadmap({
      container:elements.lessonContent,
      roadmap,
      getPartProgress:(lesson, part) => store.get({ ownerId, subjectId:subject.id, lessonId:lesson.id, partId:part.id }),
      getPartReview:(lesson, part) => store.getReview({ ownerId, subjectId:subject.id, lessonId:lesson.id, partId:part.id }),
      isLessonLocked:guestTrial?.active
        ? (_unit, lesson) => !["course-introduction", "database-management"].includes(lesson.id)
        : null,
      onRequireAccount,
      onStartLesson({ lessonId:nextLessonId, lessonLabel, partId, reviewStepId }) {
        mapScrollPosition = window.scrollY;
        selectedPartId = partId;
        void openLesson({ subjectId:subject.id, lessonId:nextLessonId, lessonLabel, partId, reviewStepId });
      },
    }));
    else elements.lessonContent.innerHTML = `<section class="subject-status-view" data-subject="${escapeHtml(subject.id)}" aria-labelledby="subject-status-title"><p>${escapeHtml(subject.name)}</p><h1 id="subject-status-title">${banned ? "الحساب محظور" : "قيد التقدم"}</h1><p class="subject-status-message">${banned ? "لا يمكن فتح المادة بهذا الحساب حاليًا." : "نعمل حاليًا على إعداد محتوى هذه المادة."}</p></section>`;
    document.title = `${subject.name} · ${appTitle}`;
    showContentView();
    writeRoute({ subject:subject.id }, historyMode);
    window.scrollTo({ top:restoreMap ? mapScrollPosition : 0, behavior:restoreMap || prefersReducedMotion() ? "auto" : "smooth" });
    if (restoreMap) {
      const selected = [...elements.lessonContent.querySelectorAll("[data-roadmap-part]")].find((button) => button.dataset.roadmapPart === selectedPartId);
      (selected || elements.lessonContent).focus({ preventScroll:true });
    } else if (nextOpener || focusContent) elements.lessonContent.focus({ preventScroll:true });
  }

  function openFromCard(nextSubjectId, nextOpener) {
    openSubject(nextSubjectId, nextOpener);
  }

  async function openLesson({ subjectId:nextSubjectId, lessonId:nextLessonId, lessonLabel, partId, reviewStepId }) {
    const request = beginRequest();
    const { ownerId, store } = progressContext();
    const reference = lessonLabel || "الدرس";
    subjectId = nextSubjectId;
    lessonId = nextLessonId;
    disposeActiveContent();
    setDevelopmentViewMode();
    elements.lessonContent.setAttribute("aria-busy", "true");
    elements.lessonTitle.textContent = reference;
    elements.lessonStatus.textContent = "جارٍ التحميل";
    renderLessonLoading(elements.lessonContent, reference);
    showContentView();
    window.scrollTo({ top:0, behavior:"auto" });

    const load = async () => {
      try {
        const lesson = await loadSubjectLessonPart(nextSubjectId, nextLessonId, partId);
        if (!isCurrentRequest(request)) return;
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonTitle.textContent = lesson?.title || reference;
        elements.lessonStatus.textContent = lesson ? "درس منشور" : "قيد التقدم";
        const isGuestTrialLesson = productService.getGuestTrialState?.().active
          && nextSubjectId === "ict" && nextLessonId === "course-introduction";
        const recordKey = { ownerId, subjectId:nextSubjectId, lessonId:nextLessonId, partId };
        const saved = store.get(recordKey);
        const totalParts = getSubjectRoadmap(nextSubjectId).units.flatMap((unit) => unit.lessons).flatMap((lesson) => lesson.parts || []).length;
        const outcomeKey = { ...recordKey, totalParts };
        let before = store.getOutcome(outcomeKey);
        const outcome = (preview = false) => {
          const after = store.getOutcome({ ...outcomeKey, preview });
          const result = { ...after, xpGain:after.totalXp - before.totalXp, progressGain:after.progress - before.progress, streakGain:Math.max(0, after.streak - before.streak), preview };
          // The explicit ending preview demonstrates one newly earned streak day.
          if (preview && result.streakGain === 0) {
            result.streak = before.streak + 1;
            result.streakGain = 1;
          }
          if (preview && result.xpGain === 0) {
            result.xpGain = 10;
            result.totalXp = before.totalXp + 10;
          }
          if (preview && result.progressGain === 0 && result.progress < 100) {
            result.completed = Math.min(totalParts, before.completed + 1);
            result.progress = Math.round(result.completed / totalParts * 100);
            result.progressGain = result.progress - before.progress;
          }
          if (!preview) before = after;
          return result;
        };
        const rendered = renderLesson(elements.lessonContent, reference, lesson, {
          isLessonPart:true,
          allowTestPass:true,
          getCompletionOutcome:outcome,
          onExitLesson:returnToRoadmap,
          reviewStepId,
          onReviewComplete:returnToRoadmap,
          onAnswer:({ stepId, correct }) => store.recordAnswer({ ...recordKey, stepId, correct, reviewing:stepId === reviewStepId }),
          progress:{ completedStepIds:saved.completedStepIds, completedAt:null },
          onProgress({ completedStepIds, isComplete }) {
            if (reviewStepId) return;
            store.record({ ...recordKey, stepIds:lesson.steps.map(({ id }) => id), completedStepIds, isComplete });
            const parts = getSubjectRoadmap(nextSubjectId)?.units.flatMap(({ lessons }) => lessons).find(({ id }) => id === nextLessonId)?.parts || [];
            if (isGuestTrialLesson && parts.length && parts.every((part) => store.get({ ...recordKey, partId:part.id }).completed)) {
              productService.completeGuestFirstLesson?.();
            }
          },
        });
        setActiveContentCleanup(rendered.destroy);
        document.title = `${lesson?.title || "الدرس غير متاح"} · ${appTitle}`;
        elements.lessonContent.focus({ preventScroll:true });
      } catch (error) {
        if (!isCurrentRequest(request)) return;
        console.error("The subject lesson could not be loaded.", error);
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonStatus.textContent = "غير متاح";
        const rendered = renderLessonError(elements.lessonContent, reference, load);
        setActiveContentCleanup(rendered.destroy);
        document.title = rendered.title;
        elements.lessonContent.focus({ preventScroll:true });
      }
    };
    await load();
  }

  function returnToRoadmap() {
    if (!subjectId || !lessonId) return false;
    openSubject(subjectId, null, { historyMode:"replace", focusContent:true, restoreMap:true });
    return true;
  }

  return Object.freeze({ getState, openFromCard, openSubject, reset, returnToRoadmap });
}
