import type { Metadata } from "next";
import Link from "next/link";
import { allComparisons, publicIndexableComparisons } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Comparison archive — preserved legacy routes",
  description:
    "Legacy comparison URLs preserved for continuity. Excluded from the public crawl graph and search index.",
  alternates: { canonical: "/compare/archive" },
  robots: { index: false, follow: true }
};

export default function Page() {
  const legacyCount = allComparisons.length - publicIndexableComparisons.length;
  const preservedByStatus = allComparisons.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return <div className="shell detail">
    <section className="directoryHero">
      <p className="eyebrow">Archive / comparisons</p>
      <h1>Preserved legacy comparison routes</h1>
      <p className="lead">
        Older comparison URLs that existed on BestAIAgent.in before the
        evidence-first rebuild. They are reachable at their original
        <code> /compare/[slug]</code> path but are noindex and excluded from
        the sitemap.
      </p>
      <div className="directoryMeta">
        <span>noindex,follow</span>
        <span>URL continuity only</span>
        <span>Sitemap excluded</span>
      </div>
    </section>
    <div className="prose">
      <p>
        BestAIAgent.in preserved older comparison URLs so that external links
        do not break. During the evidence-first rebuild, comparisons that did
        not clear the field-level evidence gate were removed from the public
        graph and moved to this archive route. No synthetic winner scores or
        benchmark leaderboard content was carried forward; only the URL
        structure is retained for continuity.
      </p>
      <div className="dlGrid">
        <div>
          <p className="eyebrow">Preserved by status</p>
          <ul>
            {Object.entries(preservedByStatus).map(([status, count]) => (
              <li key={status}>
                <code>{status}</code>: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Evidence-ready in public graph</p>
          <p>{publicIndexableComparisons.length}</p>
        </div>
        <div>
          <p className="eyebrow">Total legacy comparisons archived</p>
          <p>{legacyCount}</p>
        </div>
      </div>
      <p className="muted">
        In-progress entries are listed separately under{" "}
        <Link href="/compare/research">active research</Link>.
      </p>
    </div>
  </div>;
}
