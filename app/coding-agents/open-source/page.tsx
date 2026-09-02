import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Open-Source Coding Agents (2026): Evidence-First List",
  description:
    "Verified open-source AI coding agents. Each entry is anchored to its primary public repository and dated evidence receipt.",
  alternates: { canonical: "/coding-agents/open-source" },
  openGraph: {
    title: "Open-Source Coding Agents",
    description:
      "Open-source coding agents verified against their primary public repository.",
    url: "/coding-agents/open-source",
    type: "website"
  }
};

const isCoding = (categories: string[]) =>
  categories.some((c) => /coding|developer|code/i.test(c));
const isOpenSource = (sourceUrl: string) =>
  /^https:\/\/(github\.com|gitlab\.com)\//i.test(sourceUrl);

export default function Page() {
  const coding = entitiesByType("agent").filter((e) => isCoding(e.categories));
  const openSource = coding.filter((e) => isOpenSource(e.sourceUrl));
  const url = `${SITE.url}/coding-agents/open-source`;

  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> /{" "}
        <Link href="/coding-agents">Coding agents</Link> / Open source
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "Open-Source Coding Agents",
          description:
            "Open-source coding agents verified against primary public repositories.",
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Coding agents", item: `${SITE.url}/coding-agents` },
              { "@type": "ListItem", position: 3, name: "Open source", item: url }
            ]
          }
        }}
      />

      <p className="eyebrow">Sub-cluster · open source</p>
      <h1>Open-Source Coding Agents</h1>
      <p className="lead">
        Open-source coding agents verified against a primary public
        repository (GitHub or GitLab). License, maintainer identity and
        repository activity are reported from the upstream itself — never
        from a vendor blog.
      </p>

      <section className="prose">
        <h2>Direct answer</h2>
        <p>
          An open-source coding agent on BestAIAgent.in must point to a
          primary public repository with a verified maintainer identity.
          License terms, contribution velocity and security disclosures
          are evaluated against that repository, not against a marketing
          page. Self-hosted or vendor-forked variants stay on this list
          only when their own repository evidence clears the gate.
        </p>
      </section>

      {openSource.length > 0 ? (
        <section className="prose">
          <h2>Verified open-source coding agents ({openSource.length})</h2>
          <ul>
            {openSource.map((e) => (
              <li key={e.id}>
                <Link href={`/agents/${e.slug}`}>{e.name}</Link>
                {" — "}
                <a href={e.sourceUrl} rel="noopener noreferrer">primary repository</a>
                {" — "}
                <span className="muted">{e.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="prose">
          <p className="empty">
            No additional open-source coding agents currently pass both the
            coding-category filter and the public repository-identity check.
            This sub-cluster is retained for taxonomy continuity.
          </p>
        </section>
      )}

      <section className="prose">
        <p className="muted">
          See the full <Link href="/coding-agents">coding-agents cluster</Link>{" "}
          or the <Link href="/best-ai-agents/coding">coding pillar</Link>.
        </p>
      </section>
    </div>
  );
}
