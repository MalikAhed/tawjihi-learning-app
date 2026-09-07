import { getRequiredElement } from "../lib/dom.js";

/** Viewport coordinates left available by the visible fixed shell, including safe areas. */
export function getShellViewportBounds() {
  const viewport = window.visualViewport;
  const left = viewport?.offsetLeft || 0;
  const top = viewport?.offsetTop || 0;
  const width = viewport?.width || window.innerWidth;
  const height = viewport?.height || window.innerHeight;
  const bounds = { left, top, right:left + width, bottom:top + height };
  document.querySelectorAll("[data-shell-obstruction]").forEach((element) => {
    if (getComputedStyle(element).position !== "fixed") return;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.bottom <= top || rect.top >= top + height) return;
    if (rect.height >= height * .75 && rect.width < width * .5) {
      if (rect.left > left + width / 2) bounds.right = Math.min(bounds.right, rect.left);
      else bounds.left = Math.max(bounds.left, rect.right);
    } else if (rect.top > top + height / 2) bounds.bottom = Math.min(bounds.bottom, rect.top);
    else bounds.top = Math.max(bounds.top, rect.bottom);
  });
  return { left:bounds.left + 12, top:bounds.top + 12, right:bounds.right - 12, bottom:bounds.bottom - 12 };
}

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
