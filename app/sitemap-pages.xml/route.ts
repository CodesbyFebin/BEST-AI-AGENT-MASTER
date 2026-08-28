import { authorityPages } from "@/lib/authority-pages";
import { legacyPages } from "@/lib/legacy";
import { trustPages } from "@/lib/trust";
import { SITE } from "@/lib/site";
import { xmlResponse } from "@/lib/xml";

export const dynamic = "force-static";

export async function GET() {
  const legacyUrls = Object.entries(legacyPages)
    .filter(([slug, page]) => page.index && !slug.includes("/") && slug !== "rankings")
    .map(([slug]) => `${SITE.url}/${slug}`);

  const authorityUrls = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .map(([slug]) => `${SITE.url}/${slug}`);

  const staticRouteUrls = [
    "blog", "changelog", "events", "glossary", "india", "integrations",
    "learning", "mcp", "newsletter", "press", "tools", "trust"
  ].map((slug) => `${SITE.url}/${slug}`);

  const trustUrls = Object.keys(trustPages).map((slug) => `${SITE.url}/trust/${slug}`);

  return xmlResponse([...new Set([
    SITE.url,
    ...legacyUrls,
    ...authorityUrls,
    ...staticRouteUrls,
    ...trustUrls
  ])]);
}
