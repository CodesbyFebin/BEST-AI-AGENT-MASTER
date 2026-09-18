import type { MetadataRoute } from "next";
import { publicEntities, publicIndexableComparisons, getPublicEntityPath, getEvidence } from "@/lib/catalog";
import { authorityPages } from "@/lib/authority-pages";
import { isAuthorityPageEvidenceReady } from "@/lib/authority-evidence";
import { legacyPages, categories } from "@/lib/legacy";
import { glossaryTerms } from "@/lib/glossary";
import { trustPages } from "@/lib/trust";
import { SITE } from "@/lib/site";

// Most recent verified evidence retrievedAt for an entity, as a genuine
// lastmod source — not a fabricated "just updated" timestamp. Entities
// with no evidence records (shouldn't happen for a publicly-indexable
// entity, but checked rather than assumed) get no lastmod, same as any
// other path this file can't source a real date for.
function latestEvidenceDate(entityId: string): string | undefined {
  const dates = getEvidence(entityId).map((record) => record.retrievedAt).filter(Boolean);
  if (!dates.length) return undefined;
  return dates.reduce((latest, current) => (current > latest ? current : latest));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const legacyPaths = Object.entries(legacyPages)
    .filter(([slug, page]) => page.index && slug !== "rankings")
    .map(([slug]) => `/${slug}`);

  const authorityEntries = Object.entries(authorityPages).filter(([slug, page]) =>
    page.index && isAuthorityPageEvidenceReady(slug, page.evidenceIds)
  );
  const authorityPaths = authorityEntries.map(([slug]) => `/${slug}`);
  const lastModifiedByPath = new Map<string, string>([
    ...authorityEntries.map(([slug, page]): [string, string] => [`/${slug}`, page.lastReviewed]),
    ...publicEntities
      .map((entity): [string, string | undefined] => [getPublicEntityPath(entity), latestEvidenceDate(entity.id)])
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
  ]);

  // MCP server detail pages are intentionally noindex until a canonical upstream
  // and hashed evidence pass the publication gate — never list a noindex URL in
  // the sitemap, since that's flagged by Search Console as a submission error.
  // Same rule applies to /archive, /compare/research and /compare/archive —
  // they're preserved at 200 for continuity but excluded here on purpose.
  // /guides is noindex by design, and /glossary 301s to /glossary-hub (an
  // evidence-pending, noindex authority page), so neither is listed.
  const topicClusterPaths = [
    "/best-ai-agents",
    "/best-ai-agents/coding",
    "/coding-agents",
    "/coding-agents/open-source",
    "/coding-agents/cli",
    "/coding-agents/ide",
    "/coding-agents/local",
    "/coding-agents/self-hosted"
  ];

  const paths = new Set<string>([
    "/",
    "/agents",
    "/models",
    "/frameworks",
    "/providers",
    "/categories",
    "/compare",
    "/mcp",
    "/mcp/servers",
    "/india",
    "/research",
    "/press",
    "/tools",
    "/trust",
    ...topicClusterPaths,
    ...legacyPaths,
    ...authorityPaths,
    ...categories.map(([slug]) => `/categories/${slug}`),
    ...glossaryTerms.map((term) => `/glossary/${term.slug}`),
    ...Object.keys(trustPages).map((slug) => `/trust/${slug}`),
    ...publicEntities.map(getPublicEntityPath),
    ...publicIndexableComparisons.map((comparison) => `/compare/${comparison.slug}`)
  ]);

  return [...paths].map((path) => {
    const lastModified = lastModifiedByPath.get(path);
    return {
      url: `${SITE.url}${path}`,
      ...(lastModified ? { lastModified } : {})
    };
  });
}
