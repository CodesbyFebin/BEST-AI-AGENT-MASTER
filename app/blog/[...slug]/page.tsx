import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, findBlogPost } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: [p.category, p.subcategory, p.slug] }));
}

function resolve(slugParts: string[]) {
  if (slugParts.length !== 3) return null;
  const [category, subcategory, slug] = slugParts;
  return findBlogPost(category, subcategory, slug);
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const post = resolve(slug);
  if (!post) return { title: "Not found", robots: { index: false, follow: true } };
  const url = `/blog/${post.category}/${post.subcategory}/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { title: post.title, description: post.description, url, type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description: post.description }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const post = resolve(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.category}/${post.subcategory}/${post.slug}`;
  return (
    <div className="shell detail">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {post.categoryLabel} / {post.subcategoryLabel}
      </div>
      <JsonLd data={[
        {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url,
          isPartOf: { "@type": "Blog", name: "BestAIAgent.in Blog", url: `${SITE.url}/blog` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url }
            ]
          }
        },
        {
          "@type": "FAQPage",
          mainEntity: [{
            "@type": "Question",
            name: post.title,
            acceptedAnswer: { "@type": "Answer", text: post.directAnswer }
          }]
        }
      ]} />
      <p className="eyebrow">{post.categoryLabel} · {post.subcategoryLabel}</p>
      <h1 style={{ fontSize: "44px" }}>{post.title}</h1>
      <p className="lead">{post.description}</p>
      <p className="muted">Published {post.date} · {post.readTime} read</p>
      <p className="warning">Editorial draft: this article remains noindex until its material claims are mapped to page-level source receipts and reviewed.</p>

      <section className="evidence" aria-labelledby="direct-answer-heading">
        <h2 id="direct-answer-heading">Direct answer</h2>
        <p>{post.directAnswer}</p>
      </section>

      <div className="prose">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>
        ))}
      </div>
    </div>
  );
}
