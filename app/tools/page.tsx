import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Tools Directory — Curated AI Tools for Developers, Business & India",
  description: "Curated AI tools for coding, automation, voice, and business, with India Fit scores and INR pricing context.",
  alternates: { canonical: "/tools" }
};

const toolCategories = [
  { name: "Coding & Development", description: "AI tools that assist with code generation, review, debugging, and repository management.", tools: [
    { name: "Claude Code", use: "Repository-scale coding with strong MCP integration", score: 9.2 },
    { name: "Cursor", use: "AI-first IDE with Streamable HTTP support", score: 9.0 },
    { name: "GitHub Copilot", use: "Code completion and chat within VS Code", score: 8.8 },
    { name: "Cline", use: "Open-source VS Code agent with MCP support", score: 8.5 },
    { name: "Aider", use: "Terminal-based AI pair programming", score: 8.3 },
  ]},
  { name: "Voice & Speech", description: "AI tools for transcription, synthesis, and voice agent development.", tools: [
    { name: "ElevenLabs", use: "High-quality voice synthesis with Indic language support", score: 9.1 },
    { name: "Deepgram", use: "Real-time transcription optimized for Indian accents", score: 8.7 },
    { name: "Vapi", use: "Voice agent platform for building conversational AI", score: 8.4 },
    { name: "Play.ht", use: "Text-to-speech with multilingual support", score: 8.2 },
    { name: "Murf AI", use: "AI voice generation for content creation", score: 8.0 },
  ]},
  { name: "Business Automation", description: "AI tools for workflow automation, customer support, and business process optimization.", tools: [
    { name: "n8n", use: "Open-source workflow automation with AI nodes", score: 8.9 },
    { name: "Zapier", use: "No-code automation connecting 6000+ apps", score: 8.6 },
    { name: "Make", use: "Visual automation platform with AI capabilities", score: 8.4 },
    { name: "Lindy", use: "AI agent for business workflow automation", score: 8.1 },
    { name: "Retell AI", use: "Voice AI platform for call center automation", score: 7.9 },
  ]},
  { name: "Infrastructure & Databases", description: "AI infrastructure tools including vector databases, MCP servers, and deployment platforms.", tools: [
    { name: "Pinecone", use: "Managed vector database for AI applications", score: 9.0 },
    { name: "Weaviate", use: "Open-source vector database with MCP support", score: 8.8 },
    { name: "Qdrant", use: "High-performance vector search engine", score: 8.6 },
    { name: "Supabase", use: "Open-source Firebase alternative with vector support", score: 8.5 },
    { name: "Chroma", use: "Lightweight embedding database for AI apps", score: 8.3 },
  ]},
];

export default function ToolsPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Tools</div>
    <section className="detailHero">
      <p className="eyebrow">Tools directory</p>
      <h1>AI tools directory</h1>
      <p className="lead">A curated collection of AI tools organized by category, evaluated with India Fit scoring and INR pricing transparency.</p>
    </section>

    <div className="prose">
      <h2>How we evaluate AI tools</h2>
      <p>Every tool is evaluated on capability (40%), ease of use (20%), pricing transparency (15%), India Fit (15%), and evidence quality (10%). Each dimension is scored independently on a 0-10 scale, then combined into a composite editorial score.</p>
      <p>India Fit verifies INR pricing availability, UPI payment support, Indic language capabilities, and DPDP Act compliance.</p>
      <h2>How to use this directory</h2>
      <p>Treat the category groupings as a starting shortlist, not a final decision. Tools in the same category often solve genuinely different problems at different scales — a terminal-based pair-programming tool and a repository-scale coding agent both sit under &quot;Coding &amp; Development&quot; but suit different workflows. Before adopting any tool listed here for a production use case, check its own pricing page directly (prices and free-tier limits change faster than any directory can track), confirm the specific capability you need is documented rather than inferred from the category description, and check the tool&apos;s entry in the frameworks, models, or agents directory on this site if it has one, since that page carries source-linked evidence rather than a category summary.</p>
      <h2>Coding tools vs. voice tools vs. automation tools</h2>
      <p>The four categories below aren&apos;t interchangeable layers of the same stack — they solve different problems and are frequently combined rather than chosen between. A typical production agent stack pulls from more than one category: a coding tool to build and maintain the agent&apos;s own codebase, an infrastructure tool (a vector database) to give it retrieval memory, and a business automation tool to trigger it from an external event. Voice tools are the odd one out — they matter specifically for agents with a spoken interface (call center automation, voice assistants) and are irrelevant to a purely text- or API-driven agent.</p>
    </div>

    {toolCategories.map((category) => (
      <section key={category.name} style={{ marginBottom: 32 }}>
        <h2>{category.name}</h2>
        <p className="muted" style={{ marginBottom: 12 }}>{category.description}</p>
        <div className="grid">
          {category.tools.map((tool) => (
            <div className="card" key={tool.name}>
              <div className="cardTop">
                <h3>{tool.name}</h3>
                <b style={{ color: "var(--green)" }}>{tool.score}/10</b>
              </div>
              <p>{tool.use}</p>
            </div>
          ))}
        </div>
      </section>
    ))}

    <div className="prose">
      <h2>Submitting a tool</h2>
      <p>If you have built an AI tool relevant to this directory, submit it through our <a href="https://github.com/CodesbyFebin/bestaiagent.in">GitHub repository</a> with the tool name, official website, category, and description. Please include supporting evidence — documentation, pricing, feature lists, and India-specific capabilities.</p>
    </div>
  </div>;
}
