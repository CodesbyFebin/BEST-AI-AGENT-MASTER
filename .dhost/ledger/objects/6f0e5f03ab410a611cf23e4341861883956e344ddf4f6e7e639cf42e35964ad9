import type { Metadata } from "next";
import Link from "next/link";
import { legacyAgentSources, legacyModelSources, legacyFrameworkSources } from "@/lib/catalog";
import { allComparisons } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Archive — Historical Records",
  description:
    "Historical URLs preserved at 200 for continuity. Excluded from the public crawl graph and search index until field-level evidence review clears them.",
  alternates: { canonical: "/archive" },
  robots: { index: false, follow: true }
};

export default function Page() {
  const preservedComparisons = allComparisons.filter((item) => item.status !== "evidence-ready").length;
  return <div className="shell detail">
    <section className="directoryHero">
      <p className="eyebrow">Archive</p>
      <h1>Historical records</h1>
      <p className="lead">
        These URLs are preserved at 200 for backlink continuity and directory
        coverage. They are excluded from the public crawl graph and the search
        index until field-level evidence review clears each entry.
      </p>
      <div className="directoryMeta">
        <span>noindex,follow</span>
        <span>Preserved URLs only</span>
        <span>Excluded from sitemaps</span>
      </div>
    </section>
    <div className="prose">
      <p>
        BestAIAgent.in no longer routes search traffic to pages that cannot
        clear the same publication gate as the public directory. Old score,
        leaderboard, and pricing content was removed during the
        evidence-first rebuild; preserved pages keep their URL but are not
        promoted or indexed.
      </p>
      <ul>
        <li>
          <Link href="/archive/agents">Legacy agent inventory</Link> —{" "}
          {legacyAgentSources.length} preserved records (URLs stay reachable
          under <code>/agents/[slug]</code>).
        </li>
        <li>
          <Link href="/compare/research">Active research comparisons</Link> —{" "}
          {preservedComparisons} entries whose evidence is being refreshed.
        </li>
        <li>
          <Link href="/compare/archive">Preserved legacy comparisons</Link> —
          route-only continuity for older comparison URLs.
        </li>
      </ul>
      <p className="muted">
        Legacy model entries ({legacyModelSources.length}) and legacy framework
        entries ({legacyFrameworkSources.length}) are reachable through their
        existing entity URLs and are documented in the donor merge audit.
      </p>
    </div>
  </div>;
}
