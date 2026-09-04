import { getCourseSubject } from "../data/course.js";
import { loadSubjectLesson } from "../data/lessons/subject-lesson-registry.js";
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
  let subjectId = null;
  let lessonId = null;
  let opener = null;
  let pathScrollPosition = 0;

  function reset() {
    subjectId = null;
    lessonId = null;
    opener = null;
  }

  function getState() {
    return Object.freeze({ subjectId, lessonId, opener, pathScrollPosition });
  }

  function openSubject(nextSubjectId, nextOpener = null, { historyMode = "push", focusContent = false } = {}) {
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
    if (roadmap && !banned) useContentLifecycle(mountSubjectRoadmap({
      container:elements.lessonContent,
      roadmap,
      isLessonLocked:guestTrial?.active
        ? (_unit, lesson) => lesson.id !== "database-management"
        : null,
      onRequireAccount,
      onStartLesson({ lessonId:nextLessonId, lessonLabel }) {
        void openLesson({ subjectId:subject.id, lessonId:nextLessonId, lessonLabel });
      },
    }));
    else elements.lessonContent.innerHTML = `<section class="subject-status-view" data-subject="${escapeHtml(subject.id)}" aria-labelledby="subject-status-title"><p>${escapeHtml(subject.name)}</p><h1 id="subject-status-title">${banned ? "الحساب محظور" : "قيد التقدم"}</h1><p class="subject-status-message">${banned ? "لا يمكن فتح المادة بهذا الحساب حاليًا." : "نعمل حاليًا على إعداد محتوى هذه المادة."}</p></section>`;
    document.title = `${subject.name} · ${appTitle}`;
    showContentView();
    writeRoute({ subject:subject.id }, historyMode);
    window.scrollTo({ top:0, behavior:prefersReducedMotion() ? "auto" : "smooth" });
    if (nextOpener || focusContent) elements.lessonContent.focus({ preventScroll:true });
  }

  function openFromCard(nextSubjectId, nextOpener) {
    openSubject(nextSubjectId, nextOpener);
  }

  async function openLesson({ subjectId:nextSubjectId, lessonId:nextLessonId, lessonLabel }) {
    const request = beginRequest();
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
        const lesson = await loadSubjectLesson(nextSubjectId, nextLessonId);
        if (!isCurrentRequest(request)) return;
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonTitle.textContent = lesson?.title || reference;
        elements.lessonStatus.textContent = lesson ? "درس منشور" : "قيد التقدم";
        const isGuestTrialLesson = productService.getGuestTrialState?.().active
          && nextSubjectId === "ict" && nextLessonId === "database-management";
        const rendered = renderLesson(elements.lessonContent, reference, lesson, isGuestTrialLesson ? {
          progress:{ completedStepIds:[], completedAt:null },
          onProgress({ isComplete }) {
            if (isComplete) productService.completeGuestFirstLesson?.();
          },
        } : {});
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
    openSubject(subjectId, null, { historyMode:"replace", focusContent:true });
    return true;
  }

  return Object.freeze({ getState, openFromCard, openSubject, reset, returnToRoadmap });
}
