/** Reserved for a future reviewed sitemap migration. No runtime behavior changes. */
export const SITEMAP_SPLIT_ENABLED = false as const;
export const SITEMAP_SHARDS = {
  core: ["/", "/marketplace", "/submit", "/trust"],
  blog: "/blog",
  glossary: "/glossary",
  guides: "/guides",
  tutorials: "/tutorials",
  agents: "/agents",
  models: "/models",
  frameworks: "/frameworks",
  mcp: "/mcp",
  compare: "/compare",
  alternatives: "/alternatives",
  pricing: "/pricing",
  india: "/india",
  categories: "/categories"
} as const;

export function routeToShard(path: string): keyof typeof SITEMAP_SHARDS {
  for (const [group, prefix] of Object.entries(SITEMAP_SHARDS)) {
    if (Array.isArray(prefix) ? prefix.includes(path) : path === prefix || path.startsWith(prefix + "/")) {
      return group as keyof typeof SITEMAP_SHARDS;
    }
  }
  return "core";
}
