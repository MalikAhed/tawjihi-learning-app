import { createRouteUrl, readRoute } from "./app/route.js";
import { resetWeekTheme } from "./app/week-theme.js";
import { isShipReadyRoute } from "./data/ship-ready.js";
import { getRequiredElement, prefersReducedMotion } from "./lib/dom.js";
import { createFixtureProductService, getBrowserPrototypeStorage } from "./services/prototype-service.js";
import { renderCourseMap } from "./ui/course-map.js";
import { createAuthHeader } from "./ui/auth-header.js";
import { mountLearnerDashboard } from "./ui/learner-dashboard.js";
import { createDevelopmentViewController, setDevelopmentViewMode } from "./ui/development-views.js";
import { createMoreTabs } from "./ui/more-tabs.js";
import { renderShipReadyLibrary } from "./ui/ship-ready.js";
import { createSubjectLearningController } from "./ui/subject-learning.js";
import { createVisitorFlow } from "./ui/visitor-flow.js";

const APP_TITLE = "رحلة التوجيهي";
const DEVELOPMENT_GALLERY_ENABLED = window.__FULL_STACK_QUEST_DEV__ === true;
const PROTOTYPE_TOOLS_ENABLED = DEVELOPMENT_GALLERY_ENABLED && new URLSearchParams(window.location.search).get("prototype") === "1";
let lessonOpener = null;
const elements = {
  comingSoon:getRequiredElement(".coming-soon"),
  courseUnits:getRequiredElement(".course-units"), lessonBackButton:getRequiredElement(".lesson-back"),
  lessonCard:getRequiredElement(".lesson-card"), lessonContent:getRequiredElement("#lesson-content"),
  lessonShell:getRequiredElement(".lesson-shell"), lessonStatus:getRequiredElement(".lesson-status"),
  lessonTitle:getRequiredElement(".current-view-title"), lessonView:getRequiredElement(".lesson-view"),
  main:getRequiredElement("main"), moreTabs:getRequiredElement(".more-tabs"),
  navigationItems:[...document.querySelectorAll(".nav-item")],
  authGuest:getRequiredElement(".topbar-auth-guest"), authMember:getRequiredElement(".topbar-auth-member"),
  accountLabel:getRequiredElement("[data-account-label]"), authFlowButtons:[...document.querySelectorAll("[data-auth-flow]")],
  authSignOut:getRequiredElement("[data-auth-sign-out]"),
  visitorFlowRoot:getRequiredElement("#visitor-flow-root"),
};
const productService = createFixtureProductService({ storage:getBrowserPrototypeStorage(), apiBase:"/api/auth" });
await productService.restoreSession();
let activeContentCleanup = () => {};
let lessonRequest = 0;
let pathScrollPosition = 0;
renderCourseMap(elements.courseUnits);
mountLearnerDashboard({ container:elements.courseUnits, service:productService, onFlow:(flow) => openVisitorFlow(flow) });
const authHeader = createAuthHeader({
  guest:elements.authGuest, member:elements.authMember, label:elements.accountLabel,
  flowButtons:elements.authFlowButtons, signOutButton:elements.authSignOut,
  courseContainer:elements.courseUnits, service:productService,
  onFlow:(flow) => openVisitorFlow(flow),
});
if (PROTOTYPE_TOOLS_ENABLED) {
  import("./ui/prototype-scenario-switcher.js")
    .then(({ mountPrototypeScenarioSwitcher }) => mountPrototypeScenarioSwitcher({ service:productService }))
    .catch((error) => console.error("Prototype tools could not load.", error));
}

function disposeActiveContent() {
  activeContentCleanup();
  activeContentCleanup = () => {};
}

function useContentLifecycle(result) {
  disposeActiveContent();
  activeContentCleanup = typeof result?.destroy === "function" ? result.destroy : () => {};
}

function writeRoute(route, historyMode) {
  if (historyMode === "none") return false;
  const nextUrl = createRouteUrl(window.location.href, route);
  if (nextUrl.href === window.location.href) return false;
  const state = { ...(window.history.state || {}), fullStackQuest:true };
  window.history[historyMode === "replace" ? "replaceState" : "pushState"](state, "", nextUrl);
  return true;
}

const visitorFlowController = createVisitorFlow({
  container:elements.visitorFlowRoot,
  service:productService,
  onNavigate(flow, options) { openVisitorFlow(flow, options); },
  onHome(options) { openLearnHome(options); },
});

function openLearnHome({ historyMode = "push" } = {}) {
  authHeader.update();
  const learnItem = elements.navigationItems.find((item) => item.dataset.page === "learn");
  selectPage(learnItem, { historyMode });
}

function openVisitorFlow(flow, { historyMode = "push", focus = true } = {}) {
  resetWeekTheme();
  lessonRequest += 1;
  disposeActiveContent();
  updateNavigation(null);
  elements.main.classList.remove("coming-mode", "lesson-mode");
  elements.comingSoon.classList.remove("is-visible");
  elements.lessonView.classList.remove("is-visible");
  writeRoute({ flow }, historyMode);
  visitorFlowController.show(flow, { focus });
  window.scrollTo({ top:0, behavior:prefersReducedMotion() ? "auto" : "smooth" });
}

function showContentView() {
  visitorFlowController.hide();
  elements.main.classList.remove("coming-mode");
  elements.main.classList.add("lesson-mode");
  elements.comingSoon.classList.remove("is-visible");
  elements.lessonView.classList.add("is-visible");
}

const setViewMode = (view) => setDevelopmentViewMode(elements, view);

const subjectLearning = createSubjectLearningController({
  elements,
  productService,
  appTitle:APP_TITLE,
  beginRequest:() => ++lessonRequest,
  isCurrentRequest:(request) => request === lessonRequest,
  disposeActiveContent,
  useContentLifecycle,
  setActiveContentCleanup:(cleanup) => { activeContentCleanup = cleanup; },
  setDevelopmentViewMode:setViewMode,
  showContentView,
  writeRoute,
  onRequireAccount:(flow) => openVisitorFlow(flow),
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
  return elements.navigationItems.find((item) => item.dataset.page === page) || { dataset:{ page } };
}

function selectPage(selectedItem, { historyMode = "push", restorePath = false } = {}) {
  authHeader.update();
  visitorFlowController.hide();
  resetWeekTheme();
  lessonRequest += 1;
  disposeActiveContent();
  elements.lessonContent.replaceChildren();
  elements.lessonContent.removeAttribute("aria-busy");
  const page = selectedItem.dataset.page;
  const isLearnPage = page === "learn";
  const isMorePage = page === "more";
  const guestFeatureLocked = !isLearnPage && productService.getGuestTrialState?.().active;
  const isCourseVisible = !elements.main.classList.contains("lesson-mode") && !elements.main.classList.contains("coming-mode");
  if (historyMode === "push" && !isLearnPage && isCourseVisible) pathScrollPosition = window.scrollY;
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
  elements.comingSoon.querySelector("[data-guest-feature-gate]")?.remove();
  elements.moreTabs.hidden = !isMorePage || guestFeatureLocked;
  elements.comingSoon.querySelector(".coming-soon-title").hidden = isMorePage || guestFeatureLocked;
  elements.comingSoon.querySelector(".coming-soon-copy").hidden = isMorePage || guestFeatureLocked;
  if (guestFeatureLocked) {
    elements.comingSoon.querySelector(".coming-soon-card").insertAdjacentHTML("beforeend", `<section class="guest-feature-gate" data-guest-feature-gate aria-labelledby="guest-feature-gate-title"><span aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span><h1 id="guest-feature-gate-title">هذه الميزة تحتاج إلى حساب</h1><p>يمكنك تجربة الدرس الأول كضيف. أنشئ حسابًا مجانيًا لحفظ تقدّمك وفتح بقية الدروس والميزات.</p><div><button class="topbar-create" type="button" data-guest-flow="register">إنشاء حساب</button><button class="topbar-login" type="button" data-guest-flow="sign-in">تسجيل الدخول</button></div></section>`);
  }
  if (isLearnPage && (restorePath || (historyMode === "push" && routeChanged))) {
    window.requestAnimationFrame(() => window.scrollTo({ top:pathScrollPosition, behavior:"auto" }));
  }
}

const developmentViews = createDevelopmentViewController({
  elements,
  appTitle:APP_TITLE,
  designSystemEnabled:DEVELOPMENT_GALLERY_ENABLED,
  beginRequest:() => ++lessonRequest,
  isCurrentRequest:(request) => request === lessonRequest,
  prepareView(opener) {
    if (opener) {
      lessonOpener = opener;
      pathScrollPosition = window.scrollY;
    }
    subjectLearning.reset();
    disposeActiveContent();
  },
  setActiveCleanup:(cleanup) => { activeContentCleanup = typeof cleanup === "function" ? cleanup : () => {}; },
  showContentView,
  writeRoute,
});

function clearMorePanel(tab) {
  const panel = getRequiredElement(`#${tab.getAttribute("aria-controls")}`);
  panel.replaceChildren();
}

const moreTabs = createMoreTabs(elements.moreTabs, {
  onUiLab:clearMorePanel,
  onShipReady(tab) {
    const panel = getRequiredElement(`#${tab.getAttribute("aria-controls")}`);
    renderShipReadyLibrary(panel, { onOpenTemplate(opener, view) { void developmentViews.openTemplate(opener, { view }); } });
  },
  onDesignSystem(tab) { void developmentViews.openDesignSystem(tab); },
});
clearMorePanel(moreTabs.uiLabTab);
function closeLesson() {
  const subjectState = subjectLearning.getState();
  const wasDesignSystem = elements.lessonShell.classList.contains("lesson-shell--design-system");
  const wasUiLab = elements.lessonShell.classList.contains("lesson-shell--ui-lab");
  if (subjectLearning.returnToRoadmap()) return;
  if (wasDesignSystem || wasUiLab) {
    const route = readRoute(window.location.search);
    const returningToShipReady = isShipReadyRoute(route.view);
    const templateTab = returningToShipReady ? moreTabs.shipReadyTab : moreTabs.uiLabTab;
    const openedTemplateRoute = lessonOpener?.dataset.openTemplate || route.view;
    const moreItem = getPageTarget("more");
    selectPage(moreItem, { historyMode:"replace" });
    if (returningToShipReady) moreTabs.select(templateTab);
    const returnTarget = returningToShipReady
      ? document.querySelector(`[data-open-template="${openedTemplateRoute}"]`) || templateTab
      : lessonOpener || (route.view === "design-system" ? moreTabs.designSystemTab : templateTab);
    window.requestAnimationFrame(() => returnTarget?.focus({ preventScroll:true }));
    return;
  }
  lessonRequest += 1;
  disposeActiveContent();
  elements.main.classList.remove("lesson-mode");
  elements.lessonView.classList.remove("is-visible");
  setViewMode();
  elements.lessonContent.replaceChildren();
  elements.lessonContent.removeAttribute("aria-busy");
  subjectLearning.reset();
  document.title = APP_TITLE;
  writeRoute({ page:"learn" }, "replace");
  const returnScrollPosition = subjectState.subjectId ? subjectState.pathScrollPosition : pathScrollPosition;
  window.scrollTo({ top:returnScrollPosition, behavior:prefersReducedMotion() ? "auto" : "smooth" });
  const returnTarget = subjectState.opener || lessonOpener || elements.navigationItems[0];
  lessonOpener = null;
  window.requestAnimationFrame(() => returnTarget?.focus({ preventScroll:true }));
}
function applyCurrentRoute({ restorePath = false } = {}) {
  const route = readRoute(window.location.search);
  if (route.flow) {
    openVisitorFlow(route.flow, { historyMode:"none", focus:true });
    return;
  }
  if (route.page !== "learn") {
    selectPage(getPageTarget(route.page), { historyMode:"none", restorePath });
    return;
  }
  if (route.view === "design-system") {
    if (DEVELOPMENT_GALLERY_ENABLED) void developmentViews.openDesignSystem(null, { historyMode:"none" });
    else {
      writeRoute({ page:"learn" }, "replace");
      selectPage(elements.navigationItems[0], { historyMode:"none", restorePath });
    }
    return;
  }
  if (isShipReadyRoute(route.view)) {
    developmentViews.openTemplate(null, { historyMode:"none", view:route.view });
    return;
  }
  if (route.subject) {
    subjectLearning.openSubject(route.subject, null, { historyMode:"none", focusContent:true });
    return;
  }
  if (route.day !== null) writeRoute({ page:"learn" }, "replace");
  selectPage(elements.navigationItems[0], { historyMode:"none", restorePath });
}

elements.lessonBackButton.addEventListener("click", closeLesson);
elements.navigationItems.forEach((item) => item.addEventListener("click", () => selectPage(item)));
elements.comingSoon.addEventListener("click", (event) => {
  const trigger = event.target.closest?.("[data-guest-flow]");
  if (trigger) openVisitorFlow(trigger.dataset.guestFlow);
});
elements.courseUnits.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const subjectTrigger = event.target.closest("[data-subject]");
  if (subjectTrigger instanceof HTMLButtonElement) subjectLearning.openFromCard(subjectTrigger.dataset.subject, subjectTrigger);
});

window.addEventListener("popstate", () => applyCurrentRoute({ restorePath:true }));
window.history.replaceState(
  { ...(window.history.state || {}), fullStackQuest:true },
  "",
  createRouteUrl(window.location.href, readRoute(window.location.search)),
);
applyCurrentRoute();
