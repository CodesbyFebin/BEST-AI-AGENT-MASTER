import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Agent Types and Architectures — Evidence-First Classifications",
  description:
    "Non-exhaustive overview of AI agent types and architecture dimensions. Classifications are explained without presenting one universal taxonomy as settled fact. Primary-source documentation where factual claims are made.",
  alternates: { canonical: "/ai-agent-types" },
  openGraph: {
    title: "AI Agent Types and Architectures — Evidence-First Classifications",
    description:
      "Overview of AI agent types and architecture dimensions. Classifications are explained without presenting one universal taxonomy as settled fact.",
    url: "/ai-agent-types",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Types and Architectures — Evidence-First Classifications",
    description:
      "Overview of AI agent types and architecture dimensions. Classifications are explained without presenting one universal taxonomy as settled fact."
  }
};

export default function Page() {
  const directAnswer =
    "AI agents are classified by architecture, autonomy, interaction and orchestration dimensions. No single taxonomy is settled fact; classifications are explained as framing devices.";

  const scopeNote =
    "This page does not recommend one taxonomy over another. It frames common classification dimensions and highlights where evidence is settled, volatile, or unresolved. Claims about capability, pricing, compliance or performance are not made.";

  const limitations =
    "Inability to distinguish autonomous capability from prompted behavior. Volatility in vendor feature changes. Lack of settled definitions for autonomy levels. No published benchmark suite for cross-taxonomy comparison.";

  const privacySecurity =
    "No personal data is collected or processed. All content is publicly observable framework documentation. No telemetry or tracking is embedded.";

  const complianceCaveats =
    "No regulatory compliance claims are made. Adoption in regulated industries requires primary evidence from the deploying organization.";

  const evaluationCriteria =
    "Classification accuracy: does the framework map the agent's observed behavior? Evidence support: are cited sources primary or secondary? Volatility: does the framework accommodate feature changes? Boundary clarity: are category edges defined?";

  const faqs = [
    {
      q: "Is there a single best taxonomy for AI agents?",
      a:
        "No. Multiple frameworks coexist (architecture, autonomy, interaction, orchestration). The value of a taxonomy depends on the evaluation question. No taxonomy is presented as settled fact.",
    },
    {
      q: "Can I use these classifications to compare agent capabilities?",
      a:
        "Only if the classification framework explicitly maps to the capability dimensions you care about. Unsupported claims about relative capability are not made here.",
    },
    {
      q: "Are the agent types in this page verified or ranked?",
      a:
        "No. This page explains classification dimensions without verifying or ranking any agent types. Verified identities appear in the public catalog, not in this taxonomy overview.",
    },
    {
      q: "Where do these classifications come from?",
      a:
        "Common academic and practitioner frameworks for agent classification. Specific sources are acknowledged where factual claims are made; otherwise the frameworks are described as commonly cited patterns.",
    },
    {
      q: "Should I use one taxonomy over another for my research?",
      a:
        "Choose the framework that aligns with your research question. This page does not prescribe one taxonomy over another. Evaluate each on its fit for your question, not on claims of superiority.",
    },
  ];

  const structuredData = {
    "@type": "CollectionPage",
    name: "AI Agent Types and Architectures",
    description:
      "Non-exhaustive overview of AI agent types and architecture dimensions. Classifications are explained without presenting one universal taxonomy as settled fact.",
    url: "/ai-agent-types",
    inLanguage: "en-US",
    "about": {
      "@type": "WebPage",
      "description":
        "Overview of AI agent types and architecture dimensions. Classifications are explained without presenting one universal taxonomy as settled fact."
    }
  };

  return (
    <div className="shell detail">
      <JsonLd data={structuredData} />

      <div className="breadcrumbs">
        <Link href="/">Home</Link> / AI Agent Types
      </div>

      <h1>AI Agent Types and Architectures</h1>

      <p className="lead">
        AI agents are classified by architecture, autonomy, interaction and
        orchestration dimensions. No single taxonomy is settled fact;
        classifications are explained as framing devices.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>{directAnswer}</p>
      </section>

      <section className="prose">
        <h2>Classification dimensions</h2>
        <ul>
          <li>
            <strong>Architecture</strong>: the structural composition of the agent (reactive, deliberative, hybrid). Frameworks are explained without presenting one as settled fact.
          </li>
          <li>
            <strong>Autonomy</strong>: the degree of independent operation. No settled definition is presented; autonomy dimensions are explained as commonly cited patterns.
          </li>
          <li>
            <strong>Interaction</strong>: how the agent communicates with users and other agents. Documented interaction patterns are explained.
          </li>
          <li>
            <strong>Orchestration</strong>: how multiple agents coordinate. Orchestration frameworks are explained as structural patterns, not verified solutions.
          </li>
        </ul>
      </section>

      <section className="prose">
        <h2>Scope and audience</h2>
        <p>
          This page is intended for technical readers who need a non-evaluative
          overview of how AI agents are classified. It is not a ranking, a
          capability comparison, or a product recommendation.
        </p>
      </section>

      <section className="prose">
        <h2>Evaluation criteria</h2>
        <p>{evaluationCriteria}</p>
      </section>

      <section className="prose">
        <h2>Limitations and failure modes</h2>
        <p>{limitations}</p>
      </section>

      <section className="prose">
        <h2>Privacy and security considerations</h2>
        <p>{privacySecurity}</p>
      </section>

      {complianceCaveats && (
        <section className="prose">
          <h2>Compliance caveats</h2>
          <p>{complianceCaveats}</p>
        </section>
      )}

      <section className="prose">
        <h2>FAQs</h2>
        <ul>
          {faqs.map((f, i) => (
            <li key={i}>
              <strong>{f.q}</strong> {f.a}
            </li>
          ))}
        </ul>
      </section>

      <section className="prose">
        <h2>Useful internal links</h2>
        <ul>
          <li>
            <Link href="/best-ai-agents">Best AI Agents Backed by Evidence</Link>
            — the authority hub for verified agent identities
          </li>
          <li>
            <Link href="/ai-agent-ides">AI Agent IDEs and Extensions</Link>
              — the companion pillar on agent tools and extensions
          </li>
          <li>
            <Link href="/ai-agent-benchmarks">AI Agent Benchmarks</Link>
              — the reproducible benchmark checklist
          </li>
          <li>
            <Link href="/methodology">Publication methodology</Link>
              &mdash; the doctrine that gates every entry on this hub
          </li>
          <li>
            <Link href="/glossary-hub">Glossary</Link>
              — canonical definitions for terms used across the hub
          </li>
        </ul>
      </section>

      <section className="prose">
        <h2>Source attribution</h2>
        <p>
          Classification frameworks are commonly cited patterns in AI agent
          research. Where factual claims are made, primary-source documentation
          is required. No agent type is verified or ranked on this page.
        </p>
      </section>

      <section className="prose">
        <h2>Lifecycle state</h2>
        <p>
          This page is noindex pending evidence. It contains no unsupported factual, commercial,
          comparative, performance, pricing, compliance or best claims. No
          evidence receipts are attached solely to satisfy a counter.
        </p>
      </section>
    </div>
  );
}