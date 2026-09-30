// @ts-check
import { getCourseSubject } from "../data/course.js";
import { getSubjectRoadmap, getSubjectRoadmapLesson } from "../data/subject-roadmaps.js";

/** @typedef {{page:string, subject:string|null, lesson:string|null, part:string|null, flow:string|null}} Route */
/** @typedef {{page?:string, subject?:string|null, lesson?:string|null, part?:string|null, flow?:string|null}} RouteTarget */

const APP_PAGES = new Set(["learn", "more"]);
export const VISITOR_FLOWS = new Set(["entry", "register", "sign-in"]);

export function isUnlockedPage(page) {
  return APP_PAGES.has(page);
}

function lessonDestination(subject, lesson, part) {
  const target = getSubjectRoadmapLesson(subject, lesson);
  // Formerly unpublished topic links now resolve to the video covering that topic.
  const selected = target?.parts.find(candidate => candidate.id === part || ("aliases" in candidate && candidate.aliases.includes(part)));
  if (selected && target && "hidden" in target && target.hidden) {
    for (const unit of getSubjectRoadmap(subject)?.units || []) {
      const first = unit.lessons.find(lesson => !("hidden" in lesson && lesson.hidden));
      if (first) return { lesson:first.id, part:first.parts[0]?.id || null };
    }
    return { lesson:null, part:null };
  }
  return selected && target
    ? { lesson:target.id, part:selected.id } : { lesson:null, part:null };
}

/** @param {string} [search] @returns {Route} */
export function readRoute(search = "") {
  const params = new URLSearchParams(search);
  const requestedFlow = params.get("flow");
  const flow = VISITOR_FLOWS.has(requestedFlow || "") ? requestedFlow : null;
  if (flow) return { page:"learn", subject:null, lesson:null, part:null, flow };
  if (!params.has("page") && !params.has("subject") && !params.has("view")) {
    return { page:"learn", subject:null, lesson:null, part:null, flow:"entry" };
  }
  const requestedPage = params.get("page");
  if (requestedPage && !isUnlockedPage(requestedPage))
    return { page:"learn", subject:null, lesson:null, part:null, flow:null };
  const page = requestedPage || "learn";
  if (page === "more") return { page, subject:null, lesson:null, part:null, flow:null };

  const requestedSubject = getCourseSubject(params.get("subject"));
  const subject = requestedSubject?.status === "available" ? requestedSubject.id : null;
  return { page:"learn", subject, ...lessonDestination(subject, params.get("lesson"), params.get("part")), flow:null };
}

/** @param {string} currentHref @param {RouteTarget} [route] */
export function createRouteUrl(currentHref, route = {}) {
  const { page = "learn", subject = null, lesson = null, part = null, flow = null } = route;
  const url = new URL(currentHref);
  url.searchParams.delete("page");
  url.searchParams.delete("day");
  url.searchParams.delete("subject");
  url.searchParams.delete("lesson");
  url.searchParams.delete("part");
  url.searchParams.delete("view");
  url.searchParams.delete("flow");
  url.searchParams.delete("more-tab");
  for (const key of ["prototype", "week", "review", "batch", "question", "filter"]) url.searchParams.delete(key);

  if (VISITOR_FLOWS.has(flow || "")) {
    if (flow !== "entry") url.searchParams.set("flow", flow || "");
  } else if (page !== "learn" && APP_PAGES.has(page)) {
    url.searchParams.set("page", page);
  } else if (getCourseSubject(subject)?.status === "available") {
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
