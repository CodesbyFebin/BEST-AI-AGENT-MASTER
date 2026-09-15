export type ToolEvidenceReceipt = {
  claim: string;
  sourceUrl: string;
  // The specific, curated facts checked against sourceUrl — not the whole
  // page. Null until captured. This is the same convention as
  // lib/authority-evidence.ts and lib/evidence.ts: a small extracted object,
  // not a hash of raw fetched bytes. Raw-HTML hashing was tried first and
  // found to be non-reproducible — the same GitHub repo page returns a
  // different byte-for-byte response on every request (embedded per-request
  // tokens), so three consecutive fetches of the same URL produced three
  // different hashes. A curated snapshot only changes when the facts change.
  snapshot: Record<string, unknown> | null;
  // sha256 of a canonical (sorted-key) JSON stringification of
  // { sourceUrl, retrievedAt, facts: snapshot } — recomputed and checked at
  // build time by scripts/verify-catalog.mjs, same as authority evidence.
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
    lastReviewed: "2026-09-16",
    evidenceReceipts: [
      {
        claim: "Superagent AI develops Superagent, an open-source security layer for AI applications, per its official upstream repository (GitHub API repository-identity record).",
        sourceUrl: "https://api.github.com/repos/superagent-ai/superagent",
        snapshot: { id: 639096757, full_name: "superagent-ai/superagent", default_branch: "main", archived: false, visibility: "public" },
        sha256Hash: "sha256:9dded9e79a76c25b7d0f3177edccce00a312af6b52fa4e45cdac9c66ed511e82",
        verifiedAt: "2026-09-16",
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
    lastReviewed: "2026-09-16",
    evidenceReceipts: [
      {
        claim: "CrewAI Inc. develops CrewAI, and the official source repository is github.com/crewAIInc/crewAI (GitHub API repository-identity record).",
        sourceUrl: "https://api.github.com/repos/crewAIInc/crewAI",
        snapshot: { id: 710601088, full_name: "crewAIInc/crewAI", default_branch: "main", archived: false, visibility: "public" },
        sha256Hash: "sha256:002f7512c65ff010d4afbb5a480677d682f1ff81edb4733b4bca5c5960941216",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes role-playing multi-agent crews with task delegation.",
        sourceUrl: "https://docs.crewai.com/",
        snapshot: { pageTitle: "CrewAI Documentation - CrewAI" },
        sha256Hash: "sha256:c82302e1b97896d960917f899bd77a56ce1e4ee341a881053475828002627cb5",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        // crewai.com/pricing renders client-side (a plain fetch returns no
        // readable figures); captured via a real rendered browser instead.
        claim: "Per the official pricing page: a free Basic tier (50 workflow executions/month) and a custom-priced Enterprise tier reached via sales contact.",
        sourceUrl: "https://www.crewai.com/pricing",
        snapshot: { pageTitle: "Pricing | CrewAI", basic: "Free (50 workflow executions/month)", enterprise: "Custom (contact sales)" },
        sha256Hash: "sha256:1916fdbf3ff5d2240e6bbd75917abd7a08601bdf45f365484bc83bacb64eda27",
        verifiedAt: "2026-09-16",
        status: "verified"
      }
    ],
  },
  flowise: {
    name: "Flowise",
    developer: "FlowiseAI Inc.",
    summary: "Flowise was an open-source generative-AI development platform for building LLM apps and agent flows with a visual builder and chatbot/agent deployment targets. Its official GitHub repository is archived as of this review — treat feature and maintenance claims as historical, not current, until an active fork or successor is separately verified.",
    sourceUrl: "https://github.com/FlowiseAI/Flowise",
    sourceLabel: "Official upstream repository (archived)",
    categories: ["low-code", "llm-apps", "agent-builders"],
    index: true,
    lastReviewed: "2026-09-16",
    evidenceReceipts: [
      {
        claim: "FlowiseAI developed Flowise at github.com/FlowiseAI/Flowise; the repository is archived (GitHub API repository-identity record) as of this review, so active development should not be assumed.",
        sourceUrl: "https://api.github.com/repos/FlowiseAI/Flowise",
        snapshot: { id: 621803253, full_name: "FlowiseAI/Flowise", default_branch: "main", archived: true, visibility: "public" },
        sha256Hash: "sha256:12661667d974e7ef1363e72aee20aa84415e5fff580588c613efca4a918c8c11",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation (as last published) describes building LLM apps and agents via a visual interface.",
        sourceUrl: "https://docs.flowiseai.com/",
        snapshot: { pageTitle: "Introduction | FlowiseAI" },
        sha256Hash: "sha256:f3f9a18040582418b8cebbcbbecce445d42fd2a4fed300a298e9844a207538a2",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        // Checked with a real rendered browser (not just a plain fetch):
        // flowiseai.com/pricing now redirects to a sign-in page — no
        // pricing page exists at this URL any more. Consistent with the
        // repo now being archived. Left pending rather than guessed at;
        // this is a genuine "the claim's source no longer exists" finding,
        // not a technical limitation of the capture method.
        claim: "Pricing tiers were published on the official pricing page.",
        sourceUrl: "https://flowiseai.com/pricing",
        snapshot: null,
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
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
        snapshot: { pageTitle: "AI Coding Agent for Building Ambitious Software | Cursor" },
        sha256Hash: "sha256:c0dbb060c399e0683255d7c2b20905bc313415385424dba60433ec2f022b8539",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes agent and completion features.",
        sourceUrl: "https://docs.cursor.com/",
        snapshot: { pageTitle: "Cursor Docs — Agent, Rules, MCP, Skills & CLI" },
        sha256Hash: "sha256:8a2b735c2e0bef3f2cfa36e4b7770321b1d3b77c5ae9c679ad1b3834891a3a90",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "Current pricing tiers per the official pricing page: Pro $20/mo, Pro+ $60/mo, Ultra $200/mo (matches the site's dated cursor-pricing evidence page).",
        sourceUrl: "https://cursor.com/pricing",
        snapshot: { pageTitle: "Cursor · Pricing", pro: "$20/mo", proPlus: "$60/mo", ultra: "$200/mo" },
        sha256Hash: "sha256:56554b7fcb079e1a31af84ec4449f332579ea8c4431d5878fc4e3d79c77bf1fc",
        verifiedAt: "2026-09-16",
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
        snapshot: { pageTitle: "AI Agents for CX and EX Automation - Yellow.ai" },
        sha256Hash: "sha256:5834f387aca07aa86fc4756ee665b323a6a6d1bb13abd2cc9284bc8a06f4f143",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes chat and voice automation capabilities.",
        sourceUrl: "https://docs.yellow.ai/",
        snapshot: { pageTitle: "Yellow.ai Documentation | yellow.ai" },
        sha256Hash: "sha256:43ea992b750dfa448e9c83a4c33cf2ce88246b76383236ce171d9f0fbac48bd2",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        // The original claim's cited URL (yellow.ai/contact-us) actually
        // resolves to a page titled "Partner With Us" — a partnerships
        // page, not a general sales/pricing contact page. That's a real
        // mismatch between the claim and its source, not just a hashing
        // problem, so this stays pending rather than being carried forward.
        claim: "Enterprise pricing is handled via sales contact rather than a public pricing page.",
        sourceUrl: "https://yellow.ai/contact-us",
        snapshot: null,
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
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
        snapshot: { pageTitle: "Vapi - Build Advanced Voice AI Agents" },
        sha256Hash: "sha256:50a6384d28f2b4bde28390f53c4dca8e20c3f791bbeee450f61185698c0e6344",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes the voice-agent API and deployment model.",
        sourceUrl: "https://docs.vapi.ai/",
        snapshot: { pageTitle: "Introduction | Vapi" },
        sha256Hash: "sha256:02ed880ed53c5d905fc40fcf0e3eba4e4c55fdea05e8cabee078378f0c73be0d",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "Usage-based pricing per the official pricing page: $0.05/min calls, $0.005/msg SMS/chat (matches the site's dated vapi-pricing evidence page).",
        sourceUrl: "https://vapi.ai/pricing",
        snapshot: { pageTitle: "Vapi - Build Advanced Voice AI Agents", build: { callCost: "$0.05/min", smsChatCost: "$0.005/msg" } },
        sha256Hash: "sha256:11b256513e62d6f490db5f9ce06c99402cadb07d1372b50fab04a6f6604c9ae8",
        verifiedAt: "2026-09-16",
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
        snapshot: { pageTitle: "AI Voice Agent Platform for Phone Call Centers" },
        sha256Hash: "sha256:816707450b167db8abbcd055b035b0fed414a1c3d5085c397c06ae96d8397a5b",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes the voice-agent API and call lifecycle.",
        sourceUrl: "https://docs.retellai.com/",
        snapshot: { pageTitle: "Retell AI: build, test, deploy, and monitor voice & chat agents" },
        sha256Hash: "sha256:95c9f5178f73387914256c378d8460d5295a6f77112b63137aa862a3569ead61",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "Usage-based pricing per the official pricing page: $0.07-$0.31/min for AI voice agents, $0.055/min voice infrastructure, $0.015/min platform voices.",
        sourceUrl: "https://www.retellai.com/pricing",
        snapshot: { pageTitle: "AI Phone Agent Pricing | Retell AI", payAsYouGo: "$0.07-$0.31/min for AI Voice Agents", voiceInfra: "$0.055/min", platformVoices: "$0.015/min" },
        sha256Hash: "sha256:1210a7edede40425f93be1903fd26d6e2b6087e6e754275cfddf68f3a2cac23b",
        verifiedAt: "2026-09-16",
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
        snapshot: { pageTitle: "Fin. The highest performing Customer Agent" },
        sha256Hash: "sha256:9f6f40d3e04d3ae337348835cc78c66cee9954ef341aaee60c86fdc69526f227",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "Intercom's official help center documents Fin's setup and deployment inside the Intercom workspace.",
        sourceUrl: "https://www.intercom.com/help",
        snapshot: { pageTitle: "Home | Intercom Help" },
        sha256Hash: "sha256:096890a48860b5c07727cef7ef86b5d2d6eef6f00f01b4f6710237e2c125620c",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "Per the official pricing page: seat plans Essential $39/seat/month, Advanced $99/seat/month, Expert $139/seat/month; Fin priced at $0.99 per resolution.",
        sourceUrl: "https://www.intercom.com/pricing",
        snapshot: { pageTitle: "Intercom Pricing | Plans for every team size", essential: "$39/seat/month", advanced: "$99/seat/month", expert: "$139/seat/month", finPerResolution: "$0.99/resolution" },
        sha256Hash: "sha256:25bc503873d5015016cbd0daa206654ad2a8811760c46e99005a572dfb30d645",
        verifiedAt: "2026-09-16",
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
        snapshot: { pageTitle: "GitHub Copilot · Your AI coding agent · GitHub" },
        sha256Hash: "sha256:5ed303621794f272b474ab6a6441d5c2693eef77b4cbffb0c19e554926ceb1d6",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes Copilot's plans and IDE integrations.",
        sourceUrl: "https://docs.github.com/en/copilot",
        snapshot: { pageTitle: "GitHub Copilot documentation - GitHub Docs" },
        sha256Hash: "sha256:7cb906886e64179401b5e45ff9a4c71399d15041e3ddbe2da6b74a323e2d3f98",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "Plan pricing matches the site's already-verified github-copilot-pricing evidence page (ev-page-github-copilot-pricing-2026-08-23): Free $0, Pro $10/user/month, Pro+ $39/user/month, Max $100/user/month, Business $19/user/month, Enterprise $39/user/month.",
        sourceUrl: "https://github.com/features/copilot/plans",
        snapshot: { free: "$0", pro: "$10/user/month", proPlus: "$39/user/month", max: "$100/user/month", business: "$19/user/month", enterprise: "$39/user/month", note: "figures cross-checked against the site's already-verified github-copilot-pricing authority evidence record (ev-page-github-copilot-pricing-2026-08-23)" },
        sha256Hash: "sha256:6abd799b069c2f997eca267db066ab682e45ad3d4592c04c3834586c4e03acd8",
        verifiedAt: "2026-09-16",
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
        snapshot: { pageTitle: "AI Workflow Automation Platform - n8n" },
        sha256Hash: "sha256:ced5999c58001c6cdec482d9338037fa195f2bad93c5209d9c194a57d6103643",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        claim: "The official documentation describes AI agent nodes and self-hosted deployment.",
        sourceUrl: "https://docs.n8n.io/",
        snapshot: { pageTitle: "n8n Docs" },
        sha256Hash: "sha256:abb19532d96bb9737dfc73933ca01abc4dd044fc112ba5b551638e892dba51f9",
        verifiedAt: "2026-09-16",
        status: "verified"
      },
      {
        // n8n.io/pricing/ renders client-side (a plain fetch returns no
        // readable figures); captured via a real rendered browser instead.
        claim: "Cloud pricing tiers per the official pricing page (billed annually): Starter €20/mo (2.5k executions), Pro €50/mo (10k executions), Business €667/mo (40k executions), Enterprise custom via sales contact.",
        sourceUrl: "https://n8n.io/pricing/",
        snapshot: { pageTitle: "n8n Plans and Pricing - n8n.io", starter: "€20/mo billed annually (2.5k executions)", pro: "€50/mo billed annually (10k executions)", business: "€667/mo billed annually (40k executions)", enterprise: "Custom (contact sales)" },
        sha256Hash: "sha256:95b6578f7aa9f62d1bf771bea4d3b220d7327cb0deaec153ca4a01cfec95c40a",
        verifiedAt: "2026-09-16",
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
        snapshot: null,
        sha256Hash: null,
        verifiedAt: null,
        status: "pending_review"
      },
      {
        claim: "The site's verified continuity record for this identity is /agents/windsurf; this profile links to it rather than duplicating its evidence.",
        sourceUrl: "/agents/windsurf",
        snapshot: null,
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
