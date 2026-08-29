import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyAgentSources } from "@/lib/catalog";

export const metadata: Metadata = { title: "AI Agents Directory", description: "Evidence-backed AI agent identities with primary-source provenance.", alternates: { canonical: "/agents" } };

export default function Page() {
  return <>
    <EntityDirectory type="agent" title="AI Agents Directory" description="Browse verified agent identities. Scores, pricing and benchmarks are published only when their own evidence exists." />
    <div className="shell">
      <section className="prose">
        <h2>Two tiers of listing</h2>
        <p>Agents above the fold have cleared the public verification gate: identity, developer, and source are confirmed against a primary source with a dated evidence receipt. The larger list below — {legacyAgentSources.length} entries — is retained for URL continuity and directory coverage. Their pages are reachable and honestly marked as unverified rather than hidden; they have not yet passed field-level evidence review, so no score, pricing, or capability claim is attached to them.</p>
        <h2>Legacy source-linked routes</h2>
        <p>These URLs are retained for continuity while field-level evidence is refreshed.</p>
        <ul>{legacyAgentSources.map((item) => <li key={item.slug}><Link href={`/agents/${item.slug}`}>{item.name}</Link></li>)}</ul>
      </section>
    </div>
  </>;
}
