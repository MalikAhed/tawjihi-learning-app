import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { inspectModule, readOwners, validateOwners } from "../scripts/project-map.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), "learn-map-"));
  t.after(() => rm(root, { recursive:true, force:true }));
  for (const directory of ["docs", "src", "scripts", "tests"]) await mkdir(path.join(root, directory));
  for (const file of ["server.mjs", "dev-server.mjs", "src/value.js", "tests/value.test.mjs"]) await writeFile(path.join(root, file), "");
  await writeFile(path.join(root, "package.json"), JSON.stringify({ scripts:{ check:"node --test tests/value.test.mjs" } }));
  return root;
}

const table = rows => `# Code map\n\n| Task | Start here | Focused check |\n| --- | --- | --- |\n${rows}\n`;

test("one Markdown table supplies searchable owners and validated checks", async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, "docs/ARCHITECTURE.md"), table("| Values | `src/value.js`, `src/` | `npm run check`; `node --test tests/value.test.mjs` |"));
  assert.deepEqual(await readOwners(root), [{ task:"Values", files:["src/value.js", "src/"], checks:["npm run check", "node --test tests/value.test.mjs"] }]);
  assert.deepEqual(await validateOwners(root), []);
});

test("stale paths, unknown commands, duplicates and paths outside the repository fail validation", async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, "docs/ARCHITECTURE.md"), table([
    "| Values | `value.js` | `npm run removed` |",
    "| Values | `../outside.js` | `node --test tests/moved.test.mjs` |",
    "| Empty | prose instead of owner paths | no check |",
  ].join("\n")));
  const failures = (await validateOwners(root)).join("\n");
  for (const message of ["missing value.js", "unknown npm command removed", "duplicate task", "repository-relative path", "missing tests/moved.test.mjs", "provide owner paths"]) assert.ok(failures.includes(message), failures);
  await writeFile(path.join(root, "docs/ARCHITECTURE.md"), "No owner table");
  await assert.rejects(readOwners(root), /must contain one/);
});

test("file index follows static, lazy and re-export edges with source lines; excludes strings and generated files", async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, "src/value.js"), "export const value = 1;\nexport function getValue() { return value; }\nexport default value;\n");
  await writeFile(path.join(root, "src/consumer.js"), [
    "import {value} from './value.js';",
    "export {value as renamed} from './value.js';",
    "const lazy = () => import(`./value.js`);",
    "// import './value.js';",
    "const example = \"import './value.js'\";",
    "const computed = part => import('./' + part);",
  ].join("\n"));
  await writeFile(path.join(root, "tests/value.test.mjs"), "import '../src/value.js';\n");
  await mkdir(path.join(root, "_server"));
  await writeFile(path.join(root, "_server/copy.js"), "import '../src/value.js';\n");
  const result = await inspectModule(root, "src/value.js");
  assert.deepEqual(await inspectModule(root, "value.js"), result, "unique filenames resolve to the same file and references");
  assert.deepEqual(result.exports, [{ name:"value", line:1 }, { name:"getValue", line:2 }, { name:"default", line:3 }]);
  assert.deepEqual(result.importers, [
    { file:"src/consumer.js", line:1 }, { file:"src/consumer.js", line:2 }, { file:"src/consumer.js", line:3 },
    { file:"tests/value.test.mjs", line:1 },
  ]);
  const consumer = await inspectModule(root, "src/consumer.js");
  assert.equal(consumer.imports.length, 3);
  assert.deepEqual(consumer.exports, [{ name:"renamed", line:2 }]);
  await assert.rejects(inspectModule(root, "_server/copy.js"), /Not an indexed/);
  await assert.rejects(inspectModule(root, "../outside.js"), /Not an indexed/);
  await mkdir(path.join(root, "src/nested"));
  await writeFile(path.join(root, "src/nested/value.js"), "export const other = 2;\n");
  await assert.rejects(inspectModule(root, "value.js"), error => /Ambiguous filename/.test(error.message) && error.message.includes("src/nested/value.js") && error.message.includes("src/value.js"));
  assert.deepEqual(await inspectModule(root, "src/value.js"), result, "exact paths still work after a filename becomes ambiguous");
  await writeFile(path.join(root, "src/server.mjs"), "");
  assert.equal((await inspectModule(root, "server.mjs")).file, "server.mjs", "an exact root path wins over a nested basename");
});
