import assert from "node:assert/strict";
import test from "node:test";
import { readJsonBody } from "../src/server/http.mjs";

test("JSON body reader preserves UTF-8 split across network chunks", async () => {
  const encoded = Buffer.from(JSON.stringify({ username:"مستخدم" }));
  const splitAt = encoded.indexOf(0xd9) + 1;
  const request = {
    async *[Symbol.asyncIterator]() {
      yield encoded.subarray(0, splitAt);
      yield encoded.subarray(splitAt);
    },
  };

  assert.deepEqual(await readJsonBody(request), { username:"مستخدم" });
});

test("JSON body reader enforces its byte limit before parsing", async () => {
  const request = {
    async *[Symbol.asyncIterator]() { yield Buffer.alloc(9, 0x20); },
  };

  await assert.rejects(readJsonBody(request, 8), (error) => error.code === "ETOOBIG");
});
