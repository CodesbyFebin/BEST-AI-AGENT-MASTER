import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Self-Hosted Coding Agents (2026): Evidence-First List",
  description:
    "Verified AI coding agents you can deploy inside your own infrastructure. Compliance and data-residency claims must come from primary documentation.",
  alternates: { canonical: "/coding-agents/self-hosted" },
  openGraph: {
    title: "Self-Hosted Coding Agents",
    description:
      "Coding-agent platforms you can deploy inside your own infrastructure, verified against primary documentation.",
    url: "/coding-agents/self-hosted",
    type: "website"
  }
};

const isCoding = (categories: string[]) =>
  categories.some((c) => /coding|developer|code/i.test(c));
const hasSelfHostedSignal = (entity: { sourceUrl: string; summary: string }) =>
  /self-host|self host|on-prem|on prem|deploy your own|docker|helm|kubernetes/i.test(
    `${entity.sourceUrl} ${entity.summary}`
  );

export default function Page() {
  const coding = entitiesByType("agent").filter((e) => isCoding(e.categories));
  const frameworks = entitiesByType("framework").filter((e) => isCoding(e.categories));
  const selfHostedAgents = coding.filter((e) => hasSelfHostedSignal(e));
  const selfHostedFrameworks = frameworks.filter((e) => hasSelfHostedSignal(e));
  const url = `${SITE.url}/coding-agents/self-hosted`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> /{" "}
        <Link href="/coding-agents">Coding agents</Link> / Self-hosted
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "Self-Hosted Coding Agents",
          description:
            "Coding-agent platforms you can deploy inside your own infrastructure.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Coding agents", item: `${SITE.url}/coding-agents` },
              { "@type": "ListItem", position: 3, name: "Self-hosted", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Sub-cluster · self-hosted</p>
      <h1>Self-Hosted Coding Agents</h1>
      <p className="lead">
        Coding-agent platforms you can deploy inside your own
        infrastructure. Compliance, data-residency and audit claims are
        reported from primary documentation, not inferred from
        self-hosting availability alone.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          Self-hosted coding agents on BestAIAgent.in must have a primary
          deployment guide, a public release channel, and identity
          verification against an upstream maintainer. SOC 2, HIPAA, DPDP
          or data-residency claims stay unknown unless the vendor
          publishes them on a primary source such as a trust page,
          deployment guide or regulator filing.
        </p>
      </section>

      {selfHostedAgents.length > 0 ? (
        <section className="prose">
          <h2>Verified self-hostable coding agents ({selfHostedAgents.length})</h2>
          <ul>
            {selfHostedAgents.map((e) => (
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
      ) : null}

      {selfHostedFrameworks.length > 0 ? (
        <section className="prose">
          <h2>Verified self-hostable coding frameworks ({selfHostedFrameworks.length})</h2>
          <ul>
            {selfHostedFrameworks.map((e) => (
              <li key={e.id}>
                <Link href={`/frameworks/${e.slug}`}>{e.name}</Link>
                {" — "}
                <a href={e.sourceUrl} rel="noopener noreferrer">primary source</a>
                {" — "}
                <span className="muted">{e.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {selfHostedAgents.length === 0 && selfHostedFrameworks.length === 0 ? (
        <section className="prose">
          <p className="empty">
            No coding agents or frameworks currently expose self-host
            signals (Docker / Helm / Kubernetes / explicit on-prem
            guidance) on the public evidence gate. The route is retained
            for taxonomy continuity.
          </p>
        </section>
      ) : null}

      <section className="prose">
        <p className="muted">
          See <Link href="/coding-agents/local">local coding agents</Link>,{" "}
          <Link href="/coding-agents/open-source">open-source coding agents</Link>
          {" "}or the full <Link href="/coding-agents">coding-agents cluster</Link>.
        </p>
      </section>
    </div>
  );
}
