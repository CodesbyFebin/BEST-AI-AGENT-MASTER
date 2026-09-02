import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comparison archive — preserved legacy routes",
  description:
    "Legacy comparison URLs preserved for continuity. Excluded from the public crawl graph and search index.",
  alternates: { canonical: "/compare/archive" },
  robots: { index: false, follow: true }
};

export default function Page() {
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
        Looking for a verified comparison? Browse the{" "}
        <Link href="/compare">public comparison hub</Link> — entries there
        pass the field-level evidence gate on both sides.
      </p>
      <p className="muted">
        In-progress entries are listed separately under{" "}
        <Link href="/compare/research">active research</Link>.
      </p>
    </div>
  </div>;
}
