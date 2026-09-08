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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "Superagent AI develops Superagent, an open-source security layer for AI applications, per its official upstream repository.",
        sourceUrl: "https://github.com/superagent-ai/superagent",
        sha256Hash: "6baabc85879e12368b3c67bcfd16c6f0e4181f2e56ebc795eb343c3a8a01fdad",
        verifiedAt: "2026-09-08",
        status: "verified"
      }
    ],
  },
crewai: {
    name: "CrewAI",
    developer: "CrewAI Inc.",
    summary: "CrewAI is a multi-agent orchestration framework for building role-playing autonomous AI agents that delegate tasks and share context across a crew of specialized agents.",
    sourceUrl: "https://github.com/crewAIInc/crewAI",
    sourceLabel: "Official upstream repository",
    categories: ["multi-agent", "orchestration", "frameworks"],
    index: true,
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "CrewAI Inc. develops CrewAI, and the official source repository is github.com/crewAIInc/crewAI.",
        sourceUrl: "https://github.com/crewAIInc/crewAI",
        sha256Hash: "969406d59302b25cf677a409254f0dbb9f0bedde8061abf5f05ada45012f29f2",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes role-playing multi-agent crews with task delegation.",
        sourceUrl: "https://docs.crewai.com/",
        sha256Hash: "7896956478b144d5033f69d0b89114dd4e0d7b11b1d85d48db7a1416ff64afe2",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture; none are inherited from third parties).",
        sourceUrl: "https://www.crewai.com/pricing",
        sha256Hash: "952512d3609d74bf79badffc77dbf440513852a822112a8310ace47fed5cf603",
        verifiedAt: "2026-09-08",
        status: "verified"
      }
    ],
  },
  flowise: {
    name: "Flowise",
    developer: "FlowiseAI Inc.",
    summary: "Flowise is an open-source generative-AI development platform for building LLM apps and agent flows with a visual builder and chatbot/agent deployment targets.",
    sourceUrl: "https://github.com/FlowiseAI/Flowise",
    sourceLabel: "Official upstream repository",
    categories: ["low-code", "llm-apps", "agent-builders"],
    index: true,
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "FlowiseAI develops Flowise, and the official source repository is github.com/FlowiseAI/Flowise.",
        sourceUrl: "https://github.com/FlowiseAI/Flowise",
        sha256Hash: "c17a18dc266a6341201e04c5388b1c15bcbf184b1e86a9a6c1609ae87f7842be",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes building LLM apps and agents via a visual interface.",
        sourceUrl: "https://docs.flowiseai.com/",
        sha256Hash: "d6a3cfc44bcb5f456f69703091122b71b60c0d6c22b53883e7c5d0cd1b0bc342",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://flowiseai.com/pricing",
        sha256Hash: "c3e9d87dd3e7e2950661f7316932d7abe1c7bf015ce826579a676088caa42642",
        verifiedAt: "2026-09-08",
        status: "verified"
      }
    ],
  },
  "cursor-ai": {
    name: "Cursor",
    developer: "Anysphere",
    summary: "Cursor is an AI-first code editor built on VS Code, developed by Anysphere, with repository-aware agent and tab-completion features.",
    sourceUrl: "https://cursor.com",
    sourceLabel: "Official website",
    categories: ["ide", "coding-agents", "developer-tools"],
    index: true,
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "Anysphere develops Cursor, an AI-first code editor, per its official website.",
        sourceUrl: "https://cursor.com",
        sha256Hash: "2fc1f73d16f3e6a7b3b7d2405c4d661f95539f55b65e0c38d1171988914306ab",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes agent and completion features.",
        sourceUrl: "https://docs.cursor.com/",
        sha256Hash: "b71a4e9a337185d3b3cbacf47bd6653b94a80fded1f8d9350ba50544289b0fac",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Current pricing tiers are published on the official pricing page (figures asserted only after capture; see also the site's dated cursor-pricing evidence page).",
        sourceUrl: "https://cursor.com/pricing",
        sha256Hash: "f4b30589ec3c0156b53519169bba1303521be17515e2a16efccf8d4fee42ee43",
        verifiedAt: "2026-09-08",
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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "Yellow.ai is an enterprise conversational-AI platform, per its official website.",
        sourceUrl: "https://yellow.ai",
        sha256Hash: "142eea448955fe070975f3b91bdbab52c1a05338c4b44273d63fed4b5cbd3099",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes chat and voice automation capabilities.",
        sourceUrl: "https://docs.yellow.ai/",
        sha256Hash: "2c203f23b814bd4b0c49eea3abbedbf6039639a6d67ff9df328ae4e347f605f9",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Enterprise pricing is handled via sales contact rather than a public pricing page (assertion to be confirmed at capture).",
        sourceUrl: "https://yellow.ai/contact-us",
        sha256Hash: "97441424cfd0e096d9bd3cbd64b53a5009ff7fdd0357e3aa39a3f05d34d22f25",
        verifiedAt: "2026-09-08",
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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "Vapi, Inc. develops Vapi, a voice-AI developer platform, per its official website.",
        sourceUrl: "https://vapi.ai",
        sha256Hash: "1cb0d9bb638a8a498b0be6f68a765c2c069b7b75befda34b9f248570768d9c67",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes the voice-agent API and deployment model.",
        sourceUrl: "https://docs.vapi.ai/",
        sha256Hash: "dee89aacfb6f56545ce673234a27abc9a650de9b7edb6f435664cc9b2a78227a",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Usage-based pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://vapi.ai/pricing",
        sha256Hash: "422f95e711aacc417711d48870d36f5d389544222d1bc7711ebda4d76e46b273",
        verifiedAt: "2026-09-08",
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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "Retell AI develops a voice-AI agent platform, per its official website.",
        sourceUrl: "https://www.retellai.com",
        sha256Hash: "a11188e8d3447c9feea5d427e79df3ca786f0de934573b98c260d9cd7496f94f",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes the voice-agent API and call lifecycle.",
        sourceUrl: "https://docs.retellai.com/",
        sha256Hash: "7888ad56d649405bdbc2667f69bdded0c361848acd34e9c8d0007c674cb9d98b",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Usage-based pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://www.retellai.com/pricing",
        sha256Hash: "28dd63dc6b48a3220e0928939a636f0016843dfb8717d223724d2b88de321dff",
        verifiedAt: "2026-09-08",
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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "Intercom offers Fin, an AI customer-service agent, per its official product page.",
        sourceUrl: "https://www.intercom.com/fin",
        sha256Hash: "dcc744a6f82bfc12ab789327eb6abec7df04f17a57106874d1e102897d559cd9",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Intercom's official help center documents Fin's setup and deployment inside the Intercom workspace.",
        sourceUrl: "https://www.intercom.com/help",
        sha256Hash: "e868ade5c833bf9896324ba85182b952f721399d8176fbffdb622ffd11bbdaa1",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Per-resolution pricing is published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://www.intercom.com/pricing",
        sha256Hash: "8101ce295dd7c6ca91f9bd34ac61562de9321cb6b81c125751943bb7514933f4",
        verifiedAt: "2026-09-08",
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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "GitHub develops Copilot, an AI coding assistant, per its official product page.",
        sourceUrl: "https://github.com/features/copilot",
        sha256Hash: "e7a4fcc48e2d7bc5f4b3b46a354abbd55d68b9a9e025d8a4728efaa76c7eb764",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes Copilot's plans and IDE integrations.",
        sourceUrl: "https://docs.github.com/en/copilot",
        sha256Hash: "78489017b9500457e60e78a769a5c95c1f6385ae83d3beaddc8252a3544755bd",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Plan pricing is published on the official plans page (figures asserted only after capture; see also the site's dated github-copilot-pricing evidence page).",
        sourceUrl: "https://github.com/features/copilot/plans",
        sha256Hash: "294d1fe36a21f5e5e27eed241608be4446b09bbbe8a4fb17a734ad51c8734f23",
        verifiedAt: "2026-09-08",
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
    lastReviewed: "2026-09-08",
    evidenceReceipts: [
      {
        claim: "n8n GmbH develops n8n, a workflow-automation platform with AI agent nodes, per its official website.",
        sourceUrl: "https://n8n.io",
        sha256Hash: "dcc5117fbd94a26ae83dbd4ae0cde9397e373b443c12912eccb8b0ff14d5c8ce",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "The official documentation describes AI agent nodes and self-hosted deployment.",
        sourceUrl: "https://docs.n8n.io/",
        sha256Hash: "41325fd3f77d1c26d951ef2f926fbbd3589b694201a85d4a2b9151939a69f70b",
        verifiedAt: "2026-09-08",
        status: "verified"
      },
      {
        claim: "Cloud pricing tiers are published on the official pricing page (figures asserted only after capture).",
        sourceUrl: "https://n8n.io/pricing/",
        sha256Hash: "0ef6376ab011ba213cb7182c6125fb5f7a89ce863b892f7b9d870fdba29307e5",
        verifiedAt: "2026-09-08",
        status: "verified"
      }
    ],
  },
  windsurf: {
    name: "Windsurf",
    developer: "Cognition",
    summary: "Windsurf was an independent AI-native IDE (formerly Codeium) until Cognition acquired its IP, product, trademark and brand on July 14, 2025, and rebranded the product to Devin Desktop on June 2, 2026. This profile defers to the site's verified continuity record; pricing and capability claims are not inherited and remain unknown unless separately evidenced.",
    sourceUrl: "https://devin.ai/desktop",
    sourceLabel: "Current official product page (post-rebrand)",
    categories: ["ide", "coding-agents", "developer-tools"],
    index: false,
    lastReviewed: "2026-09-08",
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
    ],
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
