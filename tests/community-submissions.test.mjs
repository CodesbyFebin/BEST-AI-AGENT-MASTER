import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const entities = readFileSync(new URL("../lib/entities.ts", import.meta.url), "utf8");
const mcp = readFileSync(new URL("../lib/mcp.ts", import.meta.url), "utf8");
const catalog = readFileSync(new URL("../lib/catalog.ts", import.meta.url), "utf8");

test("Monobot submission is an unverified and non-indexable candidate", () => {
  const line = entities.split("\n").find((row) => row.includes('slug: "monobot-ai"'));
  assert.ok(line, "Monobot entity must exist");
  assert.match(line, /verification: "pending"/);
  assert.match(line, /evidenceIds: \[\]/);
  assert.match(line, /sourceUrl: "https:\/\/monobot\.ai\/"/);
  assert.match(catalog, /entity\.verification === "verified"/);
});

test("BulkPublish MCP is source-linked only and has no unverified promotion", () => {
  const line = mcp.split("\n").find((row) => row.includes('slug: "bulkpublish"'));
  assert.ok(line, "BulkPublish MCP must exist");
  assert.match(line, /status: "source-linked"/);
  assert.match(line, /sourceUrl: "https:\/\/github\.com\/azeemkafridi\/bulkpublish-api"/);
  assert.doesNotMatch(line, /status: "verified"/);
});

test("community submission slugs remain unique", () => {
  for (const [content, slug] of [[entities, "monobot-ai"], [mcp, "bulkpublish"]]) {
    assert.equal(content.match(new RegExp('slug: "' + slug + '"', "g"))?.length, 1);
  }
});
