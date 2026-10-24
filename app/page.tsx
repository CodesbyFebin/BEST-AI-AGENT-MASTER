import type { Metadata } from "next";
import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { SearchBox } from "@/components/SearchBox";
import { AtlasCostScenario, AtlasDiscovery } from "@/components/AtlasDiscovery";
import { authorityEvidence } from "@/lib/authority-evidence";
import { entitiesByType, publicEntities, getPublicCatalogStats, getPublicEntityPath } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { categories } from "@/lib/legacy";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: SITE.url }
};

const authorityEntryPoints = [
  ["Best AI agents", "/best-ai-agents", "Evidence-first authority hub for AI agents across coding, voice, research, automation and business surfaces.", "★"],
  ["Best AI coding agents", "/best-ai-agents/coding", "Coding-agent identities and primary-source evidence across IDE, CLI, open-source, local and self-hosted surfaces.", "</>"],
  ["Cursor pricing in India", "/cursor-pricing", "Current first-party plan evidence, including the India-only Start plan.", "₹"],
  ["What is MCP?", "/what-is-mcp", "Protocol definition, architecture and evidence policy for MCP servers.", "◇"],
  ["AI agent benchmarks", "/ai-agent-benchmarks", "A reproducible benchmark checklist instead of synthetic leaderboard scores.", "▥"],
  ["Coding agents hub", "/coding-agents-hub", "Verified coding-agent identities, frameworks and adoption questions.", "⌘"],
  ["AI agent market map", "/ai-agent-market-map", "A taxonomy of agents, frameworks, models, providers and MCP infrastructure.", "▤"],
  ["AI agent glossary", "/glossary-hub", "Canonical definitions for the entity and evidence terms used across the site.", "Aa"]
] as const;

// Canonical directory entry points. These are topic views, not duplicate product records.
const homepagePillars = [
  ["Coding agents", "/best-ai-agents/coding", "IDE, CLI and local development workflows."],
  ["Voice agents", "/categories/voice-bots", "Speech systems and conversational workflows."],
  ["Agent orchestration", "/frameworks", "Frameworks, orchestration and runtime infrastructure."],
  ["Business agents", "/categories/business", "Sales, operations and business automation."],
  ["Research agents", "/categories/research", "Research, retrieval and browser workflows."],
  ["Open-source agents", "/categories/open-source", "Inspectable repositories and deployment options."],
  ["MCP infrastructure", "/mcp", "Protocol guidance and source-linked MCP servers."],
  ["Built in India", "/india", "Indian and Indic models with publisher-source provenance."],
  ["Pricing guides", "/cursor-pricing", "Source-specific price evidence; check plans before purchasing."],
  ["Verified comparisons", "/compare", "Evidence-gated comparisons and explicit unknowns."]
] as const;

const homepageQuestions = [
  ["What does a verified directory record mean?", "The upstream identity has passed the site's publication gate. It does not imply independently tested performance or regulatory compliance."],
  ["How are products ordered?", "This directory does not sell ranking positions. Category views group available records by documented workflow and source evidence."],
  ["Are pricing figures guaranteed current?", "No. Pricing can change. Check the vendor's current billing page before procurement."],
  ["Does an MCP listing establish that a server is secure?", "No. A source-linked server must still be reviewed for permissions, authentication, transport security and execution boundaries."],
  ["Where can I inspect the verification method?", "See the evidence methodology and corrections policy for the publication and dispute processes."]
] as const;

const categoryMarks: Record<string, string> = {
  "coding-agents": "</>", "voice-bots": "◉", orchestration: "⌘", business: "▣", crm: "◎",
  "customer-support": "☏", sales: "↗", marketing: "✦", research: "⌕", automation: "⚙"
};

export default function Home() {
  const agents = entitiesByType("agent");
  const models = entitiesByType("model");
  const frameworks = entitiesByType("framework");
  const stats = getPublicCatalogStats();
  const totalVerifiedReceipts = stats.evidenceReceipts + authorityEvidence.filter((item) => item.status === "verified").length;

  return (
    <>
      <section className="hero discoveryHero">
        <div className="shell heroGrid">
          <div className="heroCopy">
            <div className="heroBadge"><span>🇮🇳</span> BestAIAgent.in · Atlas discovery</div>
            <p className="kicker">Sovereign context · verifiable sources · real discovery</p>
            <h1>Powering <span className="gradient">AI in India.</span></h1>
            <p className="lead">Explore AI agents, models, frameworks and MCP infrastructure through dated primary-source evidence. Compare what is verified, understand what remains unknown, and discover India-relevant tools without synthetic rankings.</p>
            <div className="trustChips"><span>✓ Primary-source receipts</span><span>✓ No pay-to-rank</span><span>✓ Canonical URLs</span><span>✓ India / Indic coverage</span></div>
            <div className="ctaRow"><Link className="button buttonPrimary" href="/marketplace">Explore the directory</Link><Link className="button" href="/compare">Compare evidence</Link></div>
            <div className="heroSearch"><SearchBox /></div>
          </div>

          <div className="heroVisual" aria-label="AI agent evidence graph">
            <div className="orbitGlow"/><div className="orbitRing orbitRingA"/><div className="orbitRing orbitRingB"/>
            <div className="agentCore"><span>✦</span><strong>{publicEntities.length}</strong><small>verified entities</small></div>
            <div className="orbitNode nodeA"><b>&lt;/&gt;</b><span>Coding</span></div>
            <div className="orbitNode nodeB"><b>⌕</b><span>Research</span></div>
            <div className="orbitNode nodeC"><b>◉</b><span>Voice</span></div>
            <div className="orbitNode nodeD"><b>⚙</b><span>Automation</span></div>
            <div className="orbitNode nodeE"><b>⌘</b><span>Frameworks</span></div>
            <div className="orbitNode nodeF"><b>◇</b><span>MCP</span></div>
            <div className="heroVisualCaption">one graph · evidence-gated publication</div>
          </div>
        </div>

        <div className="shell metricStrip">
          <div><b>{stats.entities}</b><span>Verified public entities</span></div>
          <div><b>{totalVerifiedReceipts}</b><span>Valid evidence receipts</span></div>
          <div><b>{stats.models}</b><span>Verified model cards</span></div>
          <div><b>{stats.comparisons}</b><span>Evidence-ready comparisons</span></div>
        </div>
      </section>

      <section className="section atlasSection" id="atlas-discovery"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Atlas · directory & advisor</p><h2>Explore the verified AI ecosystem</h2><p>Filter the actual public catalog by task and entity type. Matches explain their selection; no unverified sandbox, ranking, deployment or compliance claims.</p></div><Link href="/agents">Full directory →</Link></div>
        <AtlasDiscovery records={publicEntities.map((entity) => ({ id: entity.id, name: entity.name, type: entity.type, summary: entity.summary, categories: entity.categories, path: getPublicEntityPath(entity) }))} />
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Explore by category</p><h2>Find the right agent surface</h2><p>Categories organize verified records by workflow. They do not imply performance, compliance or ranking.</p></div><Link href="/categories">View all categories →</Link></div>
        <div className="categoryGrid">{categories.map(([slug,name,description])=><article className="card categoryCard" key={slug}><div className="categoryIcon">{categoryMarks[slug] ?? "✦"}</div><h3><Link href={`/categories/${slug}`}>{name}</Link></h3><p>{description}</p></article>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Featured verified agents</p><h2>Real identities, real upstreams</h2><p>Identity evidence is verified independently from pricing, benchmarks, security and compliance claims.</p></div><Link href="/agents">View all agents →</Link></div>
        <div className="grid">{agents.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Authority guides</p><h2>Start with a question, not a leaderboard</h2><p>These pages preserve real Search Console demand with substantive canonical answers and dated evidence where the subject is volatile.</p></div></div>
        <div className="grid authorityGrid">{authorityEntryPoints.map(([title,href,description,icon])=><article className="card" key={href}><div className="authorityType"><span>Evidence-first guide</span><b>{icon}</b></div><h3><Link href={href}>{title}</Link></h3><p>{description}</p><p><Link href={href}>Open guide →</Link></p></article>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Built in India</p><h2>Indian and Indic model cards</h2><p>India relevance comes from primary publisher evidence. It is never converted into an automatic sovereignty or compliance badge.</p></div><Link href="/india">Explore India AI →</Link></div>
        <div className="grid">{models.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Developer infrastructure</p><h2>Frameworks & MCP</h2><p>Frameworks and protocol infrastructure stay distinct from end-user agents so evidence is attached to the right object.</p></div><Link href="/frameworks">View frameworks →</Link></div>
        <div className="grid">{frameworks.slice(0,5).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}<article className="card"><div className="categoryIcon">◇</div><p className="eyebrow">Protocol hub</p><h3><Link href="/mcp">Model Context Protocol</Link></h3><p>Source-led MCP guidance. Legacy server detail routes stay noindex until canonical upstream and primary evidence qualify them.</p><div className="tagRow"><span className="tag">tools</span><span className="tag">resources</span><span className="tag">prompts</span></div></article></div>
      </div></section>

      <section className="section sectionAlt" id="spend-scenario"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Atlas · spend simulator</p><h2>Model an AI investment scenario</h2><p>Enter your own assumptions to explore costs. This is arithmetic, not a claimed productivity benchmark or financial forecast.</p></div></div>
        <AtlasCostScenario />
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Machine-readable data</p><h2>The same evidence, for humans and agents</h2><p>Every export below is filtered through the same publication gate as the HTML pages — nothing appears here that isn&apos;t also indexable on the site.</p></div></div>
        <div className="grid">
          <a className="card" href="/catalog.json"><div className="cardTop"><div className="glyph">{"{}"}</div><h3>/catalog.json</h3></div><p>The full public catalog — every verified entity across agents, models, frameworks, providers and MCP servers.</p></a>
          <a className="card" href="/agents.json"><div className="cardTop"><div className="glyph">◧</div><h3>/agents.json · /models.json · /frameworks.json · /providers.json</h3></div><p>Per-type slices of the same gated catalog data.</p></a>
          <a className="card" href="/llms.txt"><div className="cardTop"><div className="glyph">Ai</div><h3>/llms.txt · /llms-full.txt</h3></div><p>Plain-text discovery surfaces built for AI crawlers, listing only indexable pages.</p></a>
          <Link className="card" href="/api/search"><div className="cardTop"><div className="glyph">⌕</div><h3>/api/search</h3></div><p>Search the same verified entity graph shown on the site, as JSON.</p></Link>
          <a className="card" href="/sitemap.xml"><div className="cardTop"><div className="glyph">◫</div><h3>/sitemap.xml</h3></div><p>The single canonical sitemap — every URL here is indexable; nothing noindex is ever listed.</p></a>
          <Link className="card" href="/methodology"><div className="cardTop"><div className="glyph">✓</div><h3>How the gate works</h3></div><p>The publication rule these exports and the HTML site both obey, explained.</p></Link>
        </div>
      </div></section>

      <section className="section" id="homepage-pillars"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Browse by purpose</p><h2>Ten evidence-first discovery paths</h2><p>Each link opens an existing canonical topic view. Entity claims stay on their canonical profiles; inclusion here does not represent an endorsement.</p></div><Link href="/best-ai-agents">Explore the authority hub →</Link></div>
        <div className="grid authorityGrid">{homepagePillars.map(([title,href,description])=><article className="card" key={href}><p className="eyebrow">Directory pillar</p><h3><Link href={href}>{title}</Link></h3><p>{description}</p><p><Link href={href}>Explore {title.toLowerCase()} →</Link></p></article>)}</div>
      </div></section>

      <section className="section sectionAlt" id="homepage-faq"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Questions & evidence</p><h2>How should you evaluate AI agents in this directory?</h2><p>These answers describe editorial policy, not claims about an individual vendor.</p></div><Link href="/trust">Trust and methodology →</Link></div>
        <div className="grid">{homepageQuestions.map(([question,answer])=><article className="card" key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div>
        <p><Link href="/verify">Inspect verification guidance</Link> · <Link href="/trust/corrections">Request a correction</Link></p>
      </div></section>

      <section className="section sectionAlt"><div className="shell"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Trust layer</p><h2>Evidence decides what becomes indexable.</h2><p>Discovery → normalization → evidence → verification → publication. Donor keywords and old URLs are useful research inputs, but unresolved candidates remain quarantined.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/methodology">Read methodology</Link><Link className="button" href="/editorial-policy">Editorial policy</Link></div></div></div></div></section>
    </>
  );
}
