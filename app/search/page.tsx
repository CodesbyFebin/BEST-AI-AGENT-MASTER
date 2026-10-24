import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "Search the AI Entity Graph",
  description: "Search verified AI agents, models, frameworks and providers.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" }
};

export default function Page() {
  return <div className="shell detail">
    <h1 style={{ fontSize: "48px" }}>Search</h1>
    <p className="lead">Search the approved public catalog locally. Only entities and reviewed authority content cleared by the publication gate appear in results.</p>
    <SearchBox />
    <section className="prose">
      <h2>Browse directly</h2>
      <ul>
        <li><Link href="/agents">AI agents</Link></li>
        <li><Link href="/models">Models</Link></li>
        <li><Link href="/frameworks">Frameworks</Link></li>
        <li><Link href="/providers">Providers</Link></li>
      </ul>
    </section>
  </div>;
}
