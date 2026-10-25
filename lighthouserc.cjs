/** Opt-in lab testing; does not measure real-user p75 INP. No workflow runs by default. */
module.exports = {
  ci: {
    collect: {
      url: ["https://www.bestaiagent.in/", "https://www.bestaiagent.in/agents/", "https://www.bestaiagent.in/mcp/", "https://www.bestaiagent.in/india/"],
      numberOfRuns: 3,
      settings: { preset: "desktop" }
    },
    assert: { assertions: {
      "categories:seo": ["warn", { minScore: 0.9 }],
      "categories:accessibility": ["warn", { minScore: 0.9 }],
      "categories:performance": ["warn", { minScore: 0.8 }]
    }},
    upload: { target: "temporary-public-storage" }
  }
};
