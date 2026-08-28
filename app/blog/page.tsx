import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — AI Agent Insights, Analysis & Updates",
  description: "Insights, analysis, and updates on AI agents, MCP infrastructure, and India-first compliance.",
  alternates: { canonical: "/blog" }
};

const posts = [
  { slug: "august-2026-agent-roundup", title: "August 2026 AI Agent Roundup: What's New", date: "2026-08-20", excerpt: "This month brought major updates to Claude Code, Cursor introduced new model integrations, and open-weight models saw significant improvements. We analyze the implications for Indian developers and enterprises.", readTime: "8 min", category: "AI Agents" },
  { slug: "india-ai-agents-buyers-guide", title: "India AI Agents Buyer's Guide 2026", date: "2026-08-15", excerpt: "A comprehensive guide for Indian businesses evaluating AI agents, covering compliance, pricing, localization factors, and deployment options.", readTime: "12 min", category: "India Focus" },
  { slug: "open-weight-vs-closed-models", title: "Open Weight vs Closed Models: Which is Right for You?", date: "2026-08-10", excerpt: "We compare open-weight models like Llama 3 with closed models like GPT-4, examining cost, control, and capability trade-offs.", readTime: "10 min", category: "LLMs" },
  { slug: "mcp-server-security-best-practices", title: "MCP Server Security Best Practices for Enterprise Deployment", date: "2026-08-05", excerpt: "A guide to securing MCP server deployments in enterprise environments. Covers sandboxing, authentication, audit logging, and DPDP compliance requirements.", readTime: "15 min", category: "MCP Infrastructure" },
  { slug: "dpdp-act-ai-compliance-guide", title: "DPDP Act Compliance Guide for AI Deployments in India", date: "2026-07-28", excerpt: "Understanding the Digital Personal Data Protection Act and its implications for AI agent deployments.", readTime: "11 min", category: "India Focus" },
  { slug: "coding-agents-comparison-2026", title: "Coding Agents Comparison: Claude Code vs Cursor vs Cline vs Aider", date: "2026-07-20", excerpt: "An in-depth comparison of the top coding agents in 2026 across capability, MCP integration, India Fit, and pricing dimensions.", readTime: "14 min", category: "Coding Agents" },
  { slug: "voice-ai-india-market-analysis", title: "Voice AI in India: Market Analysis and Opportunities", date: "2026-07-15", excerpt: "India's voice AI market is growing rapidly, driven by regional language support and low-cost telephony.", readTime: "10 min", category: "Voice AI" },
  { slug: "mcp-ecosystem-report-2026", title: "MCP Ecosystem Report 2026: 80+ Servers Analyzed", date: "2026-07-10", excerpt: "Deep dive into the Model Context Protocol ecosystem covering server implementations, client support, and adoption patterns.", readTime: "18 min", category: "MCP Infrastructure" },
  { slug: "indic-language-models-showdown", title: "Indic Language Models Showdown: Sarvam vs Krutrim vs Bhashini", date: "2026-07-05", excerpt: "We compare India's homegrown Indic language models across Hindi, Tamil, Telugu, and Hinglish performance.", readTime: "13 min", category: "India Focus" },
  { slug: "agent-framework-comparison-langchain-crewai-autogen", title: "Agent Framework Comparison: LangChain vs CrewAI vs AutoGen vs LangGraph", date: "2026-06-28", excerpt: "Choosing an agent framework in 2026 is complex. We compare LangChain, CrewAI, AutoGen, and LangGraph.", readTime: "16 min", category: "Agent Builders" },
  { slug: "cursor-mcp-configuration-guide", title: "Configuring MCP Servers in Cursor: A Step-by-Step Guide", date: "2026-06-15", excerpt: "Detailed guide to setting up MCP servers in Cursor IDE, covering transport types, security, and troubleshooting.", readTime: "12 min", category: "MCP Infrastructure" },
  { slug: "inr-pricing-transparency-in-ai-tools", title: "INR Pricing Transparency: Which AI Tools Support UPI and GST?", date: "2026-06-01", excerpt: "We audit AI agent pricing pages to identify which tools offer INR billing, UPI payments, and GST invoicing.", readTime: "9 min", category: "India Focus" }
];

export default function BlogPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Blog</div>
    <JsonLd data={{ "@type": "Blog", name: "BestAIAgent.in Blog", url: `${SITE.url}/blog`, blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, datePublished: p.date, url: `${SITE.url}/blog/${p.slug}` })) }} />
    <section className="detailHero">
      <p className="eyebrow">Editorial</p>
      <h1>Blog</h1>
      <p className="lead">Evidence-led insights, analysis, and updates on AI agents, MCP infrastructure, and India-first compliance.</p>
    </section>
    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
      {posts.map((post) => (
        <article className="card" key={post.slug}>
          <div className="cardTop">
            <span className="tag">{post.category}</span>
            <span className="muted">{post.date} · {post.readTime}</span>
          </div>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  </div>;
}
