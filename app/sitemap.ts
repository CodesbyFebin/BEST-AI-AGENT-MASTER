import type { MetadataRoute } from "next";
import { publicEntities } from "@/lib/catalog";
import { publicComparisons } from "@/lib/comparisons";
import { authorityPages } from "@/lib/authority-pages";
import { legacyPages, categories } from "@/lib/legacy";
import { glossaryTerms } from "@/lib/glossary";
import { trustPages } from "@/lib/trust";
import { SITE } from "@/lib/site";

const FALLBACK_LAST_MODIFIED = "2026-08-29";

export default function sitemap(): MetadataRoute.Sitemap {
  const legacyPaths = Object.entries(legacyPages)
    .filter(([slug, page]) => page.index && slug !== "rankings")
    .map(([slug]) => `/${slug}`);

  const authorityEntries = Object.entries(authorityPages).filter(([, page]) => page.index);
  const authorityPaths = authorityEntries.map(([slug]) => `/${slug}`);
  const lastModifiedByPath = new Map<string, string>(
    authorityEntries.map(([slug, page]) => [`/${slug}`, page.lastReviewed])
  );

  // MCP server detail pages are intentionally noindex until a canonical upstream
  // and hashed evidence pass the publication gate — never list a noindex URL in
  // the sitemap, since that's flagged by Search Console as a submission error.
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
    "/blog",
    "/changelog",
    "/events",
    "/glossary",
    "/guides",
    "/integrations",
    "/learning",
    "/newsletter",
    "/press",
    "/tools",
    "/trust",
    ...legacyPaths,
    ...authorityPaths,
    ...categories.map(([slug]) => `/categories/${slug}`),
    ...glossaryTerms.map((term) => `/glossary/${term.slug}`),
    ...Object.keys(trustPages).map((slug) => `/trust/${slug}`),
    ...publicEntities.map((entity) => `/${entity.type}s/${entity.slug}`),
    ...publicComparisons.map((comparison) => `/compare/${comparison.slug}`)
  ]);

  return [...paths].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: lastModifiedByPath.get(path) ?? FALLBACK_LAST_MODIFIED
  }));
}
