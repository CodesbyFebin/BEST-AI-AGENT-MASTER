import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType, publicIndexableComparisons, getPublicEntity } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Best AI Coding Agents (2026): Evidence-First Pillar",
  description:
    "Verified AI coding agents organised by deployment surface: IDE copilots, CLI agents, open-source assistants and self-hosted runners. Every entry links to primary-source evidence.",
  alternates: { canonical: "/best-ai-agents/coding" },
  openGraph: {
    title: "Best AI Coding Agents (2026): Evidence-First Pillar",
    description:
      "Verified coding-agent identities and primary-source evidence across IDE, CLI, open-source, local and self-hosted surfaces.",
    url: "/best-ai-agents/coding",
    type: "website"
  }
};

const isCoding = (categories: string[]) =>
  categories.some((c) => /coding|developer|code/i.test(c));

export default function Page() {
  const codingAgents = entitiesByType("agent").filter((e) => isCoding(e.categories));
  const codingFrameworks = entitiesByType("framework").filter((e) =>
    isCoding(e.categories)
  );
  const codingModels = entitiesByType("model").filter((e) =>
    isCoding(e.categories)
  );

  const codingComparisons = publicIndexableComparisons
    .map((c) => {
      const aEntity = getPublicEntity(c.a.type, c.a.slug);
      const bEntity = getPublicEntity(c.b.type, c.b.slug);
      return aEntity && bEntity ? { comparison: c, a: aEntity, b: bEntity } : null;
    })
    .filter((item): item is { comparison: typeof publicIndexableComparisons[number]; a: NonNullable<ReturnType<typeof getPublicEntity>>; b: NonNullable<ReturnType<typeof getPublicEntity>> } => item !== null)
    .filter(({ a, b }) => {
      const haystack = `${a.slug} ${b.slug} ${a.name} ${b.name}`;
      return /cursor|copilot|claude-code|cody|continue|windsurf|aider|codestral|qwen|codex|cline|openhands|gemini|gpt|llama|deepseek/i.test(
        haystack
      );
    });

  const url = `${SITE.url}/best-ai-agents/coding`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> /{" "}
        <Link href="/best-ai-agents">Best AI agents</Link> / Coding
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "Best AI Coding Agents",
          description:
            "Verified coding-agent identities across IDE, CLI, open-source, local and self-hosted surfaces.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Best AI agents", item: `${SITE.url}/best-ai-agents` },
              { "@type": "ListItem", position: 3, name: "Coding", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Pillar · coding</p>
      <h1>Best AI Coding Agents Backed by Evidence</h1>
      <p className="lead">
        Coding agents span IDE copilots, terminal CLI assistants, autonomous
        multi-step runners and self-hosted alternatives. This pillar lists
        only the verified identities and routes you to the matching
        deployment-surface sub-cluster and dated primary-source evidence.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          For most teams, the answer to &ldquo;best AI coding agent&rdquo;
          is conditional on three inputs: deployment surface (IDE, CLI,
          autonomous runner), source evidence (vendor repo vs. open-source
          repo with dated commits), and evidence-backed pricing. BestAIAgent.in
          does not collapse those into a single leaderboard.
        </p>
        <p>
          Where both sides have enough qualified evidence, a two-sided
          comparison is promoted into the public graph under{" "}
          <code>/compare/...</code>. Where one side is still missing
          evidence, the comparison stays unindexed rather than being padded
          with vendor copy.
        </p>
      </section>

      <section className="prose">
        <h2>Browse by deployment surface</h2>
        <div className="grid">
          <article className="card">
            <p className="eyebrow">Sub-cluster</p>
            <h3><Link href="/coding-agents/open-source">Open-source coding agents</Link></h3>
            <p>
              Coding agents with publicly available, licensed source code.
              Listed only after primary-source repository identity is
              verified.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">Sub-cluster</p>
            <h3><Link href="/coding-agents/cli">CLI coding agents</Link></h3>
            <p>
              Terminal-first coding agents (Claude Code, Gemini CLI, Qwen
              Code, Aider). Verified identities are linked to their
              official package or repository.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">Sub-cluster</p>
            <h3><Link href="/coding-agents/ide">IDE coding agents</Link></h3>
            <p>
              Editor-integrated coding assistants (Cursor, GitHub Copilot,
              Continue, Cody). Pricing evidence is dated because plans and
              quotas change independently of identity.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">Sub-cluster</p>
            <h3><Link href="/coding-agents/local">Local coding agents</Link></h3>
            <p>
              Self-runnable coding assistants that operate against local
              models or local-first deployments. Latency and privacy
              claims are not inferred from deployment category.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">Sub-cluster</p>
            <h3><Link href="/coding-agents/self-hosted">Self-hosted coding agents</Link></h3>
            <p>
              Coding-agent platforms you can deploy inside your own
              infrastructure. Compliance and data-residency claims must be
              sourced from primary documentation, never inferred.
            </p>
          </article>
        </div>
      </section>

      {codingAgents.length > 0 ? (
        <section className="prose">
          <h2>Verified coding agents ({codingAgents.length})</h2>
          <ul>
            {codingAgents.map((e) => (
              <li key={e.id}>
                <Link href={`/agents/${e.slug}`}>{e.name}</Link>
                {" — "}
                <span className="muted">{e.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {codingFrameworks.length > 0 ? (
        <section className="prose">
          <h2>Verified coding frameworks ({codingFrameworks.length})</h2>
          <ul>
            {codingFrameworks.map((e) => (
              <li key={e.id}>
                <Link href={`/frameworks/${e.slug}`}>{e.name}</Link>
                {" — "}
                <span className="muted">{e.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {codingModels.length > 0 ? (
        <section className="prose">
          <h2>Verified coding models ({codingModels.length})</h2>
          <ul>
            {codingModels.map((e) => (
              <li key={e.id}>
                <Link href={`/models/${e.slug}`}>{e.name}</Link>
                {" — "}
                <span className="muted">{e.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {codingComparisons.length > 0 ? (
        <section className="prose">
          <h2>Evidence-ready coding comparisons</h2>
          <ul>
            {codingComparisons.map(({ comparison, a, b }) => (
              <li key={comparison.slug}>
                <Link href={`/compare/${comparison.slug}`}>
                  {a.name} vs {b.name}
                </Link>{" "}
                — <span className="muted">{comparison.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="prose">
        <h2>What this pillar deliberately does not publish</h2>
        <ul>
          <li>
            A universal &ldquo;best coding agent&rdquo; winner. The
            evidence threshold does not support one.
          </li>
          <li>
            Synthetic benchmark leaderboards that mix vendor benchmarks with
            independent benchmarks without labelling them.
          </li>
          <li>
            INR conversions that are not published by the vendor on the
            primary pricing page.
          </li>
          <li>
            Compliance claims (DPDP, SOC 2, HIPAA) inferred from category
            membership or self-hosting availability.
          </li>
        </ul>
      </section>

      <section className="prose">
        <h2>Related guides</h2>
        <ul>
          <li>
            <Link href="/coding-agents">Coding agents by deployment</Link>{" "}
            — IDE / CLI / open-source / local / self-hosted sub-clusters.
          </li>
          <li>
            <Link href="/best-ai-agent-for-coding">Coding-agent evaluation guide</Link>{" "}
            — the editorial rules applied to this pillar.
          </li>
          <li>
            <Link href="/best-free-ai-coding-agents">Best free AI coding agents</Link>{" "}
            — verified free-tier coding agents.
          </li>
          <li>
            <Link href="/ai-agent-benchmarks">AI agent benchmarks</Link>{" "}
            — reproducible benchmark checklist.
          </li>
          <li>
            <Link href="/cursor-pricing">Cursor pricing in India</Link>,{" "}
            <Link href="/github-copilot-pricing">GitHub Copilot pricing</Link>,{" "}
            <Link href="/claude-code-pricing">Claude Code pricing</Link>{" "}
            — first-party pricing evidence for the most-asked IDE surfaces.
          </li>
          <li>
            <Link href="/compare">Evidence-ready comparisons</Link>{" "}
            — two-sided comparisons promoted into the public graph.
          </li>
          <li>
            <Link href="/categories/coding-agents">Coding category directory</Link>{" "}
            — full category taxonomy across all entity types.
          </li>
        </ul>
      </section>
    </div>
  );
}
