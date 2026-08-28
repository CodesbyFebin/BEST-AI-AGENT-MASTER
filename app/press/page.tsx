import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press Kit — Media Resources & Brand Assets",
  description: "Download press kit materials, brand assets, and media resources for BestAIAgent.in.",
  alternates: { canonical: "/press" }
};

export default function PressPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Press</div>
    <section className="detailHero">
      <p className="eyebrow">Press</p>
      <h1>Press kit</h1>
      <p className="lead">Media resources and brand assets for BestAIAgent.in. Logos, screenshots, and fact sheets for press coverage and partnerships.</p>
    </section>

    <div className="prose">
      <h2>About BestAIAgent.in</h2>
      <p>BestAIAgent.in is an India-focused, evidence-backed AI agent directory. We evaluate AI agents using a transparent scoring methodology that emphasizes verifiable evidence, India Fit assessment, and editorial independence.</p>
      <p>Founded in 2024, we have grown from a GitHub repository to a platform covering AI agents, foundational models, agent frameworks, and MCP infrastructure documentation. Our directory serves over 50,000 monthly readers, primarily developers, technical leads, and procurement professionals in the Indian tech sector.</p>
      <p>We operate on a zero-data architecture, do not accept vendor payments for placement, and maintain strict editorial independence.</p>
    </div>

    <div className="clusterGrid" style={{ margin: "24px 0" }}>
      <div className="cluster"><b style={{ fontSize: "28px", color: "var(--green)" }}>150+</b><div className="muted">Pages of content</div></div>
      <div className="cluster"><b style={{ fontSize: "28px", color: "var(--green)" }}>69</b><div className="muted">Agent profiles</div></div>
      <div className="cluster"><b style={{ fontSize: "28px", color: "var(--green)" }}>50K+</b><div className="muted">Monthly readers</div></div>
      <div className="cluster"><b style={{ fontSize: "28px", color: "var(--green)" }}>0</b><div className="muted">Vendor payments</div></div>
    </div>

    <div className="prose">
      <h2>Brand assets</h2>
      <p>Logo (SVG/PNG, full color and monochrome) and high-resolution screenshots of key pages are available under Creative Commons Attribution-ShareAlike 4.0 International License.</p>

      <h2>Brand guidelines</h2>
      <ul>
        <li>Always use the official logo files.</li>
        <li>Maintain clear space around the logo equal to the height of the &quot;B&quot; in BestAIAgent.</li>
        <li>Do not modify, distort or recolor the logo.</li>
        <li>Use &quot;BestAIAgent.in&quot; (with the .in domain) when referring to the platform.</li>
        <li>Do not use the logo in a way that suggests endorsement of another product or service.</li>
      </ul>

      <h2>Quotes for publication</h2>
      <p><em>&quot;BestAIAgent.in is committed to providing evidence-backed evaluations that help the Indian AI community make informed decisions. Our no pay-to-rank policy ensures that our scores reflect genuine capability, not marketing budgets.&quot;</em> — BestAIAgent.in Editorial Team</p>
      <p><em>&quot;The India Fit score is our contribution to AI evaluation — INR pricing, UPI support, Indic language capabilities, and DPDP compliance — dimensions that global directories often overlook.&quot;</em> — BestAIAgent.in Editorial Team</p>

      <h2>Media contact</h2>
      <p>Email: press@bestaiagent.in<br />GitHub: <a href="https://github.com/CodesbyFebin/bestaiagent.in">github.com/CodesbyFebin/bestaiagent.in</a><br />Response time: within 48 hours</p>

      <h2>Spokesperson</h2>
      <p>Our editorial team is available for interviews and commentary on AI agent evaluation, MCP infrastructure, DPDP compliance, and India AI ecosystem developments. Topics we can comment on include agent scoring methodology, MCP server security, DPDP Act compliance for AI systems, Indic language model evaluation, and sovereign AI deployment strategies.</p>
    </div>
  </div>;
}
