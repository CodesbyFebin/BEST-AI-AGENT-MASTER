import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType, publicIndexableComparisons, getPublicEntity } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Coding Agents by Deployment (2026): Open Source, CLI, IDE, Local, Self-Hosted",
  description:
    "Browse verified AI coding agents by deployment surface. Each sub-cluster lists only entities that pass the public evidence gate, with primary-source links.",
  alternates: { canonical: "/coding-agents" },
  openGraph: {
    title: "Coding Agents by Deployment (2026)",
    description:
      "Verified coding agents organised by deployment surface: open source, CLI, IDE, local, and self-hosted.",
    url: "/coding-agents",
    type: "website"
  }
};

const isCoding = (categories: string[]) =>
  categories.some((c) => /coding|developer|code/i.test(c));

const surfaces = [
  {
    href: "/coding-agents/open-source",
    title: "Open-source coding agents",
    description:
      "Coding agents with publicly available, licensed source code. Identity is verified against the primary repository, not a vendor blog."
  },
  {
    href: "/coding-agents/cli",
    title: "CLI coding agents",
    description:
      "Terminal-first coding agents (Claude Code, Gemini CLI, Aider, Qwen Code). Package or repository identity is the source of truth."
  },
  {
    href: "/coding-agents/ide",
    title: "IDE coding agents",
    description:
      "Editor-integrated assistants (Cursor, GitHub Copilot, Continue, Cody). Pricing evidence is dated because plans and quotas move independently."
  },
  {
    href: "/coding-agents/local",
    title: "Local coding agents",
    description:
      "Coding agents that operate against local models or local-first deployments. Latency and privacy claims must come from primary sources."
  },
  {
    href: "/coding-agents/self-hosted",
    title: "Self-hosted coding agents",
    description:
      "Coding-agent platforms you can deploy inside your own infrastructure. Compliance and residency claims require primary documentation."
  }
];

export default function Page() {
  const codingAgents = entitiesByType("agent").filter((e) => isCoding(e.categories));
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
  const url = `${SITE.url}/coding-agents`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Coding agents
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "Coding Agents by Deployment",
          description:
            "Verified coding agents organised by deployment surface.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Coding agents", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Cluster root · deployment surfaces</p>
      <h1>Coding Agents by Deployment</h1>
      <p className="lead">
        Verified coding agents organised by where they run. The same
        identity can appear under multiple surfaces (for example, an
        open-source CLI agent is also local), but each surface is a
        different evidence question — installation, network boundary,
        latency, pricing, and compliance claims all vary.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          Pick a deployment surface first, then look at the verified
          identities on that surface. BestAIAgent.in never merges surfaces
          into a single leaderboard, because the strongest answer for a
          team running on-prem is usually not the strongest answer for a
          team using a hosted IDE.
        </p>
      </section>

      <section className="prose">
        <h2>Surfaces</h2>
        <div className="grid">
          {surfaces.map((s) => (
            <article className="card" key={s.href}>
              <p className="eyebrow">Sub-cluster</p>
              <h3><Link href={s.href}>{s.title}</Link></h3>
              <p>{s.description}</p>
              <p><Link href={s.href}>Open sub-cluster →</Link></p>
            </article>
          ))}
        </div>
      </section>

      {codingAgents.length > 0 ? (
        <section className="prose">
          <h2>All verified coding agents ({codingAgents.length})</h2>
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
        <h2>Related guides</h2>
        <ul>
          <li>
            <Link href="/best-ai-agents/coding">Best AI coding agents</Link>{" "}
            — the authority pillar this cluster sits under.
          </li>
          <li>
            <Link href="/best-ai-agent-for-coding">Coding-agent evaluation guide</Link>{" "}
            — editorial rules applied to every entry on this cluster.
          </li>
          <li>
            <Link href="/best-free-ai-coding-agents">Best free AI coding agents</Link>{" "}
            — verified free-tier coding agents.
          </li>
          <li>
            <Link href="/ai-agent-benchmarks">AI agent benchmarks</Link>{" "}
            — the reproducible benchmark checklist this cluster defers to.
          </li>
          <li>
            <Link href="/cursor-pricing">Cursor pricing in India</Link>,{" "}
            <Link href="/github-copilot-pricing">GitHub Copilot pricing</Link>,{" "}
            <Link href="/claude-code-pricing">Claude Code pricing</Link>{" "}
            — first-party pricing evidence for the most-asked IDE surfaces.
          </li>
          <li>
            <Link href="/compare">Evidence-ready comparisons</Link>{" "}
            — the public index of two-sided comparisons;{" "}
            <Link href="/compare/research">research-mode comparisons</Link>{" "}
            and the <Link href="/compare/archive">archive</Link> are kept
            separate.
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
