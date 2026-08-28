import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trustPages } from "@/lib/trust";
import { ContentBlocks } from "@/components/ContentBlocks";

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
    alternates: { canonical: `/trust/${slug}` }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const page = trustPages[slug];
  if (!page) return notFound();
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/trust">Trust</Link> / {page.title}</div>
    <section className="detailHero">
      <p className="eyebrow">Trust &amp; methodology</p>
      <h1>{page.title}</h1>
      <p className="lead">{page.description}</p>
    </section>
    <ContentBlocks blocks={page.blocks} />
  </div>;
}
