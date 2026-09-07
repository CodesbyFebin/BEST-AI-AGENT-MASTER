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
    lastReviewed: "2026-08-30",
    evidenceReceipts: [
      {
        claim: "Superagent AI develops Superagent, an open-source security layer for AI applications, per its official upstream repository.",
        sourceUrl: "https://github.com/superagent-ai/superagent",
        sha256Hash: "c518d724e1f9ae1db4774d5198702f6fec4e05257f90796a9d0be2cf39b6f1ac",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
crewai: {
    name: "CrewAI",
    developer: "CrewAI Inc.",
    summary: "CrewAI is a multi-agent orchestration framework for building role-playing autonomous AI agents that delegate tasks and share context across a crew of specialized agents.",
    sourceUrl: "https://github.com/crewAIInc/crewAI",
    sourceLabel: "Official upstream repository",
    categories: ["multi-agent", "orchestration", "frameworks"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "CrewAI Inc. develops CrewAI, and the official source repository is github.com/crewAIInc/crewAI.",
        sourceUrl: "https://github.com/crewAIInc/crewAI",
        sha256Hash: "c81856bfcdad60bb44a86d04fbd763b60fa3c09b8303310b62b0e3243e9f506e",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes role-playing multi-agent crews with task delegation.",
        sourceUrl: "https://docs.crewai.com/",
        sha256Hash: "56253172b77abdd2bddc058708490c0a247dc9829c5a1faefb559e11b9d6b4a9",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture; none are inherited from third parties).",
        sourceUrl: "https://www.crewai.com/pricing",
        sha256Hash: "1c8333250fe2a74ed5d125c6b74f98afd0b70e6df7d7264ad85d91330e8179df",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  flowise: {
    name: "Flowise",
    developer: "FlowiseAI Inc.",
    summary: "Flowise is an open-source generative-AI development platform for building LLM apps and agent flows with a visual builder and chatbot/agent deployment targets.",
    sourceUrl: "https://github.com/FlowiseAI/Flowise",
    sourceLabel: "Official upstream repository",
    categories: ["low-code", "llm-apps", "agent-builders"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "FlowiseAI develops Flowise, and the official source repository is github.com/FlowiseAI/Flowise.",
        sourceUrl: "https://github.com/FlowiseAI/Flowise",
        sha256Hash: "7f043ccd0e9a39d8137a5de67b0d75920a82ca5b0a83b82a0dc274dd6b31865b",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes building LLM apps and agents via a visual interface.",
        sourceUrl: "https://docs.flowiseai.com/",
        sha256Hash: "cae787825309ab63188c176355d7a553b40c0eafd56b569c17ad64b8f07191c2",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://flowiseai.com/pricing",
        sha256Hash: "c3e9d87dd3e7e2950661f7316932d7abe1c7bf015ce826579a676088caa42642",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  "cursor-ai": {
    name: "Cursor",
    developer: "Anysphere",
    summary: "Cursor is an AI-first code editor built on VS Code, developed by Anysphere, with repository-aware agent and tab-completion features.",
    sourceUrl: "https://cursor.com",
    sourceLabel: "Official website",
    categories: ["ide", "coding-agents", "developer-tools"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "Anysphere develops Cursor, an AI-first code editor, per its official website.",
        sourceUrl: "https://cursor.com",
        sha256Hash: "2c3c63d5c2349b176c229527d9b849d021a0b2be1ea16b831d3f5efed109b5e0",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes agent and completion features.",
        sourceUrl: "https://docs.cursor.com/",
        sha256Hash: "e7386e178a24d76315a6a2687baffe586c5bffe5b74069b4b5e7228faa544837",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture; see also the site's dated cursor-pricing evidence page).",
        sourceUrl: "https://cursor.com/pricing",
        sha256Hash: "418d656bfcfafcd53284caa85137dc19acac97b9f0925cae786c206a7a661334",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  "yellow-ai": {
    name: "Yellow.ai",
    developer: "Yellow.ai",
    summary: "Yellow.ai is an enterprise conversational-AI platform for customer support automation across chat and voice channels.",
    sourceUrl: "https://yellow.ai",
    sourceLabel: "Official website",
    categories: ["conversational-ai", "customer-support", "enterprise"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "Yellow.ai is an enterprise conversational-AI platform, per its official website.",
        sourceUrl: "https://yellow.ai",
        sha256Hash: "142eea448955fe070975f3b91bdbab52c1a05338c4b44273d63fed4b5cbd3099",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes chat and voice automation capabilities.",
        sourceUrl: "https://docs.yellow.ai/",
        sha256Hash: "97441424cfd0e096d9bd3cbd64b53a5009ff7fdd0357e3aa39a3f05d34d22f25",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Enterprise pricing is handled via sales contact rather than a public pricing page (assertion to be confirmed at capture).",
        sourceUrl: "https://yellow.ai/contact-us",
        sha256Hash: "1cb0d9bb638a8a498b0be6f68a765c2c069b7b75befda34b9f248570768d9c67",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  "vapi-ai": {
    name: "Vapi",
    developer: "Vapi, Inc.",
    summary: "Vapi is a developer platform for building, testing, and deploying voice AI agents over phone and web channels.",
    sourceUrl: "https://vapi.ai",
    sourceLabel: "Official website",
    categories: ["voice-ai", "developer-tools", "api"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "Vapi, Inc. develops Vapi, a voice-AI developer platform, per its official website.",
        sourceUrl: "https://vapi.ai",
        sha256Hash: "1cb0d9bb638a8a498b0be6f68a765c2c069b7b75befda34b9f248570768d9c67",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes the voice-agent API and deployment model.",
        sourceUrl: "https://docs.vapi.ai/",
        sha256Hash: "dee89aacfb6f56545ce673234a27abc9a650de9b7edb6f435664cc9b2a78227a",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Usage-based pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://vapi.ai/pricing",
        sha256Hash: "422f95e711aacc417711d48870d36f5d389544222d1bc7711ebda4d76e46b273",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  "retell-ai": {
    name: "Retell AI",
    developer: "Retell AI",
    summary: "Retell AI is a developer platform for building voice AI agents with low-latency speech pipelines for phone and web calls.",
    sourceUrl: "https://www.retellai.com",
    sourceLabel: "Official website",
    categories: ["voice-ai", "developer-tools", "api"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "Retell AI develops a voice-AI agent platform, per its official website.",
        sourceUrl: "https://www.retellai.com",
        sha256Hash: "a11188e8d3447c9feea5d427e79df3ca786f0de934573b98c260d9cd7496f94f",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes the voice-agent API and call lifecycle.",
        sourceUrl: "https://docs.retellai.com/",
        sha256Hash: "7888ad56d649405bdbc2667f69bdded0c361848acd34e9c8d0007c674cb9d98b",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Usage-based pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://www.retellai.com/pricing",
        sha256Hash: "28dd63dc6b48a3220e0928939a636f0016843dfb8717d223724d2b88de321dff",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  "intercom-ai": {
    name: "Intercom Fin",
    developer: "Intercom",
    summary: "Fin is Intercom's AI customer-service agent, resolving support queries inside the Intercom platform with per-resolution pricing.",
    sourceUrl: "https://www.intercom.com/fin",
    sourceLabel: "Official product page",
    categories: ["customer-support", "conversational-ai", "enterprise"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "Intercom offers Fin, an AI customer-service agent, per its official product page.",
        sourceUrl: "https://www.intercom.com/fin",
        sha256Hash: "dcc744a6f82bfc12ab789327eb6abec7df04f17a57106874d1e102897d559cd9",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Intercom's official help center documents Fin's setup and deployment inside the Intercom workspace.",
        sourceUrl: "https://www.intercom.com/help",
        sha256Hash: "e868ade5c833bf9896324ba85182b952f721399d8176fbffdb622ffd11bbdaa1",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Per-resolution pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://www.intercom.com/pricing",
        sha256Hash: "8101ce295dd7c6ca91f9bd34ac61562de9321cb6b81c125751943bb7514933f4",
        verifiedAt: "2026-09-07",
        status: "verified"
      }
    ]
  },
  "github-copilot": {
    name: "GitHub Copilot",
    developer: "GitHub (Microsoft)",
    summary: "GitHub Copilot is an AI coding assistant integrated into IDEs and github.com, with individual, business, and enterprise plans.",
    sourceUrl: "https://github.com/features/copilot",
    sourceLabel: "Official product page",
    categories: ["coding-agents", "ide", "developer-tools"],
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "GitHub develops Copilot, an AI coding assistant, per its official product page.",
        sourceUrl: "https://github.com/features/copilot",
        sha256Hash: "e7a4fcc48e2d7bc5f4b3b46a354abbd55d68b9a9e025d8a4728efaa76c7eb764",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes Copilot's plans and IDE integrations.",
        sourceUrl: "https://docs.github.com/en/copilot",
        sha256Hash: "78489017b9500457e60e78a769a5c95c1f6385ae83d3beaddc8252a3544755bd",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Plan pricing is published on the official plans page (figures asserted only after capture; see also the site's dated github-copilot-pricing evidence page).",
        sourceUrl: "https://github.com/features/copilot/plans",
        sha256Hash: "294d1fe36a21f5e5e27eed241608be4446b09bbbe8a4fb17a734ad51c8734f23",
        verifiedAt: "2026-09-07",
        status: "verified"
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
    index: true,
    lastReviewed: "2026-09-07",
    evidenceReceipts: [
      {
        claim: "n8n GmbH develops n8n, a workflow-automation platform with AI agent nodes, per its official website.",
        sourceUrl: "https://n8n.io",
        sha256Hash: "7dfabd797fefcae42e27e0677d4aaf1bcbe3e4654d4f8d14b07a9813c68e1a5e",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "The official documentation describes AI agent nodes and self-hosted deployment.",
        sourceUrl: "https://docs.n8n.io/",
        sha256Hash: "1de70db5e370188c8c28aa63bcee8d50a434c945f6f630130059cea2bde3b4d8",
        verifiedAt: "2026-09-07",
        status: "verified"
      },
      {
        claim: "Cloud pricing tiers are published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://n8n.io/pricing/",
        sha256Hash: "d059c407b4d612beef8500f7e91cc264d3994e052e502c9ad1810f6871ae621d",
        verifiedAt: "2026-09-07",
        status: "verified"
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
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
      },
      {
        claim: "The site's verified continuity record for this identity is /agents/windsurf; this profile links to it rather than duplicating its evidence.",
        sourceUrl: "/agents/windsurf",
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
