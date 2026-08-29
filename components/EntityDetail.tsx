import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { StatusBadge } from "@/components/StatusBadge";
import { EntityLogo } from "@/components/EntityLogo";
import { getEvidence, type Entity } from "@/lib/catalog";
import { SITE } from "@/lib/site";

// Schema.org has no dedicated "AI model" or "AI framework" type; SoftwareApplication
// is the closest accurate fit search engines actually parse for rich results.
// Product is deliberately avoided — these aren't offers/listings with a price.
const schemaTypeForEntity: Record<Entity["type"], string> = {
  agent: "SoftwareApplication",
  model: "SoftwareApplication",
  framework: "SoftwareApplication",
  provider: "Organization",
};

export function EntityDetail({ entity, label, parentHref, parentLabel }: { entity: Entity; label: string; parentHref: string; parentLabel: string }) {
  const receipts = getEvidence(entity.id);
  const facts = Object.entries(entity.facts ?? {});
  const url = `${SITE.url}/${entity.type}s/${entity.slug}`;
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href={parentHref}>{parentLabel}</Link> / {entity.name}</div>
    <JsonLd data={{
      "@type": "WebPage",
      name: entity.name,
      url,
      description: entity.summary,
      about: { "@type": schemaTypeForEntity[entity.type], name: entity.name, ...(entity.sourceUrl ? { url: entity.sourceUrl } : {}) },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: parentLabel, item: `${SITE.url}${parentHref}` },
          { "@type": "ListItem", position: 3, name: entity.name, item: url }
        ]
      }
    }} />
    <section className="detailHero"><EntityLogo name={entity.name} sourceUrl={entity.sourceUrl} developer={entity.developer} size={56} /><p className="eyebrow">{label} · {entity.verification}</p><h1>{entity.name}</h1><p className="lead">{entity.summary}</p><div className="tagRow"><StatusBadge state={entity.verification} />{entity.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><p><a className="button" href={entity.sourceUrl}>Primary source ↗</a></p></section>
    {facts.length > 0 && <table className="facts"><tbody>{facts.map(([key, value]) => <tr key={key}><th>{key}</th><td>{Array.isArray(value) ? value.join(", ") : String(value)}</td></tr>)}</tbody></table>}
    <section className="evidence"><h2>Evidence receipts</h2>{receipts.length ? receipts.map((receipt) => <div key={receipt.id}><p><strong>{receipt.field}</strong> · {receipt.status} · {receipt.publisher}</p><p className="muted">Retrieved {receipt.retrievedAt}</p><code>{receipt.contentHash}</code><p><a href={receipt.sourceUrl}>Open evidence source ↗</a></p></div>) : <p className="warning">No hashed primary evidence receipt has been published for this entity yet.</p>}</section>
  </div>;
}
