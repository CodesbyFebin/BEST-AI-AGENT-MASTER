import type { Metadata } from "next";
import Link from "next/link";
import { trustPages } from "@/lib/trust";

export const metadata: Metadata = {
  title: "Trust & Methodology",
  description: "How BestAIAgent.in classifies evidence, rates entities, corrects errors, and discloses affiliate relationships.",
  alternates: { canonical: "/trust" }
};

export default function TrustIndexPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Trust</div>
    <section className="detailHero">
      <p className="eyebrow">Trust &amp; methodology</p>
      <h1>Trust &amp; methodology</h1>
      <p className="lead">The policies and processes behind every claim on BestAIAgent.in — evidence classification, ratings, corrections, and disclosure.</p>
    </section>
    <div className="grid">
      {Object.entries(trustPages).map(([slug, page]) => (
        <Link href={`/trust/${slug}`} className="card" key={slug}>
          <h3>{page.title}</h3>
          <p>{page.description}</p>
        </Link>
      ))}
    </div>
  </div>;
}
