import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, findComparison } from "@/lib/comparisons";
import { getPublicEntity } from "@/lib/catalog";
import { StatusBadge } from "@/components/StatusBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const c = findComparison(slug);
  if (!c) return { title: "Not found", robots: { index: false, follow: true } };
  return {
    title: c.title,
    description: c.notes[0],
    alternates: { canonical: `/compare/${c.slug}` },
    robots: { index: c.status === "evidence-ready", follow: true },
    openGraph: {
      title: c.title,
      description: c.notes[0],
      url: `/compare/${c.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.notes[0]
    }
  };
}

const codingMatch = /cursor|copilot|claude-code|cody|continue|windsurf|aider|codestral|qwen|codex|cline|openhands|gemini|gpt|llama|deepseek|swe-agent/i;

function isCodingEntity(entity: { slug: string; name: string; categories: string[] }) {
  return (
    codingMatch.test(entity.slug) ||
    codingMatch.test(entity.name) ||
    entity.categories.some((c) => /coding|developer|code/i.test(c))
  );
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const c = findComparison(slug);
  if (!c) notFound();
  const a = getPublicEntity(c.a.type, c.a.slug);
  const b = getPublicEntity(c.b.type, c.b.slug);
  const url = `${SITE.url}/compare/${c.slug}`;
  const inCodingCluster = a && b && (isCodingEntity(a) || isCodingEntity(b));

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/compare">Compare</Link> / {c.title}
      </div>
      <JsonLd
        data={{
          "@type": "WebPage",
          name: c.title,
          url,
          description: c.notes[0],
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE.url}/compare` },
              { "@type": "ListItem", position: 3, name: c.title, item: url }
            ]
          },
          ...(a && b
            ? {
                mentions: [
                  { "@type": "SoftwareApplication", name: a.name, url: a.sourceUrl },
                  { "@type": "SoftwareApplication", name: b.name, url: b.sourceUrl }
                ]
              }
            : {})
        }}
      />
      <p className="eyebrow">Comparison status</p>
      <h1 style={{ fontSize: "48px" }}>{c.title}</h1>
      <StatusBadge state={c.status} />
      {c.status !== "evidence-ready" ? (
        <p className="warning">
          This legacy URL is preserved, but its old score/benchmark content
          was rejected during the clean merge. It remains noindex until a
          reproducible comparison evidence set exists.
        </p>
      ) : null}
      <div className="prose">
        <h2>Evidence coverage</h2>
        <ul>
          {c.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        {a && b ? (
          <p>
            Verified entity identities:{" "}
            <Link href={`/${a.type}s/${a.slug}`}>{a.name}</Link> and{" "}
            <Link href={`/${b.type}s/${b.slug}`}>{b.name}</Link>.
          </p>
        ) : null}
        <h2>Editorial rule</h2>
        <p>
          Facts require field-level evidence. Editorial fit can be discussed,
          but it may not be presented as an external benchmark or universal
          winner.
        </p>
        {inCodingCluster ? (
          <>
            <h2>Coding cluster context</h2>
            <p>
              This comparison sits inside the coding-agent topic cluster.
              Browse from the same evidence-first pillars that frame the two
              entities:
            </p>
            <ul>
              <li>
                <Link href="/best-ai-agents/coding">Best AI coding agents</Link>{" "}
                — the coding authority pillar.
              </li>
              <li>
                <Link href="/coding-agents">Coding agents by deployment</Link>{" "}
                — IDE / CLI / open-source / local / self-hosted sub-clusters.
              </li>
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
