import type { Metadata } from "next";
import Link from "next/link";
import { AtlasDiscovery } from "@/components/AtlasDiscovery";
import { EntityCard } from "@/components/EntityCard";
import { entitiesByType, getPublicCatalogStats, getPublicEntityPath, publicEntities } from "@/lib/catalog";
import { categories } from "@/lib/legacy";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Agent Marketplace Directory",
  description: "Discover evidence-backed AI agents, models, frameworks and MCP infrastructure. Search the public catalog and inspect primary sources before adopting a tool.",
  alternates: { canonical: "/marketplace" },
  openGraph: { title: "AI Agent Marketplace Directory", description: "Explore the public, evidence-backed AI agent ecosystem.", url: `${SITE.url}/marketplace`, type: "website" }
};

const stats = getPublicCatalogStats();
const agents = entitiesByType("agent");
const marketplaceRecords = publicEntities.map((entity) => ({
  id: entity.id,
  name: entity.name,
  type: entity.type,
  summary: entity.summary,
  categories: entity.categories,
  path: getPublicEntityPath(entity)
}));

function topicCount(slug: string) {
  const key = slug.replace(/-agents?$/, "").replaceAll("-", " ");
  return agents.filter((entity) => entity.categories.some((tag) => {
    const normalized = tag.toLowerCase().replaceAll("-", " ");
    return normalized.includes(key) || key.includes(normalized);
  })).length;
}

export default function MarketplacePage() {
  const topics = categories.map(([slug, name, description]) => ({ slug, name, description, count: topicCount(slug) }))
    .filter((topic) => topic.count > 0)
    .slice(0, 8);

  return <div className="marketplacePage">
    <section className="marketplaceHero">
      <div className="shell">
        <div className="marketplaceHeroGrid">
          <div className="marketplaceHeroCopy">
            <span className="marketplaceEyebrow"><span className="marketplacePulse" /> BESTAIAGENT.IN <span>/</span> DIRECTORY</span>
            <h1>Discover agents.<br /><span>Know what you&apos;re choosing.</span></h1>
            <p className="marketplaceLead">Explore AI agents, models and frameworks from their published sources. Filter by capability, inspect the evidence, and check the vendor&apos;s current terms before adopting a tool.</p>
            <div className="marketplaceActions">
              <a className="marketplaceButton marketplaceButtonPrimary" href="#registry">Explore the registry <span aria-hidden="true">↘</span></a>
              <Link className="marketplaceButton" href="/methodology">How verification works</Link>
            </div>
            <p className="marketplaceNote">Independent directory · No paid rankings · Pricing and performance stay unverified unless sourced</p>
          </div>
          <div className="marketplaceSignal" aria-label="Catalog coverage overview">
            <div className="marketplaceSignalGrid" aria-hidden="true">
              <span>AGENT</span><span>MODEL</span><span>FRAMEWORK</span><span>MCP</span>
              <span>↗</span><span>↗</span><span>↗</span><span>↗</span>
            </div>
            <div className="marketplaceSignalCard">
              <span className="marketplaceSignalLabel">PUBLIC CATALOG</span>
              <strong>{stats.entities.toLocaleString("en-IN")}</strong>
              <span>evidence-gated records</span>
              <div className="marketplaceSignalLine" />
              <span className="marketplaceSignalFoot">Identity receipts · dated sources · explicit unknowns</span>
            </div>
            <div className="marketplaceSignalCaption"><i /> BUILD ON WHAT YOU CAN VERIFY</div>
          </div>
        </div>
        <div className="marketplaceStats" aria-label="Verified catalog counts">
          <div><strong>{stats.agents}</strong><span>Agent records</span></div>
          <div><strong>{stats.models}</strong><span>Model records</span></div>
          <div><strong>{stats.frameworks}</strong><span>Frameworks</span></div>
          <div><strong>{stats.evidenceReceipts}</strong><span>Verified evidence receipts</span></div>
        </div>
      </div>
    </section>

    <div className="marketplaceTicker" aria-label="Directory categories">
      <div className="shell marketplaceTickerInner"><span>DISCOVER</span><b>AI AGENTS</b><i>✳</i><b>MODELS</b><i>✳</i><b>FRAMEWORKS</b><i>✳</i><b>MCP INFRASTRUCTURE</b><i>✳</i><b>PROVIDERS</b><i>✳</i><span>VERIFY BEFORE ADOPTION</span></div>
    </div>

    <section className="section marketplaceRegistry" id="registry">
      <div className="shell">
        <div className="marketplaceSectionHead">
          <div><p className="marketplaceSectionKicker">01 / SEARCH THE CATALOG</p><h2>Find the right agent for the work.</h2><p>Filter public records by entity type and task. Every result links to its canonical profile and source status.</p></div>
          <Link href="/agents" className="marketplaceTextLink">Browse agent records <span aria-hidden="true">↗</span></Link>
        </div>
        <AtlasDiscovery records={marketplaceRecords} />
      </div>
    </section>

    <section className="section marketplaceListings">
      <div className="shell">
        <div className="marketplaceSectionHead">
          <div><p className="marketplaceSectionKicker">02 / PUBLIC AGENT RECORDS</p><h2>Start with the source.</h2><p>These profiles establish upstream identity. They do not imply measured quality, safety, compliance, current price, or guaranteed availability.</p></div>
          <Link href="/agents" className="marketplaceTextLink">All {stats.agents} agents <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="marketplaceAgentGrid">{agents.slice(0, 8).map((entity) => <EntityCard entity={entity} key={entity.id} />)}</div>
      </div>
    </section>

    <section className="section marketplaceTopics">
      <div className="shell">
        <div className="marketplaceSectionHead">
          <div><p className="marketplaceSectionKicker">03 / SKILL AND TOPIC MAP</p><h2>Browse the capabilities people build for.</h2><p>Topic labels group directory records by documented focus. They do not indicate that one agent calls or hands work to another.</p></div>
          <Link href="/categories" className="marketplaceTextLink">All directory topics <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="marketplaceTopicGrid">{topics.map((topic, index) => <Link className="marketplaceTopic" href={`/categories/${topic.slug}`} key={topic.slug}>
          <span className="marketplaceTopicIndex">0{index + 1}</span><span className="marketplaceTopicName">{topic.name}</span><span className="marketplaceTopicCount">{topic.count} public {topic.count === 1 ? "record" : "records"}</span><span className="marketplaceTopicArrow" aria-hidden="true">↗</span>
        </Link>)}</div>
        <p className="marketplaceGraphCaption"><span /> DIRECTORY TAXONOMY <span /> TOPIC LINKS ONLY <span /> NO RUNTIME HANDOFF CLAIMS</p>
      </div>
    </section>

    <section className="section marketplaceHow">
      <div className="shell">
        <div className="marketplaceSectionHead">
          <div><p className="marketplaceSectionKicker">04 / FROM DISCOVERY TO ADOPTION</p><h2>Three checks before you deploy.</h2><p>A clear path from a directory result to your own technical and procurement review.</p></div>
        </div>
        <div className="marketplaceSteps">
          <article><span>01</span><div><h3>Confirm identity</h3><p>Open the canonical profile and follow its first-party repository or product link.</p><Link href="/methodology">Read the publication method →</Link></div></article>
          <article><span>02</span><div><h3>Check the details</h3><p>Verify licensing, data handling, permissions, price and deployment requirements with the publisher.</p><Link href="/trust">Review trust guidance →</Link></div></article>
          <article><span>03</span><div><h3>Test in your environment</h3><p>Assess the agent against your own tasks, data boundaries and rollback requirements before production use.</p><Link href="/tutorials">Open builder guidance →</Link></div></article>
        </div>
      </div>
    </section>

    <section className="section marketplaceContributeSection">
      <div className="shell">
        <div className="marketplaceContribute">
          <div className="marketplaceContributeMark" aria-hidden="true">+</div>
          <div><p className="marketplaceSectionKicker">FOR BUILDERS</p><h2>Built an agent worth documenting?</h2><p>Suggest a public listing with its official source, a short description and supporting documentation. A maintainer reviews submissions before they enter the catalog.</p><p className="marketplaceFinePrint">This directory does not process purchases, rentals, payouts or affiliate royalties.</p></div>
          <a className="marketplaceButton marketplaceButtonPrimary" href="/submit" rel="noopener noreferrer">Suggest a listing <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  </div>;
}
