import test from "node:test";
import assert from "node:assert/strict";
import { readAppConfig } from "../src/app/app-config.js";

const documentFor = accountMode => ({
  baseURI:"https://example.com/learn/",
  querySelector:() => accountMode ? { getAttribute:() => accountMode } : null,
});

test("HTTP accounts retain the deployment-relative API path", () => {
  assert.deepEqual(readAppConfig(documentFor("http")), { accountMode:"http", apiBase:"/learn/api/auth" });
});

test("API-free packages use the supported local account adapter", () => {
  assert.deepEqual(readAppConfig(documentFor("fixture")), { accountMode:"fixture", apiBase:null });
});

test("invalid account modes fail instead of enabling an accidental bypass", () => {
  for (const mode of [null, "invalid"]) assert.throws(() => readAppConfig(documentFor(mode)), /account mode/);
});
