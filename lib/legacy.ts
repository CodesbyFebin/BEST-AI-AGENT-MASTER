export const categories = [
  ["coding-agents", "Coding agents", "Coding and software-engineering agents with source-linked identity and evidence status."],
  ["voice-bots", "Voice agents", "Voice-agent platforms. Pricing and latency are unknown unless directly sourced."],
  ["orchestration", "Orchestration", "Agent frameworks and orchestration systems."],
  ["business", "Business agents", "Agent platforms used in business workflows. No pay-to-rank ordering."],
  ["crm", "CRM agents", "AI-agent tooling around CRM workflows; field-level verification is required for product claims."],
  ["customer-support", "Customer support agents", "Customer-support agent tooling with source-linked records."],
  ["sales", "Sales agents", "Sales workflow agent tooling. Results and ROI are not estimated without evidence."],
  ["marketing", "Marketing agents", "Marketing workflow tooling. No fabricated performance claims."],
  ["research", "Research agents", "Research and browsing agents with source-linked identity."],
  ["automation", "Automation agents", "Workflow automation and agent orchestration tools."],
  ["finance", "Finance AI agents", "AI agents applied to finance workflows — bookkeeping, invoicing, reconciliation and reporting. No fabricated ROI or compliance claims."],
  ["open-source", "Open source AI agents", "AI agents with publicly available, licensed source code. Listed by verified repository identity, not by license claim alone."],
  ["creative-design", "Creative & design agents", "AI agents applied to graphic design, visual and creative asset generation. No fabricated licensing or usage-rights claims."]
] as const;

export const legacyPages: Record<
  string,
  { title: string; description: string; body: string[]; index: boolean; relatedLinks?: { href: string; label: string }[] }
> = {
  "best-ai-agent": {
    title: "How to choose the best AI agent",
    description: "Evidence-first checklist for selecting an AI agent without relying on synthetic scores.",
    body: ["There is no universal best AI agent. Start with the task, deployment boundary, model/provider requirements, tool permissions, human approval points and verifiable operating constraints.", "BestAIAgent.in no longer publishes a universal numeric winner unless a reproducible evaluation methodology and underlying evidence are available."],
    index: true
  },
  "best-ai-agent-for-business": {
    title: "AI agents for business: evaluation checklist",
    description: "A practical, source-led framework for evaluating AI agents for business workflows.",
    body: ["For business use, verify data handling, deployment, integrations, authorization, auditability and total operating cost from primary sources.", "Compliance labels are not inferred from popularity, self-hosting, or vendor category."],
    index: true
  },
  "best-ai-agent-for-coding": {
    title: "Coding agents: evidence-first directory",
    description: "Compare coding-agent identities, deployment surfaces and source evidence.",
    body: ["Use the coding-agent directory to inspect primary repositories and source status. Feature-level claims stay unknown until verified.", "Start with OpenHands, Cline, Aider, Gemini CLI and Qwen Code in the verified graph."],
    index: true
  },
  "best-ai-agent-alternatives": {
    title: "AI agent directories and discovery alternatives",
    description: "How to compare AI-agent discovery products and open catalogs without fake leaderboards.",
    body: ["Discovery sites differ in breadth, editorial depth, source provenance and whether rankings are reproducible.", "BestAIAgent.in is designed around entity identity, primary-source evidence, explicit unknowns and crawlable canonical pages."],
    index: true
  },
  "best-ai-agents-for-automation": {
    title: "AI agents for automation",
    description: "Evidence-first guide to automation agents and orchestration frameworks.",
    body: ["Automation spans workflow tools, browser agents, code agents and multi-agent frameworks.", "Choose by concrete integration requirements and source-backed deployment constraints rather than a universal score."],
    index: true
  },
  "rankings": {
    title: "Rankings policy",
    description: "Why BestAIAgent.in does not publish synthetic AI-agent leaderboards.",
    body: ["The previous build contained numeric ratings that did not have a complete reproducible evidence chain. They are intentionally not migrated.", "When a future benchmark exists, the methodology, inputs, versions, hardware, prompts, outputs and scoring code must be public enough to reproduce."],
    index: true
  },
  "pricing": {
    title: "AI agent pricing evidence",
    description: "Pricing tracker policy: source, retrieval date and plan context required.",
    body: ["Pricing changes quickly. This site treats price as a high-freshness field and does not convert currencies or claim India billing support without a dated primary source.", "Use official pricing links on entity pages for current values."],
    index: true
  },
  "cursor-pricing": {
    title: "Cursor pricing source",
    description: "Current Cursor pricing should be verified at the first-party source.",
    body: ["The legacy numeric price snapshot was removed. Use Cursor's official models and pricing documentation for current plan information."],
    index: true
  },
  "github-copilot-pricing": {
    title: "GitHub Copilot pricing source",
    description: "Current GitHub Copilot pricing should be verified at GitHub.",
    body: ["The legacy numeric price snapshot was removed because pricing is time-sensitive. Verify the current plan at GitHub's official product documentation."],
    index: true
  },
  "claude-code-pricing": {
    title: "Claude Code pricing source",
    description: "Current Claude Code cost depends on Anthropic plans and usage; verify first-party documentation.",
    body: ["No fixed INR price is asserted here. Check Anthropic's official documentation for the current billing model."],
    index: true
  },
  "reviews": {
    title: "Reviews and evidence",
    description: "BestAIAgent.in separates verified facts, source-linked facts and editorial analysis.",
    body: ["A review may include editorial interpretation, but factual fields must map to evidence records.", "No paid placement influences evidence status or directory ordering."],
    index: true
  },
  "sitemap": {
    title: "HTML sitemap",
    description: "Browse the main BestAIAgent.in authority graph.",
    body: ["Core surfaces: Agents, Models, Frameworks, Providers, India AI, MCP, Comparisons, Research and Methodology.", "Machine-readable sitemap: /sitemap.xml."],
    index: true
  },
  "about": {
    title: "About BestAIAgent.in",
    description: "Independent evidence-first AI agent and model authority graph.",
    body: ["BestAIAgent.in is an India-built directory and knowledge graph for AI agents, models, frameworks, providers and MCP infrastructure.", "The core editorial rule is simple: unknown stays unknown."],
    index: true
  },
  "authors": {
    title: "Authors and review responsibility",
    description: "Editorial ownership and evidence-review policy.",
    body: [
      "Articles and entity records should identify editorial responsibility when substantive analysis is added.",
      "Automated ingestion can discover candidates, but discovery is not publication.",
      "This page is a short summary kept for URL continuity. For who a named reviewer actually is, and what a review attestation covers, see author attribution below."
    ],
    relatedLinks: [{ href: "/trust/author-reviewer-policy", label: "Author attribution" }],
    index: false
  },
  "methodology": {
    title: "Evidence methodology",
    description: "How entities move from discovery to public indexability.",
    body: [
      "Discovery → normalization → evidence → verification → publication → indexability.",
      "A verified entity requires at least one valid primary-authority evidence snapshot with retrieval time and SHA-256. Field-level claims can remain unknown.",
      "This page is a short summary kept for URL continuity. For what a receipt actually contains, how it's hashed, and how the fail-closed gate uses it, see the fuller evidence methodology page below."
    ],
    relatedLinks: [{ href: "/trust/evidence-methodology", label: "Evidence methodology — what a receipt actually contains" }],
    index: false
  },
  "editorial-policy": {
    title: "Editorial policy",
    description: "Fail-closed publication and no fabricated authority.",
    body: [
      "No synthetic ratings, testimonials, market-share figures, compliance badges or benchmark winners are published without supporting evidence.",
      "Editorial judgments are labeled and kept separate from source-derived facts.",
      "This page is a short summary kept for URL continuity. For the full editorial process — including the methodology-only publication path for pages with no external claim to evidence — see editorial methodology below."
    ],
    relatedLinks: [{ href: "/trust/editorial-methodology", label: "Editorial methodology — how content gets published here" }],
    index: false
  },
  "review-process": {
    title: "Review process",
    description: "How BestAIAgent.in reviews source evidence.",
    body: [
      "Primary sources are preferred for identity, licensing, product status and model-card facts. A vendor's own documentation, a project's own repository, or a regulator's own published text counts as primary; a third-party summary, review site, or aggregator counts as secondary and is used only to locate a primary source, never as the evidence itself.",
      "High-volatility fields such as pricing require more frequent refreshes than stable identity fields — a model's developer or license rarely changes, but a subscription price can change without notice. This site's freshness policy sets how often each field type is expected to be re-checked, and a stale field is marked as such rather than left looking current.",
      "Review is per-field, not per-page: a page can have its identity fields verified while its pricing field stays unknown, and each field's status is shown independently rather than one blended confidence score for the whole entity."
    ],
    relatedLinks: [
      { href: "/trust/freshness-policy", label: "Freshness policy" },
      { href: "/trust/source-classification", label: "Source classification: primary and secondary evidence" },
      { href: "/trust/how-to-verify", label: "How to verify a claim yourself" }
    ],
    index: true
  },
  "corrections": {
    title: "Corrections",
    description: "How to report a material error or submit better evidence.",
    body: [
      "Corrections should identify the entity, field, proposed value and primary source URL.",
      "Superseded evidence should remain auditable rather than being silently rewritten.",
      "This page is a short summary kept for URL continuity. For the full corrections process see the fuller corrections page below; to actually submit one, see contact."
    ],
    relatedLinks: [
      { href: "/trust/corrections", label: "Corrections — full process" },
      { href: "/contact", label: "Contact and corrections" }
    ],
    index: false
  },
  "privacy-policy": {
    title: "Privacy policy",
    description: "BestAIAgent.in privacy overview.",
    body: ["The public directory is designed to work without requiring user accounts.", "Operational analytics, if enabled, should be minimized and documented."],
    index: true
  },
  "terms": {
    title: "Terms",
    description: "BestAIAgent.in site terms.",
    body: ["Information is provided for research and comparison. Verify vendor terms, licenses and pricing at the original source before making procurement or deployment decisions."],
    index: true
  },
  "affiliate-disclosure": {
    title: "Affiliate disclosure",
    description: "Commercial relationship disclosure policy.",
    body: [
      "The evidence graph does not sell verification or ranking position.",
      "If affiliate relationships are introduced, they must be disclosed on the affected page and may not change evidence status.",
      "This page is a short summary kept for URL continuity. For the full disclosure — including how an affiliate link is marked and what it cannot influence — see affiliate disclosure below."
    ],
    relatedLinks: [{ href: "/trust/affiliate-disclosure", label: "Affiliate disclosure — full policy" }],
    index: false
  },
  "contact": {
    title: "Contact and corrections",
    description: "Contact BestAIAgent.in for corrections and evidence submissions.",
    body: ["Submit corrections with a source URL and the exact field that needs review.", "Repository issues can also be used for reproducible evidence corrections."],
    index: true
  },
  "knowledge-graph": {
    title: "AI entity knowledge graph",
    description: "How agents, models, frameworks, providers and evidence connect.",
    body: [
      "The authority layer models entities and relationships rather than generating pages from keyword permutations. An agent entity can reference the models it's built on and the provider that publishes it; a provider entity doesn't inherit any product-level claim from the entities it's linked to, since identity and product-specific facts are verified separately (see the providers directory for why that separation matters).",
      "Every public detail route should be reachable through normal internal links — a category hub, a comparison, a provider page — and not only through a sitemap entry, so a reader (or a crawler) arrives at an entity the same way whichever page they started from.",
      "The same graph is exposed as machine-readable JSON, not only as HTML: catalog.json for the full public catalog, models.json and providers.json for those two entity types, and llms.txt / llms-full.txt as a plain-text summary aimed at language-model retrieval rather than a browser. None of these feeds carry a claim that isn't also on the corresponding HTML page — they're the same evidence-gated data in a different format, not a separate, looser publication path."
    ],
    relatedLinks: [
      { href: "/catalog.json", label: "catalog.json" },
      { href: "/llms.txt", label: "llms.txt" },
      { href: "/providers", label: "Providers directory" }
    ],
    index: true
  },
  "local-llm-benchmarks-india": {
    title: "Local LLM serving in India: benchmark methodology",
    description: "Ollama, vLLM and local inference guidance without unsupported synthetic benchmark numbers.",
    body: ["The historical draft contained performance numbers compiled from mixed sources. Those numbers are not migrated as BestAIAgent.in benchmark facts.", "A future India benchmark should publish hardware, model, quantization, concurrency, prompt set, software version, power measurement and raw outputs before declaring a performance winner.", "For now, this page acts as a reproducibility checklist and links to verified Indian model cards."],
    index: true
  },
  "best-ai-agent-builder": {
    title: "AI agent builders",
    description: "Agent-building frameworks and platforms organized by verifiable source identity.",
    body: ["Start with frameworks, tool protocols and deployment requirements. Builder pages are linked to primary source identities when available."],
    index: true
  },
  "silos": {
    title: "AI agent knowledge silos",
    description: "Topical hubs across coding, research, browser, business and automation agents.",
    body: ["Silos are navigation aids, not automatically generated SEO pages. A silo should exist only when there is enough distinct, useful content to justify it."],
    index: true
  },
  "silos/builders": {
    title: "AI agent builder silo",
    description: "Builder-oriented agent frameworks, MCP infrastructure and development tools.",
    body: ["This hub connects framework, MCP and coding-agent content without duplicating canonical entity pages."],
    index: true
  }
};
