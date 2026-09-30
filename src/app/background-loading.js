import { canPrefetchAssets, preloadImages } from "../ui/media-ready.js";

let started = false;

// Called only for onboarding. Home retains its lazy
// boundaries. These imports warm code, never mount UI or change learner data.
export function warmLearningExperience() {
  if (started || !canPrefetchAssets() || navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) return;
  if (document.body.hasAttribute("data-startup")) {
    document.addEventListener("app:ready", warmLearningExperience, { once:true });
    return;
  }
  started = true;
  const warm = async () => {
    if (!canPrefetchAssets() || document.hidden || !document.querySelector("[data-register-form]")) { started = false; return; }
    try {
      const [{ loadSubjectLessonPart }, { preloadNextStep }] = await Promise.all([
        import("../data/lessons/subject-lesson-registry.js"),
        import("../ui/lesson/media.js"),
        import("../ui/lesson-view.js"),
      ]);
      const firstPart = await loadSubjectLessonPart("ict", "database-management", "access-basics");
      for (const step of firstPart?.steps.slice(0, 2) || [])
        step.blocks?.forEach(preloadNextStep);
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      preloadImages([
        reduced ? "assets/mascot/rocky-standing-still-reduced.svg" : "assets/mascot/rocky-happy-jump.svg",
        `assets/icons/streak-fire-burning${reduced ? "-reduced" : ""}.svg`,
      ]);
    } catch {
      // Optional warm-up failures remain retryable through normal navigation.
      started = false;
    }
  };
  if (window.requestIdleCallback) window.requestIdleCallback(() => void warm(), { timeout:1500 });
  else setTimeout(() => void warm(), 0);
}
