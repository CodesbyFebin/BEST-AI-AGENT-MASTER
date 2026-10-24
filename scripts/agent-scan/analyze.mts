export interface AnalyzedSignals {
  typeConfidence: number;
  confidenceSignals: string[];
}

const AGENT_WORDS = /\b(?:agentic?\s+(?:ai|workflow|system|framework)|mcp\s+server|llm\s+tool|agent\s+framework|autonomous\s+agent)\b/i;
const KNOWN_AGENT_LIBRARIES = /(?:langchain|langgraph|crewai|autogen|semantic-kernel|smolagents|modelcontextprotocol|mcp\b|openai-agents)/i;
const TOOL_DECLARATIONS = /@tool\b|registerTool\s*\(|addTool\s*\(|tool_calls|tool_use|def\s+tool_[a-z0-9_]+/i;

export function analyzeSignals(files: Array<{ path: string; content: string }>): AnalyzedSignals {
  const signals: string[] = [];
  const readme = files.find((file) => /^readme\.md$/i.test(file.path))?.content ?? "";
  const allText = files.map((file) => file.content).join("\n");
  const pathText = files.map((file) => file.path).join("\n");

  if (AGENT_WORDS.test(readme)) signals.push("README describes agentic or tool behavior");
  if (/(?:^|\/)(?:agents?|skills?|tools?|mcp)(?:\/|\.|$)/im.test(pathText)) signals.push("Repository contains agent, skill, tool, or MCP paths");
  if (KNOWN_AGENT_LIBRARIES.test(allText)) signals.push("Recognized agent or MCP framework signal");
  if (TOOL_DECLARATIONS.test(allText)) signals.push("Tool registration or tool-calling signal");

  return {
    typeConfidence: Math.min(1, Number((signals.length * 0.25).toFixed(2))),
    confidenceSignals: signals
  };
}
