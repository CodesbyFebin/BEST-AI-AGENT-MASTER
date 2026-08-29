import type { Metadata } from "next";
import Link from "next/link";
import { publicEntities } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search the AI Entity Graph",
  description: "Search verified AI agents, models, frameworks and providers.",
  robots: { index: false, follow: true }
};

type P = { searchParams: Promise<{ q?: string }> };

const routeForType: Record<string, string> = {
  agent: "agents",
  model: "models",
  framework: "frameworks",
  provider: "providers",
};

export default async function Page({ searchParams }: P) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const results = term
    ? publicEntities.filter((e) => `${e.name} ${e.developer} ${e.summary} ${e.categories.join(" ")}`.toLowerCase().includes(term))
    : [];

  return <div className="shell detail">
    <h1 style={{ fontSize: "48px" }}>Search</h1>
    <p className="lead">Search only returns entities that have already cleared the public verification gate — searching does not surface unverified or quarantined candidates.</p>
    <form action="/search">
      <input name="q" defaultValue={q} placeholder="Search agents, models, frameworks…" />
      <button className="button" type="submit">Search</button>
    </form>

    {term && (
      results.length > 0 ? (
        <>
          <p className="muted">{results.length} verified result(s) for &quot;{q}&quot;</p>
          <ul>{results.map((e) => <li key={e.id}><Link href={`/${routeForType[e.type] ?? e.type}/${e.slug}`}>{e.name}</Link> — {e.type}</li>)}</ul>
        </>
      ) : (
        <p className="warning">No verified entities match &quot;{q}&quot;. This can mean the term doesn&apos;t match anything, or that a matching entity exists but hasn&apos;t cleared the evidence gate yet — check the <Link href="/agents">agents</Link>, <Link href="/models">models</Link>, or <Link href="/frameworks">frameworks</Link> directories directly.</p>
      )
    )}

    {!term && (
      <div className="prose">
        <h2>Try a search, or browse directly</h2>
        <ul>
          <li><Link href="/agents">All AI agents</Link></li>
          <li><Link href="/models">All AI models</Link></li>
          <li><Link href="/frameworks">All agent frameworks</Link></li>
          <li><Link href="/providers">All providers</Link></li>
        </ul>
      </div>
    )}
  </div>;
}
