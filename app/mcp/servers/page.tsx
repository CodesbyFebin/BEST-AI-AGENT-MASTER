import type { Metadata } from "next";
import Link from "next/link";
import { mcpServers, mcpClusters } from "@/lib/mcp";

export const metadata: Metadata = {
  title: "MCP Servers Directory",
  description: "Source-linked MCP server directory with explicit verification status.",
  alternates: { canonical: "/mcp/servers" }
};

export default function Page() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/mcp">MCP</Link> / Servers</div>
    <h1 style={{ fontSize: "48px" }}>MCP servers</h1>
    <p className="lead">Legacy routes are retained, while publication status follows canonical-source verification. Each entry below is labeled with its actual review state rather than assumed to be current.</p>

    <div className="prose">
      <h2>How to read the status labels</h2>
      <p><strong>source-linked</strong> means a first-party or canonical repository is identified, but the server&apos;s current capabilities have not been independently re-verified against that source. <strong>refreshing</strong> means the route is preserved for continuity while a canonical upstream is actively being re-confirmed — treat the linked source as a starting point, not a settled fact.</p>
    </div>

    <div className="grid">
      {mcpServers.map((server) => (
        <article className="card" key={server.slug}>
          <p className="eyebrow">{server.status}</p>
          <h2><Link href={`/mcp/servers/${server.slug}`}>{server.name}</Link></h2>
          <p>{server.note}</p>
          <a href={server.sourceUrl}>Source ↗</a>
        </article>
      ))}
    </div>

    <div className="prose">
      <h2>MCP topic clusters</h2>
      <p>The wider MCP hub is organized around five clusters. Each links back to source-linked entities rather than independent editorial claims about capability or performance.</p>
      <table className="facts">
        <tbody>
          {mcpClusters.map(([name, desc]) => (
            <tr key={name}><th>{name}</th><td>{desc}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>A wider MCP server registry</h2>
      <p>For discovery across a broader catalog of MCP servers beyond this evidence-graph context, see <a href="https://mcpserver.in" rel="noopener">MCPServer.in</a>, a companion directory dedicated specifically to MCP server listings.</p>

      <h2>Related pages</h2>
      <ul>
        <li><Link href="/mcp">MCP hub</Link></li>
        <li><Link href="/trust/evidence-methodology">Evidence methodology</Link></li>
        <li><Link href="/frameworks">Agent frameworks</Link></li>
      </ul>
    </div>
  </div>;
}
