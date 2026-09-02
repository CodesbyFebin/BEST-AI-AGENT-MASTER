import type { Metadata } from "next";
import Link from "next/link";
import { legacyAgentSources } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Legacy Agent Archive",
  description:
    "Legacy and unverified agent URLs preserved for continuity. Excluded from the public crawl graph and search index.",
  alternates: { canonical: "/archive/agents" },
  robots: { index: false, follow: true }
};

export default function Page() {
  const byCategory = legacyAgentSources.reduce(
    (acc, item) => {
      item.categories.forEach((c) => {
        acc[c] = (acc[c] ?? 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );
  const topCategories = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="shell detail">
      <section className="directoryHero">
        <p className="eyebrow">Archive / agents</p>
        <h1>Legacy agent inventory</h1>
        <p className="lead">
          {legacyAgentSources.length} entries preserved for URL continuity. Each
          record is reachable at its original <code>/agents/[slug]</code> URL.
          None of them appear in the public sitemap or the search index.
        </p>
        <div className="directoryMeta">
          <span>noindex,follow</span>
          <span>Sitemap excluded</span>
          <span>Discovery only</span>
        </div>
      </section>
      <section className="prose">
        <p>
          These entries were retained during the evidence-first rebuild so that
          external links do not break. They have not cleared field-level
          evidence review; old BestAI scores, INR pricing, and benchmark winner
          claims were intentionally removed. Each entry page still surfaces its
          first-party source link and the developer name. No universal numeric
          score or leaderboard position is associated with any preserved
          entry.
        </p>
        <p>
          Looking for a verified agent? Browse the{" "}
          <Link href="/agents">current AI Agents Directory</Link>.
        </p>
      </section>
      <section className="prose">
        <p className="eyebrow">Preserved by category</p>
        <ul>
          {topCategories.map(([category, count]) => (
            <li key={category}>
              <code>{category}</code>: {count}
            </li>
          ))}
        </ul>
        <p className="muted">
          Categories with fewer than 5 preserved entries are omitted from this
          summary but are still retained in the archive for URL continuity.
        </p>
      </section>
      <div className="clusterGrid">
        {legacyAgentSources.map((item) => (
          <div className="cluster" key={item.slug}>
            <p className="muted" style={{ fontSize: "10px", marginBottom: "4px" }}>
              {item.developer}
            </p>
            <p style={{ margin: 0 }}>
              <Link href={`/agents/${item.slug}`}>{item.name}</Link>
            </p>
            <p className="muted" style={{ fontSize: "11px", marginTop: "6px" }}>
              {item.categories.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
