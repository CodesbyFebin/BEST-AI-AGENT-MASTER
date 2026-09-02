import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "CLI Coding Agents (2026): Evidence-First List",
  description:
    "Verified terminal-first AI coding agents — Claude Code, Gemini CLI, Aider, Qwen Code and more — anchored to primary repositories and packages.",
  alternates: { canonical: "/coding-agents/cli" },
  openGraph: {
    title: "CLI Coding Agents",
    description:
      "Terminal-first coding agents verified against primary repositories and packages.",
    url: "/coding-agents/cli",
    type: "website"
  }
};

const isCliCoding = (categories: string[]) =>
  categories.includes("coding") && categories.includes("cli");

export default function Page() {
  const cli = entitiesByType("agent").filter((e) => isCliCoding(e.categories));
  const url = `${SITE.url}/coding-agents/cli`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> /{" "}
        <Link href="/coding-agents">Coding agents</Link> / CLI
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "CLI Coding Agents",
          description:
            "Terminal-first coding agents verified against primary repositories and packages.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Coding agents", item: `${SITE.url}/coding-agents` },
              { "@type": "ListItem", position: 3, name: "CLI", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Sub-cluster · CLI</p>
      <h1>CLI Coding Agents</h1>
      <p className="lead">
        Terminal-first AI coding agents — Claude Code, Gemini CLI, Aider,
        Qwen Code and others — anchored to primary repositories or
        packages. CLI agents are evaluated separately from IDE agents
        because the deployment, network boundary, and pricing surfaces
        differ.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          A CLI coding agent on BestAIAgent.in must have its package or
          repository identity verified. Pricing for hosted CLI plans is
          attached separately with a dated evidence receipt, because CLI
          agents increasingly shift between free local runs and paid
          hosted quotas.
        </p>
      </section>

      {cli.length > 0 ? (
        <section className="prose">
          <h2>Verified CLI coding agents ({cli.length})</h2>
          <ul>
            {cli.map((e) => (
              <li key={e.id}>
                <Link href={`/agents/${e.slug}`}>{e.name}</Link>
                {" — "}
                <a href={e.sourceUrl} rel="noopener noreferrer">primary source</a>
                {" — "}
                <span className="muted">{e.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="prose">
          <p className="empty">
            No CLI coding agents currently pass both the category filter
            and the public evidence gate.
          </p>
        </section>
      )}

      <section className="prose">
        <p className="muted">
          See <Link href="/coding-agents/ide">IDE coding agents</Link>,{" "}
          <Link href="/coding-agents/open-source">open-source coding agents</Link>
          {" "}or the full <Link href="/coding-agents">coding-agents cluster</Link>.
        </p>
      </section>
    </div>
  );
}
