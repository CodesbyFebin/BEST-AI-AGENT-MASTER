export type BlogSection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export type BlogPost = {
  category: string;
  categoryLabel: string;
  subcategory: string;
  subcategoryLabel: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  directAnswer: string;
  sections: BlogSection[];
};

// Deep-taxonomy blog posts (/blog/[category]/[subcategory]/[slug]), distinct
// from the flat-slug posts listed in app/blog/page.tsx's `posts` array.
export const blogPosts: BlogPost[] = [
  {
    category: "agent-builders-no-code-open-source",
    categoryLabel: "Agent Builders & No-Code / Open Source",
    subcategory: "agent-deployment-hosting",
    subcategoryLabel: "Agent Deployment & Hosting",
    slug: "ai-agent-deployment-reddit-guide-the-biggest-mistakes-costs-and-workarounds",
    title: "AI Agent Deployment: The Biggest Mistakes, Costs, and Workarounds",
    description: "The recurring, avoidable mistakes teams make deploying an AI agent to production, and what actually fixes each one.",
    date: "2026-08-30",
    readTime: "9 min",
    directAnswer: "The most common, costliest AI agent deployment mistakes are: shipping without a spend cap on usage-metered APIs, granting a tool broader permissions than the task needs, and assuming a demo's latency and reliability will hold up under real production load. All three are avoidable with configuration changes made before launch, not after an incident.",
    sections: [
      { heading: "No spend cap on usage-metered APIs", paragraphs: [
        "An agent that calls a pay-per-token model API, or a tool that itself bills per call, has no natural ceiling on cost unless one is set explicitly. A bug that causes a retry loop, or simply more real usage than the demo ever saw, can turn a manageable bill into a five-figure surprise within days. Every provider that supports it should have a hard spend cap or rate limit configured before the agent handles real traffic, not added reactively after the first unexpected invoice."
      ]},
      { heading: "Overscoped tool permissions", paragraphs: [
        "It's faster to grant a database tool full read/write access than to scope it precisely, and that shortcut is exactly what turns a single reasoning mistake or a prompt-injection attempt into real damage instead of a contained one. Scope every tool to the narrowest permission the task actually needs — see MCP best practices for the specific pattern — before the agent touches production data."
      ]},
      { heading: "Assuming demo performance holds in production", paragraphs: [
        "A demo is typically run against a small, clean dataset with no concurrent users. Production traffic surfaces problems a demo never will: rate limiting under concurrent load, slow responses on larger or messier real data, and edge cases the demo's scripted path never exercised. Load-testing against realistic data volume and concurrency, before launch, is the difference between finding these problems on a Tuesday afternoon versus during an actual incident."
      ]},
      { heading: "Practical workarounds", bullets: [
        "Set hard spend caps and alerts on every metered API before launch, not after the first bill.",
        "Default every new tool integration to read-only; add write access only for the specific operations that need it.",
        "Load-test against realistic (not demo-scale) data and concurrency before declaring production-ready.",
        "Log per-tool latency and error rates from day one (see MCP server logging) so a real incident is diagnosable instead of a mystery."
      ]}
    ]
  },
  {
    category: "agent-builders-no-code-open-source",
    categoryLabel: "Agent Builders & No-Code / Open Source",
    subcategory: "human-in-the-loop-workflow-design",
    subcategoryLabel: "Human-in-the-Loop Workflow Design",
    slug: "the-2026-shift-in-human-in-the-loop-ai-agents-what-operations-and-compliance-teams-need-to-prepare-for",
    title: "Human-in-the-Loop AI Agents: What Operations and Compliance Teams Need to Prepare For",
    description: "As agents are granted more autonomy, the human-in-the-loop design pattern is shifting from a blanket approval gate to selective, risk-based checkpoints.",
    date: "2026-08-30",
    readTime: "8 min",
    directAnswer: "The practical shift in human-in-the-loop (HITL) design is away from requiring approval on every agent action toward requiring it only for actions above a defined risk or reversibility threshold — irreversible, high-value, or externally-visible actions still need a human checkpoint, while low-risk, easily-reversible actions increasingly run unattended. Operations and compliance teams need a clear, written definition of that threshold before granting an agent more autonomy, not after.",
    sections: [
      { heading: "Why blanket approval doesn't scale", paragraphs: [
        "Requiring human sign-off on every single agent action was a reasonable starting posture when agents were new and unproven, but it doesn't scale — either the approval queue becomes a bottleneck that defeats the purpose of automation, or approvers rubber-stamp requests without real review once volume grows, which is worse than no review at all because it creates a false sense of oversight."
      ]},
      { heading: "The shift toward risk-based checkpoints", paragraphs: [
        "The more sustainable pattern gates on the properties of the action itself, not on which agent performed it: is it reversible (a draft email versus a sent one), does it touch money or personal data, and is it externally visible (a customer-facing action versus an internal one). Actions that fail any of those checks get a human checkpoint; actions that pass all of them can run unattended, with the decision and its inputs still logged for after-the-fact audit."
      ]},
      { heading: "What compliance teams specifically need to define", bullets: [
        "A written, specific list of action types that always require human approval, not a vague \"high-risk actions\" standard that different reviewers interpret differently.",
        "An audit trail requirement for unattended actions — what the agent decided and why, retrievable after the fact, even when no human was in the loop at the time.",
            "An escalation path for the agent itself to flag uncertainty and request review, rather than only relying on a fixed pre-defined action list to catch every risky case.",
        "A review cadence for the approval-vs-unattended boundary itself, since the right threshold shifts as the agent's track record and the task's stakes change."
      ]},
      { heading: "What this means in practice", paragraphs: [
        "Teams that already have this framework written down before increasing an agent's autonomy avoid the two failure modes above; teams that grant more autonomy first and figure out the review policy after an incident tend to overcorrect back to blanket approval, losing most of the efficiency gain that prompted the change in the first place."
      ]}
    ]
  },
  {
    category: "business-ai-automation",
    categoryLabel: "Business AI Automation",
    subcategory: "lead-generation-sales-agents",
    subcategoryLabel: "Lead Generation & Sales Agents",
    slug: "how-do-you-compare-ai-sales-agents-for-sales-teams-and-founders",
    title: "How Do You Compare AI Sales Agents? A Framework for Sales Teams and Founders",
    description: "A structured way to evaluate AI sales tools against your actual pipeline, rather than a feature checklist.",
    date: "2026-08-30",
    readTime: "8 min",
    directAnswer: "Compare AI sales agents by what stage of the pipeline they actually own — data enrichment and sourcing, outbound sequencing, or deal execution — since most tools specialize rather than covering the full pipeline equally well, and a feature checklist that ignores this tends to overrate tools that are broad-but-shallow relative to ones that are narrow-but-deep at the specific stage you need most.",
    sections: [
      { heading: "Identify which pipeline stage you're actually solving for", paragraphs: [
        "\"AI sales agent\" spans very different jobs: finding and enriching the right contacts, running outbound sequences and follow-ups, and helping close and execute a deal once a conversation has started. A tool built primarily for one of these can look broadly capable in a demo while being genuinely weak at the others — the comparison that matters is against the specific stage causing the most friction in your actual pipeline today."
      ]},
      { heading: "A concrete example: Clay vs. Apollo.io", paragraphs: [
        "This site's own verified comparison of Clay vs. Apollo.io illustrates the pattern directly: Clay positions itself as data-enrichment and agentic-workflow infrastructure that can pull from many external sources, while Apollo.io bundles a large first-party contact database with outbound automation and deal execution in one platform. Neither is categorically \"better\" — they solve different shapes of the same broad problem, and the right pick depends on whether you already have a data source and need orchestration, or need the data source itself."
      ]},
      { heading: "Questions worth asking before evaluating capability", bullets: [
        "Do we already have a reliable contact/account data source, or is that the gap we're filling?",
        "Is the bottleneck volume (more qualified leads) or quality (better-targeted, better-timed outreach)?",
        "Does the tool need to integrate with an existing CRM as source of truth, or can it become one?",
        "What's the actual cost model — flat subscription, per-contact, or usage-metered — at our real volume, not the vendor's example volume?"
      ]},
      { heading: "Why this site doesn't publish a single ranked list", paragraphs: [
        "A single \"best AI sales agent\" ranking would imply these tools compete head-to-head on the same axis, which the pipeline-stage distinction above shows isn't generally true. Verify pipeline-stage fit and pricing against your own numbers before deciding, using this site's verified entity pages as a starting point for identity and sourcing, not a capability score."
      ]}
    ]
  },
  {
    category: "industry-role-ai-agents",
    categoryLabel: "Industry & Role-Specific AI Agents",
    subcategory: "education-agents",
    subcategoryLabel: "Education Agents",
    slug: "production-checklist-ai-agents-for-education-for-indian-learners-preparing-for-competitive-exams",
    title: "A Production Checklist for AI Agents Serving Indian Competitive-Exam Learners",
    description: "What actually needs to be verified before deploying an AI tutoring or practice agent to students preparing for Indian competitive exams.",
    date: "2026-08-30",
    readTime: "9 min",
    directAnswer: "Before deploying an AI agent for Indian competitive-exam preparation (JEE, NEET, UPSC, and similar), verify four things specifically: syllabus and exam-pattern alignment with the current, official exam body's specification (not a generic global curriculum), handling of minors' personal data under the DPDP Act, genuine support for low-bandwidth and low-end-device access given the real device and connectivity mix of the target learners, and accuracy on India-specific subject content that a globally-trained model may not have been fine-tuned on.",
    sections: [
      { heading: "Syllabus and exam-pattern alignment", paragraphs: [
        "Competitive exams like JEE, NEET, and UPSC have specific, officially-published syllabi and question patterns that change periodically. A general-purpose tutoring agent built on broad global educational content can be confidently wrong about India-specific exam structure, marking schemes, or syllabus scope — this needs to be checked against the current official exam body specification directly, not assumed from the model's general training."
      ]},
      { heading: "Minors' data and the DPDP Act", paragraphs: [
        "A significant share of competitive-exam learners are minors, and India's Digital Personal Data Protection Act has specific provisions around processing children's data, including consent requirements. This needs a real compliance review before launch — not a general privacy policy adapted from a product built for a different jurisdiction or a different age group."
      ]},
      { heading: "Low-bandwidth and low-end-device access", paragraphs: [
        "Competitive-exam aspirants in India span a very wide range of device and connectivity access, including many on shared or low-end devices and inconsistent mobile data. An agent that assumes reliable broadband and a modern device will genuinely fail a meaningful share of its intended users — this needs to be tested against realistic low-bandwidth conditions, not just a fast office connection."
      ]},
      { heading: "India-specific subject accuracy", bullets: [
        "Verify factual accuracy on India-specific subject matter (Indian history, polity, geography, and current affairs for UPSC in particular) directly — a globally-trained model's confidence is not evidence of accuracy here.",
        "Check regional-language and Hinglish support if the target learner base needs it, rather than assuming English-only is sufficient.",
        "Confirm the agent clearly flags uncertainty rather than generating a plausible-sounding but wrong answer on a factual question a student might rely on for exam preparation."
      ]}
    ]
  },
  {
    category: "mcp-agent-interoperability",
    categoryLabel: "MCP & Agent Interoperability",
    subcategory: "mcp-hosting-deployment",
    subcategoryLabel: "MCP Hosting & Deployment",
    slug: "how-can-you-evaluate-mcp-server-hosting-for-production-use",
    title: "How Can You Evaluate MCP Server Hosting for Production Use?",
    description: "The specific things worth checking before running an MCP server against real production systems, beyond \"does it start.\"",
    date: "2026-08-30",
    readTime: "8 min",
    directAnswer: "Evaluate MCP server hosting for production on four axes: whether the transport is authenticated and encrypted for anything reachable over a network, whether the credentials it holds are scoped to least privilege, whether tool calls and errors are logged with redaction of sensitive payloads, and whether the hosting environment can actually sustain the concurrency and latency the real workload needs — not just whether the server starts successfully in a local test.",
    sections: [
      { heading: "Transport security", paragraphs: [
        "Local stdio transport is appropriate only for tools that run on the same machine as their client. Anything reachable over a network needs authenticated, encrypted HTTP transport — a server exposed on the network without authentication is reachable by anyone who finds the address, not just the intended client. See MCP best practices for the underlying principle."
      ]},
      { heading: "Credential scoping", paragraphs: [
        "The credentials an MCP server holds (a database connection, an API key, a service account) should be scoped to exactly what the server's tools need, not a broad or shared credential reused across multiple integrations. A compromised or manipulated server with an overscoped credential can affect far more than the specific integration it was meant to support."
      ]},
      { heading: "Logging and observability", paragraphs: [
        "Production hosting needs per-tool-call logging — which tool, when, success or failure, latency — with sensitive argument and response content redacted by default (see MCP server logging). Without this, diagnosing a production incident involving an agent's tool calls is close to impossible after the fact."
      ]},
      { heading: "Real concurrency and latency, not a local smoke test", bullets: [
        "Test the hosting environment under the concurrency level the real workload will actually generate, not a single local session.",
        "Check cold-start latency specifically if the hosting platform can scale to zero — an MCP server that takes several seconds to wake up on first call behaves very differently from one that's always warm.",
        "Confirm the hosting platform's resource limits (memory, execution time) are compatible with the server's actual workload, especially for tools that process larger payloads or make several downstream calls per invocation."
      ]}
    ]
  },
  {
    category: "voice-ai-agents",
    categoryLabel: "Voice AI Agents",
    subcategory: "hindi-hinglish-indian-languages",
    subcategoryLabel: "Hindi, Hinglish & Indian Languages",
    slug: "how-can-you-evaluate-hindi-ai-voice-agents-for-production-use",
    title: "How Can You Evaluate Hindi AI Voice Agents for Production Use?",
    description: "Specific evaluation criteria for Hindi and Hinglish voice agents that a general voice-AI benchmark won't surface.",
    date: "2026-08-30",
    readTime: "8 min",
    directAnswer: "Evaluate a Hindi AI voice agent for production specifically on code-switching handling (real Hindi speech routinely mixes in English words and phrases, not clean monolingual Hindi), accent and dialect coverage across the actual regions your callers are from, and end-to-end latency measured with real phone audio quality — not a studio-recorded, clean-audio test set that overstates real-world accuracy.",
    sections: [
      { heading: "Code-switching (Hinglish), not just Hindi", paragraphs: [
        "Real spoken Hindi in most everyday contexts — including customer service calls — routinely code-switches into English mid-sentence for technical terms, brand names, and increasingly common everyday phrases. A voice agent evaluated only on clean, monolingual Hindi speech can perform noticeably worse on real code-switched calls, and this gap doesn't show up unless it's tested against representative Hinglish audio specifically, not a curated Hindi-only benchmark."
      ]},
      { heading: "Regional accent and dialect coverage", paragraphs: [
        "Hindi as spoken varies meaningfully by region, and a voice agent's speech recognition accuracy can vary substantially across that range even when its overall benchmark score looks strong. If the deployment serves a specific region or a broad national base, test against speech samples representative of the actual caller population, not just one accent."
      ]},
      { heading: "Latency and audio quality under real phone conditions", paragraphs: [
        "See best AI voice agent for the general latency and interruption-handling considerations that apply here directly — they matter even more for Hindi/Hinglish specifically, because the full pipeline (speech-to-text, model reasoning, text-to-speech) has more opportunity to lose accuracy at each step when handling code-switched or accented speech under imperfect real phone audio, compared to clean single-language English test conditions."
      ]},
      { heading: "A concrete pre-launch checklist", bullets: [
        "Test against real Hinglish (code-switched) audio samples, not Hindi-only or English-only test sets.",
        "Test across the specific regional accents your actual caller base represents.",
        "Measure end-to-end latency using real phone-quality audio, including background noise, not studio recordings.",
        "Verify barge-in (interruption) handling specifically in Hindi/Hinglish, since some pipelines are tuned primarily for English interruption patterns."
      ]}
    ]
  }
];

export const findBlogPost = (category: string, subcategory: string, slug: string): BlogPost | null =>
  blogPosts.find((p) => p.category === category && p.subcategory === subcategory && p.slug === slug) ?? null;
