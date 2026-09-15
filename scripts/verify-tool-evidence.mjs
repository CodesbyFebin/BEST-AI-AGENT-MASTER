#!/usr/bin/env node
/**
 * verify-tool-evidence.mjs — capture a reproducible evidence snapshot + hash
 * for a tool's evidence receipt.
 *
 * Earlier version hashed the raw fetched HTML body directly. That was found
 * to be non-reproducible: fetching the same GitHub repo page three times in
 * a row produced three different SHA-256 hashes, because GitHub embeds a
 * per-request token in the HTML. A "verified" receipt whose hash changes
 * every time you check it isn't verifiable evidence — see the repo's own
 * incident: the same Superagent identity claim's "verified" hash changed
 * between two capture runs a day apart, both marked verified.
 *
 * This version follows the same convention as lib/authority-evidence.ts and
 * lib/evidence.ts: extract a small, curated set of STABLE facts (not the
 * whole page), then hash sha256(stableStringify({ sourceUrl, retrievedAt,
 * facts })). For a github.com/OWNER/REPO source, that means querying the
 * GitHub REST API (api.github.com/repos/OWNER/REPO) instead of scraping the
 * HTML — the API returns clean, stable JSON (id, full_name, default_branch,
 * archived, visibility) that doesn't vary between requests. For any other
 * source, it extracts the page's <title> as the stable fact, since a page's
 * title generally only changes when something material about the page does.
 *
 * Hash capture alone does NOT verify anything: a human must review the
 * fetched facts against the receipt's claim before setting
 * status: "verified" in lib/tools.ts. This script only prints a ready-to-
 * paste snapshot + hash; scripts/verify-catalog.mjs recomputes and checks
 * every "verified" receipt's hash at build time.
 *
 * Usage: node scripts/verify-tool-evidence.mjs
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function githubApiUrl(url) {
  const m = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/);
  return m ? `https://api.github.com/repos/${m[1]}/${m[2]}` : null;
}

async function captureFacts(url) {
  const apiUrl = githubApiUrl(url);
  if (apiUrl) {
    const res = await fetch(apiUrl, { headers: { "User-Agent": "BestAIAgent-evidence-bot/1.0" } });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}`, sourceUrl: apiUrl };
    const json = await res.json();
    return {
      ok: true,
      sourceUrl: apiUrl,
      facts: { id: json.id, full_name: json.full_name, default_branch: json.default_branch, archived: json.archived, visibility: json.visibility }
    };
  }
  if (!url.startsWith("http")) return { ok: false, error: "internal link — not hashable", sourceUrl: url };
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "BestAIAgent-evidence-bot/1.0" } });
  if (!res.ok) return { ok: false, error: `HTTP ${res.status}`, sourceUrl: url };
  const text = await res.text();
  const title = text.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  if (!title) return { ok: false, error: "no <title> found (page may be JS-rendered — capture facts manually and mark pending_review if figures can't be honestly extracted)", sourceUrl: url };
  return { ok: true, sourceUrl: url, facts: { pageTitle: title } };
}

const TOOLS_FILE = new URL("../lib/tools.ts", import.meta.url);
const src = readFileSync(TOOLS_FILE, "utf8");

const keyRe = /^  ([a-z0-9-]+): \{/gm;
const keys = [];
for (const m of src.matchAll(keyRe)) keys.push({ slug: m[1], start: m.index });
const blocks = keys.map((k, i) => ({
  slug: k.slug,
  body: src.slice(k.start, i + 1 < keys.length ? keys[i + 1].start : src.length),
}));

const urlRe = /sourceUrl: "([^"]+)"/g;
let missing = 0;
const today = new Date().toISOString().slice(0, 10);

for (const { slug, body } of blocks) {
  const urls = [...body.matchAll(urlRe)].map((m) => m[1]);
  const unique = [...new Set(urls)];
  if (unique.length === 0) continue;
  console.log(`\n== ${slug} ==`);
  for (const url of unique) {
    try {
      const result = await captureFacts(url);
      if (!result.ok) {
        console.log(`  SKIP  ${url}`);
        console.log(`        ${result.error}`);
        missing += 1;
        continue;
      }
      const hashInput = { sourceUrl: result.sourceUrl, retrievedAt: today, facts: result.facts };
      const hash = `sha256:${createHash("sha256").update(stableStringify(hashInput)).digest("hex")}`;
      console.log(`  captured   sourceUrl: "${result.sourceUrl}"`);
      console.log(`             snapshot: ${JSON.stringify(result.facts)}`);
      console.log(`             sha256Hash: "${hash}"`);
      console.log(`             verifiedAt: "${today}"`);
    } catch (err) {
      console.log(`  FAILED     ${url}`);
      console.log(`             ${err?.message ?? err}`);
      missing += 1;
    }
  }
}

console.log(`\nDone. ${missing} source(s) skipped or failed.`);
console.log("Next: review each captured snapshot against its receipt's claim, then in");
console.log("lib/tools.ts paste the printed sourceUrl/snapshot/sha256Hash/verifiedAt and");
console.log("set status:\"verified\". A receipt with no reliable extractable facts (e.g. a");
console.log("JS-rendered pricing page) should stay pending_review, not be forced verified.");
