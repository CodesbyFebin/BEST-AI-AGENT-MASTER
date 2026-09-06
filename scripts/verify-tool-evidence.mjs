#!/usr/bin/env node
/**
 * verify-tool-evidence.mjs — capture SHA-256 hashes for tool evidence receipts.
 *
 * For every tool in lib/tools.ts, fetches each evidence receipt's primary
 * source URL, computes the SHA-256 of the response body, and prints a
 * ready-to-paste report. Hash capture alone does NOT verify anything:
 * a human must review the fetched source against the receipt's claim before
 * setting status: "verified", verifiedAt, sha256Hash, and flipping the
 * tool's index flag to true in lib/tools.ts.
 *
 * Usage: node scripts/verify-tool-evidence.mjs
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const TOOLS_FILE = new URL("../lib/tools.ts", import.meta.url);
const src = readFileSync(TOOLS_FILE, "utf8");

// Split lib/tools.ts into per-tool blocks at 2-space-indented keys.
const keyRe = /^  ([a-z0-9-]+): \{/gm;
const keys = [];
for (const m of src.matchAll(keyRe)) keys.push({ slug: m[1], start: m.index });
const blocks = keys.map((k, i) => ({
  slug: k.slug,
  body: src.slice(k.start, i + 1 < keys.length ? keys[i + 1].start : src.length),
}));

const urlRe = /sourceUrl: "([^"]+)"/g;
let missing = 0;

for (const { slug, body } of blocks) {
  const urls = [...body.matchAll(urlRe)].map((m) => m[1]);
  const unique = [...new Set(urls)];
  if (unique.length === 0) continue;
  console.log(`\n== ${slug} ==`);
  for (const url of unique) {
    try {
      const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "BestAIAgent-evidence-bot/1.0" } });
      if (!res.ok) {
        console.log(`  HTTP ${res.status}  ${url}`);
        missing += 1;
        continue;
      }
      const buf = await res.arrayBuffer();
      const hash = createHash("sha256").update(Buffer.from(buf)).digest("hex");
      console.log(`  captured   ${hash}`);
      console.log(`             ${url}`);
    } catch (err) {
      console.log(`  FAILED     ${url}`);
      console.log(`             ${err?.message ?? err}`);
      missing += 1;
    }
  }
}

console.log(`\nDone. ${missing} fetch(es) failed.`);
console.log("Next: review each fetched source against its receipt claim, then in");
console.log("lib/tools.ts set sha256Hash + verifiedAt + status:\"verified\" per receipt");
console.log("and flip the tool's index flag to true. The page stays noindex until then.");
