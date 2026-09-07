import { createServerProgressAdapter } from "./services/server-progress.js";
import { readAppConfig } from "./app/app-config.js";
import { createViewLifecycle } from "./app/view-lifecycle.js";
import {
  renderDeveloperLab,
  renderDeveloperData,
  renderDeveloperStudio,
} from "./ui/developer-area.js";
import { animateView } from "./ui/view-motion.js";
import { revealWhenReady } from "./ui/media-ready.js";
import { renderComingSoonMarkup } from "./ui/coming-soon.js";
import { createRouteUrl, readRoute } from "./app/route.js";
import { resetWeekTheme } from "./app/week-theme.js";
import { isShipReadyRoute } from "./data/ship-ready.js";
import { getRequiredElement, prefersReducedMotion } from "./lib/dom.js";
import { createLearnerSession } from "./services/learner-session.js";
import { getBrowserPrototypeStorage } from "./services/prototype-storage.js";
import { renderCourseMap } from "./ui/course-map.js";
import { createAuthHeader } from "./ui/auth-header.js";
import { mountLearnerDashboard } from "./ui/learner-dashboard.js";
import {
  createDevelopmentViewController,
  setDevelopmentViewMode,
} from "./ui/development-views.js";
import { createMoreTabs } from "./ui/more-tabs.js";
import { createSubjectLearningController } from "./ui/subject-learning.js";
import { createVisitorFlow } from "./ui/visitor-flow.js";
import { createSubjectProgressStore } from "./services/subject-progress-store.js";
import { createSessionProgressAdapter } from "./services/session-progress.js";
import { createIndexedDbProgressAdapter } from "./services/indexeddb-progress.js";
import { mountProgressFeedback } from "./ui/progress-feedback.js";
import { mountAppShell } from "./ui/app-shell.js";

const APP_TITLE = "مساحة التعلّم";
const DEVELOPMENT_GALLERY_ENABLED = window.__FULL_STACK_QUEST_DEV__ === true;
const PROTOTYPE_TOOLS_ENABLED =
  DEVELOPMENT_GALLERY_ENABLED &&
  new URLSearchParams(window.location.search).get("prototype") === "1";
let lessonOpener = null;
const appConfig = readAppConfig(document);
const sessionStorage = getBrowserPrototypeStorage();
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
if (PROTOTYPE_TOOLS_ENABLED) {
  import("./ui/prototype-scenario-switcher.js")
    .then(({ mountPrototypeScenarioSwitcher }) =>
      mountPrototypeScenarioSwitcher({ service: productService }),
    )
    .catch((error) => console.error("Prototype tools could not load.", error));
}

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
  resetWeekTheme();
  const operation = viewLifecycle.begin();
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

function showContentView() {
  visitorFlowController.hide();
  elements.main.classList.remove("coming-mode");
  elements.main.classList.add("lesson-mode");
  elements.comingSoon.classList.remove("is-visible");
  elements.lessonView.classList.add("is-visible");
  animateView(elements.lessonView);
}

const setViewMode = (view) => setDevelopmentViewMode(elements, view);

const subjectLearning = createSubjectLearningController({
  elements,
  productService,
  progressStore,
  appTitle: APP_TITLE,
  viewLifecycle,
  setDevelopmentViewMode: setViewMode,
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
  authHeader.update();
  visitorFlowController.hide();
  resetWeekTheme();
  const operation = viewLifecycle.begin();
  elements.lessonContent.replaceChildren();
  elements.lessonContent.removeAttribute("aria-busy");
  const page = selectedItem.dataset.page;
  const isLearnPage = page === "learn";
  const isMorePage = page === "more";
  const guestFeatureLocked =
    !isLearnPage && !isMorePage && productService.getGuestTrialState?.().active;
  const isCourseVisible =
    !elements.main.classList.contains("lesson-mode") &&
    !elements.main.classList.contains("coming-mode");
  if (historyMode === "push" && !isLearnPage && isCourseVisible)
    pathScrollPosition = window.scrollY;
  subjectLearning.reset();
  lessonOpener = null;
  document.title = APP_TITLE;
  const routeChanged = writeRoute({ page }, historyMode);
  updateNavigation(selectedItem);
  elements.main.classList.toggle("coming-mode", !isLearnPage);
  elements.main.classList.remove("lesson-mode");
  elements.comingSoon.classList.toggle("is-visible", !isLearnPage);
  elements.comingSoon.classList.toggle("is-more", isMorePage);
  elements.lessonView.classList.remove("is-visible");
  setViewMode();
  animateView(isLearnPage ? elements.courseUnits : elements.comingSoon);
  elements.comingSoon.querySelector("[data-guest-feature-gate]")?.remove();
  elements.moreTabs.hidden = !isMorePage || guestFeatureLocked;
  const comingContent = elements.comingSoon.querySelector(
    "[data-coming-soon-content]",
  );
  comingContent.hidden = isLearnPage || isMorePage || guestFeatureLocked;
  comingContent.innerHTML = comingContent.hidden
    ? ""
    : renderComingSoonMarkup(page);
  if (isLearnPage) operation.add(revealWhenReady(elements.courseUnits, { signal:operation.signal }));
  else if (!comingContent.hidden)
    operation.add(revealWhenReady(comingContent, { signal:operation.signal }));
  if (guestFeatureLocked) {
    elements.comingSoon
      .querySelector(".coming-soon-card")
      .insertAdjacentHTML(
        "beforeend",
        `<section class="guest-feature-gate" data-guest-feature-gate aria-labelledby="guest-feature-gate-title"><span aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span><h1 id="guest-feature-gate-title">هذه الميزة قيد الإعداد</h1><p>نعمل على تجهيز هذه الميزة. يمكنك متابعة الدروس المتاحة الآن، وإنشاء حساب مجاني لحفظ تقدّمك؛ إنشاء الحساب لا يغيّر موعد إتاحة الميزة.</p><div><button class="topbar-create" type="button" data-guest-flow="register">إنشاء حساب</button><button class="topbar-login" type="button" data-guest-flow="sign-in">تسجيل الدخول</button></div></section>`,
      );
  }
  if (
    isLearnPage &&
    (restorePath || (historyMode === "push" && routeChanged))
  ) {
    window.requestAnimationFrame(() =>
      window.scrollTo({ top: pathScrollPosition, behavior: "auto" }),
    );
  }
}

const developmentViews = createDevelopmentViewController({
  elements,
  appTitle: APP_TITLE,
  designSystemEnabled: true,
  viewLifecycle,
  prepareView(opener) {
    if (opener) {
      lessonOpener = opener;
      pathScrollPosition = window.scrollY;
    }
    subjectLearning.reset();
  },
  showContentView,
  writeRoute,
});

function showDeveloperLab(tab) {
  const panel = getRequiredElement(`#${tab.getAttribute("aria-controls")}`);
  renderDeveloperLab(panel, {
    onOpenLab: (opener) => developmentViews.openLab(opener),
  });
}

const moreTabs = createMoreTabs(elements.moreTabs, {
  onUiLab: (tab) => developmentViews.openLab(tab),
  onStudio(tab) {
    renderDeveloperStudio(
      getRequiredElement(`#${tab.getAttribute("aria-controls")}`),
    );
  },
  onData(tab) {
    renderDeveloperData(
      getRequiredElement(`#${tab.getAttribute("aria-controls")}`),
    );
  },
  onShipReady(tab) {
    const panel = getRequiredElement(`#${tab.getAttribute("aria-controls")}`);
    panel.innerHTML =
      '<div class="app-loading" role="status">جارٍ تجهيز القوالب…</div>';
    void import("./ui/ship-ready.js")
      .then(({ renderShipReadyLibrary }) => {
        if (panel.hidden) return;
        renderShipReadyLibrary(panel, {
          onOpenTemplate(opener, view) {
            void developmentViews.openTemplate(opener, { view });
          },
        });
        animateView(panel);
      })
      .catch(() => {
        if (!panel.hidden)
          panel.innerHTML =
            '<p role="alert">تعذّر تحميل القوالب. عُد وحاول مرة أخرى.</p>';
      });
  },
  onDesignSystem(tab) {
    void developmentViews.openDesignSystem(tab);
  },
});
showDeveloperLab(moreTabs.uiLabTab);
function closeLesson() {
  const subjectState = subjectLearning.getState();
  const wasDesignSystem = elements.lessonShell.classList.contains(
    "lesson-shell--design-system",
  );
  const wasUiLab = elements.lessonShell.classList.contains(
    "lesson-shell--ui-lab",
  );
  if (subjectLearning.returnToRoadmap()) return;
  if (wasDesignSystem || wasUiLab) {
    const returnOpener = lessonOpener;
    const route = readRoute(window.location.search);
    const returningToShipReady = isShipReadyRoute(route.view);
    const templateTab = returningToShipReady
      ? moreTabs.shipReadyTab
      : moreTabs.uiLabTab;
    const openedTemplateRoute =
      lessonOpener?.dataset.openTemplate || route.view;
    const moreItem = getPageTarget("more");
    selectPage(moreItem, { historyMode: "replace" });
    if (returningToShipReady) moreTabs.select(templateTab);
    else moreTabs.select(moreTabs.uiLabTab, { open: false });
    const returnTarget = returningToShipReady
      ? document.querySelector(
          `[data-open-template="${openedTemplateRoute}"]`,
        ) || templateTab
      : returnOpener ||
        (route.view === "design-system"
          ? moreTabs.designSystemTab
          : templateTab);
    window.requestAnimationFrame(() =>
      returnTarget?.focus({ preventScroll: true }),
    );
    return;
  }
  const operation = viewLifecycle.begin();
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
    subjectState.opener || lessonOpener || elements.navigationItems[0];
  lessonOpener = null;
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
  if (route.view === "ui-lab") {
    developmentViews.openLab(null, { historyMode: "none" });
    return;
  }
  if (route.view === "design-system") {
    void developmentViews.openDesignSystem(null, { historyMode: "none" });
    return;
  }
  if (isShipReadyRoute(route.view)) {
    developmentViews.openTemplate(null, {
      historyMode: "none",
      view: route.view,
    });
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
  if (route.day !== null) writeRoute({ page: "learn" }, "replace");
  selectPage(elements.navigationItems[0], { historyMode: "none", restorePath });
}

elements.lessonBackButton.addEventListener("click", closeLesson);
elements.navigationItems.forEach((item) =>
  item.addEventListener("click", () => selectPage(item)),
);
elements.comingSoon.addEventListener("click", (event) => {
  if (event.target.closest?.("[data-coming-soon-home]")) {
    event.preventDefault();
    selectPage(
      elements.navigationItems.find((item) => item.dataset.page === "learn"),
    );
    return;
  }
  const trigger = event.target.closest?.("[data-guest-flow]");
  if (trigger) openVisitorFlow(trigger.dataset.guestFlow);
});
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
