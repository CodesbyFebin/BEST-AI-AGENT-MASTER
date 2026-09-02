import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { tools } from "@/lib/tools";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(tools).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools[slug];
  if (!tool) return { title: "Not found", robots: { index: false, follow: true } };
  return {
    title: `${tool.name} — tool profile`,
    description: tool.summary,
    alternates: { canonical: `/tools/${slug}` },
    robots: { index: tool.index, follow: true },
    openGraph: { title: tool.name, description: tool.summary, url: `/tools/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: tool.name, description: tool.summary }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const tool = tools[slug];
  if (!tool) notFound();

  return (
    <div className="shell detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / {tool.name}</div>
      <JsonLd data={{
        "@type": "WebPage",
        name: tool.name,
        url: `${SITE.url}/tools/${slug}`,
        description: tool.summary,
        about: { "@type": "SoftwareApplication", name: tool.name, url: tool.sourceUrl },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE.url}/tools` },
            { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE.url}/tools/${slug}` }
          ]
        }
      }} />
      <section className="detailHero">
        <p className="eyebrow">Tool profile · {tool.developer}</p>
        <h1>{tool.name}</h1>
        <p className="lead">{tool.summary}</p>
        <div className="tagRow">{tool.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <p><a className="button" href={tool.sourceUrl}>{tool.sourceLabel} ↗</a></p>
      </section>
      <p className="muted">Last reviewed {tool.lastReviewed}. Positioning and capability can change between releases — check the source repository directly before making a decision based on this summary.</p>
    </div>
  );
}
