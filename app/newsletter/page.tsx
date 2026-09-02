import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter — AI Agent Updates for India",
  description: "Subscribe for weekly updates on AI agents, MCP developments, DPDP compliance, and the India AI ecosystem.",
  alternates: { canonical: "/newsletter" },
  robots: { index: false, follow: true }
};

export default function NewsletterPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Newsletter</div>
    <section className="detailHero">
      <p className="eyebrow">Newsletter</p>
      <h1>BestAIAgent.in newsletter</h1>
      <p className="lead">Newsletter planning page for future evidence and catalog updates.</p>
      <p className="warning">Subscriptions are not currently available. No email form is connected, no subscriber count is claimed, and no publication schedule is promised.</p>
    </section>

    <div className="prose">
      <h2>What you will receive</h2>
      <div className="clusterGrid">
        <div className="cluster"><h3>New agent listings</h3><p className="muted">Potential summaries of newly verified records and the receipts used to qualify them.</p></div>
        <div className="cluster"><h3>Evidence updates</h3><p className="muted">Potential notices when a source is refreshed, becomes stale, or changes a displayed field.</p></div>
        <div className="cluster"><h3>MCP developments</h3><p className="muted">The latest MCP server additions, transport updates, and security advisories.</p></div>
        <div className="cluster"><h3>India AI news</h3><p className="muted">Analysis of India-specific AI developments including DPDP compliance and sovereign AI initiatives.</p></div>
      </div>

      <h2>Launch requirements</h2>
      <p>Before this page can accept an email address, the project needs a named processor, consent copy, retention and deletion rules, unsubscribe handling, and an auditable privacy notice. Until those exist, this page stays noindex and collects no data.</p>
    </div>
  </div>;
}
