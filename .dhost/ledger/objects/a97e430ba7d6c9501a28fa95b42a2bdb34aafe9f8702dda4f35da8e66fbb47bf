import Link from "next/link";

const links = [
  ["/agents", "AI Agents"],
  ["/categories", "Categories"],
  ["/compare", "Compare"],
  ["/india", "Built in India"],
  ["/mcp", "MCP"],
  ["/research", "Resources"],
  ["/pricing", "Pricing"]
] as const;

export function Header() {
  return (
    <header className="siteHeader">
      <div className="shell navBar">
        <Link href="/" className="brand" aria-label="best ai agent.in home">
          <span className="brandMark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="20" height="20"><defs><linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#536dff"/><stop offset=".55" stopColor="#7c5cff"/><stop offset="1" stopColor="#9b6cff"/></linearGradient></defs><path d="M30 8l5 17 17 5-17 5-5 17-5-17-17-5 17-5z" fill="url(#brandGrad)"/><path d="M47 6l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z" fill="#fff"/></svg>
          </span>
          <span className="brandWords">best <span>ai</span> agent<small className="brandTld">.in</small></span>
          <small>Evidence directory</small>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/search" className="navSearch" aria-label="Search BestAIAgent.in">⌕ <span>Search</span></Link>
        <Link href="/agents" className="navCta">Explore</Link>
      </div>
    </header>
  );
}
