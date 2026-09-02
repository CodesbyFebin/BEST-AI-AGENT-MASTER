import { authorityPages } from "@/lib/authority-pages";
import { getAuthorityEvidence, isAuthorityPageEvidenceReady } from "@/lib/authority-evidence";
import { publicEntities, publicIndexableComparisons } from "@/lib/catalog";
import { glossaryTerms } from "@/lib/glossary";
import { trustPages } from "@/lib/trust";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const entityLines = publicEntities.map((entity) =>
    `- ${entity.name} (${entity.type}) — ${SITE.url}/${entity.type}s/${entity.slug} — source: ${entity.sourceUrl}`
  );

  const authorityLines = Object.entries(authorityPages)
    .filter(([slug, page]) => page.index && isAuthorityPageEvidenceReady(slug, page.evidenceIds))
    .map(([slug, page]) => {
      const sources = getAuthorityEvidence(slug).map((record) => record.sourceUrl);
      return `- ${page.title} (authority page) — ${SITE.url}/${slug} — reviewed: ${page.lastReviewed}${sources.length ? ` — sources: ${sources.join(", ")}` : ""}`;
    });

  const glossaryLines = glossaryTerms.map((term) =>
    `- ${term.term} (glossary, ${term.category}) — ${SITE.url}/glossary/${term.slug}`
  );

  const comparisonLines = publicIndexableComparisons.map((comparison) =>
    `- ${comparison.title} (comparison) — ${SITE.url}/compare/${comparison.slug}`
  );

  const trustLines = Object.entries(trustPages).map(([slug, page]) =>
    `- ${page.title} (methodology) — ${SITE.url}/trust/${slug}`
  );

  const lines = [
    "# BestAIAgent.in — full public authority index",
    "",
    "Public entity detail pages below pass the entity publication gate. Authority guides are separately reviewed and may include dated page-level evidence receipts. Glossary and comparison entries link to their own individually reviewed page.",
    "",
    "## Verified entities",
    ...entityLines,
    "",
    "## Authority guides",
    ...authorityLines,
    "",
    "## Glossary",
    ...glossaryLines,
    "",
    "## Evidence-ready comparisons",
    ...comparisonLines,
    "",
    "## Trust and methodology",
    ...trustLines
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
