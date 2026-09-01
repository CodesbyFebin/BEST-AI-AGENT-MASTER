import type { Metadata } from "next";
import Link from "next/link";
import { allComparisons, publicIndexableComparisons, isPublicIndexableComparison } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Active research — comparisons in verification",
  description:
    "Comparisons whose evidence is being refreshed. noindex until both sides clear the publication gate.",
  alternates: { canonical: "/compare/research" },
  robots: { index: false, follow: true }
};

export default function Page() {
  const research = allComparisons.filter((item) => !isPublicIndexableComparison(item));
  return <div className="shell detail">
    <section className="directoryHero">
      <p className="eyebrow">Research / verification in progress</p>
      <h1>Active research comparisons</h1>
      <p className="lead">
        {research.length} comparisons whose evidence is being refreshed. They
        remain reachable but are excluded from the public crawl graph and the
        search index until both sides carry equivalent, reproducible
        field-level evidence.
      </p>
      <div className="directoryMeta">
        <span>noindex,follow</span>
        <span>Verification in progress</span>
        <span>Sitemap excluded</span>
        <span>llms.txt excluded</span>
      </div>
    </section>
    <div className="prose">
      <p>
        No winner is asserted on these pages. Each entry preserves its
        original slug so external links stay reachable, but the underlying
        evidence chain must clear the same gate as the public comparison
        graph before the comparison is promoted to <Link href="/compare">the
        public comparison hub</Link> ({publicIndexableComparisons.length}
        currently evidence-ready).
      </p>
    </div>
    <div className="clusterGrid">
      {research.map((item) => (
        <div className="cluster" key={item.slug}>
          <p className="muted" style={{ fontSize: "10px", marginBottom: "4px" }}>
            {item.status}
          </p>
          <p style={{ margin: 0 }}>
            <Link href={`/compare/${item.slug}`}>{item.title}</Link>
          </p>
          <p className="muted" style={{ fontSize: "11px", marginTop: "6px" }}>
            {item.a.type}/{item.a.slug} vs {item.b.type}/{item.b.slug}
          </p>
        </div>
      ))}
    </div>
  </div>;
}
