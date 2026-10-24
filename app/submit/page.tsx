import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Submit an AI Agent, Model, Skill or MCP Server",
  description: "Submit your AI project to BestAIAgent.in through a public GitHub pull request and an evidence-conscious editorial review.",
  alternates: { canonical: "/submit" }
};
const repo = "https://github.com/CodesbyFebin/BEST-AI-AGENT-MASTER";
export default function SubmitPage() {
  return <div className="shell detail">
    <p className="eyebrow">Open directory · Git-native submissions</p>
    <h1>Submit your AI project</h1>
    <p className="lead">Propose agents, bots, models, skills, MCP servers and frameworks with a GitHub pull request. Editorial approval and evidence review are separate; a SHA-256 string alone is not proof of a product claim.</p>
    <section className="section">
      <h2>How to submit</h2>
      <ol>
        <li><a href={repo}>Fork the repository</a>.</li>
        <li>Copy <a href={repo + "/blob/main/submissions/TEMPLATE.yaml"}>submissions/TEMPLATE.yaml</a> to the appropriate category directory.</li>
        <li>Describe the project, include a real upstream repository, and disclose your affiliation.</li>
        <li>Leave evidence hash and retrieval time blank if you do not have a retained, reproducible source snapshot.</li>
        <li>Run <code>npm run verify:submissions</code>, open a pull request and respond to any editorial review.</li>
      </ol>
      <p><a href={repo + "/compare"}>Open a submission pull request →</a></p>
    </section>
    <section className="section"><h2>Accepted categories</h2>
      <p>Agents, bots, models, skills, MCP servers and frameworks. No paid ranking, purchase, rental, payout or guaranteed review timeline is currently implemented.</p>
      <h2>Verification and publication</h2>
      <p>CI checks syntax, required fields, URLs, duplicates and evidence formatting. A human maintainer separately reviews factual claims and source records. Pending and rejected entries do not become public listings. The existing evidence-gated catalog remains authoritative.</p>
      <p><Link href="/methodology">Review our methodology</Link> · <Link href="/marketplace">Browse the marketplace</Link></p>
    </section>
  </div>;
}
