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
    <div className="prose">
      <p>These pages exist because &quot;evidence-backed&quot; is a claim that needs its own evidence — a directory that says it verifies things without documenting how it verifies them is asking for trust it hasn&apos;t earned. Each page below covers one piece of that process: how a source counts as primary vs. secondary, what threshold a claim needs to clear before publication, how ratings are constructed, and what happens when something turns out to be wrong. Read them in whatever order matches your question, or start with evidence methodology if you&apos;re new here.</p>
    </div>
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
