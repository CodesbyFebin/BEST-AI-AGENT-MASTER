import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trustPages } from "@/lib/trust";
import { ContentBlocks } from "@/components/ContentBlocks";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(trustPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const page = trustPages[slug];
  if (!page) return { title: "Not found", robots: { index: false, follow: true } };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/trust/${slug}` },
    openGraph: { title: page.title, description: page.description, url: `/trust/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const page = trustPages[slug];
  if (!page) return notFound();
  const url = `${SITE.url}/trust/${slug}`;
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/trust">Trust</Link> / {page.title}</div>
    <JsonLd data={{
      "@type": "WebPage",
      name: page.title,
      url,
      description: page.description,
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Trust", item: `${SITE.url}/trust` },
          { "@type": "ListItem", position: 3, name: page.title, item: url }
        ]
      }
    }} />
    <section className="detailHero">
      <p className="eyebrow">Trust &amp; methodology</p>
      <h1>{page.title}</h1>
      <p className="lead">{page.description}</p>
    </section>
    <ContentBlocks blocks={page.blocks} />
  </div>;
}
