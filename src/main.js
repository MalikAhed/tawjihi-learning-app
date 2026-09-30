import { createServerProgressAdapter } from "./services/server-progress.js";
import { readAppConfig } from "./app/app-config.js";
import { createViewLifecycle } from "./app/view-lifecycle.js";
import { animateView } from "./ui/view-motion.js";
import { revealWhenReady } from "./ui/media-ready.js";
import { mountComingSoonToast } from "./ui/coming-soon.js";
import { createRouteUrl, isUnlockedPage, readRoute } from "./app/route.js";
import { prefersReducedMotion } from "./lib/dom.js";
import { createLearnerSession } from "./services/learner-session.js";
import { getBrowserLearnerStorage } from "./services/learner-storage.js";
import { renderCourseMap } from "./ui/course-map.js";
import { createAuthHeader } from "./ui/auth-header.js";
import { mountLearnerDashboard } from "./ui/learner-dashboard.js";
import { createSubjectLearningController } from "./ui/subject-learning.js";
import { createVisitorFlow } from "./ui/visitor-flow.js";
import { createSubjectProgressStore } from "./services/subject-progress-store.js";
import { createSessionProgressAdapter } from "./services/session-progress.js";
import { createIndexedDbProgressAdapter } from "./services/indexeddb-progress.js";
import { mountProgressFeedback } from "./ui/progress-feedback.js";
import { mountAppShell } from "./ui/app-shell.js";

const APP_TITLE = "مساحة التعلّم";
const appConfig = readAppConfig(document);
const sessionStorage = getBrowserLearnerStorage();
const browserLocalStorage = () => ({ getItem:(key) => window.localStorage.getItem(key) });
const reportProgressRecovery = (error, ownerId) => progressStore.reportRecoveryWarning(ownerId, error);
const guestProgress = createSessionProgressAdapter({
  // Read lazily so a denied storage getter reaches the shared save feedback.
  storage:{
    getItem:(key) => window.sessionStorage.getItem(key),
    setItem:(key, value) => window.sessionStorage.setItem(key, value),
  },
  onError:reportProgressRecovery,
});
const memberProgress = createIndexedDbProgressAdapter({ legacyStorage:browserLocalStorage(), onError:reportProgressRecovery });
const serverProgress = appConfig.accountMode === "http" ? createServerProgressAdapter({local:memberProgress, onError:reportProgressRecovery}) : null;
const progressAdapterFor = (owner) => owner === "guest" ? guestProgress : owner.startsWith("account:") && serverProgress ? serverProgress : memberProgress;
const progressStore = createSubjectProgressStore({ adapter:{
  isRemoteOwner:(owner) => owner.startsWith("account:") && Boolean(serverProgress),
  read:(owner) => progressAdapterFor(owner).read(owner),
  readCached:(owner) => progressAdapterFor(owner).readCached?.(owner) || progressAdapterFor(owner).read(owner),
  update:(update) => progressAdapterFor(update.value.ownerId).update(update),
  close:() => memberProgress.close(),
} });
const productService = createLearnerSession({
  progressStore,
  storage: sessionStorage,
  apiBase: appConfig.apiBase,
});
await productService.restoreSession();
await progressStore.ready(productService.getLearnerProgressOwner());
let progressOwner = productService.getLearnerProgressOwner();
productService.subscribe(() => {
  const owner = productService.getLearnerProgressOwner();
  if (owner !== progressOwner) { progressOwner = owner; void progressStore.ready(owner); }
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) void progressStore.refresh(productService.getLearnerProgressOwner());
});
const elements = mountAppShell();
const comingSoonToast = mountComingSoonToast(elements.comingSoonToast);
mountProgressFeedback({ store:progressStore, service:productService });
const viewLifecycle = createViewLifecycle();
let pathScrollPosition = 0;
let pendingMapReturn = false;
renderCourseMap(elements.courseUnits);
mountLearnerDashboard({
  container: elements.courseUnits,
  service: productService,
  progressStore,
  onFlow: (flow) => openVisitorFlow(flow),
});
const authHeader = createAuthHeader({
  guest: elements.authGuest,
  member: elements.authMember,
  label: elements.accountLabel,
  flowButtons: elements.authFlowButtons,
  signOutButton: elements.authSignOut,
  courseContainer: elements.courseUnits,
  service: productService,
  progressStore,
  onFlow: (flow) => openVisitorFlow(flow),
});

function writeRoute(route, historyMode) {
  if (historyMode === "none") return false;
  const nextUrl = createRouteUrl(window.location.href, route);
  if (nextUrl.href === window.location.href) return false;
  const state = { ...(window.history.state || {}), fullStackQuest: true };
  const previous = readRoute(window.location.search);
  delete state.subjectMapBehind;
  if (historyMode !== "replace" && route.lesson && previous.subject === route.subject && !previous.lesson)
    state.subjectMapBehind = route.subject;
  window.history[historyMode === "replace" ? "replaceState" : "pushState"](
    state,
    "",
    nextUrl,
  );
  return true;
}

const visitorFlowController = createVisitorFlow({
  container: elements.visitorFlowRoot,
  service: productService,
  onNavigate(flow, options) {
    openVisitorFlow(flow, options);
  },
  onHome(options) {
    openLearnHome(options);
  },
});

function openLearnHome({ historyMode = "push" } = {}) {
  authHeader.update();
  const learnItem = elements.navigationItems.find(
    (item) => item.dataset.page === "learn",
  );
  selectPage(learnItem, { historyMode });
}

function openVisitorFlow(flow, { historyMode = "push", focus = true } = {}) {
  viewLifecycle.begin();
  updateNavigation(null);
  elements.main.classList.remove("coming-mode", "lesson-mode");
  elements.comingSoon.classList.remove("is-visible");
  elements.lessonView.classList.remove("is-visible");
  writeRoute({ flow }, historyMode);
  visitorFlowController.show(flow, { focus });
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

function showContentView({ animate = true } = {}) {
  visitorFlowController.hide();
  elements.main.classList.remove("coming-mode");
  elements.main.classList.add("lesson-mode");
  elements.comingSoon.classList.remove("is-visible");
  elements.lessonView.classList.add("is-visible");
  animateView(elements.lessonView, { animate });
}

function setViewMode(view = null) {
  const isSubject = view === "subject";
  elements.lessonShell.classList.toggle("lesson-shell--subject", isSubject);
  if (!isSubject) delete elements.lessonShell.dataset.subject;
}

const subjectLearning = createSubjectLearningController({
  elements,
  productService,
  progressStore,
  appTitle: APP_TITLE,
  viewLifecycle,
  setViewMode,
  showContentView,
  writeRoute,
  onRequireAccount: (flow) => openVisitorFlow(flow),
  onReturnToRoadmap({ subjectId, lessonId, partId, explainAccess }) {
    if (pendingMapReturn) return true;
    if (window.history.state?.subjectMapBehind !== subjectId) return false;
    pendingMapReturn = explainAccess ? { subjectId, lessonId, partId } : true;
    window.history.back();
    return true;
  },
});

function updateNavigation(selectedItem) {
  elements.navigationItems.forEach((item) => {
    const isActive = item === selectedItem;
    item.classList.toggle("active", isActive);
    if (isActive) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}

function getPageTarget(page) {
  return (
    elements.navigationItems.find((item) => item.dataset.page === page) || {
      dataset: { page },
    }
  );
}

function selectPage(
  selectedItem,
  { historyMode = "push", restorePath = false } = {},
) {
  const page = selectedItem.dataset.page;
  if (!isUnlockedPage(page)) {
    comingSoonToast.show();
    return;
  }
  authHeader.update();
  visitorFlowController.hide();
  const operation = viewLifecycle.begin();
  elements.lessonContent.replaceChildren();
  elements.lessonContent.removeAttribute("aria-busy");
  const isLearnPage = page === "learn";
  const isCourseVisible = !elements.main.classList.contains("lesson-mode") &&
    !elements.main.classList.contains("coming-mode");
  if (historyMode === "push" && !isLearnPage && isCourseVisible)
    pathScrollPosition = window.scrollY;
  subjectLearning.reset();
  document.title = APP_TITLE;
  const routeChanged = writeRoute({ page }, historyMode);
  updateNavigation(selectedItem);
  elements.main.classList.toggle("coming-mode", !isLearnPage);
  elements.main.classList.remove("lesson-mode");
  elements.comingSoon.classList.toggle("is-visible", !isLearnPage);
  elements.lessonView.classList.remove("is-visible");
  setViewMode();
  animateView(isLearnPage ? elements.courseUnits : elements.comingSoon);
  if (isLearnPage) operation.add(revealWhenReady(elements.courseUnits, { signal:operation.signal }));
  if (
    isLearnPage &&
    (restorePath || (historyMode === "push" && routeChanged))
  ) {
    window.requestAnimationFrame(() =>
      window.scrollTo({ top: pathScrollPosition, behavior: "auto" }),
    );
  }
}

function closeLesson() {
  const subjectState = subjectLearning.getState();
  if (subjectLearning.returnToRoadmap()) return;
  viewLifecycle.begin();
  elements.main.classList.remove("lesson-mode");
  elements.lessonView.classList.remove("is-visible");
  setViewMode();
  elements.lessonContent.replaceChildren();
  elements.lessonContent.removeAttribute("aria-busy");
  subjectLearning.reset();
  document.title = APP_TITLE;
  writeRoute({ page: "learn" }, "replace");
  animateView(elements.courseUnits);
  const returnScrollPosition = subjectState.subjectId
    ? subjectState.pathScrollPosition
    : pathScrollPosition;
  window.scrollTo({
    top: returnScrollPosition,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
  const returnTarget =
    subjectState.opener || elements.navigationItems[0];
  window.requestAnimationFrame(() =>
    returnTarget?.focus({ preventScroll: true }),
  );
}
function applyCurrentRoute({ restorePath = false } = {}) {
  const mapExplanation = typeof pendingMapReturn === "object" ? pendingMapReturn : null;
  pendingMapReturn = false;
  const route = readRoute(window.location.search);
  if (route.flow) {
    openVisitorFlow(route.flow, { historyMode: "none", focus: true });
    return;
  }
  if (route.page !== "learn") {
    selectPage(getPageTarget(route.page), { historyMode: "none", restorePath });
    return;
  }
  if (route.subject) {
    updateNavigation(getPageTarget("learn"));
    subjectLearning.openSubject(route.subject, null, {
      historyMode: "none",
      focusContent: true,
      lessonId:route.lesson,
      partId:route.part,
      restoreMap:restorePath && !route.lesson && subjectLearning.getState().subjectId === route.subject,
      explainPart:mapExplanation?.subjectId === route.subject ? mapExplanation : null,
    });
    return;
  }
  selectPage(elements.navigationItems[0], { historyMode: "none", restorePath });
}

elements.lessonBackButton.addEventListener("click", closeLesson);
elements.navigationItems.forEach((item) =>
  item.addEventListener("click", () => selectPage(item)),
);
elements.courseUnits.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const subjectTrigger = event.target.closest("[data-subject]");
  if (subjectTrigger instanceof HTMLButtonElement)
    subjectLearning.openFromCard(
      subjectTrigger.dataset.subject,
      subjectTrigger,
    );
});

window.addEventListener("popstate", () =>
  applyCurrentRoute({ restorePath: true }),
);
let subjectOwner = productService.getLearnerProgressOwner();
productService.subscribe(() => {
  const owner = productService.getLearnerProgressOwner();
  if (owner === subjectOwner) return;
  subjectOwner = owner;
  // A part link always restores the current account's own progress and gates.
  if (readRoute(window.location.search).subject) applyCurrentRoute();
});
window.history.replaceState(
  { ...(window.history.state || {}), fullStackQuest: true },
  "",
  createRouteUrl(window.location.href, readRoute(window.location.search)),
);
applyCurrentRoute();
