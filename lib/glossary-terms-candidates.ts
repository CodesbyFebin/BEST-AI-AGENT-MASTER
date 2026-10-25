/** Candidate-only glossary research inventory. NOT proof of current GSC indexing. Do not render or sitemap these records. */
export type GlossaryCandidate = {
 slug: string; term: string; cluster: number; definition: string;
 differsFrom: { term: string; slug: string; reason: string } | null;
 primarySource: { url: string; locator: string; retrievedDate: string } | null;
 relatedBlogClusters: string[]; relatedGuides: string[]; relatedTutorials: string[];
 relatedGlossaryTerms: string[]; lastVerified: string | null; editorialStatus: "candidate";
};
/** Extracted from user-provided candidate pillar/cluster slugs; not verified indexed pages. */
export const glossaryCandidates: GlossaryCandidate[] = [
  {
    "slug": "prompt-injection",
    "term": "prompt injection",
    "cluster": 6,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/prompt-injection-defense"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-red-teaming",
    "term": "agent red teaming",
    "cluster": 6,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/agent-red-teaming-benchmarks"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "model-context-protocol",
    "term": "model context protocol",
    "cluster": 2,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/mcp-agent-interoperability/mcp-beginner-setup"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-orchestration",
    "term": "agent orchestration",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/agent-orchestration-patterns"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-memory",
    "term": "agent memory",
    "cluster": 4,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-infrastructure-memory-context/agent-memory-architecture"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "retrieval-augmented-generation",
    "term": "retrieval augmented generation",
    "cluster": 4,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-infrastructure-memory-context/rag-for-agents"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "vector-database",
    "term": "vector database",
    "cluster": 4,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-infrastructure-memory-context/vector-databases-retrieval"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-benchmark",
    "term": "agent benchmark",
    "cluster": 5,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/emerging-agent-trends-future-work/agent-benchmarks-research"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "token-pricing",
    "term": "token pricing",
    "cluster": 7,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-pricing-roi-procurement/token-cost-optimization"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "total-cost-of-ownership",
    "term": "total cost of ownership",
    "cluster": 7,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-pricing-roi-procurement/total-cost-of-ownership"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "dpdp-act",
    "term": "dpdp act",
    "cluster": 8,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/agent-data-privacy-dpdp"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "voice-agent",
    "term": "voice agent",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/voice-ai-for-customer-support"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "coding-agent",
    "term": "coding agent",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/cli-coding-agents"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "no-code-agent-builder",
    "term": "no code agent builder",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/no-code-agent-builders"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "human-in-the-loop",
    "term": "human in the loop",
    "cluster": 6,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/human-in-the-loop-workflow-design"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-governance",
    "term": "agent governance",
    "cluster": 6,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/enterprise-agent-governance"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-observability",
    "term": "agent observability",
    "cluster": 5,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/emerging-agent-trends-future-work/agent-observability"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "context-window",
    "term": "context window",
    "cluster": 3,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-infrastructure-memory-context/context-engineering"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agent-adoption",
    "term": "agent adoption",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/agent-adoption-change-management"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "mcp-authentication",
    "term": "MCP authentication",
    "cluster": 2,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/mcp-agent-interoperability/mcp-authentication-oauth"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "mcp-supply-chain-security",
    "term": "MCP supply chain security",
    "cluster": 6,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/mcp-supply-chain-security"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "audit-log",
    "term": "audit log",
    "cluster": 6,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-security-governance-compliance/agent-audit-logs-explainability"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agentic-workflow",
    "term": "agentic workflow",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/agentic-workflows"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "build-vs-buy",
    "term": "build vs buy",
    "cluster": 7,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/agent-pricing-roi-procurement/build-vs-buy-decisions"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "multi-agent-system",
    "term": "multi agent system",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/multi-agent-software-development"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "cli-coding-agent",
    "term": "cli coding agent",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/cli-coding-agents"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "local-coding-agent",
    "term": "local coding agent",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/local-open-source-coding-agents"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "agents-md",
    "term": "agents md",
    "cluster": 1,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/ai-coding-agents/repository-context-agents-md"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  },
  {
    "slug": "tool-calling",
    "term": "tool calling",
    "cluster": 2,
    "definition": "",
    "differsFrom": null,
    "primarySource": null,
    "relatedBlogClusters": [
      "/blog/mcp-agent-interoperability/tool-calling-function-design"
    ],
    "relatedGuides": [],
    "relatedTutorials": [],
    "relatedGlossaryTerms": [],
    "lastVerified": null,
    "editorialStatus": "candidate"
  }
];
