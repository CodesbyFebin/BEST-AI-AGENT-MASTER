#!/usr/bin/env node

import { readFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url);
const read = (path) => readFileSync(new URL(path, ROOT), "utf8");
const errors = [];
const requireMatch = (source, pattern, message) => {
  if (!pattern.test(source)) errors.push(message);
};
const forbidMatch = (source, pattern, message) => {
  if (pattern.test(source)) errors.push(message);
};

const authorityRoute = read("app/[slug]/page.tsx");
const authorityEvidence = read("lib/authority-evidence.ts");
const sitemap = read("app/sitemap.ts");
const llms = read("app/llms.txt/route.ts");
const llmsFull = read("app/llms-full.txt/route.ts");
const homepage = read("app/page.tsx");
const layout = read("app/layout.tsx");
const entityLogo = read("components/EntityLogo.tsx");
const blogIndex = read("app/blog/page.tsx");
const blogDetail = read("app/blog/[...slug]/page.tsx");

requireMatch(authorityEvidence, /isAuthorityPageEvidenceReady/, "authority evidence module must export the fail-closed page predicate");
requireMatch(authorityRoute, /isAuthorityPageEvidenceReady/, "authority route must apply the page-evidence predicate");
requireMatch(sitemap, /isAuthorityPageEvidenceReady/, "sitemap must apply the page-evidence predicate");
requireMatch(llmsFull, /isAuthorityPageEvidenceReady/, "llms-full must apply the page-evidence predicate");

forbidMatch(homepage, /"@type"\s*:\s*"Organization"/, "homepage must not duplicate the Organization graph emitted by the root layout");
requireMatch(layout, /"@type"\s*:\s*"Organization"/, "root layout must emit the canonical Organization graph");
forbidMatch(entityLogo, /google\.com\/s2\/favicons/, "entity logos must not depend on Google's live favicon proxy");
forbidMatch(sitemap, /FALLBACK_LAST_MODIFIED/, "sitemap must not invent one fallback modification date for unrelated pages");
forbidMatch(sitemap, /blogPosts/, "unreviewed blog drafts must not enter the sitemap");
requireMatch(blogIndex, /robots:\s*\{\s*index:\s*false/, "blog index must remain noindex until its articles have evidence receipts");
requireMatch(blogDetail, /robots:\s*\{\s*index:\s*false/, "blog drafts must remain noindex until they have evidence receipts");

const heldRoutes = ["changelog", "events", "integrations", "learning", "newsletter"];
for (const route of heldRoutes) {
  const source = read(`app/${route}/page.tsx`);
  requireMatch(source, /robots:\s*\{\s*index:\s*false/, `/${route} must remain noindex while its claims or functionality are unverified`);
  forbidMatch(sitemap, new RegExp(`\\"\\/${route}\\"`), `/${route} must not appear in sitemap.ts while noindex`);
  forbidMatch(llms, new RegExp(`\\/${route}\\b`), `/${route} must not appear in llms.txt while noindex`);
}

const newsletter = read("app/newsletter/page.tsx");
forbidMatch(newsletter, /10,000|every Monday|type="email"|>Subscribe</, "newsletter must not claim an audience, schedule, or working subscription form before implementation");
const events = read("app/events/page.tsx");
forbidMatch(events, /India AI Summit 2026|2000 attendees expected|MCP Developer Workshop/, "events page must not publish unverified event records");
const integrations = read("app/integrations/page.tsx");
forbidMatch(integrations, /data does not leave Indian jurisdictions without explicit consent/i, "integration guidance must not state a fabricated blanket DPDP residency rule");

for (const source of [read("app/press/page.tsx"), read("app/tools/page.tsx")]) {
  forbidMatch(source, /CodesbyFebin\/bestaiagent\.in/i, "repository links must target CodesbyFebin/BESTAIAGENT-MASTER");
}

if (errors.length) {
  console.error("publication integrity FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("publication integrity PASS");
console.log("- authority pages fail closed without verified page-level receipts");
console.log("- unsupported blog and utility surfaces remain noindex and out of machine feeds");
console.log("- global schema, sitemap dates, repository links, and logo dependencies are guarded");
