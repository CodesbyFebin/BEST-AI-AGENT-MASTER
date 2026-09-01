import type { MetadataRoute } from "next";
import { publicEntities, publicIndexableComparisons, getPublicEntityPath } from "@/lib/catalog";
import { authorityPages } from "@/lib/authority-pages";
import { legacyPages, categories } from "@/lib/legacy";
import { glossaryTerms } from "@/lib/glossary";
import { trustPages } from "@/lib/trust";
import { blogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

const FALLBACK_LAST_MODIFIED = "2026-08-29";

export default function sitemap(): MetadataRoute.Sitemap {
  const legacyPaths = Object.entries(legacyPages)
    .filter(([slug, page]) => page.index && slug !== "rankings")
    .map(([slug]) => `/${slug}`);

  const authorityEntries = Object.entries(authorityPages).filter(([, page]) => page.index);
  const authorityPaths = authorityEntries.map(([slug]) => `/${slug}`);
  const lastModifiedByPath = new Map<string, string>([
    ...authorityEntries.map(([slug, page]): [string, string] => [`/${slug}`, page.lastReviewed]),
    ...blogPosts.map((post): [string, string] => [`/blog/${post.category}/${post.subcategory}/${post.slug}`, post.date])
  ]);

  // MCP server detail pages are intentionally noindex until a canonical upstream
  // and hashed evidence pass the publication gate — never list a noindex URL in
  // the sitemap, since that's flagged by Search Console as a submission error.
  // Same rule applies to /archive, /compare/research and /compare/archive —
  // they're preserved at 200 for continuity but excluded here on purpose.
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
    ...topicClusterPaths,
    ...legacyPaths,
    ...authorityPaths,
    ...categories.map(([slug]) => `/categories/${slug}`),
    ...glossaryTerms.map((term) => `/glossary/${term.slug}`),
    ...Object.keys(trustPages).map((slug) => `/trust/${slug}`),
    ...publicEntities.map(getPublicEntityPath),
    ...publicIndexableComparisons.map((comparison) => `/compare/${comparison.slug}`),
    ...blogPosts.map((post) => `/blog/${post.category}/${post.subcategory}/${post.slug}`)
  ]);

  return [...paths].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: lastModifiedByPath.get(path) ?? FALLBACK_LAST_MODIFIED
  }));
}
