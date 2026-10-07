import assert from "node:assert/strict";
import test from "node:test";
import { createRouteUrl, readRoute } from "../src/app/route.js";

const learnRoute = (overrides = {}) => ({ page:"learn", subject:null, lesson:null, part:null, flow:null, ...overrides });

test("question bookmarks open their stable question and reject mismatched destinations", () => {
  const target = { subject:"mathematics-2", lesson:"integral-area", part:"integral-area-practice", question:"math-kamel-u5-p058-r2" };
  const url = createRouteUrl("https://example.test/?campaign=images", target);
  assert.equal(url.searchParams.get("question"), target.question);
  assert.deepEqual(readRoute(url.search), learnRoute(target));
  assert.deepEqual(readRoute(url.search.replace("subject=mathematics-2", "subject=mathematics")), learnRoute(target));
  for (const question of ["unknown", "math-kamel-u1-p042-r3"]) {
    const invalid = createRouteUrl(url.href, { ...target, question });
    assert.equal(invalid.searchParams.has("question"), false);
    assert.equal(readRoute(url.search.replace(target.question, question)).question, undefined);
  }
  assert.equal(createRouteUrl(url.href, { subject:"mathematics" }).search, "?campaign=images&subject=mathematics");
  assert.equal(readRoute("?page=more&question=" + target.question).question, undefined);
});

test("routes accept visitor flows, Learn, More, and valid subjects", () => {
  assert.deepEqual(readRoute(""), learnRoute({ flow:"entry" }));
  for (const flow of ["register", "sign-in"]) assert.deepEqual(readRoute(`?flow=${flow}`), learnRoute({ flow }));
  assert.deepEqual(readRoute("?flow=unknown"), learnRoute({ flow:"entry" }));
  assert.deepEqual(readRoute("?page=more&more-tab=mobile-preview"), learnRoute({ page:"more" }));
  for (const subject of ["ict", "mathematics", "mathematics-2", "physics", "biology"]) assert.deepEqual(readRoute(`?subject=${subject}`), learnRoute({ subject }));
  for (const subject of ["unknown"]) {
    assert.deepEqual(readRoute(`?subject=${subject}`), learnRoute());
    assert.equal(createRouteUrl("https://example.test/", { subject }).search, "");
  }
  assert.deepEqual(readRoute("?page=unknown&day=7"), learnRoute());
  assert.deepEqual(readRoute("?day=7x"), learnRoute({ flow:"entry" }));
});

test("locked tabs and retired experimental routes normalize to Learn", () => {
  for (const page of ["shop", "levels", "quests", "challenges", "league", "friends", "super"]) {
    const route = readRoute(`?page=${page}`);
    assert.deepEqual(route, learnRoute());
    assert.deepEqual(readRoute(`?page=${page}&subject=ict`), learnRoute());
    assert.equal(createRouteUrl("https://example.test/", route).search, "?page=learn");
  }
  for (const view of ["design-system", "ui-lab", "lesson-studio", "ship-ready-mcq", "ship-ready-code-lab"]) {
    const route = readRoute(`?view=${view}`);
    assert.deepEqual(route, learnRoute());
    assert.equal(createRouteUrl("https://example.test/", route).search, "?page=learn");
  }
});

test("lesson links validate the subject, lesson, and stable part together", () => {
  const target = { subject:"ict", lesson:"database-management", part:"access-basics" };
  const url = createRouteUrl("https://example.test/?campaign=quest&page=learn#anchor", target);
  assert.equal(url.search, "?campaign=quest&subject=ict&lesson=database-management&part=access-basics");
  assert.equal(url.hash, "#anchor");
  assert.deepEqual(readRoute(url.search), learnRoute(target));
  assert.deepEqual(readRoute("?subject=ict&lesson=course-introduction&part=getting-started"), learnRoute(target));
  for (const query of [
    "?subject=ict&lesson=database-management&part=getting-started",
    "?subject=ict&lesson=unknown&part=access-basics",
    "?subject=ict&lesson=database-management",
    "?subject=ict&part=access-basics",
  ]) assert.deepEqual(readRoute(query), learnRoute({ subject:"ict" }));
  assert.deepEqual(readRoute("?subject=mathematics&lesson=database-management&part=access-basics"), learnRoute({ subject:"mathematics" }));
  assert.deepEqual(readRoute("?subject=unknown&lesson=database-management&part=access-basics"), learnRoute());
  assert.equal(createRouteUrl(url, { subject:"ict" }).search, "?campaign=quest&subject=ict");
  assert.equal(createRouteUrl(url, { page:"shop" }).search, "?campaign=quest");
  assert.equal(createRouteUrl(url, { flow:"register" }).search, "?campaign=quest&flow=register");
  assert.equal(createRouteUrl(url, { subject:"ict", lesson:"course-introduction", part:"access-basics" }).search, "?campaign=quest&subject=ict");
});

test("old ICT topic bookmarks resolve to their corresponding video lessons", () => {
  for (const [lesson, oldPart, part] of [
    ["smartphone-operating-systems", "files-sensors", "android-features"],
    ["smartphone-operating-systems", "augmented-reality", "android-features"],
    ["smartphone-operating-systems", "app-types-review", "ios-files"],
    ["my-mobile-app", "bmi-blocks", "bmi-interface"],
    ["osi-model-layers", "session-services", "upper-layers"],
    ["osi-model-layers", "application-layer", "presentation-layer"],
    ["osi-model-layers", "osi-review", "presentation-layer"],
  ]) {
    assert.deepEqual(readRoute(`?subject=ict&lesson=${lesson}&part=${oldPart}`), learnRoute({ subject:"ict", lesson, part }));
    assert.equal(createRouteUrl("https://example.test/", { subject:"ict", lesson, part:oldPart }).searchParams.get("part"), part);
    assert.equal(readRoute(`?subject=ict&lesson=database-management&part=${oldPart}`).part, null);
  }
});

test("old Islamic aggregate lesson links remain resolvable after the book split", () => {
  const query = "?subject=islamic-education&lesson=islamic-quran&part=islamic-quran-practice";
  assert.deepEqual(readRoute(query), learnRoute({ subject:"islamic-education", lesson:"islamic-quran", part:"islamic-quran-practice" }));
  const url = createRouteUrl("https://example.test/", { subject:"islamic-education", lesson:"islamic-quran", part:"islamic-quran-practice" });
  assert.equal(url.search, query);
});

test("route URL updates preserve unrelated query parameters", () => {
  const subject = createRouteUrl("https://example.test/?campaign=quest&page=more", { subject:"ict" });
  assert.equal(subject.search, "?campaign=quest&subject=ict");
  const page = createRouteUrl(subject, { page:"more" });
  assert.equal(page.search, "?campaign=quest&page=more");
  assert.equal(createRouteUrl(page, { subject:"unknown" }).search, "?campaign=quest");
  assert.equal(createRouteUrl(page, { day:12 }).search, "?campaign=quest");
  const retired = createRouteUrl("https://example.test/?campaign=quest&view=ui-lab&prototype=1&review=questions&question=9&week=2&more-tab=mobile-preview", { page:"more" });
  assert.equal(retired.search, "?campaign=quest&page=more");
  assert.equal(createRouteUrl(page, { flow:"entry" }).search, "?campaign=quest");
  assert.equal(createRouteUrl(page, { flow:"register" }).search, "?campaign=quest&flow=register");
  assert.equal(createRouteUrl(page, { flow:"unknown" }).search, "?campaign=quest");
});
test("removed introductory lesson links open the first teaching lesson", () => {
  const route = readRoute("?subject=ict&lesson=course-introduction&part=getting-started");
  assert.equal(route.lesson, "database-management");
  assert.equal(route.part, "access-basics");
  const url = createRouteUrl("https://example.test/", { subject:"ict", lesson:"course-introduction", part:"getting-started" });
  assert.equal(url.searchParams.get("lesson"), "database-management");
  assert.equal(url.searchParams.get("part"), "access-basics");
});
