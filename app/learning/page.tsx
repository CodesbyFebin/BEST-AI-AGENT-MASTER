import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Learning Resources — Tutorials, Courses & Guides for India",
  description: "Tutorials, courses, and guides for AI agent development, MCP, and India-specific AI deployment.",
  alternates: { canonical: "/learning" }
};

const paths = [
  { level: "Beginner", duration: "2-4 weeks", desc: "Foundational concepts and practical introductions for those with basic programming knowledge but no prior AI experience.", modules: [
    ["Introduction to AI Agents", "What AI agents are, how they differ from traditional software, and the key components: perception, reasoning, and action."],
    ["Your First AI Agent", "Build and deploy your first AI agent — development environment, LLM API connection, prompting, context management, basic error handling."],
    ["Understanding APIs and Tools", "How AI agents interact with external systems through APIs and tools — REST APIs, authentication, wrapping services as agent tools."],
  ]},
  { level: "Intermediate", duration: "4-6 weeks", desc: "Model Context Protocol and multi-agent orchestration patterns, assuming beginner-path completion or equivalent experience.", modules: [
    ["MCP Fundamentals", "MCP architecture, transport mechanisms (stdio and Streamable HTTP), and the security model."],
    ["Building MCP Servers", "Create custom MCP servers with the official SDK — tools, handlers, error handling, transport configuration."],
    ["Multi-Agent Orchestration", "Task decomposition, agent communication, and result aggregation using frameworks like CrewAI and LangGraph."],
  ]},
  { level: "Advanced", duration: "6-8 weeks", desc: "Production deployment, security, and compliance for enterprise AI agent systems.", modules: [
    ["Production Deployment", "Containerization, orchestration, CI/CD, high availability, load balancing, and disaster recovery for AI systems."],
    ["Security and Compliance", "DPDP Act requirements, data residency, consent management, audit logging, and security assessments."],
    ["Indic AI Development", "Indic language models, Hinglish code-switching, and India-specific regulatory compliance."],
  ]},
];

const external = [
  ["Official MCP Documentation", "The official Model Context Protocol documentation with API references and best practices for server development."],
  ["LangChain Documentation", "Guides for building AI agents with LangChain, including chains, agents, and memory management."],
  ["CrewAI Tutorials", "Tutorials for multi-agent orchestration using CrewAI, with role-based agent collaboration examples."],
  ["IndiaAI Resources", "Government of India AI resources including the IndiaAI Mission portal and BHASHINI documentation."],
];

const faqs = [
  ["How long does it take to learn AI agent development?", "With consistent effort, the basics take 2-4 weeks and proficiency 3-6 months. Prior programming experience accelerates this."],
  ["Do I need a machine learning background?", "No. Many AI agent tools abstract away ML complexity. Basic programming skills and API familiarity are sufficient."],
  ["What programming languages are used?", "Python and JavaScript/TypeScript are the most common languages for AI agent development."],
  ["Can I build AI agents for Indian languages?", "Yes — using Indic language models like Sarvam-30B or Krutrim-2, integrated with Bhashini for translation."],
];

export default function LearningPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Learning</div>
    <section className="detailHero">
      <p className="eyebrow">Learning</p>
      <h1>AI learning resources</h1>
      <p className="lead">Tutorials, guides, and courses for AI agent development, from foundational concepts to advanced deployment, with a focus on the Indian AI ecosystem.</p>
    </section>

    {paths.map((p) => (
      <section key={p.level} style={{ marginBottom: 28 }}>
        <h2>Learning path: {p.level} <span className="muted" style={{ fontSize: 13, fontWeight: 400 }}>· {p.duration}</span></h2>
        <p className="muted" style={{ marginBottom: 12 }}>{p.desc}</p>
        <div className="grid">
          {p.modules.map(([title, desc]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    ))}

    <div className="prose">
      <h2>External learning resources</h2>
    </div>
    <div className="clusterGrid" style={{ marginBottom: 28 }}>
      {external.map(([title, desc]) => (
        <div className="cluster" key={title}><h3>{title}</h3><p className="muted">{desc}</p></div>
      ))}
    </div>

    <div className="prose">
      <h2>Frequently asked questions</h2>
      {faqs.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
    </div>
  </div>;
}
