import type { Metadata } from "next";
import Link from "next/link";
import { clusterPages } from "@/lib/clusters";

export const metadata: Metadata = {
  title: "Guides — In Review",
  description: "Evidence-ready guides on AI agent architecture, workflows, and orchestration, pending editorial publication review.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/guides" }
};

export default function GuidesIndexPage() {
  const entries = Object.entries(clusterPages);
  const pillar = entries.filter(([, p]) => p.pageType === "pillar");
  const clusters = entries.filter(([, p]) => p.pageType !== "pillar");

  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Guides</div>
    <section className="detailHero">
      <p className="eyebrow">Guides · in review</p>
      <h1>AI agent guides</h1>
      <p className="lead">Evidence-ready reference guides on agent architecture, workflows, memory, and orchestration. These are reachable by direct link but stay noindex until they clear editorial publication review — see the <Link href="/trust/editorial-methodology">editorial methodology</Link>.</p>
    </section>
    <div className="prose">
      <p>A <strong>pillar</strong> guide covers a broad topic end to end (what an AI agent is, at the level a newcomer needs). A <strong>cluster</strong> guide goes deep on one sub-topic the pillar references (agentic workflows, tool calling, multi-agent orchestration) and links back to the pillar for context. Both carry the same content-quality bar as any other page — the only reason they&apos;re noindex here is that a named editor hasn&apos;t yet signed off on the current draft, not that the content itself is unreliable.</p>
    </div>
    {pillar.length > 0 && <section style={{ marginBottom: 28 }}>
      <h2>Pillar</h2>
      <div className="grid">
        {pillar.map(([slug, p]) => (
          <Link href={`/${slug}`} className="card" key={slug}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </Link>
        ))}
      </div>
    </section>}
    <section>
      <h2>Clusters</h2>
      <div className="grid">
        {clusters.map(([slug, p]) => (
          <Link href={`/${slug}`} className="card" key={slug}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  </div>;
}
