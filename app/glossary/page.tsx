import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI & ML Glossary — Evidence-Backed Definitions for AI Agents, MCP, DPDP & India AI",
  description: "AI and ML glossary covering AI agents, Model Context Protocol (MCP), DPDP compliance, Indic language models, and India-specific AI terminology.",
  alternates: { canonical: "/glossary" }
};

const glossary: Record<string, [string, string][]> = {
  "Core Concepts": [
    ["AI Agent", "An autonomous or semi-autonomous software system that perceives its environment, makes decisions, and takes actions to achieve specific goals. AI agents can be simple (rule-based) or complex (LLM-powered with tool integration). In the context of BestAIAgent.in, we evaluate agents that combine language models with external tools and data sources to accomplish tasks on behalf of users."],
    ["Context Window", "The maximum amount of text (measured in tokens) that an AI model can process in a single request. Larger context windows allow agents to work with longer documents, maintain longer conversations, and process more complex instructions. However, larger context windows also increase cost and latency. MCP helps optimize context window usage by enabling agents to write code that calls tools directly, bypassing the need to include tool documentation in the context."],
    ["Token", "The basic unit of text processing in language models. Tokens can be words, parts of words, or individual characters, depending on the model's tokenizer. For English text, one token is approximately 4 characters or 0.75 words. For Indian languages, tokenization is less efficient—some languages require more tokens to express the same content. Pricing for API-based models is typically per-token."],
    ["Prompt Engineering", "The practice of crafting effective inputs (prompts) to AI models to produce desired outputs. Good prompt engineering involves providing clear instructions, relevant context, examples, and constraints. For agents, prompt engineering extends to system prompts that define the agent's role, capabilities, and behavioral guidelines."],
    ["Retrieval-Augmented Generation (RAG)", "A technique that enhances AI model responses by retrieving relevant information from external knowledge sources before generating a response. RAG systems typically use vector databases to store and retrieve document chunks based on semantic similarity. This approach reduces hallucination and enables agents to provide up-to-date information beyond their training data."],
    ["Embedding", "A numerical representation (vector) of text, images, or other data in a high-dimensional space. Embeddings capture semantic meaning—items with similar meanings have similar embeddings. AI models generate embeddings that can be stored in vector databases and queried for semantic search. Embedding models are evaluated on their ability to capture semantic relationships and support downstream tasks."],
    ["Tool Use", "The capability of AI agents to invoke external tools (APIs, databases, file systems, etc.) to accomplish tasks beyond text generation. MCP standardizes tool use by defining a common interface for tool discovery, invocation, and result handling. Agents with strong tool use capabilities can automate complex workflows that combine multiple systems."],
    ["Open-Weight Models", "AI models whose weights (parameters) are publicly available, enabling researchers and developers to inspect, modify, and deploy them independently. Open-weight models contrast with closed-weight models where the weights are proprietary. India has seen 68% adoption of open-weight models among developers, reflecting a preference for transparency and local deployment."],
    ["Fine-Tuning", "The process of further training a pre-trained AI model on a specific dataset to improve performance on particular tasks or domains. Fine-tuning can adapt a general-purpose model to specialized use cases like legal document analysis, medical diagnosis, or Indian language processing. BestAIAgent.in evaluates whether agents support fine-tuning and how it affects their India Fit."],
  ],
  "Infrastructure": [
    ["Model Context Protocol (MCP)", "An open standard introduced in November 2024 that defines a universal interface for connecting AI assistants and agents to external data sources, tools, and services. MCP operates on a client-server model where the client is the AI agent and the server is the tool or data source being connected. The protocol supports two transport mechanisms: stdio (for local development) and Streamable HTTP (for remote deployments)."],
    ["Stdio Transport", "A transport mechanism for MCP that communicates over standard input and output streams. Stdio transport is preferred for local development because it is secure by default—no network exposure—and works seamlessly with local tools like file system browsers, database clients, and development utilities. The agent and server run as separate processes on the same machine."],
    ["Streamable HTTP", "A transport mechanism for MCP that uses HTTP with Server-Sent Events for streaming responses. This transport is designed for remote and enterprise deployments where servers may run on different machines or in containerized environments. Streamable HTTP supports TLS authentication, web observability, and horizontal scaling."],
    ["Vector Database", "A database designed to store and query vector embeddings—numerical representations of text, images, or other data. Vector databases enable semantic search by finding items with similar embeddings to a query. Common vector databases include Pinecone, Weaviate, Qdrant, and Chroma. They are essential components of RAG systems and AI agent memory architectures."],
  ],
  "Compliance": [
    ["DPDP Act", "The Digital Personal Data Protection Act, 2023, is India's comprehensive framework for personal data processing. For AI agents, the Act's most significant provision is the classification of voice data as biometric data, which triggers heightened consent and security obligations. The Act requires explicit consent for data processing, data fiduciaries to maintain transparency, and breach notification to the Data Protection Board."],
    ["Data Residency", "The requirement that data pertaining to Indian residents be stored and processed within India's borders. Under the DPDP Act, certain categories of personal data may require local storage. For AI agents, data residency affects deployment architecture—agents processing personal data of Indian residents may need to use on-premise deployment or Indian cloud regions (AWS Mumbai, GCP Hyderabad, Azure Pune)."],
  ],
  "India AI": [
    ["Indic Language Models", "AI models specifically trained or fine-tuned for Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, and others. These models often outperform global models in regional cultural context and code-switching scenarios (e.g., Hinglish). Examples include Sarvam-30B and Krutrim-2, which are trained on Indian language data and optimized for Indian use cases."],
    ["Hinglish", "A code-switching language blend of Hindi and English commonly used in urban India. Hinglish presents unique challenges for AI models because it mixes vocabulary, grammar, and script from both languages within a single conversation. Models that support Hinglish can serve a significant portion of India's English-speaking population more effectively."],
    ["Sovereign AI", "AI systems that operate within a country's borders, using local infrastructure and complying with local regulations. For India, sovereign AI means deploying agents on Indian cloud regions or on-premise infrastructure, ensuring data residency, and complying with the DPDP Act. Sovereign AI is a priority for government, defense, and regulated industries."],
    ["Bhashini", "The National Language Translation Mission, a Government of India initiative that provides APIs for translation between all 22 official Indian languages. Bhashini supports text translation, speech-to-text, text-to-speech, and optical character recognition. AI agents can integrate with Bhashini to support multilingual Indian users."],
    ["AIRAWAT", "India's national AI computing platform, part of the IndiaAI Mission. AIRAWAT provides shared GPU compute infrastructure for startups, researchers, and academic institutions that cannot afford private GPU clusters. The platform aims to democratize access to AI computing resources and accelerate domestic AI development."],
    ["IndiaAI Mission", "A Government of India initiative with ₹10,000 crore (approximately $1.25 billion) in funding to accelerate domestic AI development. The mission focuses on compute infrastructure (AIRAWAT), innovation centers, datasets platforms, and skilling programs. It aims to make India a global leader in AI development and deployment."],
    ["UPI", "Unified Payments Interface, India's real-time payment system that enables instant bank-to-bank transfers. For AI agent vendors, offering UPI payment support simplifies billing for Indian customers and reduces forex conversion costs. BestAIAgent.in evaluates whether agents support UPI as part of the India Fit pricing assessment."],
    ["GST Invoicing", "The requirement for businesses operating in India to issue invoices compliant with the Goods and Services Tax system. For AI agent vendors serving Indian enterprise customers, providing GST-compliant invoices with proper HSN/SAC codes and tax breakdowns is essential. BestAIAgent.in verifies whether vendors offer GST invoicing as part of the India Fit assessment."],
  ],
  "Architecture": [
    ["Multi-Agent System", "An architecture where multiple AI agents collaborate to solve complex tasks. Each agent may have specialized capabilities, and they communicate through defined protocols to share information and coordinate actions. Frameworks like CrewAI, AutoGen, and LangGraph support multi-agent orchestration with features like task delegation, result sharing, and conflict resolution."],
    ["Zero-Data Architecture", "A system design approach that minimizes or eliminates the collection, storage, and processing of personal data. BestAIAgent.in operates on a zero-data architecture—we do not collect user data, use cookies, or track visitors. This approach eliminates the risk of data breaches and aligns with privacy-first principles."],
    ["Agent Orchestration", "The coordination of multiple AI agents, tools, and data sources to accomplish complex tasks. Orchestration involves task decomposition (breaking complex tasks into subtasks), routing (assigning subtasks to appropriate agents), and aggregation (combining results). Frameworks like LangGraph and CrewAI provide orchestration capabilities for building sophisticated multi-agent systems."],
  ],
  "Security": [
    ["Sandboxing", "A security technique that isolates code execution in a restricted environment. For MCP servers, sandboxing typically involves running the server in a Docker container with limited filesystem access, network restrictions, and resource limits. Sandboxing prevents compromised or malicious servers from affecting the host system or accessing unauthorized data."],
  ],
  "Verification": [
    ["SHA-256 Hash", "A cryptographic hash function that produces a 256-bit (64-character) hash value. BestAIAgent.in uses SHA-256 hashes to verify the integrity and version of source code being evaluated. By comparing the hash of downloaded code against the expected hash, we can confirm that the code has not been tampered with and matches the version we evaluated."],
  ],
  "Methodology": [
    ["Evidence-Backed Evaluation", "An assessment methodology where every claim is traceable to a primary source or independent testing. BestAIAgent.in requires evidence for every feature claim, pricing figure, and capability assertion. If evidence cannot be verified, the claim is marked as unverified rather than presented as fact. This approach ensures transparency and enables users to independently verify our assessments."],
    ["India Fit Score", "A proprietary scoring dimension used by BestAIAgent.in to evaluate how well an AI agent serves the Indian market. The India Fit score (0-10) is calculated across five sub-dimensions: INR pricing availability (30%), Indic language support (25%), deployment options in India (25%), and DPDP Act compliance (20%). A high India Fit score indicates the agent is well-suited for Indian deployments."],
  ],
  "Technology": [
    ["Static Site Generation (SSG)", "A web development approach where pages are pre-rendered at build time rather than generated on-the-fly for each request. BestAIAgent.in uses Next.js static site generation to produce fast-loading, SEO-friendly pages. SSG eliminates the need for server-side processing, reduces hosting costs, and improves reliability."],
  ],
};

export default function GlossaryPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Glossary</div>
    <section className="detailHero">
      <p className="eyebrow">Glossary</p>
      <h1>AI &amp; ML glossary</h1>
      <p className="lead">Definitions for AI agent, MCP, DPDP compliance, and India AI terminology used across BestAIAgent.in.</p>
    </section>
    {Object.entries(glossary).map(([category, terms]) => (
      <section key={category} style={{ marginBottom: 28 }}>
        <h2>{category}</h2>
        <div className="prose">
          {terms.map(([term, definition]) => (
            <div key={term}><h3>{term}</h3><p>{definition}</p></div>
          ))}
        </div>
      </section>
    ))}
  </div>;
}
