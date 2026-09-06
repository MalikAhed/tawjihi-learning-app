import { renderWorkingRocky } from "./working-rocky.js";

const pages = {
  quests: { title:"المهام", icon:"dashboard-quests" },
  shop: { title:"المتجر", icon:"dashboard-shop" },
  challenges: { title:"التحديات", icon:"dashboard-challenges" },
  levels: { title:"المستويات", icon:"dashboard-levels" },
};

export function renderComingSoonMarkup(page) {
  const content = pages[page];
  if (!content) return "";
  return `<div class="coming-soon-content" data-coming-page="${page}">
    <div class="coming-soon-section"><img src="assets/icons/${content.icon}.svg" alt="" /><span>${content.title}</span></div>
    <div class="coming-soon-art">${renderWorkingRocky("coming-soon-mascot")}</div>
    <span class="coming-soon-badge">قريبًا</span>
    <h1 class="coming-soon-title">روكي يعمل على تجهيز ${content.title}</h1>
    <a class="coming-soon-home" href="?page=learn" data-coming-soon-home>العودة إلى التعلّم <svg class="coming-soon-home__arrow" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M20 12H4m7-7-7 7 7 7" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
  </div>`;
}
