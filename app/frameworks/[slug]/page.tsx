import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StatusBadge } from "@/components/StatusBadge";
import { EntityDetail } from "@/components/EntityDetail";
import { entities, getEntity, legacyFrameworkSources } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...entities.filter((e) => e.type === "framework").map((e) => ({ slug: e.slug })),
    ...legacyFrameworkSources.map((e) => ({ slug: e.slug }))
  ];
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity("framework", slug);
  const legacy = legacyFrameworkSources.find((item) => item.slug === slug);
  if (!entity && !legacy) return { title: "Not found", robots: { index: false, follow: true } };
  const name = entity?.name ?? legacy!.name;
  const summary = entity?.summary ?? legacy!.summary;
  const title = `${name} — framework evidence`;
  return {
    title,
    description: summary,
    alternates: { canonical: `/frameworks/${slug}` },
    robots: { index: Boolean(entity?.verification === "verified"), follow: true },
    openGraph: { title, description: summary, url: `/frameworks/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: summary }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const entity = getEntity("framework", slug);
  const legacy = legacyFrameworkSources.find((item) => item.slug === slug);

  if (!entity) {
    if (!legacy) return notFound();
    return <div className="shell detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/frameworks">Frameworks</Link> / {legacy.name}</div>
      <JsonLd data={{ "@type": "WebPage", name: legacy.name, url: `${SITE.url}/frameworks/${legacy.slug}`, about: { "@type": "SoftwareApplication", name: legacy.name, url: legacy.sourceUrl }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Frameworks", item: `${SITE.url}/frameworks` }, { "@type": "ListItem", position: 3, name: legacy.name, item: `${SITE.url}/frameworks/${legacy.slug}` }] } }} />
      <section className="detailHero">
        <p className="eyebrow">Framework · imported, unverified</p><h1>{legacy.name}</h1><p className="lead">{legacy.summary}</p>
        <div className="tagRow"><StatusBadge state="unknown" />{legacy.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <p><a className="button" href={legacy.sourceUrl}>First-party source ↗</a></p>
      </section>
      <p className="warning">This entry is imported for catalog coverage and is noindex until hashed primary evidence passes the publication gate. Pricing, scoring and benchmark claims are intentionally omitted.</p>
    </div>;
  }

  return <EntityDetail entity={entity} label="Framework" parentHref="/frameworks" parentLabel="Frameworks" />;
}
