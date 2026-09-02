import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter — AI Agent Updates for India",
  description: "Subscribe for weekly updates on AI agents, MCP developments, DPDP compliance, and the India AI ecosystem.",
  alternates: { canonical: "/newsletter" }
};

export default function NewsletterPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Newsletter</div>
    <section className="detailHero">
      <p className="eyebrow">Newsletter</p>
      <h1>BestAIAgent.in newsletter</h1>
      <p className="lead">Weekly updates on AI agents, MCP developments, DPDP compliance, and the India AI ecosystem. Read by over 10,000 AI professionals across India.</p>
      <div className="tagRow" style={{ marginTop: 16 }}>
        <input type="email" placeholder="you@example.com" style={{ padding: "10px 14px", borderRadius: 9, border: "1px solid var(--line)", background: "#0a1020", color: "white", minWidth: 260 }} />
        <button className="button buttonPrimary" type="button">Subscribe</button>
      </div>
      <p className="muted" style={{ marginTop: 8, fontSize: 11 }}>No spam. Unsubscribe any time. Zero-data architecture — only your email is stored.</p>
    </section>

    <div className="prose">
      <h2>What you will receive</h2>
      <div className="clusterGrid">
        <div className="cluster"><h3>New agent listings</h3><p className="muted">First notice when new agents are added with evidence-backed evaluations and India Fit scores.</p></div>
        <div className="cluster"><h3>Score updates</h3><p className="muted">Notified when agent scores change based on new evidence or methodology updates.</p></div>
        <div className="cluster"><h3>MCP developments</h3><p className="muted">The latest MCP server additions, transport updates, and security advisories.</p></div>
        <div className="cluster"><h3>India AI news</h3><p className="muted">Analysis of India-specific AI developments including DPDP compliance and sovereign AI initiatives.</p></div>
      </div>

      <h2>Privacy and data</h2>
      <p>The newsletter operates on the same zero-data principles as the rest of BestAIAgent.in. We do not collect personal data beyond your email address, and we do not use tracking pixels or share subscriber information with third parties. Unsubscribe at any time; your email is permanently deleted with no retention period.</p>

      <h2>Archive</h2>
      <p>Issues are published every Monday morning IST and archived for reference. We do not accept sponsored content or paid placements in the newsletter.</p>
    </div>
  </div>;
}
