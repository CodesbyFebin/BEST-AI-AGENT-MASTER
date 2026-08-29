import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Integration Guides — MCP, Databases, APIs & Enterprise Tools",
  description: "Step-by-step integration guides for connecting AI agents to databases, APIs, and enterprise tools via MCP.",
  alternates: { canonical: "/integrations" }
};

const guides = [
  { title: "Setting Up MCP with Cline", difficulty: "Beginner", description: "Step-by-step guide to configuring Model Context Protocol with Cline, the open-source VS Code agent.", steps: ["Install Cline from the VS Code marketplace", "Create or update your MCP configuration file (~/.cline_mcp_settings.json)", "Add your MCP server configuration with the appropriate transport (stdio or HTTP)", "Restart Cline and verify the connection in the MCP explorer panel", "Test tool calls to ensure the integration is working correctly"] },
  { title: "Configuring Cursor with Streamable HTTP", difficulty: "Intermediate", description: "Guide to connecting Cursor AI IDE to remote MCP servers using Streamable HTTP transport.", steps: ["Ensure you have a Cursor version with MCP support", "Open Cursor Settings and navigate to the MCP section", "Add a new MCP server with Streamable HTTP transport", "Configure the server URL and authentication (API key or OAuth)", "Enable the server and verify tool availability in Cursor chat"] },
  { title: "Database Integration with PostgreSQL", difficulty: "Intermediate", description: "Connecting AI agents to PostgreSQL databases using MCP for secure, read-only database access.", steps: ["Install the PostgreSQL MCP server (e.g. modelcontextprotocol/server-postgres)", "Configure the connection string with appropriate credentials", "Set up read-only access for security", "Test the connection with a simple query", "Configure query limits and timeout settings for production use"] },
  { title: "GitHub Integration for Code Repositories", difficulty: "Beginner", description: "Integrating AI agents with GitHub for repository management, pull requests, and issue tracking.", steps: ["Install the GitHub MCP server from the official registry", "Generate a GitHub personal access token with appropriate scopes", "Configure the MCP server with your token and repository access", "Test repository operations (list issues, create PRs, review code)", "Set up branch protection and access controls for production use"] },
  { title: "Slack Bot Integration", difficulty: "Advanced", description: "Building AI-powered Slack bots using MCP for message handling and workflow automation.", steps: ["Create a Slack app and configure bot token scopes", "Install the Slack MCP server and configure authentication", "Set up event subscriptions for message handling", "Implement workflow automation using MCP tools", "Deploy the bot to your Slack workspace and monitor usage"] },
  { title: "Indian Payment Integration (UPI)", difficulty: "Advanced", description: "Integrating AI agents with Indian payment systems including UPI, payment gateways, and GST invoicing.", steps: ["Choose a payment gateway that supports UPI (Razorpay, Cashfree, or PayU)", "Configure the payment gateway MCP server with API keys", "Set up webhook endpoints for payment status updates", "Implement GST-compliant invoicing using the GST API", "Test the integration in sandbox mode before production deployment"] },
];

const difficultyColor: Record<string, string> = { Beginner: "var(--green)", Intermediate: "var(--blue)", Advanced: "var(--amber)" };

export default function IntegrationsPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Integrations</div>
    <section className="detailHero">
      <p className="eyebrow">Integration guides</p>
      <h1>AI integration guides</h1>
      <p className="lead">Step-by-step guides for connecting AI agents to databases, APIs, and enterprise tools via MCP.</p>
    </section>

    <div className="prose">
      <h2>Why integration matters</h2>
      <p>Model Context Protocol (MCP) provides a standardized way to connect agents to external systems — databases, APIs, file services, and enterprise tools — enabling workflows that combine AI reasoning with real-world data and actions.</p>
      <p>For Indian deployments, integration must also address data residency requirements under the DPDP Act. When integrating with services that process personal data of Indian residents, ensure data does not leave Indian jurisdictions without explicit consent.</p>
      <h2>Before you start any of these guides</h2>
      <p>Every guide below assumes an MCP-compatible client is already installed and running — the steps cover connecting that client to a specific server, not installing the client itself. If a step references a config file path (like <code>~/.cline_mcp_settings.json</code>), confirm the current path against that client&apos;s own documentation first: client config locations change across versions more often than the underlying MCP connection steps do.</p>
      <h2>Read-only first, write access second</h2>
      <p>Where a guide below touches a database, a payment system, or a code repository, start with the most restrictive access mode available — read-only database credentials, a scoped-down GitHub token, sandbox-mode payment keys — before granting write access. An agent that can only read cannot accidentally execute a destructive query, merge an unreviewed pull request, or trigger a real payment; expand scope only after you have watched the agent operate correctly under the restrictive mode.</p>
      <h2>Common failure points</h2>
      <p>Most first-time MCP integration failures fall into a small number of categories: a transport mismatch (client configured for stdio while the server expects Streamable HTTP, or vice versa), a credential with the wrong scope (a GitHub token missing the <code>repo</code> scope, a database user without <code>SELECT</code> on the target schema), or a firewall/network boundary blocking a remote server the client expects to reach directly. When a connection fails, check these three before assuming the server itself is broken — most MCP servers log a clear error for exactly this class of misconfiguration.</p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {guides.map((g) => (
        <section className="card" key={g.title}>
          <div className="cardTop">
            <h3>{g.title}</h3>
            <span className="tag" style={{ color: difficultyColor[g.difficulty] }}>{g.difficulty}</span>
          </div>
          <p>{g.description}</p>
          <ol style={{ paddingLeft: 18 }}>
            {g.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>
      ))}
    </div>
  </div>;
}
