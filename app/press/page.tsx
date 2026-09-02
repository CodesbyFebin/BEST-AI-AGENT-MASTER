import type { Metadata } from "next";
import Link from "next/link";
import { getPublicCatalogStats } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Press Kit — Media Resources & Brand Assets",
  description: "Download press kit materials, brand assets, and media resources for BestAIAgent.in.",
  alternates: { canonical: "/press" }
};

export default function PressPage() {
  const stats = getPublicCatalogStats();
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Press</div>
    <section className="detailHero">
      <p className="eyebrow">Press</p>
      <h1>Press kit</h1>
      <p className="lead">
        Media resources and brand assets for BestAIAgent.in. Logos,
        screenshots, and fact sheets for press coverage and partnerships.
      </p>
    </section>

    <div className="prose">
      <h2>About BestAIAgent.in</h2>
      <p>
        BestAIAgent.in is an India-built, evidence-backed AI agent directory.
        We evaluate AI agents using a transparent publication methodology that
        requires primary-source evidence, SHA-256 source hashing, and explicit
        treatment of unknown fields.
      </p>
      <p>
        The directory covers AI agents, foundational models, agent frameworks,
        providers and MCP infrastructure documentation. Public counts below
        are generated from the live registry and are always current.
      </p>
      <p>
        We do not accept vendor payments for placement and maintain strict
        editorial independence.
      </p>
    </div>

    <div className="clusterGrid" style={{ margin: "24px 0" }}>
      <div className="cluster">
        <b style={{ fontSize: "28px", color: "var(--green)" }}>{stats.entities}</b>
        <div className="muted">Verified public entities</div>
      </div>
      <div className="cluster">
        <b style={{ fontSize: "28px", color: "var(--green)" }}>{stats.agents}</b>
        <div className="muted">Verified agent profiles</div>
      </div>
      <div className="cluster">
        <b style={{ fontSize: "28px", color: "var(--green)" }}>{stats.comparisons}</b>
        <div className="muted">Evidence-ready comparisons</div>
      </div>
      <div className="cluster">
        <b style={{ fontSize: "28px", color: "var(--green)" }}>{stats.evidenceReceipts}</b>
        <div className="muted">Verified evidence receipts</div>
      </div>
    </div>

    <p className="muted" style={{ fontSize: "12px", marginBottom: "24px" }}>
      Counts above are generated dynamically from{" "}
      <code>getPublicCatalogStats()</code> in <code>lib/catalog.ts</code>.
      BestAIAgent.in does not publish quantitative audience claims,
      readership figures, or ranking superlatives unless they are backed by
      independently verifiable analytics or methodology.
    </p>

    <div className="prose">
      <h2>Brand assets</h2>
      <p>
        Logo (SVG/PNG, full color and monochrome) and high-resolution
        screenshots of key pages are available on request. No license has
        been formally granted for these assets yet — contact us before
        reusing them, the same as with the rest of this project (see the
        README&apos;s License section).
      </p>

      <h2>Brand guidelines</h2>
      <ul>
        <li>Always use the official logo files.</li>
        <li>
          Maintain clear space around the logo equal to the height of the
          &ldquo;B&rdquo; in BestAIAgent.
        </li>
        <li>Do not modify, distort or recolor the logo.</li>
        <li>
          Use &ldquo;BestAIAgent.in&rdquo; (with the .in domain) when referring
          to the platform.
        </li>
        <li>
          Do not use the logo in a way that suggests endorsement of another
          product or service.
        </li>
      </ul>

      <h2>Quotes for publication</h2>
      <p>
        <em>
          &ldquo;BestAIAgent.in is committed to providing evidence-backed
          evaluations that help developers, technical leads, and procurement
          teams make informed decisions. Our no-pay-to-rank policy ensures that
          publication status reflects verifiable evidence, not marketing
          budgets.&rdquo;
        </em>{" "}
        — BestAIAgent.in Editorial Team
      </p>
      <p>
        <em>
          &ldquo;The site&apos;s India / Indic coverage is built from primary
          sources — model cards, repository identities, provider pages — and
          never infers DPDP compliance, data residency, or sovereignty from a
          product name or category alone.&rdquo;
        </em>{" "}
        — BestAIAgent.in Editorial Team
      </p>

      <h2>Media contact</h2>
      <p>
        Email: <a href="mailto:press@bestaiagent.in">press@bestaiagent.in</a>
        <br />
        GitHub:{" "}
        <a href="https://github.com/CodesbyFebin/bestaiagent.in">
          github.com/CodesbyFebin/bestaiagent.in
        </a>
        <br />
        Response time: within 48 hours
      </p>

      <h2>Spokesperson</h2>
      <p>
        Our editorial team is available for interviews and commentary on AI
        agent evaluation methodology, MCP infrastructure, the evidence-first
        publication doctrine, and India AI ecosystem developments. Topics we
        can comment on include agent identity verification, MCP server
        source-led cataloguing, primary-source evidence hashing, and
        evidence-first directory architecture.
      </p>
    </div>
  </div>;
}
