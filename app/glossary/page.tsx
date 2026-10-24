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
    <section className="prose">
      <h2>How to use this glossary to evaluate AI systems</h2>
      <p>Terms such as agent, tool, model, retrieval, orchestration and MCP describe different layers of an AI application. A model produces predictions; an agent is an application workflow that may plan and call tools; a framework supplies development primitives; a protocol defines how systems communicate. Confusing these layers can make product comparisons misleading. Start from the specific term and follow its related technical guides.</p>
      <h2>Definitions, implementation and evidence</h2>
      <p>A concise definition explains what a term means, but a claim about a particular vendor needs separate proof. The presence of MCP support does not establish a product's security posture. A retrieval-augmented generation architecture does not ensure accurate answers, and a benchmark score is meaningful only alongside its dataset, version and evaluation method. Check the canonical source and recorded date for volatile assertions.</p>
      <h2>Suggested learning path</h2>
      <p>Read <Link href="/ai-agents">AI agents</Link> first, continue with <Link href="/agentic-workflows">agentic workflows</Link>, review <Link href="/ai-agent-tool-calling">tool calling</Link>, and then explore <Link href="/mcp">MCP</Link> and <Link href="/ai-agent-memory">memory</Link>. For selecting a tool or provider, consult <Link href="/compare">comparisons</Link> and <Link href="/methodology">methodology</Link>.</p>
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
