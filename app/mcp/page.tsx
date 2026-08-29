import type { Metadata } from "next";
import Link from "next/link";
import { mcpClusters, mcpServers } from "@/lib/mcp";

export const metadata: Metadata = {
  title: "Model Context Protocol (MCP) — Verified Server Directory & Architecture Guide",
  description: "MCP servers, agent frameworks and local-LLM integration organized by source provenance, with transport, security and architecture reference.",
  alternates: { canonical: "/mcp" }
};

export default function Page() {
  return <div className="shell detail">
    <p className="eyebrow">MCP authority hub</p>
    <h1 style={{ fontSize: "48px" }}>Model Context Protocol (MCP)</h1>
    <p className="lead">Source-linked MCP infrastructure without invented compliance, adoption or performance claims.</p>

    <section className="prose">
      <h2>What MCP is</h2>
      <p>Model Context Protocol is an open protocol for connecting AI applications to external context and tools through a standardized client-server interface. Instead of every application implementing custom, one-off integrations with every data source and tool, an MCP server exposes a consistent set of capabilities — resources, tools, and prompts — that any MCP-compatible client can consume. The protocol specifies the transport (stdio for local processes, Streamable HTTP for remote services) and the message format, not the specific tools a given server provides.</p>

      <h2>Why it matters for agent builders</h2>
      <p>Before MCP, connecting an agent to a database, a file system, or a SaaS API meant writing and maintaining a custom integration for each combination of framework and tool. MCP decouples the two: a tool author builds one server, and it works with any client that speaks the protocol — Claude Desktop, an IDE extension, or a custom agent runtime. This is a genuine reduction in integration surface area, but it does not by itself guarantee a given server is secure, actively maintained, or feature-complete; those remain separately verifiable facts about each specific server.</p>

      <h2>The three primitives</h2>
      <p>MCP defines three things a server can expose to a client, and the distinction matters for evaluating what a given server actually does:</p>
      <table className="facts">
        <tbody>
          <tr><th>Resources</th><td>Read-only or subscribable data a client can fetch — a file, a database row, a log stream. Resources are addressed by URI and don&apos;t take arguments the way a function call does.</td></tr>
          <tr><th>Tools</th><td>Callable functions with a defined input schema that the model can invoke to take an action or fetch computed data — run a query, create a ticket, execute a shell command. This is the primitive most agent frameworks lean on.</td></tr>
          <tr><th>Prompts</th><td>Reusable, parameterized prompt templates a server can expose so a client doesn&apos;t need to hardcode task-specific instructions for that server&apos;s domain.</td></tr>
        </tbody>
      </table>
      <p>A server that only exposes tools and a server that exposes resources, tools, and prompts are both valid MCP servers — the primitive count isn&apos;t itself a quality signal, but it does tell you what interaction patterns the server actually supports before you integrate it.</p>

      <h2>Transports: stdio vs. Streamable HTTP</h2>
      <p><strong>stdio</strong> runs the MCP server as a local subprocess and communicates over standard input/output. It has no network exposure by default — the server only runs when the client starts it, and only the client that spawned it can talk to it. This is the default choice for local development and for tools that need filesystem or local-process access.</p>
      <p><strong>Streamable HTTP</strong> exposes the server over a network endpoint, which is what remote and multi-client deployments need — a team sharing one server instance, or a server that needs to run independently of any single client&apos;s lifecycle. It brings the usual web-service concerns with it: authentication, TLS, and rate limiting are the operator&apos;s responsibility, not something the protocol enforces for you.</p>

      <h2>What MCP does not guarantee</h2>
      <p>The protocol standardizes the interface, not the implementation. Adopting MCP tells you nothing on its own about whether a specific server validates its inputs, sandboxes command execution, rate-limits requests, or handles authentication correctly — those are properties of each individual server&apos;s code, and need to be checked per server rather than assumed from protocol compliance. A tool-calling interface that lets a model execute arbitrary shell commands is exactly as dangerous over MCP as it would be over any other transport if the server doesn&apos;t constrain what commands are allowed.</p>

      <h2>Knowledge clusters</h2>
      {mcpClusters.map(([name, description]) => (
        <div key={name}><h3>{name}</h3><p>{description}</p></div>
      ))}
    </section>

    <section>
      <h2>MCP server routes</h2>
      <div className="grid">
        {mcpServers.map((server) => (
          <article className="card" key={server.slug}>
            <p className="eyebrow">{server.status}</p>
            <h3><Link href={`/mcp/servers/${server.slug}`}>{server.name}</Link></h3>
            <p>{server.note}</p>
          </article>
        ))}
      </div>
      <p><Link href="/mcp/servers">View the full MCP server directory →</Link></p>
    </section>

    <section className="prose">
      <h2>A dedicated MCP server registry</h2>
      <p>This hub covers MCP in the context of the broader agent evidence graph — how it relates to frameworks, agents, and the entities that implement it. For a registry focused specifically on discovering and comparing MCP servers across a wider catalog, see <a href="https://mcpserver.in" rel="noopener">MCPServer.in</a>, a companion directory dedicated to MCP server listings.</p>

      <h2>Related pages</h2>
      <ul>
        <li><Link href="/silos/builders">Builder silo (frameworks, MCP, agents)</Link></li>
        <li><Link href="/trust/evidence-methodology">Evidence methodology</Link></li>
        <li><Link href="/frameworks">Agent frameworks directory</Link></li>
      </ul>
    </section>
  </div>;
}
