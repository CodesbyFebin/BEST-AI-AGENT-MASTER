import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StatusBadge } from "@/components/StatusBadge";
import { EntityLogo } from "@/components/EntityLogo";
import { entities, getEntity, getEvidence } from "@/lib/catalog";
import { mcpServers } from "@/lib/mcp";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...entities.filter((e) => e.type === "mcp-server").map((e) => ({ slug: e.slug })),
    ...mcpServers.map((s) => ({ slug: s.slug }))
  ];
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity("mcp-server", slug);
  const legacy = mcpServers.find((s) => s.slug === slug);
  if (!entity && !legacy) return { title: "Not found", robots: { index: false, follow: true } };
  const name = entity?.name ?? legacy!.name;
  const description = entity?.summary ?? legacy!.note;
  return {
    title: `${name} — MCP server evidence`,
    description,
    alternates: { canonical: `/mcp/servers/${slug}` },
    robots: { index: Boolean(entity?.verification === "verified"), follow: true },
    openGraph: { title: name, description, url: `/mcp/servers/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: name, description }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const entity = getEntity("mcp-server", slug);

  if (!entity) {
    const legacy = mcpServers.find((s) => s.slug === slug);
    if (!legacy) return notFound();
    return (
      <div className="shell detail">
        <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/mcp">MCP</Link> / {legacy.name}</div>
        <p className="eyebrow">{legacy.status}</p>
        <h1 style={{ fontSize: "48px" }}>{legacy.name}</h1>
        <p className="lead">{legacy.note}</p>
        <p><a className="button" href={legacy.sourceUrl}>Candidate upstream ↗</a></p>
        <div className="warning">This detail URL remains noindex until a canonical upstream and hashed primary evidence pass the publication gate. Capabilities, ownership, maintenance status and security posture are not inferred from a source link.</div>
      </div>
    );
  }

  const receipts = getEvidence(entity.id);
  return (
    <div className="shell detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/mcp">MCP</Link> / {entity.name}</div>
      <JsonLd data={{ "@type": "WebPage", name: entity.name, url: `${SITE.url}/mcp/servers/${entity.slug}`, description: entity.summary, about: { "@type": "SoftwareApplication", name: entity.name, url: entity.sourceUrl }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "MCP", item: `${SITE.url}/mcp` }, { "@type": "ListItem", position: 3, name: entity.name, item: `${SITE.url}/mcp/servers/${entity.slug}` }] } }} />
      <section className="detailHero">
        <EntityLogo name={entity.name} sourceUrl={entity.sourceUrl} developer={entity.developer} size={56} />
        <p className="eyebrow">MCP server · verified identity</p>
        <h1>{entity.name}</h1>
        <p className="lead">{entity.summary}</p>
        <div className="tagRow"><StatusBadge state={entity.verification} />{entity.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <p><a className="button" href={entity.sourceUrl}>Official upstream ↗</a></p>
      </section>
      <section className="evidence">
        <h2>Evidence receipts</h2>
        {receipts.map((receipt) => (
          <div key={receipt.id}>
            <p><strong>{receipt.field}</strong> · {receipt.status}</p>
            <p className="muted">Retrieved {receipt.retrievedAt}</p>
            <code>{receipt.contentHash}</code>
          </div>
        ))}
      </section>
      <div className="prose">
        <h2>Interpretation</h2>
        <p>The repository identity is verified. Tool coverage, transport support, authentication model, maintenance status and security posture are not automatically inherited from that identity and remain unknown unless separately evidenced. Consult the upstream repository directly before deploying this server against production systems.</p>
      </div>
    </div>
  );
}
