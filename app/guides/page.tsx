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
      <p className="lead">Reference guides on agent architecture, workflows, memory, and orchestration. These are reachable by direct link but stay noindex for now — see <Link href="/trust/editorial-methodology">editorial methodology</Link>.</p>
    </section>
    <div className="prose">
      <p>A <strong>pillar</strong> guide covers a broad topic end to end (what an AI agent is, at the level a newcomer needs). A <strong>cluster</strong> guide goes deep on one sub-topic the pillar references (agentic workflows, tool calling, multi-agent orchestration) and links back to the pillar for context.</p>
    </div>
    <section className="prose">
      <h2>How to work through the AI agent curriculum</h2>
      <p>Begin with definitions and a single task before studying multi-agent coordination. The useful progression is agent fundamentals, tool calling, state and memory, orchestration, then testing and operational security. A framework does not remove the need for application-level authorization. Evaluate each example in a disposable environment and record exactly which commands, provider versions and data sources were used.</p>
      <h2>From tutorial to production system</h2>
      <p>For each workflow, identify input trust boundaries, tool permissions, human approval points and expected artifacts. Add test cases for unavailable providers, invalid tool arguments, prompt injection and retries. Compare measured results against a manual baseline. The status of an editorial guide does not itself establish that an example has passed production qualification. Review <Link href="/tutorials">practical tutorials</Link>, <Link href="/mcp">MCP architecture</Link>, and <Link href="/trust">trust methodology</Link>.</p>
      <h2>Editorial publication status</h2>
      <p>The guide hub and unapproved clusters deliberately remain excluded from search indexing. Substantive additions should be source checked and pass the publication gate before that policy changes. Long-form content alone does not qualify a page for indexing.</p>
    </section>
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
