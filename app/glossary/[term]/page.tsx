import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { glossaryTerms, glossaryBySlug } from "@/lib/glossary";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ term: string }> };

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { term } = await params;
  const entry = glossaryBySlug.get(term);
  if (!entry) return { title: "Not found", robots: { index: false, follow: true } };
  const title = `${entry.term} — AI & MCP Glossary`;
  const description = entry.definition.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/glossary/${entry.slug}` },
    openGraph: { title, description, url: `/glossary/${entry.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default async function GlossaryTermPage({ params }: P) {
  const { term } = await params;
  const entry = glossaryBySlug.get(term);
  if (!entry) return notFound();
  const others = glossaryTerms.filter((t) => t.category === entry.category && t.slug !== entry.slug).slice(0, 5);
  const url = `${SITE.url}/glossary/${entry.slug}`;

  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/glossary">Glossary</Link> / {entry.term}</div>
    <JsonLd data={[
      {
        "@type": "DefinedTerm",
        name: entry.term,
        description: entry.definition,
        url,
        inDefinedTermSet: `${SITE.url}/glossary`
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE.url}/glossary` },
          { "@type": "ListItem", position: 3, name: entry.term, item: url }
        ]
      }
    ]} />
    <section className="detailHero">
      <p className="eyebrow">Glossary · {entry.category}</p>
      <h1>{entry.term}</h1>
      <p className="lead">{entry.definition}</p>
    </section>
    {entry.related && entry.related.length > 0 && <section className="prose">
      <h2>Related pages</h2>
      <ul>{entry.related.map((r) => <li key={r.href}><Link href={r.href}>{r.label}</Link></li>)}</ul>
    </section>}
    {others.length > 0 && <section>
      <h2>More {entry.category} terms</h2>
      <div className="grid">{others.map((t) => <Link href={`/glossary/${t.slug}`} className="card" key={t.slug}><h3>{t.term}</h3></Link>)}</div>
    </section>}
    <section className="prose">
      <p><Link href="/glossary">← Back to the full glossary</Link></p>
    </section>
  </div>;
}
