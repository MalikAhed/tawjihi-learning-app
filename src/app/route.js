// @ts-check
import { isShipReadyRoute } from "../data/ship-ready.js";
import { getCourseSubject } from "../data/course.js";
import { getSubjectRoadmapLesson } from "../data/subject-roadmaps.js";

/** @typedef {{page:string, day:null, subject:string|null, lesson:string|null, part:string|null, view:string|null, flow:string|null}} Route */
/** @typedef {{page?:string, subject?:string|null, lesson?:string|null, part?:string|null, view?:string|null, flow?:string|null}} RouteTarget */

const APP_PAGES = new Set(["learn", "levels", "quests", "shop", "challenges", "more"]);
export const VISITOR_FLOWS = new Set(["entry", "register", "sign-in"]);

function lessonDestination(subject, lesson, part) {
  const target = getSubjectRoadmapLesson(subject, lesson);
  return target?.parts.some(({ id }) => id === part)
    ? { lesson:target.id, part } : { lesson:null, part:null };
}

/** @param {string} [search] @returns {Route} */
export function readRoute(search = "") {
  const params = new URLSearchParams(search);
  const requestedFlow = params.get("flow");
  const flow = VISITOR_FLOWS.has(requestedFlow || "") ? requestedFlow : null;
  if (flow) return { page:"learn", day:null, subject:null, lesson:null, part:null, view:null, flow };
  if (!params.has("page") && !params.has("subject") && !params.has("view")) {
    return { page:"learn", day:null, subject:null, lesson:null, part:null, view:null, flow:"entry" };
  }
  const page = APP_PAGES.has(params.get("page") || "") ? params.get("page") || "learn" : "learn";
  if (page !== "learn") return { page, day:null, subject:null, lesson:null, part:null, view:null, flow:null };

  if (["design-system", "ui-lab"].includes(params.get("view") || "") || isShipReadyRoute(params.get("view"))) {
    return { page:"learn", day:null, subject:null, lesson:null, part:null, view:params.get("view"), flow:null };
  }

  const subject = getCourseSubject(params.get("subject"))?.id || null;
  return { page:"learn", day:null, subject, ...lessonDestination(subject, params.get("lesson"), params.get("part")), view:null, flow:null };
}

/** @param {string} currentHref @param {RouteTarget} [route] */
export function createRouteUrl(currentHref, route = {}) {
  const { page = "learn", subject = null, lesson = null, part = null, view = null, flow = null } = route;
  const url = new URL(currentHref);
  url.searchParams.delete("page");
  url.searchParams.delete("day");
  url.searchParams.delete("subject");
  url.searchParams.delete("lesson");
  url.searchParams.delete("part");
  url.searchParams.delete("view");
  url.searchParams.delete("flow");

  if (VISITOR_FLOWS.has(flow || "")) {
    if (flow !== "entry") url.searchParams.set("flow", flow || "");
  } else if (page !== "learn" && APP_PAGES.has(page)) {
    url.searchParams.set("page", page);
  } else if (["design-system", "ui-lab"].includes(view || "") || isShipReadyRoute(view)) {
    url.searchParams.set("view", view || "");
  } else if (getCourseSubject(subject)) {
    url.searchParams.set("subject", subject || "");
    const destination = lessonDestination(subject, lesson, part);
    if (destination.lesson && destination.part) {
      url.searchParams.set("lesson", destination.lesson);
      url.searchParams.set("part", destination.part);
    }
  } else if (route.page === "learn") {
    url.searchParams.set("page", "learn");
  }
  return url;
}
