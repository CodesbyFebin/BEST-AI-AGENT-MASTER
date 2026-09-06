export type ToolEvidenceReceipt = {
  claim: string;
  sourceUrl: string;
  // SHA-256 of the fetched source content. Null until captured by
  // scripts/verify-tool-evidence.mjs and human-reviewed.
  sha256Hash: string | null;
  verifiedAt: string | null;
  status: "pending_review" | "verified" | "disputed";
};

export type ToolProfile = {
  name: string;
  developer: string;
  summary: string;
  sourceUrl: string;
  sourceLabel: string;
  categories: string[];
  index: boolean;
  lastReviewed: string;
  // Evidence-gated entries carry receipts; legacy entries (e.g. superagent)
  // predate the receipt system and keep their existing index flag.
  evidenceReceipts?: ToolEvidenceReceipt[];
};

// Individual tool profiles, keyed by slug, distinct from the score-based
// app/tools listing. Each entry describes a specific tool's current, real
// positioning based on its own primary source — not a category-average score.
export const tools: Record<string, ToolProfile> = {
  superagent: {
    name: "Superagent",
    developer: "Superagent AI (Y Combinator-backed)",
    summary: "Superagent is an open-source security layer for AI applications: it screens prompts and model outputs for prompt-injection attempts, data leaks, and harmful content, aimed at teams that need to prove compliance rather than at teams looking for a general-purpose agent-building framework.",
    sourceUrl: "https://github.com/superagent-ai/superagent",
    sourceLabel: "Official upstream repository",
    categories: ["ai-security", "guardrails", "compliance"],
    index: true,
    lastReviewed: "2026-08-30"
  },
  crewai: {
    name: "CrewAI",
    developer: "CrewAI Inc.",
    summary: "CrewAI is a multi-agent orchestration framework for building role-playing autonomous AI agents that delegate tasks and share context across a crew of specialized agents. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://github.com/crewAIInc/crewAI",
    sourceLabel: "Official upstream repository",
    categories: ["multi-agent", "orchestration", "frameworks"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "CrewAI Inc. develops CrewAI, and the official source repository is github.com/crewAIInc/crewAI.",
        sourceUrl: "https://github.com/crewAIInc/crewAI",
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
      },
      {
        claim: "The official documentation describes role-playing multi-agent crews with task delegation.",
        sourceUrl: "https://docs.crewai.com/",
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture; none are inherited from third parties).",
        sourceUrl: "https://www.crewai.com/pricing",
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
      }
    ]
  }
};

// FAIL-CLOSED indexability gate. A receipt-bearing tool is indexable only
// when the editorial flag is set AND every receipt is verified with a
// captured hash. Receipt-less (legacy) entries fall back to their own flag
// so this change does not silently alter existing indexation.
export function isToolIndexable(slug: string): boolean {
  const tool = tools[slug];
  if (!tool) return false;
  if (!tool.index) return false;
  if (!tool.evidenceReceipts) return true;
  return (
    tool.evidenceReceipts.length > 0 &&
    tool.evidenceReceipts.every((r) => r.status === "verified" && r.sha256Hash !== null)
  );
}
