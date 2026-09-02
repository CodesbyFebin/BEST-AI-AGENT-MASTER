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
  const byStatus = research.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <section className="directoryHero">
        <p className="eyebrow">Research / verification in progress</p>
        <h1>Active research comparisons</h1>
        <p className="lead">
          {research.length} comparisons whose evidence is being refreshed. They
          remain reachable but are excluded from the public crawl graph
          and the search index until both sides carry equivalent, reproducible
          field-level evidence.
        </p>
        <div className="directoryMeta">
          <span>noindex,follow</span>
          <span>Verification in progress</span>
          <span>Sitemap excluded</span>
          <span>llms.txt excluded</span>
        </div>
      </section>
      <section className="prose">
        <p>
          No winner is asserted on these pages. Each entry preserves its
          original slug so external links stay reachable, but the underlying
          evidence chain must clear the same gate as the public comparison
          graph before the comparison is promoted to{" "}
          <Link href="/compare">the public comparison hub</Link>({publicIndexableComparisons.length}
          currently evidence-ready).
        </p>
        <p>
          Comparisons remain in research status when one or both sides have
          incomplete field-level evidence, ambiguous benchmark methodology, or
          pricing that requires a dated evidence receipt. The comparison is
          not promoted until both entities carry verified identities and every
          compared field has a primary-source receipt attached.
        </p>
        <div className="dlGrid">
          <div>
            <p className="eyebrow">Preservation by status</p>
            <ul>
              {Object.entries(byStatus).map(
                ([status, count]) => (
                  <li key={status}>
                    <code>{status}</code>: {count}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Evidence-ready in public graph</p>
            <p>{publicIndexableComparisons.length}</p>
          </div>
        </div>
      </section>
      <p>
        Looking for a verified comparison? Browse the{" "}
        <Link href="/compare">public comparison hub</Link>{" "}
        — entries there pass the field-level evidence gate on both sides.
      </p>
    </>
  );
}