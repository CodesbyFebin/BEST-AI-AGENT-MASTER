import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog — Updates to BestAIAgent.in Directory & Methodology",
  description: "Track updates to the BestAIAgent.in AI agent directory — new listings, score changes, methodology updates, and platform improvements.",
  alternates: { canonical: "/changelog" }
};

const entries = [
  {
    date: "August 2026", version: "3.1", changes: [
      "Directory coverage expanded across agents, models and frameworks. New entries are added to the catalog as imported/unverified and are excluded from public JSON, XML sitemaps and search until they pass field-level evidence verification.",
      "Added API and data-export documentation, a self-verification guide, and an expanded AI/ML glossary covering general industry terminology.",
    ]
  },
  {
    date: "August 2026", version: "3.0", changes: [
      "Added comprehensive India Fit scoring with sub-dimensions: INR pricing, Indic language support, deployment options, and DPDP compliance.",
      "Expanded agent profiles with scoring rationale, India Fit breakdown, and deployment guidance sections.",
      "Added MCP integration guides and troubleshooting documentation.",
      "Launched glossary with 30+ AI/ML terminology definitions.",
      "Added tools directory with curated AI tools organized by category.",
      "Added integration guides for popular development tools and services.",
      "Improved evidence verification with SHA-256 source hashes.",
      "Added confidence scoring (high/medium/low) to all agent profiles.",
    ]
  },
  {
    date: "July 2026", version: "2.5", changes: [
      "Added 15 new agent profiles across coding, voice, and automation categories.",
      "Expanded MCP directory to 50 topic clusters with 500 keywords.",
      "Added comparison pages for popular agent pairs.",
      "Improved search and filtering across all directory pages.",
      "Added research reports section with India AI landscape analysis.",
      "Enhanced DPDP compliance documentation for voice AI deployments.",
    ]
  },
  {
    date: "June 2026", version: "2.0", changes: [
      "Launched evidence-backed scoring methodology with five weighted dimensions.",
      "Added India-specific content hub with DPDP Act compliance guides.",
      "Expanded model directory to 30 foundational language models.",
      "Added framework directory with 32 agent builder platforms.",
      "Implemented static site generation for improved performance.",
      "Added FAQ schema markup for rich search results.",
    ]
  },
  {
    date: "May 2026", version: "1.5", changes: [
      "Added 20 new agent profiles with evidence verification.",
      "Launched MCP infrastructure directory.",
      "Added pricing transparency evaluation for INR billing and UPI support.",
      "Improved mobile responsiveness across all pages.",
      "Added robots.txt and XML sitemap for search engine optimization.",
    ]
  },
  {
    date: "April 2026", version: "1.0", changes: [
      "Initial launch of BestAIAgent.in.",
      "Launched with 10 agent profiles and evidence-backed scoring.",
      "Implemented zero-data architecture for privacy-first operation.",
      "Added about, contact, privacy, and terms pages.",
      "Established no pay-to-rank policy.",
    ]
  },
];

export default function ChangelogPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Changelog</div>
    <section className="detailHero">
      <p className="eyebrow">Updates</p>
      <h1>Changelog</h1>
      <p className="lead">Notable changes to the BestAIAgent.in directory, evidence graph, and public API. Per-entity fact updates are timestamped on each entity&apos;s own evidence receipts, not tracked here.</p>
    </section>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {entries.map((entry) => (
        <section className="card" key={entry.version}>
          <div className="cardTop">
            <span className="tag">v{entry.version}</span>
            <span className="muted">{entry.date}</span>
          </div>
          <ul>
            {entry.changes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
      ))}
    </div>
  </div>;
}
