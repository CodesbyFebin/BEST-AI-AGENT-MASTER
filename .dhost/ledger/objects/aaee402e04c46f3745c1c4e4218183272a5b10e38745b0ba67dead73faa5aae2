import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms, glossaryCategories } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "AI & ML Glossary — Evidence-Backed Definitions for AI Agents, MCP, DPDP & India AI",
  description: "AI and ML glossary covering AI agents, Model Context Protocol (MCP), DPDP compliance, Indic language models, and India-specific AI terminology.",
  alternates: { canonical: "/glossary" }
};

export default function GlossaryPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Glossary</div>
    <section className="detailHero">
      <p className="eyebrow">Glossary</p>
      <h1>AI &amp; ML glossary</h1>
      <p className="lead">{glossaryTerms.length} definitions for AI agent, MCP, DPDP compliance, and India AI terminology used across BestAIAgent.in. Each term has its own page with a fuller explanation and related links.</p>
    </section>
    {glossaryCategories.map((category) => (
      <section key={category} style={{ marginBottom: 28 }}>
        <h2>{category}</h2>
        <div className="grid">
          {glossaryTerms.filter((t) => t.category === category).map((t) => (
            <Link href={`/glossary/${t.slug}`} className="card" key={t.slug}>
              <h3>{t.term}</h3>
              <p>{t.definition.slice(0, 110)}…</p>
            </Link>
          ))}
        </div>
      </section>
    ))}
  </div>;
}
