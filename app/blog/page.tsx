import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — AI Agent Insights, Analysis & Updates",
  description: "Insights, analysis, and updates on AI agents, MCP infrastructure, and India-first compliance.",
  alternates: { canonical: "/blog" }
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Blog</div>
    <JsonLd data={{
      "@type": "Blog", name: "BestAIAgent.in Blog", url: `${SITE.url}/blog`,
      blogPost: blogPosts.map((p) => ({ "@type": "BlogPosting", headline: p.title, datePublished: p.date, url: `${SITE.url}/blog/${p.category}/${p.subcategory}/${p.slug}` }))
    }} />
    <section className="detailHero">
      <p className="eyebrow">Editorial</p>
      <h1>Blog</h1>
      <p className="lead">Evidence-led insights, analysis, and updates on AI agents, MCP infrastructure, and India-first compliance.</p>
    </section>

    <h2>Guides</h2>
    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
      {sortedPosts.map((post) => (
        <Link href={`/blog/${post.category}/${post.subcategory}/${post.slug}`} key={post.slug} style={{ textDecoration: "none", color: "inherit" }}>
          <article className="card">
            <div className="cardTop">
              <span className="tag">{post.subcategoryLabel}</span>
              <span className="muted">{post.date} · {post.readTime}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </article>
        </Link>
      ))}
    </div>
  </div>;
}
