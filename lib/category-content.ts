// Per-category explanatory content for /categories/[slug]. A category hub's
// primary content is always the live, filtered publicEntities grid (see
// app/categories/[slug]/page.tsx) — this file adds real scope definition and
// cross-links to this site's own deeper coverage of the workflow, not a
// substitute for entities that don't yet pass the public evidence gate. Where
// a category currently has few or zero catalog entities, the honest thing is
// to say so and point at where the workflow actually is covered (an authority
// page, a topic-cluster hub), not to pad the category page with prose that
// implies a populated directory.

export type CategoryContent = {
  scope: string;
  evaluate: string[];
  relatedLinks: { href: string; label: string }[];
};

export const categoryContent: Record<string, CategoryContent> = {
  "coding-agents": {
    scope:
      "Tools that read, write, or execute code as part of an agent loop — IDE assistants, CLI coding agents, autonomous software-engineering agents, and code-review or code-search agents. This is this site's most populated category, and it also has a dedicated topic hub with deeper filtering by interface (IDE, CLI), openness, and deployment (local, self-hosted).",
    evaluate: [
      "Whether it edits files directly, proposes diffs for review, or only answers questions — these are different trust boundaries.",
      "What it can execute without approval (running tests, installing packages, making commits) versus what requires a human step.",
      "Whether it's open-source (see open-source vs. closed-source models) or requires a hosted account with a specific provider."
    ],
    relatedLinks: [
      { href: "/coding-agents", label: "Coding agents hub (interface, openness, deployment filters)" },
      { href: "/coding-agents/open-source", label: "Open-source coding agents" },
      { href: "/coding-agents/local", label: "Local coding agents" }
    ]
  },
  "voice-bots": {
    scope:
      "Voice-interface agents — phone-call automation, IVR replacement, and spoken-language assistants. This category's catalog entities are currently limited because most voice-agent platforms are hosted SaaS products without a public, source-linked identity record of the kind this site's catalog requires; the workflow itself is covered in depth on this site's authority pages instead.",
    evaluate: [
      "Latency, specifically: a voice agent's usability depends on sub-second round-trip time, which most vendors don't publish and which varies by deployment region.",
      "Language and code-switching support, evaluated on real speech in the target language rather than a demo script — see Indic language voice bots for why this matters for Indian-language deployments.",
      "What happens on a failed or ambiguous turn (silence, a fallback to a human, a repeated prompt) — this is usually undocumented and worth testing directly."
    ],
    relatedLinks: [
      { href: "/best-ai-voice-agents", label: "Best AI voice agents: what to evaluate" },
      { href: "/sub-second-latency-voice-ai", label: "Sub-second latency in voice AI" },
      { href: "/indic-language-voice-bots", label: "Indic language voice bots" },
      { href: "/agents/vapi-ai", label: "Vapi (public catalog entity)" }
    ]
  },
  orchestration: {
    scope:
      "Frameworks and libraries for building multi-step or multi-agent systems — chaining tool calls, managing state across turns, and coordinating more than one model or agent role. These are developer frameworks, not end-user products, which is why this category links to the frameworks directory rather than agent listings.",
    evaluate: [
      "Whether it manages agent state and memory itself, or expects you to supply that — see agent memory vs. RAG for the distinction.",
      "Community activity and release cadence, since orchestration frameworks in this space change fast.",
      "Whether it's built around a specific model provider's tool-calling format, or is provider-agnostic."
    ],
    relatedLinks: [
      { href: "/frameworks", label: "AI agent frameworks directory" },
      { href: "/agent-memory-vs-rag", label: "Agent memory vs RAG" },
      { href: "/mcp-vs-function-calling", label: "MCP vs function calling" },
      { href: "/what-is-mcp", label: "What is MCP?" }
    ]
  },
  business: {
    scope:
      "General-purpose agent platforms used across business operations rather than a single department — personal productivity, consulting, freelance, and small-team workflows that don't fit neatly under sales, marketing, or support. This category currently has no catalog entities that pass the public evidence gate on their own; the workflow is covered through this site's role-specific authority pages instead.",
    evaluate: [
      "Whether the platform is built for a specific role (a consultant, a freelancer, a founder) or a general-purpose assistant — the former usually has more relevant defaults.",
      "What data it needs access to, and whether that access is scoped to what the task actually requires."
    ],
    relatedLinks: [
      { href: "/ai-agents-for-business", label: "AI agents for business" },
      { href: "/ai-agents-for-consultants", label: "AI agents for consultants" },
      { href: "/ai-agents-for-freelancers", label: "AI agents for freelancers" },
      { href: "/best-ai-agents-for-startups", label: "Best AI agents for startups" }
    ]
  },
  crm: {
    scope:
      "Agent tooling built around CRM data and workflows — lead enrichment, pipeline updates, and agent-to-CRM integrations via MCP or a native connector. Field-level verification (does it actually write back to the CRM, or only summarize) is required before any product claim here, which is why this category has no populated entity grid yet.",
    evaluate: [
      "Whether it reads CRM data, writes to it, or both — a read-only summarizer and a system that updates records unattended carry very different risks.",
      "Which CRM platforms it actually integrates with by name, versus a generic \"CRM integration\" claim with no specifics."
    ],
    relatedLinks: [
      { href: "/sales-outreach-crm-ai", label: "Sales outreach & CRM AI" },
      { href: "/mcp-for-salesforce-crm", label: "MCP for Salesforce CRM" }
    ]
  },
  "customer-support": {
    scope:
      "Agents that handle customer-facing support workflows — ticket triage, chat deflection, and call-center automation. This spans several of this site's authority pages by specific use case (BPO operations, call centers, customer onboarding) rather than one general \"support agent\" bucket, because the evaluation criteria differ by which part of the support workflow is automated.",
    evaluate: [
      "Escalation behavior: what triggers a handoff to a human, and how quickly.",
      "Whether resolution or deflection rate claims are self-reported by the vendor or independently measurable in your own deployment.",
      "Data handling for support transcripts, which often contain personal information — see this site's DPDP and data-residency coverage if that applies to your deployment."
    ],
    relatedLinks: [
      { href: "/how-to-automate-customer-support-ai", label: "How to automate customer support with AI" },
      { href: "/ai-agents-for-call-centers", label: "AI agents for call centers" },
      { href: "/ai-call-center-agents", label: "AI call center agents" },
      { href: "/ai-agents-for-bpo-companies", label: "AI agents for BPO companies" }
    ]
  },
  sales: {
    scope:
      "Agents applied to outbound and pipeline workflows — prospecting, outreach sequencing, and CRM-adjacent sales automation. Results and ROI for this category are not estimated without evidence, since a sales agent's actual outcome depends heavily on the list, offer, and market it's used against, not just the tool.",
    evaluate: [
      "Whether outreach volume or reply-rate claims come with a defined methodology, or are a single anecdotal result.",
      "Deliverability and compliance handling for outbound email or calls, which is a separate concern from the AI itself."
    ],
    relatedLinks: [
      { href: "/sales-outreach-crm-ai", label: "Sales outreach & CRM AI" },
      { href: "/mcp-for-salesforce-crm", label: "MCP for Salesforce CRM" },
      { href: "/ai-agents-for-fundraising-investor-relations", label: "AI agents for fundraising & investor relations" }
    ]
  },
  marketing: {
    scope:
      "Agent tooling for marketing workflows — content generation, email personalization, and marketing-asset production. No fabricated performance claims (engagement lift, conversion improvement) appear on this site without a reproducible source, which is a large part of why marketing-tool marketing copy and this site's own evidence bar don't overlap much.",
    evaluate: [
      "Whether generated creative or copy is reviewed by a human before publishing, or ships unattended.",
      "Licensing and usage rights for any generated visual asset — see AI agent privacy by design and this site's affiliate disclosure for how this site handles its own conflicts of interest."
    ],
    relatedLinks: [
      { href: "/personalized-email-marketing-ai", label: "Personalized email marketing AI" },
      { href: "/graphic-design-marketing-assets-ai", label: "Graphic design & marketing assets AI" },
      { href: "/ai-content-marketing-agents", label: "AI content marketing agents" }
    ]
  },
  research: {
    scope:
      "Agents that browse, retrieve, and synthesize information — general web research, academic literature review, legal research, and market research. The main risk in this category is a confident-sounding but ungrounded synthesis, which is why citation and source-checking behavior matters more here than in most other categories.",
    evaluate: [
      "Whether it cites sources you can independently check, or only produces a synthesized summary.",
      "How it handles a question it can't actually answer from available sources — a good research agent says so rather than filling the gap."
    ],
    relatedLinks: [
      { href: "/academic-research-ai", label: "Academic research AI" },
      { href: "/scientific-research-ai", label: "Scientific research AI" },
      { href: "/ai-agents-for-legal-research", label: "AI agents for legal research" },
      { href: "/ai-agents-for-market-research", label: "AI agents for market research" }
    ]
  },
  automation: {
    scope:
      "General workflow-automation tools that increasingly market themselves as \"agentic\" — trigger-action platforms, RPA-style automation, and orchestration layers connecting multiple tools. Whether a given product is meaningfully agentic (makes decisions, not just executes a fixed sequence) or a rebranded automation workflow is worth checking directly.",
    evaluate: [
      "Whether the system makes a decision at runtime, or executes a fixed if-this-then-that sequence with an LLM step bolted on.",
      "See chatbot vs. agent and agents vs. workflows for the underlying distinction this category most often blurs."
    ],
    relatedLinks: [
      { href: "/agents-vs-workflows", label: "Agents vs workflows" },
      { href: "/chatbot-vs-agent", label: "Chatbot vs agent" },
      { href: "/workflow-automation-zapier-alternatives", label: "Workflow automation: Zapier alternatives" }
    ]
  },
  finance: {
    scope:
      "AI agents applied to finance workflows — bookkeeping, invoicing, reconciliation, and financial reporting. No fabricated ROI or compliance claim appears here; a finance tool's regulatory posture (RBI, SOX, or otherwise) is specific to the deploying entity, not an inherent property of the AI product, as covered in this site's RBI digital lending guidance.",
    evaluate: [
      "Whether it reconciles and files automatically, or drafts entries for a human accountant to approve — the failure mode of an unattended error is much larger in the first case.",
      "Audit trail: whether every automated entry is logged with what triggered it, for later review."
    ],
    relatedLinks: [
      { href: "/ai-agents-for-finance", label: "AI agents for finance" },
      { href: "/ai-agents-for-accounting", label: "AI agents for accounting" },
      { href: "/expense-report-accounting-ai", label: "Expense report & accounting AI" },
      { href: "/rbi-compliant-fintech-ai", label: "RBI digital lending guidelines for AI fintech tools" }
    ]
  },
  "open-source": {
    scope:
      "Agents with publicly available, licensed source code — listed by verified repository identity, not by a license claim alone. A project describing itself as \"open\" and a project whose license actually permits what you intend to do with it are separate checks; see open-source vs. closed-source models for what the license terms typically differ on.",
    evaluate: [
      "The actual license file, not a marketing description of \"open\" — permissive, copyleft, and source-available licenses grant very different rights.",
      "Repository activity: commit and release history, for whether it's still maintained.",
      "Whether weights, training data, or only inference code are open — these are frequently not the same for a given project."
    ],
    relatedLinks: [
      { href: "/what-is-open-source-ai-agent", label: "What is an open-source AI agent?" },
      { href: "/open-source-vs-closed-source-ai", label: "Open-source vs closed-source AI" },
      { href: "/best-open-source-mcp-servers", label: "Best open-source MCP servers" },
      { href: "/coding-agents/open-source", label: "Open-source coding agents" }
    ]
  },
  "creative-design": {
    scope:
      "Agents applied to graphic design, visual asset generation, and creative production workflows. No fabricated licensing or usage-rights claim appears here — what a generated image, video, or design asset can legally be used for depends on the specific tool's terms and the underlying model's training data, not a general assumption that AI-generated output is free to use commercially.",
    evaluate: [
      "The tool's own terms on commercial usage rights for generated output, checked directly rather than assumed.",
      "Whether outputs are reviewed by a human designer before use, particularly for anything customer-facing.",
      "Vertical-specific coverage where it exists — see AI agents for fashion retail and AI agents for photography studios for design-adjacent workflows this site already covers by industry."
    ],
    relatedLinks: [
      { href: "/graphic-design-marketing-assets-ai", label: "Graphic design & marketing assets AI" },
      { href: "/ai-agents-for-fashion-retail", label: "AI agents for fashion retail" },
      { href: "/ai-agents-for-photography-studios", label: "AI agents for photography studios" }
    ]
  }
};
