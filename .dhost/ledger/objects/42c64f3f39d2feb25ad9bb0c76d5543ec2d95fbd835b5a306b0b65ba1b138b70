import type { Metadata } from "next";
import Link from "next/link";
import { allComparisons, publicIndexableComparisons } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Compare AI Agents & Frameworks",
  description: "Evidence-aware comparisons with legacy routes preserved and unsupported winner claims removed.",
  alternates: { canonical: "/compare" }
};

export default function Page() {
  const researchCount = allComparisons.filter((item) => item.status !== "evidence-ready").length;
  return <div className="shell detail">
    <section className="directoryHero">
      <p className="eyebrow">Comparison graph</p>
      <h1>Compare AI Agents & Frameworks</h1>
      <p className="lead">
        Comparisons are published only when both entities and the compared fields
        have adequate evidence. No universal winner is inferred from
        incompatible vendor claims.
      </p>
      <div className="directoryMeta">
        <span>{publicIndexableComparisons.length} evidence-ready</span>
        <span>Primary-source publication gate</span>
        <span>Canonical URLs only</span>
      </div>
    </section>
    <div className="prose">
      <p>
        <strong>Evidence-ready</strong> means every compared field has a
        verified source for both entities. Comparisons that aren&apos;t yet
        evidence-ready live in{" "}
        <Link href="/compare/research">active research</Link> — those pages are
        noindex and excluded from the sitemap until they clear the same
        publication gate as any other page on this site.
      </p>
    </div>
    <div className="grid">
      {publicIndexableComparisons.map((item) => (
        <article className="card" key={item.slug}>
          <div className="authorityType"><span>evidence-ready</span><b>⇄</b></div>
          <h2 style={{ fontSize: "21px" }}><Link href={`/compare/${item.slug}`}>{item.title}</Link></h2>
          <p>{item.notes[0]}</p>
          <p><Link href={`/compare/${item.slug}`}>Open comparison →</Link></p>
        </article>
      ))}
    </div>
    <section className="section">
      <div className="discoveryBand">
        <div className="discoveryBandGrid">
          <div>
            <p className="eyebrow">Comparison policy</p>
            <h2>No synthetic winner table.</h2>
            <p>
              Every factual row needs evidence on both sides. Missing facts
              remain unknown, and reverse-order duplicate URLs are redirected to
              one canonical comparison.
            </p>
          </div>
          <div className="ctaRow">
            <Link className="button" href="/compare/research">Active research ({researchCount})</Link>
            <Link className="button buttonPrimary" href="/methodology">Read methodology</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="prose">
      <h2>Compare by cluster</h2>
      <p>
        Coding comparisons cluster into a single thematic pillar; browse
        from the pillar instead of the flat list when you want a
        deployment-surface view first.
      </p>
      <ul>
        <li>
          <Link href="/best-ai-agents/coding">Best AI coding agents</Link>{" "}
          — coding authority pillar.
        </li>
        <li>
          <Link href="/coding-agents">Coding agents by deployment</Link>{" "}
          — IDE / CLI / open-source / local / self-hosted sub-clusters.
        </li>
        <li>
          <Link href="/best-ai-agents">Best AI agents</Link>{" "}
          — cross-surface authority hub.
        </li>
      </ul>
    </section>
  </div>;
}
