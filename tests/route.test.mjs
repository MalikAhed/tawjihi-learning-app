import assert from "node:assert/strict";
import test from "node:test";
import { createRouteUrl, readRoute } from "../src/app/route.js";

const learnRoute = (overrides = {}) => ({ page:"learn", day:null, subject:null, lesson:null, part:null, view:null, flow:null, ...overrides });

test("route parser accepts visitor flows, known pages, valid subjects, and development views", () => {
  assert.deepEqual(readRoute(""), learnRoute({ flow:"entry" }));
  assert.deepEqual(readRoute("?flow=register"), learnRoute({ flow:"register" }));
  assert.deepEqual(readRoute("?flow=sign-in"), learnRoute({ flow:"sign-in" }));
  assert.deepEqual(readRoute("?flow=unknown"), learnRoute({ flow:"entry" }));
  assert.deepEqual(readRoute("?page=shop"), learnRoute({ page:"shop" }));
  assert.deepEqual(readRoute("?page=levels"), learnRoute({ page:"levels" }));
  assert.deepEqual(readRoute("?page=quests"), learnRoute({ page:"quests" }));
  assert.deepEqual(readRoute("?page=challenges"), learnRoute({ page:"challenges" }));
  assert.deepEqual(readRoute("?subject=ict"), learnRoute({ subject:"ict" }));
  assert.deepEqual(readRoute("?subject=mathematics"), learnRoute({ subject:"mathematics" }));
  assert.deepEqual(readRoute("?subject=unknown"), learnRoute());
  assert.deepEqual(readRoute("?page=unknown&day=7"), learnRoute());
  assert.deepEqual(readRoute("?day=7x"), learnRoute({ flow:"entry" }));
  assert.deepEqual(readRoute("?view=lesson-studio&day=4"), learnRoute());
  assert.deepEqual(readRoute("?view=design-system&subject=ict"), learnRoute({ view:"design-system" }));
  assert.deepEqual(readRoute("?view=ui-lab"), learnRoute({ view:"ui-lab" }));
  assert.deepEqual(readRoute("?view=ship-ready-markdown"), learnRoute({ view:"ship-ready-markdown" }));
  assert.deepEqual(readRoute("?view=ship-ready-sequence"), learnRoute({ view:"ship-ready-sequence" }));
  assert.deepEqual(readRoute("?view=ship-ready-fill-blanks"), learnRoute({ view:"ship-ready-fill-blanks" }));
  assert.deepEqual(readRoute("?view=ship-ready-response"), learnRoute({ view:"ship-ready-response" }));
  assert.deepEqual(readRoute("?view=ship-ready-spot-bug"), learnRoute({ view:"ship-ready-spot-bug" }));
  assert.deepEqual(readRoute("?view=ship-ready-code-lab"), learnRoute({ view:"ship-ready-code-lab" }));
});

test("lesson links validate the subject, lesson, and stable part together", () => {
  const target = { subject:"ict", lesson:"database-management", part:"access-basics" };
  const url = createRouteUrl("https://example.test/?campaign=quest&page=learn#anchor", target);
  assert.equal(url.search, "?campaign=quest&subject=ict&lesson=database-management&part=access-basics");
  assert.equal(url.hash, "#anchor");
  assert.deepEqual(readRoute(url.search), learnRoute(target));
  assert.deepEqual(readRoute("?subject=ict&lesson=course-introduction&part=getting-started"), learnRoute({ subject:"ict", lesson:"course-introduction", part:"getting-started" }));
  for (const query of [
    "?subject=ict&lesson=database-management&part=getting-started",
    "?subject=ict&lesson=unknown&part=access-basics",
    "?subject=ict&lesson=database-management",
    "?subject=ict&part=access-basics",
  ]) assert.deepEqual(readRoute(query), learnRoute({ subject:"ict" }));
  assert.deepEqual(readRoute("?subject=mathematics&lesson=database-management&part=access-basics"), learnRoute({ subject:"mathematics" }));
  assert.deepEqual(readRoute("?subject=unknown&lesson=database-management&part=access-basics"), learnRoute());
  assert.equal(createRouteUrl(url, { subject:"ict" }).search, "?campaign=quest&subject=ict");
  assert.equal(createRouteUrl(url, { page:"shop" }).search, "?campaign=quest&page=shop");
  assert.equal(createRouteUrl(url, { flow:"register" }).search, "?campaign=quest&flow=register");
  assert.equal(createRouteUrl(url, { subject:"ict", lesson:"course-introduction", part:"access-basics" }).search, "?campaign=quest&subject=ict");
});

test("route URL updates preserve unrelated query parameters", () => {
  const subject = createRouteUrl("https://example.test/?campaign=quest&page=more", { subject:"ict" });
  assert.equal(subject.search, "?campaign=quest&subject=ict");
  const page = createRouteUrl(subject, { page:"more" });
  assert.equal(page.search, "?campaign=quest&page=more");
  assert.equal(createRouteUrl(page, { subject:"unknown" }).search, "?campaign=quest");
  assert.equal(createRouteUrl(page, { day:12 }).search, "?campaign=quest");
  assert.equal(createRouteUrl(page, { view:"design-system" }).search, "?campaign=quest&view=design-system");
  assert.equal(createRouteUrl(page, { view:"ui-lab" }).search, "?campaign=quest&view=ui-lab");
  assert.equal(createRouteUrl(page, { view:"ship-ready-markdown" }).search, "?campaign=quest&view=ship-ready-markdown");
  assert.equal(createRouteUrl(page, { view:"ship-ready-sequence" }).search, "?campaign=quest&view=ship-ready-sequence");
  assert.equal(createRouteUrl(page, { view:"ship-ready-fill-blanks" }).search, "?campaign=quest&view=ship-ready-fill-blanks");
  assert.equal(createRouteUrl(page, { view:"ship-ready-response" }).search, "?campaign=quest&view=ship-ready-response");
  assert.equal(createRouteUrl(page, { view:"ship-ready-spot-bug" }).search, "?campaign=quest&view=ship-ready-spot-bug");
  assert.equal(createRouteUrl(page, { view:"ship-ready-code-lab" }).search, "?campaign=quest&view=ship-ready-code-lab");
  assert.equal(createRouteUrl(page, { flow:"entry" }).search, "?campaign=quest");
  assert.equal(createRouteUrl(page, { flow:"register" }).search, "?campaign=quest&flow=register");
  assert.equal(createRouteUrl(page, { flow:"unknown" }).search, "?campaign=quest");
});
