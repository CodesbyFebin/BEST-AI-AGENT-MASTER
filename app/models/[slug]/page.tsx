import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StatusBadge } from "@/components/StatusBadge";
import { getEntity, getEvidence, entities, legacyModelSources } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...entities.filter((e) => e.type === "model").map((e) => ({ slug: e.slug })),
    ...legacyModelSources.map((e) => ({ slug: e.slug }))
  ];
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity("model", slug);
  const legacy = legacyModelSources.find((item) => item.slug === slug);
  if (!entity && !legacy) return { title: "Not found", robots: { index: false, follow: true } };
  const name = entity?.name ?? legacy!.name;
  const summary = entity?.summary ?? legacy!.summary;
  return {
    title: `${name} — evidence & sources`,
    description: summary,
    alternates: { canonical: `/models/${slug}` },
    robots: { index: Boolean(entity?.verification === "verified"), follow: true }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const entity = getEntity("model", slug);
  const legacy = legacyModelSources.find((item) => item.slug === slug);

  if (!entity) {
    if (!legacy) return notFound();
    return <div className="shell detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/models">Models</Link> / {legacy.name}</div>
      <JsonLd data={{ "@type": "WebPage", name: legacy.name, url: `${SITE.url}/models/${legacy.slug}`, about: { "@type": "Thing", name: legacy.name } }} />
      <section className="detailHero">
        <p className="eyebrow">Model · imported, unverified</p><h1>{legacy.name}</h1><p className="lead">{legacy.summary}</p>
        <div className="tagRow"><StatusBadge state="unknown" />{legacy.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <p><a className="button" href={legacy.sourceUrl}>First-party source ↗</a></p>
      </section>
      <p className="warning">This entry is imported for catalog coverage and is noindex until hashed primary evidence passes the publication gate. Pricing, scoring and benchmark claims are intentionally omitted.</p>
    </div>;
  }

  const receipts = getEvidence(entity.id);
  const facts = Object.entries(entity.facts ?? {});
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/models">Models</Link> / {entity.name}</div>
    <JsonLd data={{ "@type":"WebPage", name:entity.name, url:`${SITE.url}/models/${entity.slug}`, description:entity.summary, about:{ "@type":"Thing", name:entity.name } }} />
    <section className="detailHero"><p className="eyebrow">Models · {entity.verification}</p><h1>{entity.name}</h1><p className="lead">{entity.summary}</p><div className="tagRow"><StatusBadge state={entity.verification}/>{entity.categories.map((tag)=><span className="tag" key={tag}>{tag}</span>)}</div><p><a className="button" href={entity.sourceUrl} rel="noopener noreferrer">Primary source ↗</a></p></section>
    {facts.length > 0 && <table className="facts"><tbody>{facts.map(([key,value])=><tr key={key}><th>{key}</th><td>{Array.isArray(value) ? value.join(", ") : String(value)}</td></tr>)}</tbody></table>}
    <section className="evidence"><h2>Evidence receipts</h2>{receipts.length ? receipts.map((r)=><div key={r.id}><p><strong>{r.field}</strong> · {r.status} · {r.publisher}</p><p className="muted">Retrieved {r.retrievedAt}</p><code>{r.contentHash}</code><p><a href={r.sourceUrl}>Open evidence source ↗</a></p></div>) : <p className="warning">Identity is source-linked, but no hashed evidence receipt has been published yet. Detail fields remain unknown.</p>}</section>
    <section className="prose"><h2>What this page does not claim</h2><p>No universal score, paid ranking, unsupported compliance badge, synthetic benchmark winner or guessed pricing is attached to this entity. Source-reported benchmark claims, where later displayed, must be labeled as publisher-reported.</p></section>
  </div>;
}
