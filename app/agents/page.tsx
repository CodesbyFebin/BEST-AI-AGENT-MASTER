import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyAgentSources } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "AI Agents Directory",
  description: "Evidence-backed AI agent identities with primary-source provenance.",
  alternates: { canonical: "/agents" }
};

export default function Page() {
  return <>
    <EntityDirectory
      type="agent"
      title="AI Agents Directory"
      description="Browse verified agent identities. Scores, pricing and benchmarks are published only when their own evidence exists."
    />
    <div className="shell">
      <section className="prose">
        <h2>Looking for a previously indexed record?</h2>
        <p>
          This directory contains only entities that have cleared the public
          verification gate: identity, developer, and source confirmed against a
          primary source with a dated evidence receipt. Volatile fields such as
          pricing and benchmarks are not inherited from identity and stay
          unknown until separately evidenced.
        </p>
        <p>
          Looking for a previously indexed record? Browse the{" "}
          <Link href="/archive/agents">historical archive</Link> — those URLs are
          preserved at 200 for continuity but are excluded from the public crawl
          graph and search index.
        </p>
        <p className="muted">
          {legacyAgentSources.length} additional entries are retained in the
          archive for URL continuity and directory coverage. They are not part
          of the public index until field-level evidence review clears them.
        </p>
      </section>
    </div>
  </>;
}
