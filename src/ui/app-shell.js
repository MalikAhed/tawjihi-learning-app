import { getRequiredElement } from "../lib/dom.js";

/** Mount account-sensitive navigation only when its initial state is known. */
export function mountAppShell() {
  const template = getRequiredElement("#app-header-template");
  template.replaceWith(template.content);
  return {
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
}
