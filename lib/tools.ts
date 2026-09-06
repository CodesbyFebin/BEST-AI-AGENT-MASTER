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
  },
  flowise: {
    name: "Flowise",
    developer: "FlowiseAI Inc.",
    summary: "Flowise is an open-source generative-AI development platform for building LLM apps and agent flows with a visual builder and chatbot/agent deployment targets. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://github.com/FlowiseAI/Flowise",
    sourceLabel: "Official upstream repository",
    categories: ["low-code", "llm-apps", "agent-builders"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "FlowiseAI develops Flowise, and the official source repository is github.com/FlowiseAI/Flowise.",
        sourceUrl: "https://github.com/FlowiseAI/Flowise",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes building LLM apps and agents via a visual interface.",
        sourceUrl: "https://docs.flowiseai.com/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://flowiseai.com/pricing",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  "cursor-ai": {
    name: "Cursor",
    developer: "Anysphere",
    summary: "Cursor is an AI-first code editor built on VS Code, developed by Anysphere, with repository-aware agent and tab-completion features. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://cursor.com",
    sourceLabel: "Official website",
    categories: ["ide", "coding-agents", "developer-tools"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "Anysphere develops Cursor, an AI-first code editor, per its official website.",
        sourceUrl: "https://cursor.com",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes agent and completion features.",
        sourceUrl: "https://docs.cursor.com/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture; see also the site's dated cursor-pricing evidence page).",
        sourceUrl: "https://cursor.com/pricing",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  "yellow-ai": {
    name: "Yellow.ai",
    developer: "Yellow.ai",
    summary: "Yellow.ai is an enterprise conversational-AI platform for customer support automation across chat and voice channels. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://yellow.ai",
    sourceLabel: "Official website",
    categories: ["conversational-ai", "customer-support", "enterprise"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "Yellow.ai is an enterprise conversational-AI platform, per its official website.",
        sourceUrl: "https://yellow.ai",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes chat and voice automation capabilities.",
        sourceUrl: "https://docs.yellow.ai/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Enterprise pricing is handled via sales contact rather than a public pricing page (assertion to be confirmed at capture).",
        sourceUrl: "https://yellow.ai/contact-us",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  "vapi-ai": {
    name: "Vapi",
    developer: "Vapi, Inc.",
    summary: "Vapi is a developer platform for building, testing, and deploying voice AI agents over phone and web channels. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://vapi.ai",
    sourceLabel: "Official website",
    categories: ["voice-ai", "developer-tools", "api"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "Vapi, Inc. develops Vapi, a voice-AI developer platform, per its official website.",
        sourceUrl: "https://vapi.ai",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes the voice-agent API and deployment model.",
        sourceUrl: "https://docs.vapi.ai/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Usage-based pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://vapi.ai/pricing",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  "retell-ai": {
    name: "Retell AI",
    developer: "Retell AI",
    summary: "Retell AI is a developer platform for building voice AI agents with low-latency speech pipelines for phone and web calls. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://www.retellai.com",
    sourceLabel: "Official website",
    categories: ["voice-ai", "developer-tools", "api"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "Retell AI develops a voice-AI agent platform, per its official website.",
        sourceUrl: "https://www.retellai.com",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes the voice-agent API and call lifecycle.",
        sourceUrl: "https://docs.retellai.com/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Usage-based pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://www.retellai.com/pricing",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  "intercom-ai": {
    name: "Intercom Fin",
    developer: "Intercom",
    summary: "Fin is Intercom's AI customer-service agent, resolving support queries inside the Intercom platform with per-resolution pricing. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://www.intercom.com/fin",
    sourceLabel: "Official product page",
    categories: ["customer-support", "conversational-ai", "enterprise"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "Intercom offers Fin, an AI customer-service agent, per its official product page.",
        sourceUrl: "https://www.intercom.com/fin",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Intercom's official help center documents Fin's setup and deployment inside the Intercom workspace.",
        sourceUrl: "https://www.intercom.com/help",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Per-resolution pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://www.intercom.com/pricing",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  "github-copilot": {
    name: "GitHub Copilot",
    developer: "GitHub (Microsoft)",
    summary: "GitHub Copilot is an AI coding assistant integrated into IDEs and github.com, with individual, business, and enterprise plans. This profile is being rebuilt from primary sources and stays noindex until its evidence receipts are verified.",
    sourceUrl: "https://github.com/features/copilot",
    sourceLabel: "Official product page",
    categories: ["coding-agents", "ide", "developer-tools"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "GitHub develops Copilot, an AI coding assistant, per its official product page.",
        sourceUrl: "https://github.com/features/copilot",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes Copilot's plans and IDE integrations.",
        sourceUrl: "https://docs.github.com/en/copilot",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Plan pricing is published on the official plans page (figures asserted only after capture; see also the site's dated github-copilot-pricing evidence page).",
        sourceUrl: "https://github.com/features/copilot/plans",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  n8n: {
    name: "n8n",
    developer: "n8n GmbH",
    summary: "n8n is a workflow-automation platform with native AI/agent nodes, deployable self-hosted or via cloud. Licensing classification and pricing figures are not asserted here until the primary sources are captured and verified.",
    sourceUrl: "https://n8n.io",
    sourceLabel: "Official website",
    categories: ["workflow-automation", "agent-builders", "self-hosted"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "n8n GmbH develops n8n, a workflow-automation platform with AI agent nodes, per its official website.",
        sourceUrl: "https://n8n.io",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The official documentation describes AI agent nodes and self-hosted deployment.",
        sourceUrl: "https://docs.n8n.io/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "Cloud pricing tiers are published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://n8n.io/pricing/",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      }
    ]
  },
  windsurf: {
    name: "Windsurf",
    developer: "Cognition",
    summary: "Windsurf was an independent AI-native IDE (formerly Codeium) until Cognition acquired its IP, product, trademark and brand on July 14, 2025, and rebranded the product to Devin Desktop on June 2, 2026. This profile defers to the site's verified continuity record; pricing and capability claims are not inherited and remain unknown unless separately evidenced.",
    sourceUrl: "https://devin.ai/desktop",
    sourceLabel: "Current official product page (post-rebrand)",
    categories: ["ide", "coding-agents", "developer-tools"],
    index: false,
    lastReviewed: "2026-09-06",
    evidenceReceipts: [
      {
        claim: "Cognition acquired Windsurf's product and brand (July 14, 2025) and rebranded it to Devin Desktop (June 2, 2026); windsurf.com redirects to devin.ai/desktop. Matches the catalog's verified windsurf entity record.",
        sourceUrl: "https://devin.ai/desktop",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
      },
      {
        claim: "The site's verified continuity record for this identity is /agents/windsurf; this profile links to it rather than duplicating its evidence.",
        sourceUrl: "/agents/windsurf",
        sha256Hash: null, verifiedAt: null, status: "pending_review"
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
