import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "IDE Coding Agents (2026): Evidence-First List",
  description:
    "Verified editor-integrated AI coding assistants — Cursor, GitHub Copilot, Continue, Cody and more — with dated primary-source pricing evidence.",
  alternates: { canonical: "/coding-agents/ide" },
  openGraph: {
    title: "IDE Coding Agents",
    description:
      "Editor-integrated coding assistants verified against primary documentation with dated pricing evidence.",
    url: "/coding-agents/ide",
    type: "website"
  }
};

const isIdeCoding = (categories: string[]) =>
  categories.includes("coding") && categories.includes("ide");

export default function Page() {
  const ide = entitiesByType("agent").filter((e) => isIdeCoding(e.categories));
  const url = `${SITE.url}/coding-agents/ide`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> /{" "}
        <Link href="/coding-agents">Coding agents</Link> / IDE
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "IDE Coding Agents",
          description:
            "Editor-integrated coding assistants verified against primary documentation with dated pricing evidence.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Coding agents", item: `${SITE.url}/coding-agents` },
              { "@type": "ListItem", position: 3, name: "IDE", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Sub-cluster · IDE</p>
      <h1>IDE Coding Agents</h1>
      <p className="lead">
        Editor-integrated AI coding assistants — Cursor, GitHub Copilot,
        Continue, Cody and others — anchored to the primary documentation
        of each tool. Pricing evidence is dated because plans and quotas
        move independently of identity.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          An IDE coding agent on BestAIAgent.in is verified against its
          official homepage or marketplace listing. The pricing shown on
          each entity profile links back to a dated evidence receipt.
          Estimated INR conversions, enterprise tiers and bundled IDE
          features are not inferred from a vendor category alone.
        </p>
      </section>

      {ide.length > 0 ? (
        <section className="prose">
          <h2>Verified IDE coding agents ({ide.length})</h2>
          <ul>
            {ide.map((e) => (
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
            No IDE coding agents currently pass both the category filter
            and the public evidence gate.
          </p>
        </section>
      )}

      <section className="prose">
        <h2>Pricing evidence</h2>
        <p>
          Plan prices for IDE agents are among the fastest-moving fields
          on this site. See the dated pricing guides for the most-asked
          IDE surfaces:
        </p>
        <ul>
          <li>
            <Link href="/cursor-pricing">Cursor pricing in India</Link>{" "}
            — first-party plan evidence, including the India-only Start plan.
          </li>
          <li>
            <Link href="/github-copilot-pricing">GitHub Copilot pricing</Link>{" "}
            — current plans from the official Copilot plans page.
          </li>
          <li>
            <Link href="/claude-code-pricing">Claude Code pricing</Link>{" "}
            — first-party Claude plan evidence for hosted Claude Code.
          </li>
        </ul>
      </section>

      <section className="prose">
        <h2>Related guides</h2>
        <ul>
          <li>
            <Link href="/best-ai-agent-for-coding">Coding-agent evaluation guide</Link>{" "}
            — the editorial rules applied to this sub-cluster.
          </li>
          <li>
            <Link href="/best-free-ai-coding-agents">Best free AI coding agents</Link>{" "}
            — verified free-tier IDE coding agents.
          </li>
          <li>
            <Link href="/coding-agents-hub">Coding agents hub</Link>{" "}
            — the legacy coding hub, retained for URL continuity.
          </li>
          <li>
            <Link href="/categories/coding-agents">Coding category directory</Link>{" "}
            — full category taxonomy.
          </li>
        </ul>
      </section>

      <section className="prose">
        <p className="muted">
          See <Link href="/coding-agents/cli">CLI coding agents</Link>,{" "}
          <Link href="/coding-agents/open-source">open-source coding agents</Link>
          {" "}or the full <Link href="/coding-agents">coding-agents cluster</Link>.
        </p>
      </section>
    </div>
  );
}
