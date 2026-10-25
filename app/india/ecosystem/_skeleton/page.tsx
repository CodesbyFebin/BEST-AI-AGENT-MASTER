/** Private Next.js directory: research-only template, intentionally not routed. */
export const evidenceRequired = {
  title: "Organization name — needs primary-source verification",
  unknowns: ["Current funding and valuation", "Benchmark methodology", "Regional deployment and regulatory compliance"]
} as const;

export default function ResearchTemplate() {
  return <article>
    <h1>India ecosystem company — unpublished research template</h1>
    <h2>Key numbers</h2><p>No independently sourced numbers yet.</p>
    <h2>What does the company do?</h2><p>Requires verified primary-source explanation.</p>
    <h2>Deployments and comparison</h2><p>Unknown pending first-party evidence.</p>
    <h2>What we could not verify</h2><ul>{evidenceRequired.unknowns.map((item) => <li key={item}>{item}</li>)}</ul>
  </article>;
}
