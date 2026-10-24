import { authorityPages } from "@/lib/authority-pages";
import { publicEntities } from "@/lib/catalog";

export const dynamic = "force-static";

export async function GET() {

  const entityResults = publicEntities
    .map((entity) => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      slug: entity.slug,
      summary: entity.summary,
      verification: entity.verification,
      url: `/${entity.type}s/${entity.slug}`
    }));

  const authorityResults = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .map(([slug, page]) => ({
      id: `authority:${slug}`,
      name: page.title,
      type: "guide",
      slug,
      summary: page.directAnswer,
      verification: page.evidenceIds?.length ? "evidence-backed" : "editorial-methodology",
      url: `/${slug}`
    }));

  const results = [...entityResults, ...authorityResults];
  return Response.json({ count: results.length, results });
}
