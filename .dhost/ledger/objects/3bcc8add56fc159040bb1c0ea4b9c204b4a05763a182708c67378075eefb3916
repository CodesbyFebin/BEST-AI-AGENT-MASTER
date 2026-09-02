import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StatusBadge } from "@/components/StatusBadge";
import { EntityLogo } from "@/components/EntityLogo";
import { entities, getEntity, getEvidence, legacyAgentSources } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...entities.filter((e) => e.type === "agent").map((e) => ({ slug: e.slug })),
    ...legacyAgentSources.map((e) => ({ slug: e.slug }))
  ];
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity("agent", slug);
  const legacy = legacyAgentSources.find((item) => item.slug === slug);
  if (!entity && !legacy) return { title: "Not found", robots: { index: false, follow: true } };
  const name = entity?.name ?? legacy!.name;
  const summary = entity?.summary ?? legacy!.summary;
  const title = `${name} — AI agent evidence`;
  return {
    title,
    description: summary,
    alternates: { canonical: `/agents/${slug}` },
    robots: { index: Boolean(entity?.verification === "verified"), follow: true },
    openGraph: { title, description: summary, url: `/agents/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: summary }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const entity = getEntity("agent", slug);
  const legacy = legacyAgentSources.find((item) => item.slug === slug);

  if (!entity) {
    if (!legacy) return notFound();
    return <div className="shell detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/agents">Agents</Link> / {legacy.name}</div>
      <JsonLd data={{ "@type": "WebPage", name: legacy.name, url: `${SITE.url}/agents/${legacy.slug}`, about: { "@type": "SoftwareApplication", name: legacy.name, url: legacy.sourceUrl }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Agents", item: `${SITE.url}/agents` }, { "@type": "ListItem", position: 3, name: legacy.name, item: `${SITE.url}/agents/${legacy.slug}` }] } }} />
      <section className="detailHero">
        <EntityLogo name={legacy.name} sourceUrl={legacy.sourceUrl} developer={legacy.developer} size={56} />
        <p className="eyebrow">Legacy canonical · source-linked</p><h1>{legacy.name}</h1><p className="lead">{legacy.summary}</p>
        <div className="tagRow"><StatusBadge state="source-linked" />{legacy.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <p><a className="button" href={legacy.sourceUrl}>First-party source ↗</a></p>
      </section>
      <p className="warning">This URL is preserved for continuity but is noindex until hashed primary evidence passes the publication gate. Old BestAI scores, INR pricing and benchmark winner claims were intentionally removed.</p>
    </div>;
  }

  const receipts = getEvidence(entity.id);
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/agents">Agents</Link> / {entity.name}</div>
    <JsonLd data={{ "@type": "WebPage", name: entity.name, url: `${SITE.url}/agents/${entity.slug}`, description: entity.summary, about: { "@type": "SoftwareApplication", name: entity.name, url: entity.sourceUrl }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Agents", item: `${SITE.url}/agents` }, { "@type": "ListItem", position: 3, name: entity.name, item: `${SITE.url}/agents/${entity.slug}` }] } }} />
    <section className="detailHero">
      <EntityLogo name={entity.name} sourceUrl={entity.sourceUrl} developer={entity.developer} size={56} />
      <p className="eyebrow">Agent · verified identity</p><h1>{entity.name}</h1><p className="lead">{entity.summary}</p>
      <div className="tagRow"><StatusBadge state={entity.verification} />{entity.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <p><a className="button" href={entity.sourceUrl}>Official upstream ↗</a></p>
    </section>
    <section className="evidence"><h2>Evidence receipts</h2>{receipts.map((receipt) => <div key={receipt.id}><p><strong>{receipt.field}</strong> · {receipt.status}</p><p className="muted">Retrieved {receipt.retrievedAt}</p><code>{receipt.contentHash}</code></div>)}</section>
    <div className="prose"><h2>Interpretation</h2><p>The repository identity is verified. Capability, pricing, compliance and benchmark fields are not automatically inherited from that identity and remain unknown unless separately evidenced.</p></div>
    {entity.categories.some((c) => /coding|developer|code/i.test(c)) ? (
      <div className="prose">
        <h2>Coding cluster context</h2>
        <p>
          This agent belongs to the coding-agent topic cluster. Browse it
          through the evidence-first pillars and deployment surfaces that
          apply to the same identity:
        </p>
        <ul>
          <li><Link href="/best-ai-agents/coding">Best AI coding agents</Link> — the coding authority pillar.</li>
          <li><Link href="/coding-agents">Coding agents by deployment</Link> — IDE / CLI / open-source / local / self-hosted sub-clusters.</li>
          {entity.categories.includes("cli") ? <li><Link href="/coding-agents/cli">CLI coding agents</Link> — terminal-first peers and evidence.</li> : null}
          {entity.categories.includes("ide") ? <li><Link href="/coding-agents/ide">IDE coding agents</Link> — editor-integrated peers and dated pricing guides.</li> : null}
          {entity.categories.includes("research") || entity.categories.includes("software-engineering") ? <li><Link href="/coding-agents/open-source">Open-source coding agents</Link> — repository-identity peers.</li> : null}
        </ul>
      </div>
    ) : null}
  </div>;
}
