import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/lib/legacy";
import { publicEntities } from "@/lib/catalog";
import { categoryContent } from "@/lib/category-content";
import { EntityCard } from "@/components/EntityCard";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find(([s]) => s === slug);
  if (!c) return { title: "Not found", robots: { index: false, follow: true } };
  return {
    title: c[1],
    description: c[2],
    alternates: { canonical: `/categories/${slug}` },
    openGraph: { title: c[1], description: c[2], url: `/categories/${slug}`, type: "website" },
    twitter: { card: "summary_large_image", title: c[1], description: c[2] }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const c = categories.find(([s]) => s === slug);
  if (!c) notFound();
  const items = publicEntities.filter(
    (e) => e.categories.some((tag) => tag.includes(slug.replace("-agents", "")) || slug.includes(tag))
  );
  const content = categoryContent[slug];
  const url = `${SITE.url}/categories/${slug}`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / {c[1]}
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: c[1],
          description: c[2],
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE.url}/categories` },
              { "@type": "ListItem", position: 3, name: c[1], item: url }
            ]
          }
        }}
      />
      <h1 style={{ fontSize: "48px" }}>{c[1]}</h1>
      <p className="lead">{c[2]}</p>

      {items.length ? (
        <div className="grid">
          {items.map((e) => (
            <EntityCard key={e.id} entity={e} />
          ))}
        </div>
      ) : (
        <div className="empty">
          No entity currently passes both this category match and the public evidence gate. The route is retained
          for taxonomy continuity, not filled with synthetic records.
        </div>
      )}

      {content && (
        <>
          <section className="section">
            <h2>What belongs in this category</h2>
            <p>{content.scope}</p>
          </section>
          <section className="section">
            <h2>What to evaluate</h2>
            <ul>
              {content.evaluate.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
          <section className="section">
            <h2>Related coverage on this site</h2>
            <ul>
              {content.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
