import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyFrameworkSources } from "@/lib/catalog";

export const metadata: Metadata = { title: "Agent Frameworks", description: "Evidence-backed AI agent frameworks and orchestration systems.", alternates: { canonical: "/frameworks" } };

export default function Page() {
  return <>
    <EntityDirectory type="framework" title="AI Agent Frameworks" description="Framework identities backed by primary source evidence, without synthetic rankings." />
    <div className="shell">
      <section className="prose">
        <h2>Framework vs. agent vs. model</h2>
        <p>A framework is a library or orchestration system developers use to build agents — it is not itself an end-user product. LangChain, LangGraph, CrewAI, and AutoGen appear here because their repository identity is verifiable, not because this site scores which one is &quot;best&quot;; the right framework depends on the orchestration pattern a specific project needs, which is not a fact this directory can determine in the abstract.</p>
        <h2>Imported catalog coverage</h2>
        <p>These {legacyFrameworkSources.length} frameworks are listed for directory coverage while field-level evidence is verified.</p>
        <ul>{legacyFrameworkSources.map((item) => <li key={item.slug}><Link href={`/frameworks/${item.slug}`}>{item.name}</Link></li>)}</ul>
      </section>
    </div>
  </>;
}
