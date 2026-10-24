import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const redirects = JSON.parse(readFileSync(new URL("../data/legacy-redirects.json", import.meta.url), "utf8"));
const mapping = new Map(Object.entries(redirects));

test("all legacy redirect targets are internal and do not chain", () => {
  for (const [source, target] of mapping) {
    assert.match(source, /^\/[a-z0-9][a-z0-9/_-]*$/);
    assert.match(target, /^\/[a-z0-9][a-z0-9/_-]*$/);
    assert.notEqual(source, target);
    assert.equal(mapping.has(target), false, `Redirect chain: ${source} -> ${target}`);
    assert.equal(target.startsWith("/api/"), false);
  }
});

test("legacy redirect destinations are unique per source, without query/hash", () => {
  for (const [source, target] of mapping) {
    assert.equal(source.includes("?") || source.includes("#"), false);
    assert.equal(target.includes("?") || target.includes("#"), false);
    assert.equal(target.includes(".."), false);
  }
});

test("canonical sitemap is a single index and excludes legacy redirect sources", () => {
  const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(sitemap, /new Set<string>/);
  assert.match(sitemap, /publicEntities\.map\(getPublicEntityPath\)/);
  assert.equal(sitemap.includes("...Object.keys(legacyRedirects)"), false);
});
