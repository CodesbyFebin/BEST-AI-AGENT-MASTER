import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";

export const metadata: Metadata = {
  title: "AI Providers",
  description: "Provider identities and source evidence for the BestAIAgent.in entity graph.",
  alternates: { canonical: "/providers" }
};

export default function Page() {
  return <>
    <EntityDirectory type="provider" title="AI Providers Directory" description="Provider records are published only when the identity gate passes. Product claims require separate evidence." />
    <div className="shell">
      <section className="prose">
        <h2>What a provider record is</h2>
        <p>A provider is the organization or service publishing models, agents, or infrastructure — not the products themselves. One provider can publish multiple models; one agent can depend on multiple providers. Separating provider identity from product claims means a company&apos;s reputation, funding, or market position never substitutes for evidence about what a specific product actually does.</p>

        <h2>What passes the provider gate</h2>
        <p>A provider entity is published when its identity resolves to a first-party website or a verifiable public registration — a real organization, not a placeholder or an unverified listing. This is an identity check only. Compliance status, funding claims, team size, or any other operational fact about a provider requires its own field-level evidence before it appears here.</p>

        <h2>How to use provider records</h2>
        <p>Provider pages are a starting point for tracing a model or agent back to who actually publishes it. If you are evaluating a model, check its provider record for the first-party link, then verify product-specific claims — pricing, licensing, data residency — on the model&apos;s own evidence-backed page rather than assuming they carry over from the provider.</p>

        <h2>Related pages</h2>
        <ul>
          <li><Link href="/models">AI models directory</Link></li>
          <li><Link href="/agents">AI agents directory</Link></li>
          <li><Link href="/trust/source-classification">Source classification methodology</Link></li>
        </ul>
      </section>
    </div>
  </>;
}
