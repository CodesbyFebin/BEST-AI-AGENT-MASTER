import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Agent Blog — Research, MCP & India AI | BestAIAgent.in",
  description: "Explore AI agent research drafts and technical explainers on MCP, cost, security, and India-focused deployments. Claim-level review status is clearly identified.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true }
};

const pathFor = (post: (typeof blogPosts)[number]) =>
  `/blog/${post.category}/${post.subcategory}/${post.slug}`;

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a,b)=> b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  const groups = [...new Set(sorted.map(post => post.category))];
  return <main className="shell detail" id="blog-content">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Blog</div>
    <JsonLd data={{
      "@type": "Blog",
      "@id": `${SITE.url}/blog#blog`,
      name: "BestAIAgent.in Blog",
      url: `${SITE.url}/blog`,
      description: "Editorial drafts and technical explainers about AI agent systems.",
      isPartOf: { "@id": `${SITE.url}/#website` }
    }}/>
    <section className="detailHero">
      <p className="eyebrow">Research · Engineering · India</p>
      <h1>The evidence-first AI blog</h1>
      <p className="lead">Explore research notes, explainers, and practical assessments of AI agents, MCP, model infrastructure, and India-specific adoption. Each draft identifies what still needs independent evidence review.</p>
      <div className="trustChips"><span>{sorted.length} editorial articles</span><span>Claim-level review pending</span><span>No invented rankings</span></div>
      <p><Link href="/methodology">Evidence methodology →</Link> · <Link href="/trust">Trust and corrections →</Link></p>
    </section>
    <section className="section" aria-labelledby="blog-topic-title">
      <h2 id="blog-topic-title">Explore topics</h2>
      <div className="tagRow">{groups.map((group) => {
        const first = sorted.find(post=>post.category===group);
        return first ? <a key={group} className="tag" href={`#blog-${group}`}>{first.categoryLabel} ({sorted.filter(p=>p.category===group).length})</a> : null;
      })}</div>
    </section>
    {groups.map(group=>{
      const posts=sorted.filter(p=>p.category===group);
      return <section className="section" key={group} id={`blog-${group}`}>
        <div className="sectionHead"><div><p className="eyebrow">Editorial collection · {posts.length} articles</p><h2>{posts[0].categoryLabel}</h2><p>Read the full article and inspect its editorial status before relying on product or performance claims.</p></div></div>
        <div className="grid authorityGrid">{posts.map(post=><article className="card" key={pathFor(post)}>
          <div className="cardTop"><span className="tag">{post.subcategoryLabel}</span><span className="muted">{post.date} · {post.readTime}</span></div>
          <h3><Link href={pathFor(post)}>{post.title}</Link></h3>
          <p>{post.description}</p>
          <p className="muted">Editorial draft · Source review pending</p>
          <p><Link href={pathFor(post)}>Read article →</Link></p>
        </article>)}</div>
      </section>;
    })}
    <section className="section sectionAlt">
      <h2>How we handle evidence</h2>
      <p>An article title, source link, or evidence marker does not establish that a benchmark was independently reproduced or a vendor claim verified. Articles remain outside search indexing until claim-level sources are reviewed and the publication gate approves them.</p>
      <p><Link href="/verify">Verify a claim →</Link> · <Link href="/trust">Read trust policies →</Link></p>
    </section>
  </main>;
}
