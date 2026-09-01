import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { publicIndexableComparisons, entitiesByType, getPublicCatalogStats, getPublicEntity } from "@/lib/catalog";
import { isEvidenceVerified, evidence } from "@/lib/catalog";
import { categories } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "Best AI Agents (2026): Evidence-First Directory",
  description:
    "The BestAIAgent.in authority hub for finding AI agents. Verified coding, research, voice, automation and business agents with primary-source receipts and reproducible evidence.",
  alternates: { canonical: "/best-ai-agents" },
  openGraph: {
    title: "Best AI Agents (2026): Evidence-First Directory",
    description:
      "An evidence-first authority hub for AI agents. Verified identities, primary-source receipts, and transparent unknowns.",
    url: "/best-ai-agents",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Agents (2026): Evidence-First Directory",
    description:
      "An evidence-first authority hub for AI agents. Verified identities, primary-source receipts, and transparent unknowns."
  }
};

export default function Page() {
  const stats = getPublicCatalogStats();
  const verifiedEvidence = evidence.filter(isEvidenceVerified);
  const url = `${SITE.url}/best-ai-agents`;

  const voiceHub = categories.find(([slug]) => slug === "voice-bots");
  const researchHub = categories.find(([slug]) => slug === "research");
  const automationHub = categories.find(([slug]) => slug === "automation");
  const businessHub = categories.find(([slug]) => slug === "business");

  const resolvedComparisons = publicIndexableComparisons
    .map((c) => {
      const aEntity = getPublicEntity(c.a.type, c.a.slug);
      const bEntity = getPublicEntity(c.b.type, c.b.slug);
      return aEntity && bEntity ? { comparison: c, a: aEntity, b: bEntity } : null;
    })
    .filter((item): item is { comparison: typeof publicIndexableComparisons[number]; a: NonNullable<ReturnType<typeof getPublicEntity>>; b: NonNullable<ReturnType<typeof getPublicEntity>> } => item !== null)
    .slice(0, 10);

  const clusters = [
    {
      href: "/best-ai-agents/coding",
      label: "Best AI coding agents",
      description:
        "Verified coding-agent identities — IDE copilots, CLI agents, open-source assistants and self-hosted runners — with primary-source repository evidence.",
      stat: `${stats.agents} verified agent identities`
    },
    {
      href: "/coding-agents",
      label: "Coding agents by deployment",
      description:
        "Same verified set sorted by deployment surface: open-source, CLI, IDE, local, and self-hosted. Each sub-cluster links to evidence-backed entries only.",
      stat: "5 deployment surfaces"
    },
    {
      href: "/categories/coding-agents",
      label: "Coding agents category",
      description:
        "All verified coding-category entities surfaced through the public taxonomy. No unverified rows are forced in to inflate the count.",
      stat: `${entitiesByType("agent").filter((e) => e.categories.includes("coding-agents") || e.categories.some((c) => /coding/i.test(c))).length} coding entities`
    },
    {
      href: "/categories/voice-bots",
      label: "Voice agents",
      description:
        "Voice-agent platforms. Pricing and latency stay unknown until a primary source qualifies each field independently.",
      stat: voiceHub ? voiceHub[1] : "Voice surfaces"
    },
    {
      href: "/categories/research",
      label: "Research agents",
      description:
        "Browsing and research agents with verified identities and source-linked repositories. Confidence scores are not inferred from popularity.",
      stat: researchHub ? researchHub[1] : "Research surfaces"
    },
    {
      href: "/categories/automation",
      label: "Automation & orchestration",
      description:
        "Workflow automation and multi-agent orchestration. Frameworks stay distinct from end-user agents so evidence attaches to the right object.",
      stat: automationHub ? automationHub[1] : "Automation surfaces"
    },
    {
      href: "/categories/business",
      label: "Business agents",
      description:
        "Business workflow agents. ROI and compliance claims are never inherited from a vendor category.",
      stat: businessHub ? businessHub[1] : "Business surfaces"
    }
  ];

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Best AI agents
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "Best AI Agents (2026)",
          description:
            "Evidence-first authority hub for AI agents. Verified identities, primary-source receipts, transparent unknowns.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Best AI agents", item: url }
            ]
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: clusters.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              item: `${SITE.url}${c.href}`
            }))
          }
        }}
      />

      <p className="eyebrow">Authority hub · evidence-first</p>
      <h1>Best AI Agents Backed by Evidence</h1>
      <p className="lead">
        There is no universal best AI agent. There is a best agent for a
        specific task, deployment boundary, model/provider requirement and
        evidence threshold. This hub organizes verified AI agent identities
        and dated primary-source evidence so you can choose with the receipts
        attached.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          The strongest answer for &ldquo;best AI agent&rdquo; is always a
          conditional one. Verified coding agents cluster around primary
          repositories and dated pricing. Voice agents stay unranked until
          latency, ASR quality and cost are independently evidenced. Research
          and browsing agents are evaluated against retrieval reproducibility,
          not vendor copy.
        </p>
        <p>
          BestAIAgent.in never publishes a synthetic numeric winner. Where
          sufficient evidence exists, two-sided comparison pages are promoted
          into the public graph. Where it does not, the field stays unknown
          and the entity or comparison is excluded from the crawl graph
          rather than padded with marketing copy.
        </p>
      </section>

      <section className="prose">
        <h2>By the numbers (live from the public catalog)</h2>
        <ul>
          <li>
            <strong>{stats.entities}</strong> verified public entities (
            {stats.agents} agents, {stats.models} models,{" "}
            {stats.frameworks} frameworks, {stats.providers} providers,{" "}
            {stats.mcpServers} MCP servers)
          </li>
          <li>
            <strong>{stats.evidenceReceipts}</strong> valid evidence receipts
            across entity fields
          </li>
          <li>
            <strong>{stats.comparisons}</strong> evidence-ready
            two-sided comparisons promoted into the public graph
          </li>
          <li>
            <strong>{verifiedEvidence.length}</strong> directly-verified
            entity evidence items (the rest are independent authority
            evidence items with their own receipts)
          </li>
        </ul>
      </section>

      <section className="prose">
        <h2>Topic clusters</h2>
        <p>
          Each cluster below links into a deeper pillar. None of them include
          a fabricated leaderboard; the value is in routing you to the
          evidence-gated surface that matches the question you actually have.
        </p>
        <div className="grid">
          {clusters.map((c) => (
            <article className="card" key={c.href}>
              <p className="eyebrow">{c.stat}</p>
              <h3>
                <Link href={c.href}>{c.label}</Link>
              </h3>
              <p>{c.description}</p>
              <p>
                <Link href={c.href}>Open cluster →</Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="prose">
        <h2>How evidence is graded on this hub</h2>
        <ul>
          <li>
            <strong>Identity</strong>: developer, repository, package or
            official homepage confirmed against a primary source.
          </li>
          <li>
            <strong>Pricing</strong>: first-party pricing page with a
            dated evidence receipt. Estimated conversions, enterprise
            discounts, and GST treatment are not inferred.
          </li>
          <li>
            <strong>Benchmarks</strong>: raw or reproducible outputs from a
            named benchmark with versioned inputs. Synthetic scores are
            rejected.
          </li>
          <li>
            <strong>Compliance / sovereignty</strong>: must come from a
            primary source such as the vendor policy, regulator filing, or
            a self-hosted deployment guide. Never from category membership.
          </li>
        </ul>
      </section>

      <section className="prose">
        <h2>What is not on this hub</h2>
        <p>
          <strong>Universal rankings</strong>: no &ldquo;top 10&rdquo;
          without a methodology. <strong>Pay-to-rank placements</strong>:
          publication status reflects evidence, not marketing budgets.{" "}
          <strong>Synthetic scores</strong>: numeric ratings without a
          reproducible scoring method are not surfaced.
        </p>
        <p className="muted">
          Looking for a previously indexed record? Browse the{" "}
          <Link href="/archive/agents">historical archive</Link> — those
          URLs are preserved at 200 for continuity but are excluded from the
          public crawl graph and search index.
        </p>
      </section>

      {resolvedComparisons.length > 0 ? (
        <section className="prose">
          <h2>Evidence-ready comparisons (live)</h2>
          <ul>
            {resolvedComparisons.map(({ comparison, a, b }) => (
              <li key={comparison.slug}>
                <Link href={`/compare/${comparison.slug}`}>
                  {a.name} vs {b.name}
                </Link>{" "}
                — {comparison.title}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="prose">
        <h2>Related guides</h2>
        <ul>
          <li>
            <Link href="/methodology">Publication methodology</Link>{" "}
            — the doctrine that gates every entry on this hub.
          </li>
          <li>
            <Link href="/ai-agent-rankings">AI agent rankings</Link>{" "}
            — why universal numeric scores are not published here.
          </li>
          <li>
            <Link href="/ai-agent-benchmarks">AI agent benchmarks</Link>{" "}
            — the reproducible benchmark checklist.
          </li>
          <li>
            <Link href="/ai-agent-market-map">AI agent market map</Link>{" "}
            — the taxonomy this hub sits within.
          </li>
          <li>
            <Link href="/cursor-pricing">Cursor pricing in India</Link>,{" "}
            <Link href="/github-copilot-pricing">GitHub Copilot pricing</Link>,{" "}
            <Link href="/claude-code-pricing">Claude Code pricing</Link>{" "}
            — first-party pricing evidence for the most-asked IDE surfaces.
          </li>
          <li>
            <Link href="/coding-agents-hub">Coding agents hub</Link>{" "}
            — the legacy hub, retained for URL continuity.
          </li>
          <li>
            <Link href="/glossary-hub">Glossary</Link>{" "}
            — canonical definitions for every term used on this hub.
          </li>
          <li>
            <Link href="/compare">Evidence-ready comparisons</Link>,{" "}
            <Link href="/compare/research">research-mode comparisons</Link>{" "}
            and the <Link href="/compare/archive">comparison archive</Link>{" "}
            — the full comparison graph.
          </li>
        </ul>
      </section>
    </div>
  );
}
