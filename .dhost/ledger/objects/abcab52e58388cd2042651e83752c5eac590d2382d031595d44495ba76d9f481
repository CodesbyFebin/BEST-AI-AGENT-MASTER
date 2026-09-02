export type ToolProfile = {
  name: string;
  developer: string;
  summary: string;
  sourceUrl: string;
  sourceLabel: string;
  categories: string[];
  index: boolean;
  lastReviewed: string;
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
  }
};
