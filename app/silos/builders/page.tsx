import type { Metadata } from "next";
import Link from "next/link";
import { legacyPages } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "AI Agent Builder Silo",
  description: "Builder-oriented agent frameworks, MCP infrastructure and development tools.",
  alternates: { canonical: "/silos/builders" }
};

export default function Page() {
  const page = legacyPages["silos/builders"];
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/silos">Silos</Link> / Builders</div>
    <p className="eyebrow">Authority silo</p>
    <h1 style={{ fontSize: "48px" }}>{page.title}</h1>
    <p className="lead">{page.description}</p>
    <div className="prose">
      {page.body.map((p) => <p key={p}>{p}</p>)}

      <h2>Why these three sit together</h2>
      <p>Building an AI agent from scratch touches three distinct layers that are often conflated. A <strong>framework</strong> (LangGraph, CrewAI, AutoGen) is the orchestration layer — it decides how reasoning steps, tools, and state flow through your application. <strong>MCP</strong> is the interoperability layer — a standard protocol for exposing tools and context to any compatible model, independent of which framework you use. An <strong>agent</strong> is the shipped product — the end result someone actually deploys and uses.</p>
      <p>A builder evaluating this stack typically needs to answer three separate questions: which framework fits the orchestration pattern, which MCP servers already expose the tools needed, and which existing agents solve adjacent problems worth studying or reusing. Treating these as one undifferentiated &quot;AI tools&quot; category obscures which layer a given evaluation criterion actually applies to — a framework&apos;s learning curve and an MCP server&apos;s transport security are not comparable facts.</p>

      <h2>Where to start</h2>
      <p>If you are choosing a framework, start with the <Link href="/frameworks">frameworks directory</Link> and compare orchestration patterns before capability claims — most frameworks can eventually do most things, but the default patterns differ significantly. If you already have a framework and need tool access, check the <Link href="/mcp/servers">MCP server directory</Link> for existing, source-linked implementations before building a custom integration. If you are scoping a new agent product, the <Link href="/agents">agent directory</Link> shows verified identities for comparable existing products.</p>

      <p><Link href="/frameworks">Browse frameworks</Link> · <Link href="/mcp">Browse MCP</Link> · <Link href="/agents">Browse agents</Link></p>
    </div>
  </div>;
}
