#!/usr/bin/env node
// Editorial DRAFT check. This is not a Google ranking, AI-citation, or factual source validator.
// Usage: node scripts/verify-editorial-drafts.mjs [directory] [--self-test]
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function inspect(source, file) {
  const issues = [];
  const get = key => source.match(new RegExp("^" + key + ":\\s*(.*)$", "m"))?.[1]?.trim();
  const status = get("status");
  if (!["draft", "reviewed", "published"].includes(status)) issues.push("missing status: draft|reviewed|published");
  if (!/^route:\s*\/(?:[^\s]*)/m.test(source)) issues.push("missing canonical route");
  if (!/^canonical:\s*https:\/\/www\.bestaiagent\.in\//m.test(source)) issues.push("missing absolute canonical");
  if (!/^title:\s*\S/m.test(source)) issues.push("missing title");
  if (!/^description:\s*\S/m.test(source)) issues.push("missing description");
  const headingCount = (source.match(/^#\s+\S/gm) ?? []).length;
  if (headingCount !== 1) issues.push("expected exactly one Markdown H1; found " + headingCount);
  const units = [...source.matchAll(/<p\s+class=["']citation-unit["']\s+id=["']([^"']+)["']>/g)].map(m => m[1]);
  if (new Set(units).size !== units.length) issues.push("duplicate citation unit IDs");
  if (units.length < 25 && status !== "draft") issues.push("less than 25 citation units");
  const evidence = [...source.matchAll(/\[EV:(https?:\/\/[^|\]]+)\|([^|\]]+)\|(\d{4}-\d\d-\d\d)\]/g)];
  if (evidence.length < units.length && status !== "draft") issues.push("fewer evidence markers than citation units");
  const internal = [...source.matchAll(/\]\((\/[^\s\)]+)\)/g)].map(m => m[1]);
  if (new Set(internal).size < 25 && status === "published") issues.push("fewer than 25 distinct internal links");
  if (/\b(100\/100 SEO|guaranteed ranking|all claims verified)\b/i.test(source)) issues.push("unsupported ranking/verification promise");
  if (/tested\s+\d+\s+hours/i.test(source) && !/^testingEvidence:\s*https?:\/\//m.test(source)) issues.push("testing hours lack linked run log");
  if (status === "published") {
    for (const field of ["reviewer", "lastVerified", "verificationCadence", "correctionsUrl"]) {
      if (!get(field)) issues.push("missing publication metadata: " + field);
    }
  }
  // This only checks marker structure, NOT that the locator, source or retrieved date is true.
  return {file, status, wordCount: (source.match(/\b[\w’-]+\b/g) ?? []).length, citationUnits: units.length, evidenceMarkers: evidence.length, distinctInternalLinks: new Set(internal).size, issues};
}

if (process.argv.includes("--self-test")) {
  const bad = inspect("status: published\n# One\n# Two\n100/100 SEO", "synthetic");
  if (!bad.issues.some(x => x.includes("H1")) || !bad.issues.some(x => x.includes("publication metadata"))) process.exit(1);
  console.log("PASS synthetic invalid-draft detection");
  process.exit(0);
}

const root = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "content/editorial-drafts");
const files = fs.existsSync(root) ? fs.readdirSync(root).filter(x => x.endsWith(".md")).map(x => path.join(root,x)) : [];
if (!files.length) {
  console.log("SKIP: no editorial Markdown drafts under " + root + "; no pages verified.");
  process.exit(0);
}
const results = files.map(file => inspect(fs.readFileSync(file,"utf8"),file));
for (const result of results) console.log(JSON.stringify(result));
if (results.some(result => result.issues.length)) process.exit(1);
console.log("PASS structural validation of " + results.length + " editorial drafts; source authenticity, indexing and rankings UNVERIFIED.");
