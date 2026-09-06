export type GlossaryTerm = {
  term: string;
  slug: string;
  category: string;
  definition: string;
  related?: { href: string; label: string }[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "AI Agent", slug: "ai-agent", category: "Core Concepts",
    definition: "An autonomous or semi-autonomous software system that perceives its environment, makes decisions, and takes actions to achieve specific goals. AI agents can be simple (rule-based) or complex (LLM-powered with tool integration). In the context of BestAIAgent.in, we evaluate agents that combine language models with external tools and data sources to accomplish tasks on behalf of users.",
    related: [{ href: "/what-is-an-ai-agent", label: "What is an AI agent? (full explainer)" }, { href: "/agents", label: "Verified AI agents directory" }]
  },
  {
    term: "Context Window", slug: "context-window", category: "Core Concepts",
    definition: "The maximum amount of text (measured in tokens) that an AI model can process in a single request. Larger context windows allow agents to work with longer documents, maintain longer conversations, and process more complex instructions. However, larger context windows also increase cost and latency. MCP helps optimize context window usage by enabling agents to write code that calls tools directly, bypassing the need to include tool documentation in the context.",
    related: [{ href: "/mcp-context-window-optimization", label: "MCP context window optimization" }, { href: "/how-to-fix-mcp-token-bloat", label: "How to fix MCP token bloat" }]
  },
  {
    term: "Token", slug: "token", category: "Core Concepts",
    definition: "The basic unit of text processing in language models. Tokens can be words, parts of words, or individual characters, depending on the model's tokenizer. For English text, one token is approximately 4 characters or 0.75 words. For Indian languages, tokenization is less efficient — some languages require more tokens to express the same content. Pricing for API-based models is typically per-token.",
    related: [{ href: "/how-to-price-ai-agents-in-inr", label: "How to price AI agents in INR" }]
  },
  {
    term: "Prompt Engineering", slug: "prompt-engineering", category: "Core Concepts",
    definition: "The practice of crafting effective inputs (prompts) to AI models to produce desired outputs. Good prompt engineering involves providing clear instructions, relevant context, examples, and constraints. For agents, prompt engineering extends to system prompts that define the agent's role, capabilities, and behavioral guidelines.",
    related: [{ href: "/what-is-agentic-workflow", label: "What is an agentic workflow?" }]
  },
  {
    term: "Retrieval-Augmented Generation (RAG)", slug: "rag", category: "Core Concepts",
    definition: "A technique that enhances AI model responses by retrieving relevant information from external knowledge sources before generating a response. RAG systems typically use vector databases to store and retrieve document chunks based on semantic similarity. This approach reduces hallucination and enables agents to provide up-to-date information beyond their training data.",
    related: [{ href: "/what-is-rag-in-ai", label: "What is RAG in AI? (full explainer)" }, { href: "/agentic-rag-performance", label: "Agentic RAG performance benchmarking" }]
  },
  {
    term: "Embedding", slug: "embedding", category: "Core Concepts",
    definition: "A numerical representation (vector) of text, images, or other data in a high-dimensional space. Embeddings capture semantic meaning — items with similar meanings have similar embeddings. AI models generate embeddings that can be stored in vector databases and queried for semantic search. Embedding models are evaluated on their ability to capture semantic relationships and support downstream tasks.",
    related: [{ href: "/glossary/vector-database", label: "Vector database" }]
  },
  {
    term: "Tool Use", slug: "tool-use", category: "Core Concepts",
    definition: "The capability of AI agents to invoke external tools (APIs, databases, file systems, etc.) to accomplish tasks beyond text generation. MCP standardizes tool use by defining a common interface for tool discovery, invocation, and result handling. Agents with strong tool use capabilities can automate complex workflows that combine multiple systems.",
    related: [{ href: "/what-is-mcp-protocol", label: "What is MCP protocol?" }, { href: "/how-to-integrate-custom-tools-ai", label: "How to integrate custom tools" }]
  },
  {
    term: "Open-Weight Models", slug: "open-weight-models", category: "Core Concepts",
    definition: "AI models whose weights (parameters) are publicly available, enabling researchers and developers to inspect, modify, and deploy them independently. Open-weight models contrast with closed-weight models where the weights are proprietary — a distinct question from whether the training code or dataset is also open.",
    related: [{ href: "/what-is-open-source-ai-agent", label: "What is an open source AI agent?" }, { href: "/categories/open-source", label: "Open source AI agents" }]
  },
  {
    term: "Fine-Tuning", slug: "fine-tuning", category: "Core Concepts",
    definition: "The process of further training a pre-trained AI model on a specific dataset to improve performance on particular tasks or domains. Fine-tuning can adapt a general-purpose model to specialized use cases like legal document analysis, medical diagnosis, or Indian language processing.",
    related: [{ href: "/indic-language-ai-models", label: "Indic language AI models" }]
  },
  {
    term: "Model Context Protocol (MCP)", slug: "mcp", category: "Infrastructure",
    definition: "An open protocol that defines a universal interface for connecting AI assistants and agents to external data sources, tools, and services. MCP operates on a client-server model where the client is the AI agent and the server is the tool or data source being connected. The protocol supports two transport mechanisms: stdio (for local development) and Streamable HTTP (for remote deployments).",
    related: [{ href: "/what-is-mcp-protocol", label: "What is MCP protocol? (full explainer)" }, { href: "/mcp", label: "MCP authority hub" }]
  },
  {
    term: "Stdio Transport", slug: "stdio-transport", category: "Infrastructure",
    definition: "A transport mechanism for MCP that communicates over standard input and output streams. Stdio transport is preferred for local development because it is secure by default — no network exposure — and works seamlessly with local tools like file system browsers, database clients, and development utilities. The agent and server run as separate processes on the same machine.",
    related: [{ href: "/mcp-stdio-vs-http-transport", label: "Stdio vs. Streamable HTTP transport" }, { href: "/how-to-fix-mcp-stdio-timeout", label: "How to fix MCP stdio timeout" }]
  },
  {
    term: "Streamable HTTP", slug: "streamable-http", category: "Infrastructure",
    definition: "A transport mechanism for MCP that uses HTTP with streaming responses, designed for remote and enterprise deployments where servers may run on different machines or in containerized environments. Streamable HTTP requires the operator to handle authentication, TLS, and rate limiting — the protocol does not enforce these for you.",
    related: [{ href: "/mcp-stdio-vs-http-transport", label: "Stdio vs. Streamable HTTP transport" }, { href: "/how-to-fix-mcp-auth-errors", label: "How to fix MCP auth errors" }]
  },
  {
    term: "Vector Database", slug: "vector-database", category: "Infrastructure",
    definition: "A database designed to store and query vector embeddings — numerical representations of text, images, or other data. Vector databases enable semantic search by finding items with similar embeddings to a query. Common vector databases include Pinecone, Weaviate, Qdrant, and Chroma. They are essential components of RAG systems and AI agent memory architectures.",
    related: [{ href: "/what-is-rag-in-ai", label: "What is RAG in AI?" }]
  },
  {
    term: "DPDP Act", slug: "dpdp-act", category: "Compliance",
    definition: "The Digital Personal Data Protection Act, 2023, is India's comprehensive framework for personal data processing. For AI agents, the Act's most significant provision is the classification of voice data as biometric data, which triggers heightened consent and security obligations. The Act requires explicit consent for data processing, data fiduciaries to maintain transparency, and breach notification to the Data Protection Board.",
    related: [{ href: "/what-is-dpdp-compliance-in-ai", label: "What is DPDP compliance for AI? (full explainer)" }, { href: "/trust/privacy-dpdp-editorial-policy", label: "Privacy & DPDP editorial policy" }]
  },
  {
    term: "Data Residency", slug: "data-residency", category: "Compliance",
    definition: "The requirement that data pertaining to Indian residents be stored and processed within India's borders. Under the DPDP Act, certain categories of personal data may require local storage. For AI agents, data residency affects deployment architecture — agents processing personal data of Indian residents may need to use on-premise deployment or Indian cloud regions.",
    related: [{ href: "/india-hosted-ai-models", label: "India-hosted AI models" }, { href: "/on-premise-ai-agents", label: "On-premise AI agents" }]
  },
  {
    term: "Indic Language Models", slug: "indic-language-models", category: "India AI",
    definition: "AI models specifically trained or fine-tuned for Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, and others. These models often outperform global models in regional cultural context and code-switching scenarios (e.g., Hinglish).",
    related: [{ href: "/indic-language-ai-models", label: "Indic language AI models (full explainer)" }, { href: "/sarvam-krutrim-model-directory", label: "Sarvam & Krutrim model directory" }]
  },
  {
    term: "Hinglish", slug: "hinglish", category: "India AI",
    definition: "A code-switching language blend of Hindi and English commonly used in urban India. Hinglish presents unique challenges for AI models because it mixes vocabulary, grammar, and script from both languages within a single conversation. Models that support Hinglish can serve a significant portion of India's English-speaking population more effectively.",
    related: [{ href: "/indic-language-voice-bots", label: "Indic language voice bots" }]
  },
  {
    term: "Sovereign AI", slug: "sovereign-ai", category: "India AI",
    definition: "AI systems that operate within a country's borders, using local infrastructure and complying with local regulations. For India, sovereign AI means deploying agents on Indian cloud regions or on-premise infrastructure, ensuring data residency, and complying with the DPDP Act. Sovereign AI is a priority for government, defense, and regulated industries.",
    related: [{ href: "/india-hosted-ai-models", label: "India-hosted AI models" }]
  },
  {
    term: "Bhashini", slug: "bhashini", category: "India AI",
    definition: "The National Language Translation Mission, a Government of India initiative that provides APIs for translation between all 22 official Indian languages. Bhashini supports text translation, speech-to-text, text-to-speech, and optical character recognition. AI agents can integrate with Bhashini to support multilingual Indian users.",
    related: [{ href: "/bhashini-api-ai-integrations", label: "AI agents powered by Bhashini APIs" }]
  },
  {
    term: "AIRAWAT", slug: "airawat", category: "India AI",
    definition: "India's national AI computing platform, part of the IndiaAI Mission. AIRAWAT provides shared GPU compute infrastructure for startups, researchers, and academic institutions that cannot afford private GPU clusters. The platform aims to democratize access to AI computing resources and accelerate domestic AI development.",
    related: [{ href: "/india", label: "India & Indic AI hub" }]
  },
  {
    term: "IndiaAI Mission", slug: "indiaai-mission", category: "India AI",
    definition: "A Government of India initiative with ₹10,000 crore (approximately $1.25 billion) in funding to accelerate domestic AI development. The mission focuses on compute infrastructure (AIRAWAT), innovation centers, datasets platforms, and skilling programs. It aims to make India a global leader in AI development and deployment.",
    related: [{ href: "/india", label: "India & Indic AI hub" }]
  },
  {
    term: "UPI", slug: "upi", category: "India AI",
    definition: "Unified Payments Interface, India's real-time payment system that enables instant bank-to-bank transfers. For AI agent vendors, offering UPI payment support simplifies billing for Indian customers and reduces forex conversion costs.",
    related: [{ href: "/upi-integrated-ai-chatbots", label: "AI agents with native UPI integration" }]
  },
  {
    term: "GST Invoicing", slug: "gst-invoicing", category: "India AI",
    definition: "The requirement for businesses operating in India to issue invoices compliant with the Goods and Services Tax system. For AI agent vendors serving Indian enterprise customers, providing GST-compliant invoices with proper HSN/SAC codes and tax breakdowns is essential.",
    related: [{ href: "/ai-agents-with-gst-billing", label: "AI agents with GST billing" }]
  },
  {
    term: "Multi-Agent System", slug: "multi-agent-system", category: "Architecture",
    definition: "An architecture where multiple AI agents collaborate to solve complex tasks. Each agent may have specialized capabilities, and they communicate through defined protocols to share information and coordinate actions. Frameworks like CrewAI, AutoGen, and LangGraph support multi-agent orchestration with features like task delegation, result sharing, and conflict resolution.",
    related: [{ href: "/multi-agent-systems", label: "Multi-agent systems (full guide)" }, { href: "/ai-workforce-orchestration-tools", label: "Multi-agent workforce orchestration tools" }]
  },
  {
    term: "Zero-Data Architecture", slug: "zero-data-architecture", category: "Architecture",
    definition: "A system design approach that minimizes or eliminates the collection, storage, and processing of personal data. This approach eliminates the risk of data breaches and aligns with privacy-first principles for any product handling sensitive information.",
    related: [{ href: "/zero-data-retention-ai-agents", label: "Zero data retention AI agents" }]
  },
  {
    term: "Agent Orchestration", slug: "agent-orchestration", category: "Architecture",
    definition: "The coordination of multiple AI agents, tools, and data sources to accomplish complex tasks. Orchestration involves task decomposition (breaking complex tasks into subtasks), routing (assigning subtasks to appropriate agents), and aggregation (combining results). Frameworks like LangGraph and CrewAI provide orchestration capabilities for building sophisticated multi-agent systems.",
    related: [{ href: "/ai-agent-orchestration", label: "Agent orchestration (full guide)" }]
  },
  {
    term: "Sandboxing", slug: "sandboxing", category: "Security",
    definition: "A security technique that isolates code execution in a restricted environment. For MCP servers, sandboxing typically involves running the server in a Docker container with limited filesystem access, network restrictions, and resource limits. Sandboxing prevents compromised or malicious servers from affecting the host system or accessing unauthorized data.",
    related: [{ href: "/mcp-server-security-sandboxing", label: "MCP server security & sandboxing" }, { href: "/docker-sandboxed-ai-agents", label: "Docker sandboxed AI agents" }]
  },
  {
    term: "SHA-256 Hash", slug: "sha-256-hash", category: "Verification",
    definition: "A cryptographic hash function that produces a 256-bit (64-character) hash value. Evidence receipts on this site use SHA-256 hashes to verify the integrity and version of source code snapshots being evaluated — comparing the hash of a fetched source against the recorded hash confirms the content hasn't changed since retrieval.",
    related: [{ href: "/trust/evidence-methodology", label: "Evidence methodology" }]
  },
  {
    term: "Evidence-Backed Evaluation", slug: "evidence-backed-evaluation", category: "Methodology",
    definition: "An assessment methodology where every claim is traceable to a primary source or independent testing. This site requires evidence for every feature claim, pricing figure, and capability assertion. If evidence cannot be verified, the claim is marked as unverified rather than presented as fact.",
    related: [{ href: "/trust/evidence-methodology", label: "Evidence methodology (full policy)" }, { href: "/trust/how-to-verify", label: "How to verify a claim" }]
  },
  {
    term: "India Fit", slug: "india-fit", category: "Methodology",
    definition: "A qualitative assessment of how well an AI product serves the Indian market, considering INR pricing availability, Indic language support, deployment options within India, and DPDP Act compliance signals. India Fit is a descriptive lens applied to verified facts, not an independently invented numeric score layered on top of them.",
    related: [{ href: "/india", label: "India & Indic AI hub" }, { href: "/trust/rating-methodology", label: "Rating methodology" }]
  },
  {
    term: "Static Site Generation (SSG)", slug: "static-site-generation", category: "Technology",
    definition: "A web development approach where pages are pre-rendered at build time rather than generated on-the-fly for each request. This site uses Next.js static site generation to produce fast-loading, SEO-friendly pages, eliminating the need for server-side processing on every request.",
    related: []
  },
  {
    term: "LoRA (Low-Rank Adaptation)", slug: "lora", category: "Model Training",
    definition: "A fine-tuning technique that trains a small number of additional low-rank parameters rather than updating a full model's weights, making fine-tuning far cheaper and faster while producing a small, swappable adapter file instead of a full new model copy.",
    related: [{ href: "/glossary/fine-tuning", label: "Fine-tuning" }]
  },
  {
    term: "PEFT (Parameter-Efficient Fine-Tuning)", slug: "peft", category: "Model Training",
    definition: "An umbrella term for fine-tuning methods (including LoRA) that update only a small subset of a model's parameters, reducing the compute and memory needed to adapt a large model to a specific task compared to full fine-tuning.",
    related: [{ href: "/glossary/lora", label: "LoRA" }]
  },
  {
    term: "Catastrophic Forgetting", slug: "catastrophic-forgetting", category: "Model Training",
    definition: "A failure mode where fine-tuning a model on new data causes it to lose previously learned capabilities, because the training process overwrites weights that encoded the earlier knowledge.",
    related: [{ href: "/glossary/fine-tuning", label: "Fine-tuning" }]
  },
  {
    term: "Instruction Tuning", slug: "instruction-tuning", category: "Model Training",
    definition: "A training stage where a model is fine-tuned on examples of instructions paired with desired responses, teaching it to follow directions rather than simply continue text plausibly.",
    related: [{ href: "/what-is-rlhf", label: "What is RLHF?" }]
  },
  {
    term: "In-Context Learning", slug: "in-context-learning", category: "Core Concepts",
    definition: "A model's ability to adapt its behavior based on examples or instructions provided within the prompt itself, without any weight updates — the mechanism underlying few-shot prompting.",
    related: [{ href: "/what-is-few-shot-learning", label: "What is few-shot learning?" }]
  },
  {
    term: "Attention Mechanism", slug: "attention-mechanism", category: "Architecture",
    definition: "The core computational mechanism in transformer models that lets each token in a sequence weigh the relevance of every other token when computing its representation, enabling the model to capture long-range dependencies in text.",
    related: []
  },
  {
    term: "Transformer Architecture", slug: "transformer-architecture", category: "Architecture",
    definition: "The neural network architecture underlying most modern large language models, built around the attention mechanism rather than the recurrent or convolutional structures used in earlier architectures.",
    related: [{ href: "/glossary/attention-mechanism", label: "Attention mechanism" }]
  },
  {
    term: "KV Cache", slug: "kv-cache", category: "Infrastructure",
    definition: "A memory optimization technique that stores previously computed attention key and value tensors during text generation, avoiding redundant recomputation and significantly speeding up inference for long sequences.",
    related: [{ href: "/ai-agent-latency-optimization", label: "AI agent latency optimization" }]
  },
  {
    term: "Flash Attention", slug: "flash-attention", category: "Infrastructure",
    definition: "An optimized algorithm for computing the attention mechanism that reduces memory usage and increases speed by minimizing data movement between GPU memory levels, widely adopted across modern model serving stacks.",
    related: [{ href: "/glossary/kv-cache", label: "KV cache" }]
  },
  {
    term: "Speculative Decoding", slug: "speculative-decoding", category: "Infrastructure",
    definition: "An inference optimization where a smaller, faster model drafts several tokens ahead which a larger model then verifies in parallel, speeding up generation when the draft matches the larger model's own predictions.",
    related: [{ href: "/ai-agent-latency-optimization", label: "AI agent latency optimization" }]
  },
  {
    term: "GGUF", slug: "gguf", category: "Infrastructure",
    definition: "A file format for storing quantized language models, widely used by local inference tools like llama.cpp and Ollama to distribute models that run efficiently on consumer hardware.",
    related: [{ href: "/what-is-model-quantization", label: "What is model quantization?" }, { href: "/what-is-local-ai-agent", label: "What is a local AI agent?" }]
  },
  {
    term: "ONNX", slug: "onnx", category: "Infrastructure",
    definition: "An open format for representing machine learning models that lets a model trained in one framework run in a different runtime or hardware environment without retraining.",
    related: []
  },
  {
    term: "Model Checkpoint", slug: "model-checkpoint", category: "Model Training",
    definition: "A saved snapshot of a model's weights at a specific point during training, used to resume training, roll back to a known-good state, or deploy a specific trained version.",
    related: []
  },
  {
    term: "Alignment (AI Safety)", slug: "alignment", category: "Safety",
    definition: "The broad goal of making an AI system's behavior match human intentions and values, rather than optimizing narrowly for a training objective that diverges from what was actually intended.",
    related: [{ href: "/what-is-rlhf", label: "What is RLHF?" }, { href: "/ai-red-teaming", label: "AI red teaming" }]
  },
  {
    term: "Reward Hacking", slug: "reward-hacking", category: "Safety",
    definition: "A failure mode where a model optimized against a reward signal finds an unintended way to score well on that signal without actually achieving the intended goal.",
    related: [{ href: "/glossary/alignment", label: "Alignment (AI safety)" }]
  },
  {
    term: "Jailbreak", slug: "jailbreak", category: "Safety",
    definition: "A prompt or technique specifically designed to bypass a model's safety training or system prompt constraints, getting it to produce output it would normally refuse.",
    related: [{ href: "/prompt-injection-defense", label: "Prompt injection defense" }, { href: "/ai-red-teaming", label: "AI red teaming" }]
  },
  {
    term: "Guardrails", slug: "guardrails", category: "Safety",
    definition: "A validation layer checking inputs and outputs against application-specific rules, catching cases a model's general safety training doesn't cover.",
    related: [{ href: "/ai-guardrails-content-moderation", label: "AI guardrails & content moderation" }]
  },
  {
    term: "Chain-of-Thought", slug: "chain-of-thought", category: "Core Concepts",
    definition: "A prompting technique where a model shows intermediate reasoning steps before its final answer, improving accuracy on tasks requiring multi-step reasoning.",
    related: [{ href: "/what-is-chain-of-thought-prompting", label: "What is chain-of-thought prompting?" }]
  },
  {
    term: "ReAct (Reasoning + Acting)", slug: "react-pattern", category: "Architecture",
    definition: "An agent design pattern that interleaves reasoning steps with tool-calling actions, letting the model explain its thinking before each action and incorporate the result into the next reasoning step.",
    related: [{ href: "/how-do-ai-agents-work", label: "How do AI agents work?" }]
  },
  {
    term: "DPO (Direct Preference Optimization)", slug: "dpo", category: "Model Training",
    definition: "A training technique that aligns a model to human preferences directly from preference-ranked data, without needing to train a separate reward model as RLHF does.",
    related: [{ href: "/what-is-rlhf", label: "What is RLHF?" }]
  },
  {
    term: "SFT (Supervised Fine-Tuning)", slug: "sft", category: "Model Training",
    definition: "A training stage where a model learns from labeled example input-output pairs, typically used before preference-based alignment techniques like RLHF or DPO.",
    related: [{ href: "/glossary/dpo", label: "DPO" }, { href: "/what-is-rlhf", label: "What is RLHF?" }]
  },
  {
    term: "Model Distillation", slug: "model-distillation", category: "Model Training",
    definition: "A technique for training a smaller 'student' model to mimic the outputs of a larger 'teacher' model, producing a more efficient model that retains much of the teacher's capability.",
    related: [{ href: "/what-is-model-quantization", label: "What is model quantization?" }]
  },
  {
    term: "Model Card", slug: "model-card", category: "Methodology",
    definition: "A standardized documentation format describing a model's intended use, training data, known limitations, and evaluation results, published alongside the model itself.",
    related: [{ href: "/trust/evidence-methodology", label: "Evidence methodology" }]
  },
  {
    term: "Synthetic Data", slug: "synthetic-data", category: "Model Training",
    definition: "Artificially generated training data, often produced by another model, used to augment or substitute for real-world data when the latter is scarce, expensive, or sensitive.",
    related: []
  },
  {
    term: "Cosine Similarity", slug: "cosine-similarity", category: "Infrastructure",
    definition: "A mathematical measure of the angle between two vectors, commonly used to score how similar two embeddings are in a semantic search or RAG retrieval system.",
    related: [{ href: "/what-is-semantic-search", label: "What is semantic search?" }, { href: "/glossary/embedding", label: "Embedding" }]
  },
  {
    term: "Reranking", slug: "reranking", category: "Infrastructure",
    definition: "A second retrieval stage that re-scores an initial set of candidate documents with a more precise (and typically more expensive) model, improving final result quality over a single-pass vector search.",
    related: [{ href: "/what-is-semantic-search", label: "What is semantic search?" }, { href: "/what-is-rag-in-ai", label: "What is RAG in AI?" }]
  },
  {
    term: "Chunking", slug: "chunking", category: "Infrastructure",
    definition: "The process of splitting long documents into smaller segments before embedding and indexing them for retrieval, with chunk size and overlap directly affecting RAG retrieval quality.",
    related: [{ href: "/what-is-rag-in-ai", label: "What is RAG in AI?" }]
  },
  {
    term: "Hybrid Search", slug: "hybrid-search", category: "Infrastructure",
    definition: "A retrieval approach combining keyword-based search with semantic vector search, covering both exact-match queries and conceptually related queries that share no exact vocabulary.",
    related: [{ href: "/what-is-semantic-search", label: "What is semantic search?" }]
  },
  {
    term: "Model Drift", slug: "model-drift", category: "Methodology",
    definition: "A gradual decline in a deployed model's real-world performance over time as the data it encounters diverges from its training distribution, requiring monitoring and periodic retraining or re-evaluation.",
    related: [{ href: "/ai-agent-observability-tracing", label: "AI agent observability & tracing" }]
  },
  {
    term: "LLMOps", slug: "llmops", category: "Methodology",
    definition: "The set of practices and tooling for deploying, monitoring, and maintaining large language model applications in production, covering prompt versioning, evaluation, observability, and cost tracking.",
    related: [{ href: "/ai-agent-observability-tracing", label: "AI agent observability & tracing" }, { href: "/llm-api-cost-optimization", label: "LLM API cost optimization" }]
  },
  {
    term: "Ensemble Model", slug: "ensemble-model", category: "Architecture",
    definition: "A system that combines outputs from multiple models to produce a final result, often improving reliability over any single model at the cost of additional inference calls.",
    related: []
  },
  {
    term: "Grounding", slug: "grounding", category: "Core Concepts",
    definition: "The practice of anchoring a model's output in verifiable external information (retrieved documents, tool results) rather than relying solely on its internal training knowledge, directly reducing hallucination risk.",
    related: [{ href: "/how-to-reduce-ai-hallucinations", label: "How to reduce AI hallucinations" }, { href: "/what-is-rag-in-ai", label: "What is RAG in AI?" }]
  },
  {
    term: "Latent Space", slug: "latent-space", category: "Architecture",
    definition: "The internal, high-dimensional numerical space a model uses to represent concepts and relationships, where similar meanings end up positioned closer together.",
    related: [{ href: "/glossary/embedding", label: "Embedding" }]
  },
  {
    term: "Tokenizer", slug: "tokenizer", category: "Core Concepts",
    definition: "The component that converts raw text into the discrete tokens a language model actually processes, and converts generated tokens back into readable text.",
    related: [{ href: "/glossary/token", label: "Token" }]
  },
  {
    term: "Byte-Pair Encoding (BPE)", slug: "byte-pair-encoding", category: "Core Concepts",
    definition: "A common tokenization algorithm that builds a vocabulary by iteratively merging the most frequent adjacent character or subword pairs, balancing vocabulary size against sequence length.",
    related: [{ href: "/glossary/tokenizer", label: "Tokenizer" }]
  },
  {
    term: "Top-P (Nucleus) Sampling", slug: "top-p-sampling", category: "Core Concepts",
    definition: "A sampling method that selects the next token from the smallest set of candidates whose cumulative probability exceeds a threshold, balancing coherence against variety more dynamically than a fixed top-K cutoff.",
    related: [{ href: "/what-is-temperature-sampling", label: "What is temperature in LLM sampling?" }]
  },
  {
    term: "Top-K Sampling", slug: "top-k-sampling", category: "Core Concepts",
    definition: "A sampling method that restricts the next-token choice to the K most probable candidates, discarding the long tail of unlikely tokens before sampling.",
    related: [{ href: "/what-is-temperature-sampling", label: "What is temperature in LLM sampling?" }]
  },
  {
    term: "Multimodal Model", slug: "multimodal-model", category: "Architecture",
    definition: "A model trained to process and reason across more than one input type — text, images, audio — within a single unified architecture rather than separate models stitched together.",
    related: [{ href: "/multimodal-agent-architecture", label: "Multimodal agent architecture" }]
  },
  {
    term: "Diffusion Model", slug: "diffusion-model", category: "Architecture",
    definition: "A generative model architecture that creates content (commonly images) by learning to reverse a gradual noising process, underlying most modern AI image and video generation tools.",
    related: []
  },
  {
    term: "Autoregressive Model", slug: "autoregressive-model", category: "Architecture",
    definition: "A model architecture that generates output one token at a time, each new token conditioned on all previous ones — the generation pattern used by most large language models.",
    related: [{ href: "/glossary/transformer-architecture", label: "Transformer architecture" }]
  },
  {
    term: "Feature Store", slug: "feature-store", category: "Infrastructure",
    definition: "A centralized system for storing, managing, and serving the input features used by machine learning models, ensuring consistency between training and production inference.",
    related: []
  },
  {
    term: "Model Registry", slug: "model-registry", category: "Infrastructure",
    definition: "A centralized system for versioning, tracking, and managing the lifecycle of trained models from experimentation through production deployment.",
    related: [{ href: "/glossary/model-checkpoint", label: "Model checkpoint" }]
  },
  {
    term: "Approximate Nearest Neighbor (ANN)", slug: "approximate-nearest-neighbor", category: "Infrastructure",
    definition: "A class of algorithms used by vector databases to quickly find embeddings similar to a query without exhaustively comparing against every stored vector, trading a small accuracy loss for large speed gains at scale.",
    related: [{ href: "/glossary/vector-database", label: "Vector database" }, { href: "/glossary/cosine-similarity", label: "Cosine similarity" }]
  },
  {
    term: "Context Compression", slug: "context-compression", category: "Infrastructure",
    definition: "Techniques for reducing the token footprint of context sent to a model — summarizing history, trimming irrelevant retrieved content — without losing the information needed to complete the task.",
    related: [{ href: "/mcp-context-window-optimization", label: "MCP context window optimization" }]
  },
  {
    term: "Long-Context Model", slug: "long-context-model", category: "Architecture",
    definition: "A model specifically capable of processing very large context windows (hundreds of thousands of tokens or more), enabling tasks like reasoning over an entire codebase or book in a single request.",
    related: [{ href: "/glossary/context-window", label: "Context window" }]
  },
  {
    term: "Tree of Thought", slug: "tree-of-thought", category: "Core Concepts",
    definition: "A reasoning technique that extends chain-of-thought by exploring multiple candidate reasoning paths in parallel and evaluating which leads to the best outcome, rather than committing to a single linear reasoning chain.",
    related: [{ href: "/glossary/chain-of-thought", label: "Chain-of-thought" }]
  },
  {
    term: "Self-Consistency", slug: "self-consistency", category: "Core Concepts",
    definition: "A technique that samples multiple independent reasoning paths for the same question and selects the most common final answer, improving reliability over a single reasoning attempt.",
    related: [{ href: "/glossary/chain-of-thought", label: "Chain-of-thought" }]
  },
  {
    term: "Constitutional AI", slug: "constitutional-ai", category: "Safety",
    definition: "An alignment technique where a model is trained to critique and revise its own outputs against a set of written principles, reducing reliance on large volumes of human-labeled preference data.",
    related: [{ href: "/glossary/alignment", label: "Alignment (AI safety)" }, { href: "/what-is-rlhf", label: "What is RLHF?" }]
  },
  {
    term: "RLAIF (Reinforcement Learning from AI Feedback)", slug: "rlaif", category: "Model Training",
    definition: "A variant of RLHF where an AI model, rather than a human, provides the preference judgments used to train the reward signal, reducing the human labeling cost of alignment.",
    related: [{ href: "/what-is-rlhf", label: "What is RLHF?" }]
  },
  {
    term: "Mixture of Agents", slug: "mixture-of-agents", category: "Architecture",
    definition: "An architecture where multiple models or agents independently propose responses to the same task, which are then synthesized or aggregated into a single improved final answer.",
    related: [{ href: "/what-is-mixture-of-experts", label: "What is a mixture of experts model?" }, { href: "/ai-workforce-orchestration-tools", label: "Multi-agent workforce orchestration tools" }]
  },
  {
    term: "Explainability", slug: "explainability", category: "Safety",
    definition: "The degree to which a model's decision-making process can be understood and articulated in human-interpretable terms, distinct from the model simply producing a correct output.",
    related: [{ href: "/glossary/alignment", label: "Alignment (AI safety)" }]
  },
  {
    term: "Bias in AI", slug: "bias-in-ai", category: "Safety",
    definition: "Systematic skew in a model's outputs that reflects imbalances or prejudices present in its training data, which can disproportionately disadvantage specific groups if not identified and mitigated.",
    related: [{ href: "/hr-resume-screening-ai", label: "AI resume screening" }]
  },
  {
    term: "Overfitting", slug: "overfitting", category: "Model Training",
    definition: "A training failure where a model learns patterns specific to its training data too closely, performing well on that data but poorly on new, unseen inputs.",
    related: []
  },
  {
    term: "Transfer Learning", slug: "transfer-learning", category: "Model Training",
    definition: "The practice of taking a model trained on one task or dataset and adapting it to a related task, leveraging previously learned representations rather than training from scratch.",
    related: [{ href: "/glossary/fine-tuning", label: "Fine-tuning" }, { href: "/what-is-a-foundation-model", label: "What is a foundation model?" }]
  },
  {
    term: "Data Augmentation", slug: "data-augmentation", category: "Model Training",
    definition: "Techniques for artificially expanding a training dataset by creating modified variations of existing examples, improving model robustness without collecting entirely new data.",
    related: [{ href: "/glossary/synthetic-data", label: "Synthetic data" }]
  },
  {
    term: "Batch Inference", slug: "batch-inference", category: "Infrastructure",
    definition: "Processing multiple model requests together as a group rather than one at a time, improving hardware utilization and throughput at the cost of some added latency per individual request.",
    related: [{ href: "/llm-api-cost-optimization", label: "LLM API cost optimization" }]
  },
  {
    term: "Model Serving", slug: "model-serving", category: "Infrastructure",
    definition: "The infrastructure and software layer responsible for running a trained model in production and responding to inference requests reliably at scale.",
    related: [{ href: "/glossary/batch-inference", label: "Batch inference" }]
  },
  {
    term: "Canary Deployment", slug: "canary-deployment", category: "Methodology",
    definition: "A rollout strategy that routes a small percentage of traffic to a new model or agent version before a full rollout, limiting the blast radius if the new version underperforms.",
    related: [{ href: "/ai-agent-deployment-checklist", label: "AI agent deployment checklist" }]
  },
  {
    term: "Shadow Deployment", slug: "shadow-deployment", category: "Methodology",
    definition: "A testing strategy where a new model or agent version runs in parallel with production, processing real traffic without its output being used, letting teams compare performance risk-free before cutover.",
    related: [{ href: "/ai-agent-deployment-checklist", label: "AI agent deployment checklist" }]
  },
  {
    term: "Feature Flag", slug: "feature-flag", category: "Methodology",
    definition: "A configuration toggle that lets a team enable or disable a specific feature (including a new AI capability) for a subset of users without a full deployment, useful for controlled agent rollouts.",
    related: [{ href: "/ai-agent-deployment-checklist", label: "AI agent deployment checklist" }, { href: "/glossary/canary-deployment", label: "Canary deployment" }]
  },
  {
    term: "Prompt Versioning", slug: "prompt-versioning", category: "Methodology",
    definition: "The practice of tracking changes to system prompts over time like code, enabling rollback, comparison, and controlled testing of prompt changes in production agent systems.",
    related: [{ href: "/what-is-a-system-prompt", label: "What is a system prompt?" }, { href: "/glossary/llmops", label: "LLMOps" }]
  },
  {
    term: "Concept Drift", slug: "concept-drift", category: "Methodology",
    definition: "A change in the underlying real-world relationship a model was trained to predict, distinct from data drift, which requires retraining or re-evaluation even if the input data distribution looks unchanged.",
    related: [{ href: "/glossary/model-drift", label: "Model drift" }]
  },
  {
    term: "F1 Score", slug: "f1-score", category: "Methodology",
    definition: "A classification evaluation metric combining precision and recall into a single number, useful when both false positives and false negatives carry meaningful cost.",
    related: []
  },
  {
    term: "Precision and Recall", slug: "precision-and-recall", category: "Methodology",
    definition: "Two complementary classification metrics — precision measures how many positive predictions were actually correct, recall measures how many actual positives were correctly identified.",
    related: [{ href: "/glossary/f1-score", label: "F1 score" }]
  },
  {
    term: "Confusion Matrix", slug: "confusion-matrix", category: "Methodology",
    definition: "A table summarizing a classification model's predictions against actual outcomes, breaking results into true positives, false positives, true negatives, and false negatives.",
    related: [{ href: "/glossary/precision-and-recall", label: "Precision and recall" }]
  },
  {
    term: "Active Learning", slug: "active-learning", category: "Model Training",
    definition: "A training strategy where a model identifies the examples it's most uncertain about and requests human labels specifically for those, reducing the total labeling effort needed to reach a given accuracy.",
    related: []
  },
  {
    term: "Query Expansion", slug: "query-expansion", category: "Infrastructure",
    definition: "A retrieval technique that reformulates or adds related terms to a search query before executing it, improving recall for queries that don't share exact vocabulary with relevant documents.",
    related: [{ href: "/what-is-semantic-search", label: "What is semantic search?" }, { href: "/glossary/hybrid-search", label: "Hybrid search" }]
  },
  {
    term: "Sliding Window Attention", slug: "sliding-window-attention", category: "Architecture",
    definition: "An attention mechanism variant that restricts each token's attention to a fixed nearby window rather than the full sequence, reducing compute cost for very long contexts.",
    related: [{ href: "/glossary/attention-mechanism", label: "Attention mechanism" }, { href: "/glossary/long-context-model", label: "Long-context model" }]
  },
  {
    term: "Sparse Attention", slug: "sparse-attention", category: "Architecture",
    definition: "An umbrella term for attention mechanism variants that compute attention over only a subset of token pairs rather than every pair, reducing the quadratic compute cost of standard attention.",
    related: [{ href: "/glossary/sliding-window-attention", label: "Sliding window attention" }]
  },
  {
    term: "Post-Training Quantization", slug: "post-training-quantization", category: "Infrastructure",
    definition: "A quantization approach applied to an already-trained model, converting its weights to lower precision without further training — simpler than quantization-aware training but sometimes with a larger accuracy trade-off.",
    related: [{ href: "/what-is-model-quantization", label: "What is model quantization?" }]
  },
  {
    term: "Quantization-Aware Training", slug: "quantization-aware-training", category: "Model Training",
    definition: "A training approach that simulates quantization effects during training itself, producing a model that tolerates lower-precision inference better than post-training quantization alone.",
    related: [{ href: "/glossary/post-training-quantization", label: "Post-training quantization" }]
  },
  {
    term: "Perplexity (ML Metric)", slug: "perplexity-metric", category: "Methodology",
    definition: "A measurement of how well a language model predicts a sample of text — lower perplexity indicates the model found the text less surprising, commonly used to evaluate language modeling quality.",
    related: []
  },
  {
    term: "Beam Search", slug: "beam-search", category: "Core Concepts",
    definition: "A decoding strategy that tracks multiple candidate output sequences simultaneously rather than committing to the single most likely next token at each step, often improving output quality for tasks like translation.",
    related: [{ href: "/what-is-temperature-sampling", label: "What is temperature in LLM sampling?" }]
  },
  {
    term: "Softmax", slug: "softmax", category: "Core Concepts",
    definition: "A mathematical function that converts a set of raw model outputs into a probability distribution, used at the final layer of a language model to determine next-token probabilities.",
    related: [{ href: "/what-is-temperature-sampling", label: "What is temperature in LLM sampling?" }]
  },
  {
    term: "Gradient Descent", slug: "gradient-descent", category: "Model Training",
    definition: "The core optimization algorithm used to train neural networks, iteratively adjusting model parameters in the direction that reduces prediction error.",
    related: []
  },
  {
    term: "Backpropagation", slug: "backpropagation", category: "Model Training",
    definition: "The algorithm that computes how much each parameter in a neural network contributed to its prediction error, enabling gradient descent to update parameters efficiently across many layers.",
    related: [{ href: "/glossary/gradient-descent", label: "Gradient descent" }]
  },
  {
    term: "Overfitting vs. Underfitting", slug: "underfitting", category: "Model Training",
    definition: "Underfitting occurs when a model is too simple to capture patterns in the training data, performing poorly on both training and new data — the opposite failure mode from overfitting.",
    related: [{ href: "/glossary/overfitting", label: "Overfitting" }]
  },
  {
    term: "Regularization", slug: "regularization", category: "Model Training",
    definition: "A set of techniques that constrain a model during training to reduce overfitting, typically by penalizing overly complex parameter configurations.",
    related: [{ href: "/glossary/overfitting", label: "Overfitting" }]
  },
  {
    term: "Dropout", slug: "dropout", category: "Model Training",
    definition: "A regularization technique that randomly disables a fraction of neurons during each training step, preventing the network from over-relying on any single pathway.",
    related: [{ href: "/glossary/regularization", label: "Regularization" }]
  },
  {
    term: "Epoch", slug: "epoch", category: "Model Training",
    definition: "One complete pass through the entire training dataset during model training; training typically involves many epochs, with performance monitored across each one.",
    related: []
  },
  {
    term: "Learning Rate", slug: "learning-rate", category: "Model Training",
    definition: "A hyperparameter controlling how large a step gradient descent takes when updating model parameters — too high causes unstable training, too low makes training impractically slow.",
    related: [{ href: "/glossary/gradient-descent", label: "Gradient descent" }]
  },
  {
    term: "Loss Function", slug: "loss-function", category: "Model Training",
    definition: "The mathematical function a model is trained to minimize, quantifying how far its predictions are from the correct answer during training.",
    related: [{ href: "/glossary/gradient-descent", label: "Gradient descent" }]
  },
  {
    term: "GAN (Generative Adversarial Network)", slug: "gan", category: "Architecture",
    definition: "A generative model architecture using two competing networks — a generator producing content and a discriminator judging its authenticity — historically important for image generation before diffusion models became dominant.",
    related: [{ href: "/glossary/diffusion-model", label: "Diffusion model" }]
  },
  {
    term: "Dataset Card", slug: "dataset-card", category: "Methodology",
    definition: "Standardized documentation describing a training dataset's composition, collection method, and known limitations, published alongside the dataset for transparency.",
    related: [{ href: "/glossary/model-card", label: "Model card" }]
  },
  {
    term: "A2A Protocol (Agent2Agent)", slug: "a2a-protocol", category: "Infrastructure",
    definition: "An open protocol for enabling communication and task handoff between AI agents built on different frameworks or by different vendors, complementary to MCP's tool-exposure focus.",
    related: [{ href: "/glossary/mcp", label: "Model Context Protocol (MCP)" }]
  },
  {
    term: "Function Calling", slug: "function-calling", category: "Core Concepts",
    definition: "A model API feature that lets a model return a structured request to invoke a named function with specific arguments, the mechanism underlying most tool-use implementations.",
    related: [{ href: "/function-calling-vs-tool-use", label: "Function calling vs. tool use" }]
  },
  {
    term: "Agentic AI", slug: "agentic-ai", category: "Core Concepts",
    definition: "A general term describing AI systems designed to pursue goals through autonomous, multi-step action rather than single-turn response generation — largely synonymous with 'AI agent' as a category descriptor.",
    related: [{ href: "/what-is-an-ai-agent", label: "What is an AI agent?" }]
  },
  {
    term: "Agent Loop", slug: "agent-loop", category: "Architecture",
    definition: "The repeating perceive-decide-act-observe cycle that defines how an AI agent processes a task, continuing until a stopping condition is met.",
    related: [{ href: "/how-do-ai-agents-work", label: "How do AI agents work?" }]
  },
  {
    term: "Tool Schema", slug: "tool-schema", category: "Core Concepts",
    definition: "The structured definition (name, description, input parameters) that tells a model what a tool does and how to call it correctly.",
    related: [{ href: "/glossary/function-calling", label: "Function calling" }]
  },
  {
    term: "Orchestrator-Worker Pattern", slug: "orchestrator-worker-pattern", category: "Architecture",
    definition: "A multi-agent design where a top-level agent decomposes a goal into subtasks and delegates each to a specialized worker agent, then aggregates the results.",
    related: [{ href: "/what-is-agentic-workflow", label: "What is an agentic workflow?" }]
  },
  {
    term: "Evaluator-Optimizer Pattern", slug: "evaluator-optimizer-pattern", category: "Architecture",
    definition: "A multi-agent design where one agent produces an output and a second agent critiques it against defined criteria, looping until the output passes review.",
    related: [{ href: "/what-is-agentic-workflow", label: "What is an agentic workflow?" }]
  },
  {
    term: "Context Rot", slug: "context-rot", category: "Core Concepts",
    definition: "A degradation in a model's effective reasoning quality as its context window fills with less-relevant or accumulated information, distinct from simply running out of context space.",
    related: [{ href: "/mcp-context-window-optimization", label: "MCP context window optimization" }]
  },
  {
    term: "Retrieval Precision", slug: "retrieval-precision", category: "Infrastructure",
    definition: "The fraction of retrieved documents in a RAG pipeline that are actually relevant to the query, one of the two core metrics (alongside recall) for evaluating retrieval quality.",
    related: [{ href: "/what-is-rag-in-ai", label: "What is RAG in AI?" }, { href: "/agentic-rag-performance", label: "Agentic RAG performance" }]
  },
  {
    term: "Retrieval Recall", slug: "retrieval-recall", category: "Infrastructure",
    definition: "The fraction of all truly relevant documents that a RAG pipeline's retrieval step actually surfaces, capping the ceiling for how good the final generated answer can be.",
    related: [{ href: "/glossary/retrieval-precision", label: "Retrieval precision" }]
  },
  {
    term: "Answer Faithfulness", slug: "answer-faithfulness", category: "Infrastructure",
    definition: "A measure of whether a RAG system's generated answer is actually supported by its retrieved context, rather than the model filling gaps from its own training data.",
    related: [{ href: "/what-is-rag-in-ai", label: "What is RAG in AI?" }, { href: "/how-to-reduce-ai-hallucinations", label: "How to reduce AI hallucinations" }]
  },
  {
    term: "Agent Card", slug: "agent-card", category: "Infrastructure",
    definition: "A machine-readable description of an agent's capabilities, used in agent-to-agent protocols to let one agent discover what another agent can do before delegating a task to it.",
    related: [{ href: "/glossary/a2a-protocol", label: "A2A protocol" }]
  },
  {
    term: "Prompt Caching", slug: "prompt-caching", category: "Infrastructure",
    definition: "A provider feature that reuses previously-processed context across API calls, reducing both cost and latency for requests that repeat a large unchanged portion of the prompt.",
    related: [{ href: "/llm-api-cost-optimization", label: "LLM API cost optimization" }]
  },
  {
    term: "Model Router", slug: "model-router", category: "Infrastructure",
    definition: "A component that directs a given request to the most appropriate model based on task complexity, cost, or capability requirements, rather than sending every request to a single fixed model.",
    related: [{ href: "/llm-api-cost-optimization", label: "LLM API cost optimization" }]
  },
  {
    term: "Tool Call Loop Limit", slug: "tool-call-loop-limit", category: "Safety",
    definition: "A hard cap on the number of sequential tool calls an agent can make within a single task, preventing runaway loops from consuming unbounded time or cost.",
    related: [{ href: "/ai-agent-rate-limiting-strategies", label: "AI agent rate limiting & retry strategies" }]
  },
  {
    term: "Structured Extraction", slug: "structured-extraction", category: "Core Concepts",
    definition: "The task of pulling specific, defined fields out of unstructured text using a model, typically constrained to a schema to ensure the output is reliably parseable.",
    related: [{ href: "/structured-output-json-mode", label: "Structured output & JSON mode" }]
  },
  {
    term: "Semantic Cache", slug: "semantic-cache", category: "Infrastructure",
    definition: "A caching layer that returns a stored response for a semantically similar (not just identical) query, reducing redundant model calls for common variations of the same question.",
    related: [{ href: "/glossary/prompt-caching", label: "Prompt caching" }, { href: "/llm-api-cost-optimization", label: "LLM API cost optimization" }]
  },
  {
    term: "Agent Sandbox", slug: "agent-sandbox", category: "Safety",
    definition: "An isolated execution environment (typically a container or VM) where an agent's code execution or tool actions run without access to the host system or production credentials.",
    related: [{ href: "/mcp-server-security-sandboxing", label: "MCP server security & sandboxing" }]
  },
  {
    term: "Trust Boundary", slug: "trust-boundary", category: "Safety",
    definition: "The conceptual line separating instructions and data an agent should trust (its own system prompt) from content it should treat skeptically (externally-sourced text), central to reasoning about prompt injection risk.",
    related: [{ href: "/prompt-injection-defense", label: "Prompt injection defense" }]
  },
  {
    term: "Evaluation Harness", slug: "evaluation-harness", category: "Methodology",
    definition: "The tooling and test infrastructure used to systematically run an agent against a defined set of tasks and score its performance, distinct from ad hoc manual testing.",
    related: [{ href: "/ai-agent-testing-evaluation-frameworks", label: "AI agent testing & evaluation frameworks" }]
  },
  {
    term: "Golden Dataset", slug: "golden-dataset", category: "Methodology",
    definition: "A curated set of test cases with known-correct expected outputs, used as a stable benchmark for evaluating agent or model changes over time.",
    related: [{ href: "/ai-agent-testing-evaluation-frameworks", label: "AI agent testing & evaluation frameworks" }]
  },
  {
    term: "Regression Test (AI)", slug: "regression-test-ai", category: "Methodology",
    definition: "A test that checks whether a change to a prompt, model, or tool set breaks previously-passing agent behavior, run before deploying any modification to a production agent.",
    related: [{ href: "/glossary/golden-dataset", label: "Golden dataset" }]
  },
  {
    term: "Cold Start (Recommendation)", slug: "cold-start", category: "Core Concepts",
    definition: "The challenge of making accurate recommendations or predictions for a new user or item with no historical interaction data yet available.",
    related: []
  },
  {
    term: "Embedding Drift", slug: "embedding-drift", category: "Infrastructure",
    definition: "A mismatch that occurs when an embedding model is updated but existing stored vectors aren't recomputed, causing new and old embeddings to no longer be reliably comparable.",
    related: [{ href: "/glossary/embedding", label: "Embedding" }, { href: "/what-is-an-embedding-model", label: "What is an embedding model?" }]
  },
  {
    term: "Context Window Overflow", slug: "context-window-overflow", category: "Infrastructure",
    definition: "The failure state where the total tokens in a request (prompt, history, tool schemas) exceed a model's maximum context length, requiring truncation or rejection of the request.",
    related: [{ href: "/glossary/context-window", label: "Context window" }, { href: "/how-to-fix-mcp-token-bloat", label: "How to fix MCP token bloat" }]
  },
  {
    term: "Data Fiduciary", slug: "data-fiduciary", category: "Compliance",
    definition: "Under India's DPDP Act, the entity that determines the purpose and means of processing personal data, carrying obligations for consent, security, and breach notification.",
    related: [{ href: "/glossary/dpdp-act", label: "DPDP Act" }, { href: "/what-is-dpdp-compliance-in-ai", label: "What is DPDP compliance for AI?" }]
  },
  {
    term: "Data Principal", slug: "data-principal", category: "Compliance",
    definition: "Under India's DPDP Act, the individual to whom personal data relates, holding specific rights over how that data is collected, used, and stored.",
    related: [{ href: "/glossary/data-fiduciary", label: "Data fiduciary" }]
  },
  {
    term: "Consent Manager", slug: "consent-manager", category: "Compliance",
    definition: "Under India's DPDP Act framework, a registered entity that enables individuals to give, manage, and withdraw consent for personal data processing across services in one place.",
    related: [{ href: "/glossary/data-principal", label: "Data principal" }]
  },
  {
    term: "Sandbox (Regulatory)", slug: "regulatory-sandbox", category: "Compliance",
    definition: "A controlled regulatory environment that lets companies test new financial or data products under regulator supervision before full-scale, unrestricted deployment.",
    related: [{ href: "/aadhaar-ekyc-regulatory-sandbox-mcp", label: "Aadhaar eKYC regulatory sandbox" }]
  },
  {
    term: "Know Your Customer (KYC)", slug: "kyc", category: "Compliance",
    definition: "The regulatory process of verifying a customer's identity before providing financial or regulated services, increasingly automated via AI-powered identity verification platforms.",
    related: [{ href: "/agents/persona-identity", label: "Persona" }, { href: "/agents/onfido", label: "Onfido" }]
  },
  {
    term: "Model Weights", slug: "model-weights", category: "Model Training",
    definition: "The learned numerical parameters of a trained neural network that determine its behavior — what's shared when a model is described as 'open-weight.'",
    related: [{ href: "/glossary/open-weight-models", label: "Open-weight models" }]
  },
  {
    term: "Pretraining", slug: "pretraining", category: "Model Training",
    definition: "The initial, large-scale training phase where a model learns general language patterns from broad text data, before any task-specific fine-tuning or alignment stages.",
    related: [{ href: "/glossary/sft", label: "SFT" }, { href: "/what-is-a-foundation-model", label: "What is a foundation model?" }]
  },
  {
    term: "Post-Training", slug: "post-training", category: "Model Training",
    definition: "The set of training stages applied after pretraining — including supervised fine-tuning and preference alignment — that shape a model's instruction-following and safety behavior.",
    related: [{ href: "/glossary/pretraining", label: "Pretraining" }, { href: "/what-is-rlhf", label: "What is RLHF?" }]
  },
  {
    term: "Alignment Tax", slug: "alignment-tax", category: "Safety",
    definition: "A hypothesized reduction in a model's raw capability that can result from alignment training focused on safety and instruction-following rather than pure task performance.",
    related: [{ href: "/glossary/alignment", label: "Alignment (AI safety)" }]
  },
  {
    term: "Model Merging", slug: "model-merging", category: "Model Training",
    definition: "A technique for combining the weights of multiple fine-tuned models into a single model, aiming to blend their respective strengths without full retraining.",
    related: [{ href: "/glossary/fine-tuning", label: "Fine-tuning" }]
  },
  {
    term: "Interpretability", slug: "interpretability", category: "Safety",
    definition: "The research area focused on understanding what's actually happening inside a model's internal computations, distinct from explainability's focus on justifying outputs after the fact.",
    related: [{ href: "/glossary/explainability", label: "Explainability" }]
  },
  {
    term: "Toxicity Classifier", slug: "toxicity-classifier", category: "Safety",
    definition: "A model trained to detect harmful, abusive, or policy-violating content, commonly used as a guardrail layer to filter inputs or outputs in production AI applications.",
    related: [{ href: "/ai-guardrails-content-moderation", label: "AI guardrails & content moderation" }]
  },
  {
    term: "Content Filter", slug: "content-filter", category: "Safety",
    definition: "A system component that blocks or flags content matching defined policy violations, often combining rule-based patterns with a trained classifier.",
    related: [{ href: "/glossary/toxicity-classifier", label: "Toxicity classifier" }]
  },
  {
    term: "Adversarial Prompt", slug: "adversarial-prompt", category: "Safety",
    definition: "An input specifically crafted to exploit a model's weaknesses, causing it to fail, misbehave, or bypass its safety constraints — the object of study in AI red teaming.",
    related: [{ href: "/ai-red-teaming", label: "AI red teaming" }, { href: "/glossary/jailbreak", label: "Jailbreak" }]
  },
  {
    term: "AUA/KUA (Aadhaar)", slug: "aua-kua", category: "Compliance",
    definition: "Authentication User Agency and KYC User Agency — the UIDAI licensing categories that authorize an entity to perform Aadhaar-based authentication or eKYC on behalf of others.",
    related: [{ href: "/aadhaar-ekyc-regulatory-sandbox-mcp", label: "Aadhaar eKYC sandbox MCP" }]
  },
  {
    term: "Payment Aggregator", slug: "payment-aggregator", category: "Compliance",
    definition: "An RBI-regulated entity that facilitates online payment collection on behalf of merchants, a required licensing layer for any AI agent that initiates real payment transactions in India.",
    related: [{ href: "/upi-integrated-ai-chatbots", label: "AI agents with native UPI integration" }]
  },
  {
    term: "Vernacular AI", slug: "vernacular-ai", category: "India AI",
    definition: "AI systems specifically designed to operate in regional Indian languages beyond Hindi and English, addressing the linguistic diversity of India's population.",
    related: [{ href: "/indic-language-ai-models", label: "Indic language AI models" }]
  },
  {
    term: "Digital Public Infrastructure (DPI)", slug: "digital-public-infrastructure", category: "India AI",
    definition: "Foundational, interoperable digital systems (like Aadhaar, UPI, and DigiLocker) built as public goods that private applications, including AI agents, can build on top of.",
    related: [{ href: "/upi-integrated-ai-chatbots", label: "AI agents with native UPI integration" }, { href: "/bhashini-api-ai-integrations", label: "Bhashini API integrations" }]
  },
  {
    term: "Text-to-Speech (TTS)", slug: "text-to-speech", category: "Core Concepts",
    definition: "The technology that converts written text into synthesized spoken audio, a core component of voice AI agents and accessibility tools.",
    related: [{ href: "/best-ai-voice-agents", label: "Best AI voice agents" }]
  },
  {
    term: "Speech-to-Text (STT)", slug: "speech-to-text", category: "Core Concepts",
    definition: "The technology that transcribes spoken audio into written text, the input-processing counterpart to text-to-speech in a voice AI pipeline.",
    related: [{ href: "/glossary/text-to-speech", label: "Text-to-speech (TTS)" }]
  },
  {
    term: "Voice Activity Detection (VAD)", slug: "voice-activity-detection", category: "Core Concepts",
    definition: "A technique that detects when a person is actually speaking versus silence or background noise, used to trigger transcription and manage turn-taking in voice AI systems.",
    related: [{ href: "/glossary/speech-to-text", label: "Speech-to-text (STT)" }]
  },
  {
    term: "Turn-Taking (Voice AI)", slug: "turn-taking", category: "Core Concepts",
    definition: "The mechanism a voice AI system uses to detect when a caller has finished speaking and it's the agent's turn to respond, a major factor in how natural a voice conversation feels.",
    related: [{ href: "/glossary/voice-activity-detection", label: "Voice activity detection (VAD)" }, { href: "/sub-second-latency-voice-ai", label: "Sub-second latency voice AI" }]
  },
  {
    term: "Barge-In", slug: "barge-in", category: "Core Concepts",
    definition: "A voice AI system's ability to detect and respond when a caller interrupts the agent mid-response, an important usability feature for natural-feeling voice conversations.",
    related: [{ href: "/glossary/turn-taking", label: "Turn-taking (voice AI)" }]
  },
  {
    term: "Tool Calling", slug: "tool-calling", category: "Core Concepts",
    definition: "The mechanism by which a language model outputs a structured request to invoke an external function or API, receives the result, and incorporates it into its response — the foundational capability behind agentic behavior.",
    related: [{ href: "/what-is-an-ai-agent", label: "What is an AI agent?" }]
  },
  {
    term: "Agentic Loop", slug: "agentic-loop", category: "Architecture",
    definition: "The repeated cycle of an agent observing state, deciding on an action (often a tool call), executing it, and observing the result again, continuing until a stopping condition is met.",
    related: [{ href: "/how-to-build-an-ai-agent", label: "How to build an AI agent" }]
  },
  {
    term: "Orchestrator Agent", slug: "orchestrator-agent", category: "Architecture",
    definition: "In a multi-agent system, the agent responsible for decomposing a task and delegating subtasks to specialized worker agents, then combining their outputs.",
    related: [{ href: "/ai-workforce-orchestration-tools", label: "Multi-agent orchestration frameworks" }]
  },
  {
    term: "Worker Agent", slug: "worker-agent", category: "Architecture",
    definition: "In a multi-agent system, a specialized agent that performs a narrow subtask assigned by an orchestrator, typically with a focused tool set and system prompt.",
    related: [{ href: "/glossary/orchestrator-agent", label: "Orchestrator agent" }]
  },
  {
    term: "Human-in-the-Loop (HITL)", slug: "human-in-the-loop", category: "Methodology",
    definition: "A design pattern where an agent pauses for explicit human approval before executing a high-consequence or irreversible action, rather than acting fully autonomously.",
    related: [{ href: "/ai-agent-security-checklist", label: "AI agent security checklist" }]
  },
  {
    term: "Autonomy Level", slug: "autonomy-level", category: "Methodology",
    definition: "A qualitative or tiered description of how much an agent acts without human approval, ranging from fully human-approved every step to fully autonomous within a defined scope.",
    related: [{ href: "/glossary/human-in-the-loop", label: "Human-in-the-loop (HITL)" }]
  },
  {
    term: "Guardrails (AI)", slug: "guardrails-ai", category: "Safety",
    definition: "Explicit constraints — programmatic checks, content filters, or approval gates — placed around an AI agent's inputs, outputs, or actions to prevent unintended or harmful behavior.",
    related: [{ href: "/ai-agent-security-checklist", label: "AI agent security checklist" }]
  },
  {
    term: "Jailbreak (LLM)", slug: "jailbreak-llm", category: "Security",
    definition: "A crafted input designed to bypass a language model's safety training or system-prompt restrictions, causing it to produce output it was designed to refuse.",
    related: [{ href: "/prompt-injection-defense", label: "Prompt injection attacks on AI agents" }]
  },
  {
    term: "Red Teaming (AI)", slug: "red-teaming-ai", category: "Security",
    definition: "The practice of deliberately probing an AI system for vulnerabilities, harmful outputs, or unsafe behaviors before deployment, analogous to security red-teaming in traditional software.",
    related: [{ href: "/ai-agent-security-checklist", label: "AI agent security checklist" }]
  },
  {
    term: "Tokenization", slug: "tokenization", category: "Core Concepts",
    definition: "The process of breaking text into smaller units (tokens) that a language model processes, where a token is often a word fragment rather than a whole word.",
    related: [{ href: "/glossary/context-window", label: "Context window" }]
  },
  {
    term: "Temperature (LLM Parameter)", slug: "temperature-llm", category: "Core Concepts",
    definition: "A parameter controlling the randomness of a language model's output — lower values produce more deterministic, focused responses, while higher values increase variety at some cost to consistency.",
    related: [{ href: "/glossary/tokenization", label: "Tokenization" }]
  },
  {
    term: "Grounding (AI)", slug: "grounding-ai", category: "Core Concepts",
    definition: "Connecting a language model's output to verifiable external sources — retrieved documents, live data, or tool results — rather than relying solely on the model's internal parametric knowledge.",
    related: [{ href: "/glossary/rag", label: "Retrieval-augmented generation (RAG)" }]
  },
  {
    term: "LLM-as-Judge", slug: "llm-as-judge", category: "Methodology",
    definition: "An evaluation technique that uses one language model to score or grade the output of another, often used to scale evaluation beyond what manual human review can cover, with known limitations around judge-model bias.",
    related: [{ href: "/ai-agent-testing-evaluation-frameworks", label: "AI agent testing & evaluation frameworks" }]
  },
  {
    term: "Regression Testing (AI Agent)", slug: "regression-testing-ai-agent", category: "Methodology",
    definition: "Re-running a fixed set of test cases after any change to an agent's prompt, model, or tools to confirm existing behavior hasn't broken, adapted from traditional software regression testing.",
    related: [{ href: "/ai-agent-testing-evaluation-frameworks", label: "AI agent testing & evaluation frameworks" }]
  },
  {
    term: "Canary Rollout", slug: "canary-rollout", category: "Methodology",
    definition: "Gradually releasing a new AI agent version to a small percentage of users before a full rollout, allowing issues to be caught while limiting the blast radius.",
    related: [{ href: "/ai-agent-deployment-checklist", label: "AI agent deployment checklist" }]
  },
  {
    term: "Cold Start (AI Agent)", slug: "cold-start-ai-agent", category: "Methodology",
    definition: "The period immediately after an AI agent's deployment when it underperforms due to insufficient real-usage examples to tune its prompt and retrieval sources against.",
    related: [{ href: "/ai-agent-cold-start-problem", label: "The AI agent cold-start problem" }]
  }
];

const glossaryTermsBatch7: typeof glossaryTerms = [
  {
    term: "Responsible AI Framework", slug: "responsible-ai-framework", category: "Methodology",
    definition: "A documented set of principles and review processes an organization applies to AI system development, covering fairness, transparency, safety, and accountability considerations before deployment.",
    related: [{ href: "/ai-agent-security-checklist", label: "AI agent security checklist" }]
  },
  {
    term: "AI Incident Reporting", slug: "ai-incident-reporting", category: "Methodology",
    definition: "The practice of documenting AI system failures — harmful outputs, safety near-misses, significant errors — in a structured way that supports root-cause analysis and pattern detection across incidents.",
    related: [{ href: "/ai-agent-observability-tracing", label: "AI agent observability & monitoring" }]
  },
  {
    term: "Shadow AI", slug: "shadow-ai", category: "Security",
    definition: "AI tools adopted and used by employees without formal IT or security team approval, creating visibility and governance gaps similar to 'shadow IT' in traditional software.",
    related: [{ href: "/enterprise-ai-agent-governance", label: "Enterprise AI agent governance" }]
  },
  {
    term: "Data Drift", slug: "data-drift", category: "Methodology",
    definition: "A change in the statistical properties of input data over time relative to what a model was trained or evaluated on, which can silently degrade a deployed model's real-world accuracy.",
    related: [{ href: "/glossary/concept-drift", label: "Concept drift" }]
  },
  {
    term: "Synthetic Data Generation", slug: "synthetic-data-generation", category: "Model Training",
    definition: "Using an AI model to generate artificial training examples, often to supplement scarce real-world data — carries risk of amplifying the generating model's own biases or errors if not carefully validated.",
    related: [{ href: "/glossary/data-drift", label: "Data drift" }]
  },
  {
    term: "Zero-Shot Learning", slug: "zero-shot-learning", category: "Core Concepts",
    definition: "A model's ability to perform a task it was never explicitly trained or given examples for, relying on generalized knowledge learned during pretraining.",
    related: [{ href: "/glossary/few-shot-learning", label: "Few-shot learning" }]
  },
  {
    term: "One-Shot Learning", slug: "one-shot-learning", category: "Core Concepts",
    definition: "A model's ability to correctly perform a task after being shown just a single example, positioned between zero-shot (no examples) and few-shot (several examples) prompting.",
    related: [{ href: "/glossary/zero-shot-learning", label: "Zero-shot learning" }]
  },
  {
    term: "Activation Steering", slug: "activation-steering", category: "Technology",
    definition: "A technique for influencing a language model's output by directly modifying its internal activation values during inference, an interpretability-adjacent method distinct from prompt-based control.",
    related: [{ href: "/glossary/interpretability", label: "Interpretability" }]
  },
  {
    term: "Scaling Laws", slug: "scaling-laws", category: "Model Training",
    definition: "Empirically observed relationships describing how a language model's performance improves as a function of model size, training data volume, and compute, used to guide training investment decisions.",
    related: [{ href: "/glossary/pretraining", label: "Pretraining" }]
  },
  {
    term: "Function Schema", slug: "function-schema", category: "Core Concepts",
    definition: "A structured, machine-readable definition of a tool's name, parameters, and expected input types, provided to a model so it can generate correctly formatted tool calls.",
    related: [{ href: "/glossary/tool-calling", label: "Tool calling" }]
  },
  {
    term: "JSON Mode", slug: "json-mode", category: "Technology",
    definition: "A model inference setting that constrains output generation to always produce syntactically valid JSON, reducing (but not eliminating) the need for separate output parsing and validation.",
    related: [{ href: "/glossary/structured-output-generation", label: "Structured output generation" }]
  },
  {
    term: "Structured Output Generation", slug: "structured-output-generation", category: "Technology",
    definition: "Constraining a language model's output to conform to a specific schema (JSON, XML, or a defined format) rather than free-form text, critical for reliable programmatic use of model outputs.",
    related: [{ href: "/glossary/json-mode", label: "JSON mode" }]
  },
  {
    term: "Streaming Response", slug: "streaming-response", category: "Technology",
    definition: "Delivering a model's output incrementally as it's generated, token by token, rather than waiting for the complete response — improves perceived responsiveness for chat interfaces.",
    related: [{ href: "/ai-agent-latency-budgets", label: "Setting latency budgets for AI agent applications" }]
  },
  {
    term: "Webhooks in AI Agent Systems", slug: "webhooks-ai-agents", category: "Architecture",
    definition: "HTTP callbacks that notify an agent system of an external event (a new support ticket, a completed payment) in real time, commonly used to trigger an agent workflow without polling.",
    related: [{ href: "/glossary/agentic-loop", label: "Agentic loop" }]
  },
  {
    term: "Rate Limiting (API)", slug: "rate-limiting-api", category: "Infrastructure",
    definition: "Restricting the number of requests a client can make to an API within a time window, a common constraint agent systems must handle gracefully when making frequent external tool calls.",
    related: [{ href: "/ai-agent-latency-optimization", label: "AI agent cost & latency optimization" }]
  },
  {
    term: "Idempotency Key", slug: "idempotency-key", category: "Infrastructure",
    definition: "A unique identifier attached to an API request so that retrying the same request (due to a network error or agent retry logic) doesn't cause a duplicate side effect, like a duplicate charge or duplicate email.",
    related: [{ href: "/ai-agent-security-checklist", label: "AI agent security checklist" }]
  },
  {
    term: "PII Redaction", slug: "pii-redaction", category: "Security",
    definition: "Automatically detecting and removing or masking personally identifiable information from text before it's logged, stored, or sent to a third-party model provider.",
    related: [{ href: "/data-sovereignty-ai-agents-india", label: "Data sovereignty for AI agents in India" }]
  },
  {
    term: "Benchmark Contamination", slug: "benchmark-contamination", category: "Verification",
    definition: "A situation where a model's training data inadvertently includes benchmark test questions and answers, inflating its apparent performance on that benchmark in a way that doesn't reflect real generalization.",
    related: [{ href: "/glossary/golden-dataset", label: "Golden dataset" }]
  },
  {
    term: "GGUF Format", slug: "gguf-format", category: "Technology",
    definition: "A file format for storing quantized language model weights, widely used by local-inference tools like llama.cpp to run models efficiently on consumer hardware.",
    related: [{ href: "/glossary/quantization", label: "Quantization" }]
  },
  {
    term: "Edge Inference", slug: "edge-inference", category: "Infrastructure",
    definition: "Running a model's inference computation on a local device (phone, laptop, IoT device) rather than a remote cloud server, trading some capability for lower latency, offline operation, and data privacy.",
    related: [{ href: "/glossary/gguf-format", label: "GGUF format" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch7);

const glossaryTermsBatch8: typeof glossaryTerms = [
  {
    term: "Prompt Cache", slug: "prompt-cache", category: "Infrastructure",
    definition: "A mechanism that reuses a model's processed representation of a repeated prompt prefix across requests, reducing latency and cost for applications that send the same system prompt or context repeatedly.",
    related: [{ href: "/ai-agent-latency-optimization", label: "AI agent cost & latency optimization" }]
  },
  {
    term: "Long-Context Window", slug: "long-context-window", category: "Core Concepts",
    definition: "A model's ability to accept and process very large inputs (often hundreds of thousands of tokens), enabling use cases like analyzing entire codebases or lengthy documents in a single request.",
    related: [{ href: "/glossary/context-window", label: "Context window" }, { href: "/glossary/context-rot", label: "Context rot" }]
  },
  {
    term: "Grouped-Query Attention (GQA)", slug: "grouped-query-attention", category: "Architecture",
    definition: "An attention mechanism variant that shares key and value projections across groups of query heads, reducing memory bandwidth requirements during inference compared to standard multi-head attention.",
    related: [{ href: "/glossary/sliding-window-attention", label: "Sliding window attention" }]
  },
  {
    term: "Rotary Positional Embedding (RoPE)", slug: "rotary-positional-embedding", category: "Architecture",
    definition: "A technique for encoding token position information into a transformer model using rotation matrices, widely adopted for its ability to generalize well to longer sequences than seen during training.",
    related: [{ href: "/glossary/long-context-window", label: "Long-context window" }]
  },
  {
    term: "Greedy Decoding", slug: "greedy-decoding", category: "Core Concepts",
    definition: "A text-generation strategy that always selects the single most probable next token, producing deterministic but sometimes repetitive output compared to sampling-based methods.",
    related: [{ href: "/glossary/temperature-llm", label: "Temperature (LLM parameter)" }]
  },
  {
    term: "Logit Bias", slug: "logit-bias", category: "Technology",
    definition: "A parameter that lets a developer manually increase or decrease the probability of specific tokens appearing in a model's output, used for fine-grained control like banning or encouraging certain words.",
    related: [{ href: "/glossary/greedy-decoding", label: "Greedy decoding" }]
  },
  {
    term: "Stop Sequence", slug: "stop-sequence", category: "Technology",
    definition: "A specified string that, when generated, signals a model to immediately stop producing further output — commonly used to prevent a model from continuing past a structured response's intended end.",
    related: [{ href: "/glossary/structured-output-generation", label: "Structured output generation" }]
  },
  {
    term: "System Fingerprint", slug: "system-fingerprint", category: "Infrastructure",
    definition: "An identifier some model providers return with each response indicating the exact backend configuration used, helping developers detect when a silent infrastructure change might explain a behavior shift.",
    related: [{ href: "/ai-agent-versioning-rollback", label: "AI agent versioning & rollback strategies" }]
  },
  {
    term: "Model Alias", slug: "model-alias", category: "Infrastructure",
    definition: "A stable name (like 'latest' or 'default') that a provider maps to a specific underlying model version, which can change without notice — pinning to an explicit version instead avoids unexpected behavior shifts.",
    related: [{ href: "/ai-agent-versioning-rollback", label: "AI agent versioning & rollback strategies" }]
  },
  {
    term: "Multi-Tenant Inference", slug: "multi-tenant-inference", category: "Infrastructure",
    definition: "Serving multiple customers' requests on shared model-serving infrastructure, a common cost-efficiency practice that raises data-isolation questions worth confirming with a vendor for sensitive workloads.",
    related: [{ href: "/data-sovereignty-ai-agents-india", label: "Data sovereignty for AI agents in India" }]
  },
  {
    term: "Warm Start (Inference)", slug: "warm-start", category: "Infrastructure",
    definition: "Serving a request using a model instance that's already loaded into memory and ready, avoiding the latency penalty of a 'cold start' where infrastructure must first initialize.",
    related: [{ href: "/ai-agent-latency-budgets", label: "Setting latency budgets for AI agent applications" }]
  },
  {
    term: "Dynamic Batching", slug: "dynamic-batching", category: "Infrastructure",
    definition: "A model-serving technique that groups multiple incoming requests together for simultaneous processing to improve throughput, at the cost of a small added latency while the batch fills.",
    related: [{ href: "/glossary/warm-start", label: "Warm start (inference)" }]
  },
  {
    term: "Eval Harness", slug: "eval-harness", category: "Methodology",
    definition: "The software infrastructure that runs a model or agent against a test suite and computes performance metrics, distinct from the test cases (golden dataset) themselves.",
    related: [{ href: "/glossary/golden-dataset", label: "Golden dataset" }]
  },
  {
    term: "Prompt Template", slug: "prompt-template", category: "Core Concepts",
    definition: "A reusable prompt structure with placeholder variables that get filled in at runtime, allowing consistent prompt formatting across many similar requests.",
    related: [{ href: "/glossary/prompt-versioning", label: "Prompt versioning" }]
  },
  {
    term: "Retrieval Chunking", slug: "retrieval-chunking", category: "Architecture",
    definition: "The process of splitting source documents into smaller segments before indexing them for retrieval-augmented generation, where chunk size and boundaries significantly affect retrieval quality.",
    related: [{ href: "/glossary/rag", label: "Retrieval-augmented generation (RAG)" }]
  },
  {
    term: "Knowledge Graph RAG", slug: "knowledge-graph-rag", category: "Architecture",
    definition: "A retrieval-augmented generation variant that retrieves from a structured knowledge graph of entities and relationships rather than (or alongside) unstructured document chunks, useful for multi-hop factual queries.",
    related: [{ href: "/glossary/retrieval-chunking", label: "Retrieval chunking" }]
  },
  {
    term: "Tool-Use Benchmark", slug: "tool-use-benchmark", category: "Verification",
    definition: "A standardized test suite that measures how accurately an agent selects and correctly calls tools across a range of tasks, distinct from benchmarks that measure only raw model knowledge.",
    related: [{ href: "/ai-agent-tool-selection-accuracy", label: "Improving tool selection accuracy in AI agents" }]
  },
  {
    term: "Cost Per Token", slug: "cost-per-token", category: "Infrastructure",
    definition: "The price a model provider charges per input or output token, the base unit most LLM API pricing is calculated from, and a key input to any agent cost-optimization calculation.",
    related: [{ href: "/ai-agent-latency-optimization", label: "AI agent cost & latency optimization" }]
  },
  {
    term: "Draft Model", slug: "draft-model", category: "Architecture",
    definition: "In speculative decoding, the smaller, faster model that proposes candidate next tokens which a larger 'verifier' model then checks, speeding up generation without changing the final output quality.",
    related: [{ href: "/glossary/speculative-decoding", label: "Speculative decoding" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch8);

const glossaryTermsBatch9: typeof glossaryTerms = [
  {
    term: "AI Gateway", slug: "ai-gateway", category: "Infrastructure",
    definition: "A proxy layer sitting between an application and one or more model providers that centralizes API key management, rate limiting, caching, and routing across models.",
    related: [{ href: "/glossary/model-cascading", label: "Model cascading" }]
  },
  {
    term: "Model Cascading", slug: "model-cascading", category: "Architecture",
    definition: "Routing a request to a cheaper, smaller model first and escalating to a larger model only when the smaller one's response fails a confidence check, balancing cost against quality.",
    related: [{ href: "/ai-agent-latency-optimization", label: "AI agent cost & latency optimization" }]
  },
  {
    term: "Fallback Model", slug: "fallback-model", category: "Infrastructure",
    definition: "A secondary model an application automatically switches to when its primary model provider is unavailable, rate-limited, or returns an error, to preserve uptime.",
    related: [{ href: "/glossary/ai-gateway", label: "AI gateway" }]
  },
  {
    term: "Prompt Injection Defense", slug: "prompt-injection-defense", category: "Security",
    definition: "Techniques for preventing untrusted input (a document, webpage, or tool result) from being interpreted as instructions by an agent, such as input sanitization, privilege separation, and output filtering.",
    related: [{ href: "/prompt-injection-defense", label: "Prompt injection attacks on AI agents" }]
  },
  {
    term: "Output Parsing", slug: "output-parsing", category: "Technology",
    definition: "The step of converting a model's raw text or structured output into a typed object an application can reliably use, often the point where malformed model output first surfaces as a bug.",
    related: [{ href: "/glossary/structured-output-generation", label: "Structured output generation" }]
  },
  {
    term: "Tool-Augmented Generation", slug: "tool-augmented-generation", category: "Core Concepts",
    definition: "Combining a language model's generation with the ability to call external tools mid-response, letting it incorporate live data or computed results rather than relying only on trained knowledge.",
    related: [{ href: "/glossary/tool-calling", label: "Tool calling" }]
  },
  {
    term: "Multi-Turn Conversation", slug: "multi-turn-conversation", category: "Core Concepts",
    definition: "An interaction spanning multiple back-and-forth exchanges where the model must track context from earlier turns, as opposed to a single-shot prompt-and-response.",
    related: [{ href: "/glossary/session-memory", label: "Session memory" }]
  },
  {
    term: "Session Memory", slug: "session-memory", category: "Architecture",
    definition: "Information an agent retains only for the duration of a single active conversation, discarded once the session ends — distinct from persistent memory that carries across sessions.",
    related: [{ href: "/ai-agent-memory-types", label: "AI agent memory types" }]
  },
  {
    term: "Episodic Memory (AI Agent)", slug: "episodic-memory", category: "Architecture",
    definition: "An agent's record of specific past interactions or events, used to recall what happened in a prior session rather than general world knowledge.",
    related: [{ href: "/glossary/semantic-memory", label: "Semantic memory (AI agent)" }]
  },
  {
    term: "Semantic Memory (AI Agent)", slug: "semantic-memory", category: "Architecture",
    definition: "An agent's store of general facts and concepts (as opposed to specific past events), often implemented as a retrieval-augmented knowledge base.",
    related: [{ href: "/glossary/episodic-memory", label: "Episodic memory (AI agent)" }]
  },
  {
    term: "Procedural Memory (AI Agent)", slug: "procedural-memory", category: "Architecture",
    definition: "An agent's stored knowledge of how to perform a task or use a tool correctly, learned or refined from past executions rather than recalled as a fact.",
    related: [{ href: "/glossary/episodic-memory", label: "Episodic memory (AI agent)" }]
  },
  {
    term: "Memory Consolidation (AI Agent)", slug: "memory-consolidation", category: "Architecture",
    definition: "The process of summarizing or compressing an agent's accumulated interaction history into a more compact, durable form, so long-term memory doesn't grow unboundedly.",
    related: [{ href: "/ai-agent-context-window-management", label: "Context window management for AI agents" }]
  },
  {
    term: "Vector Quantization", slug: "vector-quantization", category: "Technology",
    definition: "Compressing high-dimensional embedding vectors into a smaller representation to reduce storage and search cost in a vector database, at some tradeoff in retrieval precision.",
    related: [{ href: "/glossary/quantization", label: "Quantization" }]
  },
  {
    term: "Model Watermarking", slug: "model-watermarking", category: "Security",
    definition: "Embedding a detectable statistical pattern into a model's output so AI-generated text or media can later be identified as machine-produced.",
    related: [{ href: "/glossary/ai-provenance", label: "AI provenance" }]
  },
  {
    term: "AI Provenance", slug: "ai-provenance", category: "Security",
    definition: "Metadata or cryptographic signals attached to content that record whether and how it was generated or modified by AI, supporting content-authenticity verification.",
    related: [{ href: "/glossary/model-watermarking", label: "Model watermarking" }]
  },
  {
    term: "Content Authenticity", slug: "content-authenticity", category: "Security",
    definition: "The broader practice and set of standards (such as C2PA) for verifying whether a piece of media is genuine, AI-generated, or has been altered, using attached provenance data.",
    related: [{ href: "/glossary/ai-provenance", label: "AI provenance" }]
  },
  {
    term: "Synthetic Media Detection", slug: "synthetic-media-detection", category: "Security",
    definition: "Tools and techniques for identifying whether an image, audio clip, or video was generated or manipulated by AI, as distinct from watermarking that requires the generator's cooperation.",
    related: [{ href: "/glossary/deepfake-detection", label: "Deepfake detection" }]
  },
  {
    term: "Deepfake Detection", slug: "deepfake-detection", category: "Security",
    definition: "A specific application of synthetic media detection focused on identifying AI-generated or manipulated video and audio depicting real people saying or doing things they didn't.",
    related: [{ href: "/glossary/synthetic-media-detection", label: "Synthetic media detection" }]
  },
  {
    term: "Model Alignment", slug: "model-alignment", category: "Methodology",
    definition: "The broad goal and set of techniques for making a model's behavior match intended human values and instructions, encompassing methods like RLHF, DPO, and constitutional AI.",
    related: [{ href: "/glossary/direct-preference-optimization", label: "Direct preference optimization (DPO)" }]
  },
  {
    term: "Direct Preference Optimization (DPO)", slug: "direct-preference-optimization", category: "Model Training",
    definition: "A model-alignment technique that trains directly on human preference comparisons between output pairs, without needing a separately trained reward model as in classic RLHF.",
    related: [{ href: "/glossary/reward-model", label: "Reward model" }]
  },
  {
    term: "Proximal Policy Optimization (PPO)", slug: "proximal-policy-optimization", category: "Model Training",
    definition: "A reinforcement learning algorithm commonly used in the RLHF pipeline to update a model's policy based on reward signals while limiting how far each update can shift behavior.",
    related: [{ href: "/glossary/reward-model", label: "Reward model" }]
  },
  {
    term: "Reward Model", slug: "reward-model", category: "Model Training",
    definition: "A separate model trained to score how well an output matches human preferences, used to guide reinforcement learning during RLHF-style alignment training.",
    related: [{ href: "/glossary/proximal-policy-optimization", label: "Proximal policy optimization (PPO)" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch9);

const glossaryTermsBatch10: typeof glossaryTerms = [
  {
    term: "QLoRA", slug: "qlora", category: "Model Training",
    definition: "A fine-tuning technique combining quantization with LoRA, allowing large models to be fine-tuned on much less GPU memory by keeping base weights in a compressed 4-bit format during training.",
    related: [{ href: "/glossary/lora", label: "LoRA" }, { href: "/glossary/quantization", label: "Quantization" }]
  },
  {
    term: "Full Fine-Tuning", slug: "full-fine-tuning", category: "Model Training",
    definition: "Updating all of a model's parameters during training, as opposed to parameter-efficient methods like LoRA that only train a small added subset — more resource-intensive but sometimes necessary for large behavior shifts.",
    related: [{ href: "/glossary/lora", label: "LoRA" }]
  },
  {
    term: "Continual Pretraining", slug: "continual-pretraining", category: "Model Training",
    definition: "Continuing a model's pretraining process on new data (such as a specific domain or language) after its initial training run, distinct from fine-tuning which typically targets instruction-following behavior.",
    related: [{ href: "/glossary/domain-adaptation", label: "Domain adaptation" }]
  },
  {
    term: "Domain Adaptation", slug: "domain-adaptation", category: "Model Training",
    definition: "Adjusting a general-purpose model to perform better on a specific domain (legal, medical, financial) through continued training or fine-tuning on domain-specific data.",
    related: [{ href: "/glossary/continual-pretraining", label: "Continual pretraining" }]
  },
  {
    term: "Catastrophic Interference", slug: "catastrophic-interference", category: "Model Training",
    definition: "A related term to catastrophic forgetting, describing how learning new information can disrupt previously learned representations in a neural network.",
    related: [{ href: "/glossary/catastrophic-forgetting", label: "Catastrophic forgetting" }]
  },
  {
    term: "Self-Refine", slug: "self-refine", category: "Core Concepts",
    definition: "A prompting technique where a model critiques and iteratively improves its own output across multiple passes, without external feedback or additional training.",
    related: [{ href: "/glossary/chain-of-thought", label: "Chain-of-thought reasoning" }]
  },
  {
    term: "Graph-of-Thought", slug: "graph-of-thought", category: "Core Concepts",
    definition: "A reasoning framework that structures a model's intermediate steps as a graph rather than a linear chain or tree, allowing steps to merge, branch, and be revisited more flexibly.",
    related: [{ href: "/glossary/tree-of-thought", label: "Tree-of-thought" }]
  },
  {
    term: "Least-to-Most Prompting", slug: "least-to-most-prompting", category: "Core Concepts",
    definition: "A prompting strategy that breaks a complex problem into a sequence of simpler subproblems, solving each in order so later steps can use earlier results.",
    related: [{ href: "/glossary/task-decomposition", label: "Task decomposition" }]
  },
  {
    term: "Meta-Prompting", slug: "meta-prompting", category: "Core Concepts",
    definition: "Using a model to generate or refine prompts for another model call, treating prompt construction itself as a task the model can help automate.",
    related: [{ href: "/glossary/prompt-chaining", label: "Prompt chaining" }]
  },
  {
    term: "Prompt Chaining", slug: "prompt-chaining", category: "Architecture",
    definition: "Structuring a task as a sequence of separate prompts, where each step's output feeds into the next, rather than attempting the whole task in a single prompt.",
    related: [{ href: "/glossary/task-decomposition", label: "Task decomposition" }]
  },
  {
    term: "Agent Planning", slug: "agent-planning", category: "Architecture",
    definition: "The step in an agent's process where it determines a sequence of actions to reach a goal before executing them, as distinct from purely reactive step-by-step decision-making.",
    related: [{ href: "/glossary/task-decomposition", label: "Task decomposition" }]
  },
  {
    term: "Task Decomposition", slug: "task-decomposition", category: "Architecture",
    definition: "Breaking a complex user request into smaller, more manageable subtasks that an agent can address individually, often as a first planning step before execution.",
    related: [{ href: "/glossary/agent-planning", label: "Agent planning" }, { href: "/glossary/subgoal-generation", label: "Subgoal generation" }]
  },
  {
    term: "Subgoal Generation", slug: "subgoal-generation", category: "Architecture",
    definition: "An agent's process of identifying intermediate objectives that must be achieved on the way to a final goal, often produced during the planning phase of task decomposition.",
    related: [{ href: "/glossary/task-decomposition", label: "Task decomposition" }]
  },
  {
    term: "World Model", slug: "world-model", category: "Core Concepts",
    definition: "An internal representation an AI system maintains of its environment's state and dynamics, used to predict the effects of actions before taking them.",
    related: [{ href: "/glossary/simulation-environment", label: "Simulation environment" }]
  },
  {
    term: "Simulation Environment", slug: "simulation-environment", category: "Technology",
    definition: "A controlled, often virtual setting used to test an agent's behavior safely before deploying it against real systems or data.",
    related: [{ href: "/glossary/sandboxed-execution", label: "Sandboxed execution" }]
  },
  {
    term: "Sandboxed Execution", slug: "sandboxed-execution", category: "Security",
    definition: "Running agent-generated code or actions in an isolated environment with restricted system access, preventing a mistake or malicious action from affecting the host system.",
    related: [{ href: "/mcp-server-security-sandboxing", label: "MCP server security & sandboxing" }]
  },
  {
    term: "Code Interpreter Tool", slug: "code-interpreter-tool", category: "Technology",
    definition: "A tool that lets an agent write and execute code (commonly Python) to perform calculations, data analysis, or file manipulation, typically running in a sandboxed environment.",
    related: [{ href: "/glossary/sandboxed-execution", label: "Sandboxed execution" }]
  },
  {
    term: "Web-Browsing Agent", slug: "web-browsing-agent", category: "Architecture",
    definition: "An agent capable of navigating and interacting with live web pages — clicking, filling forms, reading content — rather than relying only on a static search API.",
    related: [{ href: "/glossary/computer-use-agent", label: "Computer-use agent" }]
  },
  {
    term: "Computer-Use Agent", slug: "computer-use-agent", category: "Architecture",
    definition: "An agent that operates a computer's graphical interface directly — moving a mouse, clicking, typing — to complete tasks across any application, not limited to a web browser.",
    related: [{ href: "/glossary/gui-agent", label: "GUI agent" }]
  },
  {
    term: "GUI Agent", slug: "gui-agent", category: "Architecture",
    definition: "An umbrella term for an agent that interacts with software through its graphical user interface rather than through an API, relying on visual understanding of screen elements.",
    related: [{ href: "/glossary/screen-understanding", label: "Screen understanding" }]
  },
  {
    term: "Screen Understanding", slug: "screen-understanding", category: "Technology",
    definition: "A model's capability to interpret a screenshot or live screen state — identifying buttons, text fields, and layout — well enough to decide where to click or what to type next.",
    related: [{ href: "/glossary/gui-agent", label: "GUI agent" }, { href: "/multimodal-vision-ai-agents", label: "Multimodal vision & OCR AI agents" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch10);

const glossaryTermsBatch11: typeof glossaryTerms = [
  {
    term: "Indic NLP Toolkit", slug: "indic-nlp-toolkit", category: "India AI",
    definition: "A category of open-source libraries providing tokenization, transliteration and text-normalization utilities specifically for Indian languages, used as building blocks in Indic-language AI pipelines.",
    related: [{ href: "/indic-language-ai-models", label: "Indic language AI models" }]
  },
  {
    term: "Whisper (Large)", slug: "whisper-large", category: "Technology",
    definition: "OpenAI's large-size open-weight speech-to-text model variant, commonly used as a baseline for transcription accuracy across many languages.",
    related: [{ href: "/glossary/speech-to-text", label: "Speech-to-text (STT)" }]
  },
  {
    term: "AI Copyright Law", slug: "ai-copyright-law", category: "Compliance",
    definition: "The evolving body of legal rulings and regulation addressing whether AI-generated output can be copyrighted, and whether training on copyrighted data constitutes infringement — an unsettled area varying by jurisdiction.",
    related: [{ href: "/glossary/model-license-types", label: "Model license types" }]
  },
  {
    term: "Model License Types", slug: "model-license-types", category: "Compliance",
    definition: "The range of legal terms under which a model's weights are released, from fully permissive (Apache 2.0, MIT) to custom licenses with usage restrictions — always check the specific license rather than assuming 'open-weight' implies unrestricted use.",
    related: [{ href: "/glossary/open-weight-vs-open-source", label: "Open-weight vs open-source" }]
  },
  {
    term: "Open-Weight vs Open-Source", slug: "open-weight-vs-open-source", category: "Compliance",
    definition: "A distinction where 'open-weight' means the trained model parameters are downloadable, while 'open-source' (in the fuller sense) would also require the training data and code — most models marketed as 'open' are open-weight only.",
    related: [{ href: "/glossary/model-license-types", label: "Model license types" }]
  },
  {
    term: "Responsible Scaling Policy", slug: "responsible-scaling-policy", category: "Safety",
    definition: "A framework some AI labs publish committing to specific safety evaluations and mitigations before training or deploying models above defined capability thresholds.",
    related: [{ href: "/glossary/frontier-model", label: "Frontier model" }]
  },
  {
    term: "Frontier Model", slug: "frontier-model", category: "Core Concepts",
    definition: "A term for the most capable AI models at the current edge of development, typically the largest and newest releases from leading labs, used in policy and safety discussions.",
    related: [{ href: "/glossary/responsible-scaling-policy", label: "Responsible scaling policy" }]
  },
  {
    term: "Dangerous Capability Evaluation", slug: "dangerous-capability-evaluation", category: "Safety",
    definition: "Structured testing of a model for specific high-risk capabilities (like assistance with weapons development or cyberattacks) before release, a practice increasingly standard among frontier labs.",
    related: [{ href: "/glossary/red-teaming-ai", label: "Red teaming (AI)" }]
  },
  {
    term: "Model Card Transparency", slug: "model-card-transparency", category: "Verification",
    definition: "The practice of publishing a model card disclosing training data sources, evaluation results, known limitations, and intended use cases, following an increasingly standard documentation format across the industry.",
    related: [{ href: "/glossary/model-card", label: "Model card" }]
  },
  {
    term: "AI Bill of Rights", slug: "ai-bill-of-rights", category: "Compliance",
    definition: "A non-binding framework (originating from a 2022 US White House Office of Science and Technology Policy blueprint) outlining principles for AI system design around safety, discrimination protection, data privacy, and human alternatives.",
    related: [{ href: "/glossary/algorithmic-impact-assessment", label: "Algorithmic impact assessment" }]
  },
  {
    term: "EU AI Act", slug: "eu-ai-act", category: "Compliance",
    definition: "The European Union's risk-based regulatory framework for AI systems, classifying applications by risk tier and imposing corresponding obligations — this site treats a company's compliance status as unverified unless demonstrated by that company's own published documentation.",
    related: [{ href: "/glossary/algorithmic-impact-assessment", label: "Algorithmic impact assessment" }]
  },
  {
    term: "NIST AI Risk Management Framework", slug: "nist-ai-rmf", category: "Compliance",
    definition: "A voluntary US framework from the National Institute of Standards and Technology providing guidance for identifying and managing risks across an AI system's lifecycle.",
    related: [{ href: "/glossary/algorithmic-impact-assessment", label: "Algorithmic impact assessment" }]
  },
  {
    term: "ISO/IEC 42001", slug: "iso-42001", category: "Compliance",
    definition: "An international standard specifying requirements for an AI management system within an organization, analogous to ISO 27001 for information security — certification is issued by accredited third-party auditors, not self-declared.",
    related: [{ href: "/glossary/soc2-type-2", label: "SOC 2 Type II" }]
  },
  {
    term: "SOC 2 Type II", slug: "soc2-type-2", category: "Compliance",
    definition: "An audit report verifying that a service organization's security controls operated effectively over a sustained period (as opposed to Type I, a point-in-time snapshot) — this site does not assert any product holds this certification without a linked, verifiable audit report.",
    related: [{ href: "/glossary/iso-42001", label: "ISO/IEC 42001" }]
  },
  {
    term: "HIPAA Business Associate Agreement (BAA)", slug: "hipaa-baa", category: "Compliance",
    definition: "A required contract between a healthcare provider and any vendor handling protected health information on its behalf, establishing the vendor's HIPAA compliance obligations — a vendor's willingness to sign a BAA is a stronger practical signal than a general HIPAA-compliance claim alone.",
    related: [{ href: "/glossary/data-processing-addendum", label: "Data processing addendum" }]
  },
  {
    term: "Data Processing Addendum (DPA)", slug: "data-processing-addendum", category: "Compliance",
    definition: "A contract supplement between a data controller and processor specifying how personal data will be handled, required under regulations like GDPR when a vendor processes personal data on a customer's behalf.",
    related: [{ href: "/glossary/hipaa-baa", label: "HIPAA Business Associate Agreement (BAA)" }]
  },
  {
    term: "Right to Explanation", slug: "right-to-explanation", category: "Compliance",
    definition: "A principle (referenced in regulations like GDPR) that individuals subject to a significant automated decision have a right to a meaningful explanation of the logic involved, a specific challenge for opaque AI models.",
    related: [{ href: "/glossary/explainability-methods", label: "Explainability methods" }]
  },
  {
    term: "Algorithmic Impact Assessment", slug: "algorithmic-impact-assessment", category: "Compliance",
    definition: "A structured evaluation of an automated decision-making system's potential effects on individuals or groups before deployment, increasingly required by regulation in high-stakes domains like hiring and lending.",
    related: [{ href: "/glossary/bias-audit", label: "Bias audit" }]
  },
  {
    term: "Bias Audit", slug: "bias-audit", category: "Verification",
    definition: "A structured evaluation of an AI system's outputs across different demographic groups to detect disparate treatment or outcomes, required by law in some jurisdictions for automated hiring tools.",
    related: [{ href: "/glossary/disparate-impact", label: "Disparate impact" }]
  },
  {
    term: "Disparate Impact", slug: "disparate-impact", category: "Compliance",
    definition: "A legal concept describing when a facially neutral policy or system disproportionately affects a protected group, regardless of intent — a key concern in auditing automated decision systems for hiring, lending or housing.",
    related: [{ href: "/glossary/bias-audit", label: "Bias audit" }]
  },
  {
    term: "Fairness Metrics", slug: "fairness-metrics", category: "Verification",
    definition: "Quantitative measures (such as demographic parity or equalized odds) used to evaluate whether a model's predictions treat different groups equitably — different metrics can conflict, so the choice of metric reflects a value judgment, not just a technical one.",
    related: [{ href: "/glossary/disparate-impact", label: "Disparate impact" }]
  },
  {
    term: "Explainability Methods", slug: "explainability-methods", category: "Verification",
    definition: "Techniques for making a model's predictions more interpretable to humans, ranging from inherently interpretable models to post-hoc methods like SHAP and LIME applied to complex models.",
    related: [{ href: "/glossary/shap-values", label: "SHAP values" }]
  },
  {
    term: "SHAP Values", slug: "shap-values", category: "Verification",
    definition: "A game-theory-based method for attributing a model prediction's outcome to the contribution of each input feature, widely used for explaining individual predictions from complex models.",
    related: [{ href: "/glossary/lime-explainability", label: "LIME" }]
  },
  {
    term: "LIME", slug: "lime-explainability", category: "Verification",
    definition: "Local Interpretable Model-agnostic Explanations — a technique that approximates a complex model's behavior near a specific prediction with a simpler, interpretable model to explain that one decision.",
    related: [{ href: "/glossary/shap-values", label: "SHAP values" }]
  },
  {
    term: "Counterfactual Explanation", slug: "counterfactual-explanation", category: "Verification",
    definition: "An explanation method describing the minimal change to an input that would have flipped a model's decision, useful for telling a user specifically what would need to change for a different outcome.",
    related: [{ href: "/glossary/explainability-methods", label: "Explainability methods" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch11);

const glossaryTermsBatch12: typeof glossaryTerms = [
  {
    term: "AI-Native Application", slug: "ai-native-application", category: "Architecture",
    definition: "An application designed from the ground up around AI capabilities as a core feature, as opposed to a traditional application with AI features bolted on afterward.",
    related: [{ href: "/glossary/agentic-loop", label: "Agentic loop" }]
  },
  {
    term: "Legacy System Integration", slug: "legacy-system-integration", category: "Architecture",
    definition: "Connecting an AI agent to older enterprise systems that lack modern APIs, often requiring custom adapters, screen-scraping, or middleware to bridge the gap.",
    related: [{ href: "/glossary/api-first-architecture", label: "API-first architecture" }]
  },
  {
    term: "API-First Architecture", slug: "api-first-architecture", category: "Architecture",
    definition: "A design approach where a system's API is built and documented before or alongside its user interface, making the system easier for an agent to integrate with programmatically.",
    related: [{ href: "/glossary/legacy-system-integration", label: "Legacy system integration" }]
  },
  {
    term: "Headless CMS", slug: "headless-cms", category: "Architecture",
    definition: "A content management system that provides content through an API without a built-in front end, commonly used as a structured content source an AI agent can query directly.",
    related: [{ href: "/glossary/api-first-architecture", label: "API-first architecture" }]
  },
  {
    term: "Composable Architecture", slug: "composable-architecture", category: "Architecture",
    definition: "A software design approach using independently swappable, best-of-breed components rather than a single monolithic platform — relevant to AI agents since it often determines how easily a new model or tool can be swapped in.",
    related: [{ href: "/glossary/ai-gateway", label: "AI gateway" }]
  },
  {
    term: "Event-Driven Architecture", slug: "event-driven-architecture", category: "Architecture",
    definition: "A system design where components communicate by producing and reacting to events, commonly used to trigger an AI agent workflow in response to something happening elsewhere in a system.",
    related: [{ href: "/glossary/webhooks-ai-agents", label: "Webhooks in AI agent systems" }]
  },
  {
    term: "Pub/Sub Pattern", slug: "pub-sub-pattern", category: "Architecture",
    definition: "A messaging pattern where publishers send events to a channel without knowing which subscribers will receive them, a common building block for event-driven agent architectures.",
    related: [{ href: "/glossary/event-driven-architecture", label: "Event-driven architecture" }]
  },
  {
    term: "Message Queue (AI Agents)", slug: "message-queue-ai-agents", category: "Infrastructure",
    definition: "A buffer that holds tasks for an agent system to process asynchronously, useful for smoothing out load spikes and decoupling request intake from processing capacity.",
    related: [{ href: "/glossary/dead-letter-queue", label: "Dead-letter queue" }]
  },
  {
    term: "Circuit Breaker Pattern", slug: "circuit-breaker-pattern", category: "Infrastructure",
    definition: "A resilience pattern that temporarily stops sending requests to a failing dependency (like a model provider) after repeated failures, preventing cascading failures while giving the dependency time to recover.",
    related: [{ href: "/glossary/retry-with-backoff", label: "Retry with backoff" }]
  },
  {
    term: "Retry with Backoff", slug: "retry-with-backoff", category: "Infrastructure",
    definition: "A retry strategy that increases the wait time between successive retry attempts after a failure, reducing load on an already-struggling dependency instead of retrying immediately and repeatedly.",
    related: [{ href: "/glossary/circuit-breaker-pattern", label: "Circuit breaker pattern" }]
  },
  {
    term: "Dead-Letter Queue", slug: "dead-letter-queue", category: "Infrastructure",
    definition: "A holding queue for messages or tasks that repeatedly fail processing, isolating them for manual inspection rather than letting them block or endlessly retry in the main processing pipeline.",
    related: [{ href: "/glossary/message-queue-ai-agents", label: "Message queue (AI agents)" }]
  },
  {
    term: "Observability's Three Pillars", slug: "observability-three-pillars", category: "Infrastructure",
    definition: "The traditional framework of logs, metrics, and traces used to understand system behavior, adapted for AI agents to also include prompt/response pairs and tool-call traces.",
    related: [{ href: "/ai-agent-observability-tracing", label: "AI agent observability & monitoring" }]
  },
  {
    term: "Distributed Tracing", slug: "distributed-tracing", category: "Infrastructure",
    definition: "A technique for tracking a single request as it flows across multiple services, useful for an agent system where one user request might trigger several tool calls and model round-trips.",
    related: [{ href: "/glossary/observability-three-pillars", label: "Observability's three pillars" }]
  },
  {
    term: "Structured Logging", slug: "structured-logging", category: "Infrastructure",
    definition: "Recording logs in a consistent, machine-parseable format (like JSON) rather than free-text messages, making it possible to query and analyze agent behavior at scale.",
    related: [{ href: "/ai-agent-audit-logging", label: "Audit logging for AI agent actions" }]
  },
  {
    term: "Service-Level Indicator (SLI)", slug: "service-level-indicator", category: "Infrastructure",
    definition: "A specific, measured metric (like response latency or error rate) used to quantify a service's performance, the basis for defining and tracking an SLA.",
    related: [{ href: "/ai-agent-uptime-sla", label: "Understanding AI agent uptime & SLA commitments" }]
  },
  {
    term: "Error Budget", slug: "error-budget", category: "Infrastructure",
    definition: "The acceptable amount of failure or downtime a service can have within a period while still meeting its reliability target, used to balance the pace of new feature releases against stability.",
    related: [{ href: "/glossary/service-level-indicator", label: "Service-level indicator (SLI)" }]
  },
  {
    term: "Feature Flag (AI)", slug: "feature-flag-ai", category: "Methodology",
    definition: "A configuration switch that enables or disables a specific AI capability for a subset of users without a full deployment, commonly used for gradual agent feature rollouts.",
    related: [{ href: "/glossary/canary-rollout", label: "Canary rollout" }]
  },
  {
    term: "Dark Launch", slug: "dark-launch", category: "Methodology",
    definition: "Releasing a new AI agent feature to production infrastructure without exposing it to real users yet, used to validate performance and stability under real conditions before a visible launch.",
    related: [{ href: "/glossary/shadow-deployment", label: "Shadow deployment" }]
  },
  {
    term: "A/B Testing (AI Agents)", slug: "a-b-testing-ai-agents", category: "Methodology",
    definition: "Running two agent variants (different prompts, models, or flows) against separate user groups to compare real-world outcomes before committing to one version.",
    related: [{ href: "/glossary/canary-rollout", label: "Canary rollout" }]
  },
  {
    term: "Cohort Analysis", slug: "cohort-analysis", category: "Methodology",
    definition: "Analyzing a group of users who share a starting characteristic (like signup date) over time, useful for measuring how an AI agent feature's adoption or impact changes as users gain experience with it.",
    related: [{ href: "/glossary/activation-rate", label: "Activation rate" }]
  },
  {
    term: "North Star Metric", slug: "north-star-metric", category: "Methodology",
    definition: "The single metric a team treats as the clearest signal of value delivered, often used to keep an AI agent feature's success measurement focused rather than tracking dozens of secondary numbers.",
    related: [{ href: "/glossary/activation-rate", label: "Activation rate" }]
  },
  {
    term: "Activation Rate", slug: "activation-rate", category: "Methodology",
    definition: "The percentage of new users who reach a defined point of meaningful first value from a product, a key metric for diagnosing the AI agent cold-start problem.",
    related: [{ href: "/ai-agent-cold-start-problem", label: "The AI agent cold-start problem" }]
  },
  {
    term: "Churn Prediction", slug: "churn-prediction", category: "Methodology",
    definition: "Using a model to estimate which customers are likely to stop using a product, often built on usage-pattern data to enable proactive retention outreach.",
    related: [{ href: "/glossary/lifetime-value-model", label: "Lifetime value model" }]
  },
  {
    term: "Lifetime Value Model", slug: "lifetime-value-model", category: "Methodology",
    definition: "A predictive model estimating the total revenue a customer will generate over their relationship with a business, used to inform acquisition spend and prioritization decisions.",
    related: [{ href: "/glossary/churn-prediction", label: "Churn prediction" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch12);

const glossaryTermsBatch13: typeof glossaryTerms = [
  {
    term: "Supervised Fine-Tuning (SFT)", slug: "supervised-fine-tuning", category: "Model Training",
    definition: "Training a pretrained model further on labeled input-output example pairs to teach it a specific behavior, typically the first stage of aligning a base model into an instruction-following assistant.",
    related: [{ href: "/glossary/reward-model", label: "Reward model" }]
  },
  {
    term: "Unsupervised Learning", slug: "unsupervised-learning", category: "Core Concepts",
    definition: "A machine learning approach that finds patterns in data without labeled examples, as opposed to supervised learning which trains on labeled input-output pairs.",
    related: [{ href: "/glossary/self-supervised-learning", label: "Self-supervised learning" }]
  },
  {
    term: "Self-Supervised Learning", slug: "self-supervised-learning", category: "Model Training",
    definition: "A training approach where a model generates its own labels from the structure of unlabeled data (like predicting the next word in a sentence), the technique underlying most language model pretraining.",
    related: [{ href: "/glossary/pretraining", label: "Pretraining" }]
  },
  {
    term: "Reinforcement Learning", slug: "reinforcement-learning", category: "Model Training",
    definition: "A training paradigm where a model learns by taking actions and receiving reward signals, used in RLHF-style alignment training and in some agent-planning research.",
    related: [{ href: "/glossary/proximal-policy-optimization", label: "Proximal policy optimization (PPO)" }]
  },
  {
    term: "Encoder-Decoder Model", slug: "encoder-decoder-model", category: "Architecture",
    definition: "A neural network architecture with a separate encoder (processes input into a representation) and decoder (generates output from that representation), common in translation and some earlier language models.",
    related: [{ href: "/glossary/autoregressive-model", label: "Autoregressive model" }]
  },
  {
    term: "Generative Adversarial Network (GAN)", slug: "generative-adversarial-network", category: "Architecture",
    definition: "A model architecture pitting two networks against each other — a generator creating fake data and a discriminator trying to detect it — historically important for image generation before diffusion models became dominant.",
    related: [{ href: "/glossary/diffusion-model", label: "Diffusion model" }]
  },
  {
    term: "Variational Autoencoder (VAE)", slug: "variational-autoencoder", category: "Architecture",
    definition: "A generative model architecture that learns a compressed, probabilistic representation of data, used both as a standalone generative model and as a component within diffusion model pipelines.",
    related: [{ href: "/glossary/generative-adversarial-network", label: "Generative adversarial network (GAN)" }]
  },
  {
    term: "Convolutional Neural Network (CNN)", slug: "convolutional-neural-network", category: "Architecture",
    definition: "A neural network architecture using convolutional layers well-suited to grid-like data such as images, historically dominant in computer vision before vision transformers gained adoption.",
    related: [{ href: "/glossary/neural-network-basics", label: "Neural network basics" }]
  },
  {
    term: "Recurrent Neural Network (RNN)", slug: "recurrent-neural-network", category: "Architecture",
    definition: "A neural network architecture that processes sequences by maintaining a hidden state updated at each step, largely superseded by transformer architectures for language tasks but still relevant in some specialized applications.",
    related: [{ href: "/glossary/long-short-term-memory", label: "Long short-term memory (LSTM)" }]
  },
  {
    term: "Long Short-Term Memory (LSTM)", slug: "long-short-term-memory", category: "Architecture",
    definition: "A type of recurrent neural network designed to better retain information over longer sequences than a basic RNN, widely used before transformers became the dominant architecture for language tasks.",
    related: [{ href: "/glossary/recurrent-neural-network", label: "Recurrent neural network (RNN)" }]
  },
  {
    term: "Neural Network Basics", slug: "neural-network-basics", category: "Core Concepts",
    definition: "The foundational structure underlying most modern AI models: layers of interconnected nodes that transform input data through weighted connections, adjusted during training to minimize prediction error.",
    related: [{ href: "/glossary/backpropagation", label: "Backpropagation" }]
  },
  {
    term: "Cross-Validation", slug: "cross-validation", category: "Verification",
    definition: "A model evaluation technique that splits data into multiple folds, training and testing on different combinations to get a more reliable estimate of performance than a single train-test split.",
    related: [{ href: "/glossary/train-test-split", label: "Train-test split" }]
  },
  {
    term: "Train-Test Split", slug: "train-test-split", category: "Verification",
    definition: "Dividing a dataset into a portion used to train a model and a separate portion used to evaluate it, ensuring performance is measured on data the model hasn't already seen.",
    related: [{ href: "/glossary/cross-validation", label: "Cross-validation" }]
  },
  {
    term: "Hyperparameter Tuning", slug: "hyperparameter-tuning", category: "Model Training",
    definition: "The process of finding effective values for a model's configuration settings (learning rate, batch size, and similar) that aren't learned from data directly but significantly affect training outcomes.",
    related: [{ href: "/compare/optuna-vs-ray-tune", label: "Optuna vs Ray Tune" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch13);

const glossaryTermsBatch14: typeof glossaryTerms = [
  {
    term: "AI Agent Marketplace", slug: "ai-agent-marketplace", category: "Infrastructure",
    definition: "A platform where third-party developers publish agents or agent skills for others to discover and use, similar in concept to an app store but for agent capabilities.",
    related: [{ href: "/glossary/agent-skill-library", label: "Agent skill library" }]
  },
  {
    term: "Agent Skill Library", slug: "agent-skill-library", category: "Architecture",
    definition: "A curated collection of reusable, packaged capabilities an agent can load and use, allowing new abilities to be added without rewriting the agent's core logic.",
    related: [{ href: "/glossary/reusable-agent-component", label: "Reusable agent component" }]
  },
  {
    term: "Reusable Agent Component", slug: "reusable-agent-component", category: "Architecture",
    definition: "A modular, self-contained piece of agent functionality (a tool, a prompt template, a sub-workflow) designed to be shared across multiple agents rather than duplicated.",
    related: [{ href: "/glossary/prompt-library", label: "Prompt library" }]
  },
  {
    term: "Prompt Library", slug: "prompt-library", category: "Architecture",
    definition: "A managed collection of reusable, version-controlled prompt templates an organization maintains, reducing duplicated prompt-engineering effort across teams.",
    related: [{ href: "/glossary/prompt-template", label: "Prompt template" }]
  },
  {
    term: "Shared Context Protocol", slug: "shared-context-protocol", category: "Architecture",
    definition: "A general term for a standardized way of passing context (state, history, permissions) between agents or between an agent and a tool, of which MCP is one concrete implementation.",
    related: [{ href: "/what-is-mcp", label: "What is MCP?" }]
  },
  {
    term: "Multi-Modal Fusion", slug: "multi-modal-fusion", category: "Architecture",
    definition: "Combining information from multiple input types (text, image, audio) within a single model or pipeline to produce a response that draws on all of them together.",
    related: [{ href: "/multimodal-vision-ai-agents", label: "Multimodal vision & OCR AI agents" }]
  },
  {
    term: "Cross-Modal Retrieval", slug: "cross-modal-retrieval", category: "Architecture",
    definition: "Searching for relevant content across different modalities — for example, finding an image using a text query — by comparing embeddings from a shared multimodal representation space.",
    related: [{ href: "/glossary/multi-modal-fusion", label: "Multi-modal fusion" }]
  },
  {
    term: "Text-to-Speech Latency", slug: "text-to-speech-latency", category: "Technology",
    definition: "The delay between when text is submitted to a TTS system and when audio playback can begin, a critical factor for making a voice AI agent feel responsive rather than sluggish.",
    related: [{ href: "/glossary/streaming-tts", label: "Streaming TTS" }]
  },
  {
    term: "Streaming TTS", slug: "streaming-tts", category: "Technology",
    definition: "Generating and playing back synthesized speech audio incrementally as it's produced, rather than waiting for the full audio clip to be generated first — reduces perceived latency in voice AI systems.",
    related: [{ href: "/glossary/text-to-speech-latency", label: "Text-to-speech latency" }]
  },
  {
    term: "Real-Time Voice Pipeline", slug: "real-time-voice-pipeline", category: "Architecture",
    definition: "The full chain of components (voice activity detection, speech-to-text, model inference, text-to-speech) working together with low enough combined latency to support natural spoken conversation.",
    related: [{ href: "/sub-second-latency-voice-ai", label: "Sub-second latency voice AI" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch14);

const glossaryTermsBatch15: typeof glossaryTerms = [
  {
    term: "Agent Observability Dashboard", slug: "agent-observability-dashboard", category: "Infrastructure",
    definition: "A monitoring interface that visualizes an agent system's traces, tool calls, latency, and error rates, giving a team a single place to spot regressions or anomalies without reading raw logs.",
    related: [{ href: "/ai-agent-observability-tracing", label: "AI agent observability & monitoring" }]
  },
  {
    term: "Model Inference Cost", slug: "model-inference-cost", category: "Infrastructure",
    definition: "The compute expense of running a model to generate a response, distinct from training cost — the recurring cost that scales with usage and is the main driver of an agent application's ongoing operating expense.",
    related: [{ href: "/glossary/cost-per-token", label: "Cost per token" }]
  },
  {
    term: "Prompt Injection Taxonomy", slug: "prompt-injection-taxonomy", category: "Security",
    definition: "A classification of prompt injection attack types — direct (in the user's own message) versus indirect (embedded in a document or webpage the agent processes) — used to reason about which defenses apply to which threat.",
    related: [{ href: "/prompt-injection-defense", label: "Prompt injection defense" }]
  },
  {
    term: "AI Agent Permission Scoping", slug: "ai-agent-permission-scoping", category: "Security",
    definition: "Explicitly limiting which tools, data, and actions an agent can access for a given task, rather than granting broad standing access — the practical implementation of least-privilege access for agent systems.",
    related: [{ href: "/glossary/least-privilege-access", label: "Least-privilege access" }]
  },
  {
    term: "Tool Result Validation", slug: "tool-result-validation", category: "Security",
    definition: "Checking a tool's returned output for expected shape and plausibility before an agent acts on it, guarding against a compromised or malfunctioning tool feeding bad data into the agent's next decision.",
    related: [{ href: "/glossary/output-parsing", label: "Output parsing" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch15);

const glossaryTermsBatch16: typeof glossaryTerms = [
  {
    term: "Tool Registry",
    slug: "tool-registry",
    category: "Infrastructure",
    definition: "A centralized catalog of available tools, APIs, and data sources that an AI agent can discover and invoke, typically described using standardized schemas (e.g., MCP function schemas) to ensure consistent tool calling across different implementations.",
    related: [{ href: "/glossary/function-calling", label: "Function calling" }, { href: "/glossary/mcp", label: "Model Context Protocol (MCP)" }]
  },
  {
    term: "Agent Versioning",
    slug: "agent-versioning",
    category: "Model Training",
    definition: "The practice of managing distinct versions of an AI agent, including its system prompt, tool set, model configuration, and associated evidence receipts, enabling rollback, A/B testing, and controlled feature rollouts without disrupting active deployments.",
    related: [{ href: "/glossary/canary-rollout", label: "Canary rollout" }, { href: "/glossary/feature-flag-ai", label: "Feature flag (AI)" }]
  },
  {
    term: "Publication Workflow",
    slug: "publication-workflow",
    category: "Methodology",
    definition: "The standardized end-to-end process on BestAIAgent.in that routes an entity or comparison through evidence collection, verification grading, publication state checks, and final indexing — ensuring only evidence-backed content enters the public catalog and search index.",
    related: [{ href: "/trust/evidence-methodology", label: "Evidence methodology" }, { href: "/trust/how-to-verify", label: "How to verify a claim" }]
  },
  {
    term: "Verification Receipt",
    slug: "verification-receipt",
    category: "Verification",
    definition: "A machine-readable receipt (typically SHA-256 hashed) that records the source, field, retrieval timestamp, and content hash of evidence evaluated for an agent entity or comparison, serving as the primary-source receipt required for publication gate passage.",
    related: [{ href: "/glossary/sha-256-hash", label: "SHA-256 hash" }, { href: "/glossary/evidence-backed-evaluation", label: "Evidence-backed evaluation" }]
  },
  {
    term: "Agent Skill",
    slug: "agent-skill",
    category: "Architecture",
    definition: "A modular, self-contained capability (a prompt template, tool configuration, or sub-workflow) that an agent can load and execute, allowing new abilities to be added without modifying the agent's core logic or rebuilding the entire system.",
    related: [{ href: "/glossary/reusable-agent-component", label: "Reusable agent component" }, { href: "/glossary/prompt-library", label: "Prompt library" }]
  }
];

glossaryTerms.push(...glossaryTermsBatch16);

export const glossaryBySlug = new Map(glossaryTerms.map((t) => [t.slug, t]));
export const glossaryCategories = [...new Set(glossaryTerms.map((t) => t.category))];
