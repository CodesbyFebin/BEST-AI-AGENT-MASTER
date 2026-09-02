import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Local Coding Agents (2026): Evidence-First List",
  description:
    "Verified AI coding agents that operate against local models or local-first deployments. Identity is anchored to primary repositories or package distributions.",
  alternates: { canonical: "/coding-agents/local" },
  openGraph: {
    title: "Local Coding Agents",
    description:
      "Coding agents that run against local models or local-first deployments, verified against primary repositories.",
    url: "/coding-agents/local",
    type: "website"
  }
};

const isCoding = (categories: string[]) =>
  categories.some((c) => /coding|developer|code/i.test(c));
const isLocalSource = (sourceUrl: string) =>
  !/^https:\/\/(api|cloud|chat)\./i.test(sourceUrl);

export default function Page() {
  const coding = entitiesByType("agent").filter((e) => isCoding(e.categories));
  const local = coding.filter((e) => isLocalSource(e.sourceUrl));
  const url = `${SITE.url}/coding-agents/local`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> /{" "}
        <Link href="/coding-agents">Coding agents</Link> / Local
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "Local Coding Agents",
          description:
            "Coding agents that operate against local models or local-first deployments.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Coding agents", item: `${SITE.url}/coding-agents` },
              { "@type": "ListItem", position: 3, name: "Local", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Sub-cluster · local</p>
      <h1>Local Coding Agents</h1>
      <p className="lead">
        Coding agents that operate against local models or local-first
        deployments. Latency and privacy claims are evaluated against
        primary sources — never inferred from deployment category.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          A local coding agent on BestAIAgent.in is any verified coding
          agent whose primary source is a repository or package
          distribution rather than a hosted API surface. Local-first
          agents may still call hosted models; that is reported from the
          primary documentation, not assumed from the surface label.
        </p>
      </section>

      {local.length > 0 ? (
        <section className="prose">
          <h2>Verified local coding agents ({local.length})</h2>
          <ul>
            {local.map((e) => (
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
            No additional local coding agents currently pass both the
            coding-category filter and the primary-source identity check.
          </p>
        </section>
      )}

      <section className="prose">
        <p className="muted">
          See <Link href="/coding-agents/self-hosted">self-hosted coding agents</Link>,{" "}
          <Link href="/coding-agents/open-source">open-source coding agents</Link>
          {" "}or the full <Link href="/coding-agents">coding-agents cluster</Link>.
        </p>
      </section>
    </div>
  );
}
