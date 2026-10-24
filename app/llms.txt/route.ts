import { SITE } from "@/lib/site";
import { trustPages } from "@/lib/trust";

export const dynamic = "force-static";

export async function GET() {
  const trustLines = Object.keys(trustPages).map((slug) => `- ${SITE.url}/trust/${slug}`).join("\n");
  const text = `# BestAIAgent.in

Evidence-first, statically published directory of AI agents, models, frameworks, providers and MCP infrastructure. Content inclusion is not an endorsement.

Publication rule: discovery is not verification. Public entity detail pages require qualified evidence; unresolved historical URLs remain noindex or quarantined.

## Core directories
- ${SITE.url}/agents
- ${SITE.url}/models
- ${SITE.url}/frameworks
- ${SITE.url}/providers
- ${SITE.url}/categories
- ${SITE.url}/compare
- ${SITE.url}/india
- ${SITE.url}/mcp

## Topic clusters
- ${SITE.url}/best-ai-agents
- ${SITE.url}/best-ai-agents/coding
- ${SITE.url}/coding-agents
- ${SITE.url}/coding-agents/open-source
- ${SITE.url}/coding-agents/cli
- ${SITE.url}/coding-agents/ide
- ${SITE.url}/coding-agents/local
- ${SITE.url}/coding-agents/self-hosted

## High-intent authority guides
- ${SITE.url}/cursor-pricing
- ${SITE.url}/github-copilot-pricing
- ${SITE.url}/claude-code-pricing
- ${SITE.url}/what-is-mcp
- ${SITE.url}/best-free-ai-agents
- ${SITE.url}/best-free-ai-coding-agents
- ${SITE.url}/ai-agent-benchmarks
- ${SITE.url}/ai-agent-rankings
- ${SITE.url}/coding-agents-hub
- ${SITE.url}/ai-agent-market-map
- ${SITE.url}/glossary-hub
- ${SITE.url}/tools
- ${SITE.url}/api-docs
- ${SITE.url}/verify

## Trust and methodology
- ${SITE.url}/methodology
- ${SITE.url}/editorial-policy
- ${SITE.url}/review-process
- ${SITE.url}/corrections
- ${SITE.url}/trust
${trustLines}

## Community marketplace submissions
- ${SITE.url}/submit — submit through a GitHub pull request
- ${SITE.url}/marketplace — browse editorially accepted records
- https://github.com/CodesbyFebin/BEST-AI-AGENT-MASTER/blob/main/submissions/TEMPLATE.yaml — YAML submission template

## Machine-readable
- ${SITE.url}/catalog.json — evidence-gated published catalog
- ${SITE.url}/llms-full.txt — extended public index
- ${SITE.url}/sitemap.xml — canonical indexable URL set

Hosting: GitHub Pages static export. Editorial draft pages may be reachable but excluded from search indexing.
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
