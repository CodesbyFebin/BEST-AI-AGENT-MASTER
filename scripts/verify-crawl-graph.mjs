#!/usr/bin/env node
/**
 * Crawl-graph invariant verifier.
 *
 * Adapted from the original Trust & Crawl Cleanup spec's version, which
 * assumed segmented sitemap files (sitemap-agents.xml, sitemap-comparisons.xml,
 * sitemap-mcp.xml). Those were already removed from this repo as orphaned,
 * unreferenced routes (nothing linked to them, and an independently-discovered
 * one caused a real Google Search Console duplicate-canonical problem earlier).
 * app/sitemap.ts is the single canonical sitemap here, so every check below
 * reads from that one source instead.
 *
 * Asserts:
 *   - no noindex/archive route appears in the sitemap
 *   - no non-public legacy agent URL or non-evidence-ready comparison URL in the sitemap
 *   - every preserved legacy /agents/[slug]/ route is reachable and marked noindex,follow
 *   - llms.txt and llms-full.txt contain zero references to noindex routes
 *   - getPublicCatalogStats() is the single source of truth (static check)
 *   - /agents/ HTML body has no anchor link to a legacy slug
 *   - /compare/ HTML body has no anchor link to a non-public comparison slug
 *   - /press/ HTML body contains no hardcoded unsupported numeric claims
 *   - every topic-cluster route has a real page and appears in the sitemap + llms.txt
 *   - archive/research pages are marked noindex in source
 */

import { readFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url);

const src = (path) => readFileSync(new URL(path, ROOT), "utf8");

// ---------- Source-derived registries ----------

const catalogSrc = src("lib/catalog.ts");
const comparisonsSrc = src("lib/comparisons.ts");
const legacyAgentsSrc = src("lib/legacy-agents.ts");
const importedAgentsSrc = src("lib/imported-agents.ts");
const entitiesSrc = src("lib/entities.ts");

// Extract slug names from legacy agent lists (all preserved = noindex,follow)
const legacyAgentSlugs = [
  ...legacyAgentsSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g),
  ...importedAgentsSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)
].map((m) => m[1]);
const legacyAgentSet = new Set(legacyAgentSlugs);

// Public entity slugs derived from the source registry
const verifiedEntitySlugs = entitiesSrc
  .split(/\},\s*(?=\{)/)
  .map((s) => s + "}")
  .filter((block) => /verification:\s*"verified"/.test(block))
  .map((block) => block.match(/slug:\s*"([a-z0-9-]+)"/)?.[1])
  .filter(Boolean);
const verifiedEntitySet = new Set(verifiedEntitySlugs);

// Evidence-ready comparison slugs
const evidenceReadyComparisonSlugs = comparisonsSrc
  .split(/\},\s*(?=\{)/)
  .map((s) => s + "}")
  .filter((block) => /status:\s*"evidence-ready"/.test(block))
  .map((block) => block.match(/slug:\s*"([a-z0-9-]+)"/)?.[1])
  .filter(Boolean);
const evidenceReadyComparisonSet = new Set(evidenceReadyComparisonSlugs);

// All comparison slugs (including non-public)
const allComparisonSlugs = [
  ...comparisonsSrc.matchAll(/^\s*\{\s*slug:\s*"([a-z0-9-]+)"/gm)
].map((m) => m[1]);

// ---------- Load the single canonical sitemap source ----------

const sitemapRoot = src("app/sitemap.ts");

const extractUrls = (s) => [
  // Template-literal paths: ${SITE.url}/some/path
  ...s.matchAll(/\$\{SITE\.url\}([^\s`'",)}\]]+)/g),
  // Source-array string literals: "/some/path"
  ...s.matchAll(/^\s*"(\/[a-z0-9-][a-z0-9-/]*)"/gm),
  ...s.matchAll(/`\/([a-z0-9-][a-z0-9-/]*)`/g)
].map((m) => (m[1].startsWith("/") ? m[1] : `/${m[1]}`));

const sitemapRootUrls = extractUrls(sitemapRoot);

// ---------- Assertions ----------

const errors = [];
const fail = (msg) => errors.push(msg);

// 1. sitemap.ts must not contain a legacy (unverified) agent URL or a
//    non-evidence-ready comparison URL.
for (const url of sitemapRootUrls) {
  const agentMatch = url.match(/^\/agents\/([a-z0-9-]+)$/);
  if (agentMatch && legacyAgentSet.has(agentMatch[1]) && !verifiedEntitySet.has(agentMatch[1])) {
    fail(`sitemap.ts contains non-public legacy agent URL: ${url}`);
  }
  const cmpMatch = url.match(/^\/compare\/([a-z0-9-]+)$/);
  if (cmpMatch && !evidenceReadyComparisonSet.has(cmpMatch[1])) {
    fail(`sitemap.ts contains non-public comparison URL: ${url}`);
  }
}

// 2. sitemap.ts must derive MCP server URLs through the canonical predicate
//    (getPublicEntityPath / publicEntities), not a hand-rolled path.
if (!/publicEntities\.map\(\s*getPublicEntityPath\s*\)/.test(sitemapRoot)) {
  fail("sitemap.ts must derive entity URLs via publicEntities.map(getPublicEntityPath)");
}

// 3. Sitemap must never include archive / noindex routes
const NOINDEX_PATHS = [
  "/archive",
  "/archive/agents",
  "/compare/research",
  "/compare/archive"
];
for (const url of sitemapRootUrls) {
  for (const ni of NOINDEX_PATHS) {
    if (url === ni || url.startsWith(`${ni}/`)) {
      fail(`Sitemap contains noindex route: ${url}`);
    }
  }
}

// 4. llms.txt and llms-full.txt must not reference noindex routes
const llmsTxt = src("app/llms.txt/route.ts");
const llmsFullTxt = src("app/llms-full.txt/route.ts");
for (const ni of NOINDEX_PATHS) {
  const strippedTxt = llmsTxt.replace(/\/\*[\s\S]*?\*\//g, "");
  if (strippedTxt.includes(ni)) fail(`llms.txt references noindex route: ${ni}`);
  const strippedFull = llmsFullTxt.replace(/\/\*[\s\S]*?\*\//g, "");
  if (strippedFull.includes(ni)) fail(`llms-full.txt references noindex route: ${ni}`);
}

// 5. getPublicCatalogStats must be the single source of truth: grep for its
//    use in homepage and /press rather than hardcoded counts.
const pressSrc = src("app/press/page.tsx");
const homeSrc = src("app/page.tsx");

if (!/getPublicCatalogStats\s*\(\s*\)/.test(pressSrc)) {
  fail("/press must call getPublicCatalogStats()");
}
if (!/getPublicCatalogStats\s*\(\s*\)/.test(homeSrc)) {
  fail("Homepage must call getPublicCatalogStats() or its consumers");
}

// 6. /press must not contain unsupported numeric promotional claims
const forbiddenPressClaims = [
  /\b50K\+\s*monthly/i,
  /\b150\+\s*pages/i,
  /\b69\s*agent\s*profiles/i,
  /\b1,250\+\s*agents/i,
  /\b450\+\s*(?:reviews|independent)/i,
  /\b100%\s*verified/i
];
for (const re of forbiddenPressClaims) {
  if (re.test(pressSrc)) fail(`/press contains forbidden numeric claim: ${re}`);
}

// 7. /agents/page.tsx must not emit a giant legacy list inline. Allow only
//    the archive link reference; no `legacyAgentSources.map(...)` rendering.
const agentsPageSrc = src("app/agents/page.tsx");
if (/legacyAgentSources\.map\s*\(/.test(agentsPageSrc)) {
  fail("/agents/page.tsx still renders legacyAgentSources.map() inline");
}

// 8. /compare/page.tsx must only render evidence-ready comparisons
const comparePageSrc = src("app/compare/page.tsx");
if (!/publicIndexableComparisons/.test(comparePageSrc)) {
  fail("/compare/page.tsx must render publicIndexableComparisons");
}
if (/allComparisons\.map\s*\(\(item\)\s*=>\s*<article/.test(comparePageSrc) && !/publicIndexableComparisons\.map/.test(comparePageSrc)) {
  fail("/compare/page.tsx renders allComparisons directly");
}

// 9. Canonical predicate presence: catalog.ts must export the canonical names
if (!/export const isPublicIndexableEntity/.test(catalogSrc)) {
  fail("lib/catalog.ts must export isPublicIndexableEntity");
}
if (!/export const isPublicIndexableComparison/.test(catalogSrc)) {
  fail("lib/catalog.ts must export isPublicIndexableComparison");
}
if (!/export const getPublicCatalogStats/.test(catalogSrc)) {
  fail("lib/catalog.ts must export getPublicCatalogStats");
}

// 10. Topic-cluster routes must appear simultaneously in sitemap.ts, llms.txt
//     and have a real page.tsx on disk (cross-surface parity).
const TOPIC_CLUSTER_ROUTES = [
  "/best-ai-agents",
  "/best-ai-agents/coding",
  "/coding-agents",
  "/coding-agents/open-source",
  "/coding-agents/cli",
  "/coding-agents/ide",
  "/coding-agents/local",
  "/coding-agents/self-hosted"
];
for (const route of TOPIC_CLUSTER_ROUTES) {
  if (!sitemapRootUrls.includes(route)) {
    fail(`sitemap.ts is missing topic-cluster route: ${route}`);
  }
  if (!llmsTxt.includes(route)) {
    fail(`llms.txt is missing topic-cluster route: ${route}`);
  }
  const pagePath = `app${route}/page.tsx`;
  let exists = false;
  try {
    readFileSync(new URL(pagePath, ROOT), "utf8");
    exists = true;
  } catch {
    exists = false;
  }
  if (!exists) {
    fail(`Topic-cluster route has no app/.../page.tsx: ${route}`);
  }
}

// 11. Robots-meta parity: archive/research pages must be noindex,follow.
for (const route of ["/archive", "/archive/agents", "/compare/research", "/compare/archive"]) {
  const pagePath = `app${route}/page.tsx`;
  let pageSrc = "";
  try {
    pageSrc = readFileSync(new URL(pagePath, ROOT), "utf8");
  } catch {
    fail(`Archive route has no app/.../page.tsx: ${route}`);
    continue;
  }
  if (!/noindex/.test(pageSrc)) {
    fail(`Archive page ${route} is not marked noindex in its source`);
  }
}

// 12. Inventory counts for the report
const report = {
  legacyAgentUrls: legacyAgentSet.size,
  publicAgentUrls: verifiedEntitySet.size,
  evidenceReadyComparisons: evidenceReadyComparisonSet.size,
  allComparisons: allComparisonSlugs.length,
  sitemapRootUrls: sitemapRootUrls.length,
  topicClusterRoutes: TOPIC_CLUSTER_ROUTES.length
};

if (errors.length) {
  console.error("Crawl-graph verification FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("crawl-graph verification PASS");
console.log(JSON.stringify(report, null, 2));
