import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent Research",
  description: "Research methodology and preserved reports with fail-closed indexing.",
  alternates: { canonical: "/research" }
};

const reports = [
  ["state-of-ai-agents-india-2026","State of AI agents in India 2026","India"],
  ["voice-latency-report","Voice latency report","Voice"]
] as const;

export default function Page(){return <div className="shell detail">
  <section className="directoryHero"><p className="eyebrow">Reproducible before publishable</p><h1>AI Agent Research &amp; Benchmark Reports</h1><p className="lead">Research routes need methods, source data and raw outputs before benchmark conclusions are indexable. Legacy reports stay accessible while their evidence bundles are rebuilt.</p><div className="directoryMeta"><span>{reports.length} preserved report routes</span><span>Fail-closed indexing</span><span>Raw evidence required</span></div></section>
  <section className="prose">
    <h2>What &quot;reproducible&quot; requires before publication</h2>
    <p>A research conclusion — a benchmark result, a market-size estimate, a latency figure — is only as trustworthy as someone else&apos;s ability to check it. Before a report on this site is indexed, it needs four things: a stated method (what was measured and how), the raw inputs or a link to them, the exact conditions under which the measurement was taken (hardware, model version, date), and outputs that a third party could reproduce with the same inputs. A number without those four things is an assertion, not a finding, regardless of how confidently it&apos;s stated.</p>
    <p>The two reports below are legacy routes: earlier drafts existed under these URLs with conclusions that didn&apos;t meet this bar, so the pages are preserved for continuity but marked <code>noindex</code> until a compliant evidence bundle replaces the prior content.</p>
  </section>
  <div className="grid">{reports.map(([slug,title,topic])=><article className="card" key={slug}><div className="authorityType"><span>{topic}</span><b>▥</b></div><p className="eyebrow">refreshing · noindex</p><h2 style={{fontSize:"21px"}}><Link href={`/research/${slug}`}>{title}</Link></h2><p>Legacy route preserved while the source bundle, method notes and reproducible outputs are rebuilt.</p><p><Link href={`/research/${slug}`}>View research state →</Link></p></article>)}</div>
  <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Research standard</p><h2>Claims need methods, not decoration.</h2><p>Benchmark numbers, latency results and market conclusions stay out of the index until their inputs and methodology can be reproduced.</p></div><Link className="button buttonPrimary" href="/methodology">Research methodology</Link></div></div></section>
</div>}
