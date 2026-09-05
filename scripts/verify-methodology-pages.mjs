import fs from "node:fs";

// This script gates the methodology-only publication path: pages that make no
// externally-verifiable factual or comparative claim, so there is no primary
// source to attach an evidenceIds receipt to (see lib/authority-evidence.ts,
// isMethodologyPageReady). It does not replace the evidence path — a page
// carrying evidenceIds must never also carry methodologyReview.
//
// These lightweight Node scripts run before typecheck/build, so — matching
// verify-catalog.mjs's own convention — this reads lib/*.ts as text rather
// than importing compiled modules.

const read = (name) => fs.readFileSync(new URL(`../lib/${name}`, import.meta.url), "utf8");

function extractObjectLiteral(source, marker) {
  const idx = source.indexOf(marker);
  if (idx === -1) throw new Error(`Marker not found: ${marker}`);
  const literal = source.slice(idx + marker.length).replace(/;\s*$/, "");
  // Trusted, first-party source file — not user input.
  return (0, eval)(`(${literal})`);
}

const authorityPagesSource = read("authority-pages.ts");
const authorityPages = extractObjectLiteral(
  authorityPagesSource,
  "export const authorityPages: Record<string, AuthorityPage> = "
);

const clusterPages = extractObjectLiteral(
  read("clusters.ts"),
  "export const clusterPages: Record<string, ClusterPage> = "
);

const legacyPagesSource = read("legacy.ts");
const legacyPages = extractObjectLiteral(
  legacyPagesSource,
  legacyPagesSource.slice(legacyPagesSource.indexOf("export const legacyPages"), legacyPagesSource.indexOf(" = ", legacyPagesSource.indexOf("export const legacyPages")) + 3)
);

const trustPages = extractObjectLiteral(
  read("trust.ts"),
  "export const trustPages: Record<string, TrustPage> = "
);

const glossarySlugs = [...read("glossary.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const categorySlugs = [...read("legacy.ts").matchAll(/^\s*\["([a-z0-9-]+)",/gm)].map((m) => m[1]);

// Known static routes not covered by the dynamic sources above. This script
// does not resolve individual dynamic entity pages (e.g. /agents/cline) —
// a methodology-only page (no externally-verifiable claim) has no legitimate
// reason to link a specific entity anyway, so that gap is accepted, not hidden.
const staticRoutes = new Set([
  "/", "/agents", "/models", "/frameworks", "/providers", "/categories", "/compare",
  "/mcp", "/mcp/servers", "/india", "/research", "/glossary", "/guides", "/press",
  "/tools", "/trust", "/archive", "/archive/agents", "/compare/archive", "/compare/research",
  "/best-ai-agents", "/best-ai-agents/coding", "/coding-agents", "/coding-agents/open-source",
  "/coding-agents/cli", "/coding-agents/ide", "/coding-agents/local", "/coding-agents/self-hosted",
  "/search", "/methodology", "/editorial-policy", "/silos/builders"
]);

function resolves(href) {
  if (staticRoutes.has(href)) return true;
  const slug = href.replace(/^\//, "");
  if (slug in authorityPages) return true;
  if (slug in clusterPages) return true;
  if (slug in legacyPages) return true;
  if (slug in trustPages) return true;
  const glossaryMatch = href.match(/^\/glossary\/([a-z0-9-]+)$/);
  if (glossaryMatch) return glossarySlugs.includes(glossaryMatch[1]);
  const categoryMatch = href.match(/^\/categories\/([a-z0-9-]+)$/);
  if (categoryMatch) return categorySlugs.includes(categoryMatch[1]);
  const trustMatch = href.match(/^\/trust\/([a-z0-9-]+)$/);
  if (trustMatch) return trustMatch[1] in trustPages;
  return false;
}

const bannedClaimPatterns = [
  { pattern: /\bguaranteed?\b/i, label: "guarantee claim" },
  { pattern: /\b(certified|compliant)\b/i, label: "certification/compliance claim" },
  { pattern: /#1\b|\bnumber[ -]one\b/i, label: "ranking claim" },
  { pattern: /\bindustry[- ]leading\b/i, label: "unqualified superlative" },
  { pattern: /\b(cheapest|fastest|most (accurate|secure|reliable))\b/i, label: "unqualified performance superlative" },
  { pattern: /\d+%\s*(faster|cheaper|more (accurate|reliable))/i, label: "unverified quantified comparison" }
];

const errors = [];
let checkedCount = 0;

for (const [slug, page] of Object.entries(authorityPages)) {
  if (!page.methodologyReview) continue;
  checkedCount++;

  if (page.evidenceIds?.length) {
    errors.push(`${slug}: carries both evidenceIds and methodologyReview — pick one path, not both.`);
  }

  const review = page.methodologyReview;
  if (!review.reviewedBy || !review.reviewedBy.trim()) {
    errors.push(`${slug}: methodologyReview.reviewedBy is blank — a named reviewer is required, not a placeholder.`);
  }
  if (!review.reviewedAt || !review.reviewedAt.trim()) {
    errors.push(`${slug}: methodologyReview.reviewedAt is blank.`);
  }
  for (const flag of ["noUnsupportedClaims", "limitationsDisclosed", "originalityChecked", "noUnsupportedSuperlatives"]) {
    if (review[flag] !== true) {
      errors.push(`${slug}: methodologyReview.${flag} is not explicitly true — this page does not qualify.`);
    }
  }

  const text = [
    page.title,
    page.description,
    page.directAnswer,
    ...page.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.bullets ?? [])])
  ].join(" \n ");
  for (const { pattern, label } of bannedClaimPatterns) {
    if (pattern.test(text)) {
      errors.push(`${slug}: contains an unsupported ${label} ("${text.match(pattern)[0]}") — methodology-only pages may not carry this without evidence.`);
    }
  }

  for (const link of page.relatedLinks) {
    if (!resolves(link.href)) {
      errors.push(`${slug}: relatedLinks target does not resolve: ${link.href}`);
    }
  }

  // Rendered SEO/schema coverage: every authority page (methodology-only
  // included) gets a WebPage + FAQPage JSON-LD block from app/[slug]/page.tsx,
  // checked for all pages by scripts/validate-jsonld.py as part of `npm run
  // verify` — not duplicated here.
  //
  // Accessibility: these are plain prose pages with no images, so the only
  // structural checks that apply are heading order and link text, both of
  // which app/[slug]/page.tsx renders unconditionally (h1 -> h2 sections,
  // no empty link text since relatedLinks.label is required and non-empty
  // here by construction). A full WCAG audit against rendered HTML is out of
  // scope for this script — noted as a real limit, not silently assumed away.
  if (page.relatedLinks.some((link) => !link.label || !link.label.trim())) {
    errors.push(`${slug}: relatedLinks contains an empty label (accessibility: link text must be discernible).`);
  }
}

if (errors.length) {
  throw new Error(`Methodology-only page verification FAILED:\n- ${errors.join("\n- ")}`);
}

console.log(`methodology-page verification PASS: ${checkedCount} page(s) using the methodology-only path checked (0 disqualifying findings).`);
