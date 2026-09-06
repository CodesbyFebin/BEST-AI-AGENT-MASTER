import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { authorityPages } from "@/lib/authority-pages";
import { getAuthorityEvidence, isAuthorityPageEvidenceReady, isMethodologyPageReady } from "@/lib/authority-evidence";
import { legacyPages } from "@/lib/legacy";
import { clusterPages } from "@/lib/clusters";
import { ContentBlocks } from "@/components/ContentBlocks";
import { entitiesByType } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type LegacyAuthorityPage = { title: string; description: string; body: string[]; index: boolean };
type P = { params: Promise<{ slug: string }> };

function getLegacyPage(slug: string): LegacyAuthorityPage | undefined {
  return legacyPages[slug];
}

// Extract FAQ question/answer pairs from a cluster's content blocks. The pairs
// already exist as editorial content (h3 question + p answer under the
// "Frequently asked questions" h2); this only re-serializes them for machines.
function extractClusterFaqs(blocks: { type: string; text?: string }[]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  let inFaqSection = false;
  let currentQuestion: string | null = null;
  for (const block of blocks) {
    if (block.type === "h2") {
      inFaqSection = /frequently asked questions/i.test(block.text ?? "");
      continue;
    }
    if (!inFaqSection) continue;
    if (block.type === "h3") {
      currentQuestion = block.text ?? null;
    } else if (block.type === "p" && currentQuestion) {
      faqs.push({ question: currentQuestion, answer: block.text ?? "" });
      currentQuestion = null;
    }
  }
  return faqs;
}

export function generateStaticParams() {
  return [...new Set([
    ...Object.keys(legacyPages).filter((slug) => !slug.includes("/")),
    ...Object.keys(authorityPages),
    ...Object.keys(clusterPages)
  ])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const authority = authorityPages[slug];
  const legacy = getLegacyPage(slug);
  const cluster = clusterPages[slug];
  const page = authority ?? legacy ?? cluster;
  if (!page) return { title: "Not found", robots: { index: false, follow: true } };

  const authorityIndexable = authority
    ? authority.index && (isAuthorityPageEvidenceReady(slug, authority.evidenceIds) || isMethodologyPageReady(authority))
    : false;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    robots: { index: authority ? authorityIndexable : cluster ? false : (page as { index?: boolean }).index !== false, follow: true },
    openGraph: { title: page.title, description: page.description, url: `/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const authority = authorityPages[slug];
  const legacy = getLegacyPage(slug);
  const cluster = clusterPages[slug];
  if (!authority && !legacy && !cluster) notFound();

  if (cluster) {
    const url = `${SITE.url}/${slug}`;
    const faqs = extractClusterFaqs(cluster.blocks);
    return <div className="shell detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / {cluster.title}</div>
      <JsonLd data={[
        {
          "@type": "WebPage",
          name: cluster.title,
          url,
          description: cluster.description,
          isPartOf: { "@type": "WebSite", name: "BestAIAgent.in", url: SITE.url }
        },
        ...(faqs.length > 0 ? [{
          "@type": "FAQPage",
          url,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer }
          }))
        }] : [])
      ]} />
      <p className="eyebrow">{cluster.pageType === "pillar" ? "Pillar guide" : "Guide"} · in review</p>
      <h1 style={{ fontSize: "48px" }}>{cluster.title}</h1>
      <p className="lead">{cluster.description}</p>
      <p className="warning">This guide is evidence-ready but has not yet cleared editorial publication review, so it stays noindex until that review completes.</p>
      <ContentBlocks blocks={cluster.blocks} />
    </div>;
  }

  const page = authority ?? legacy!;
  const models = entitiesByType("model");
  const url = `${SITE.url}/${slug}`;
  const evidence = authority ? getAuthorityEvidence(slug) : [];

  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / {page.title}</div>
    <JsonLd data={[
      {
        "@type": "WebPage",
        name: page.title,
        url,
        description: page.description,
        ...(authority ? { dateModified: authority.lastReviewed } : {}),
        isPartOf: { "@type": "WebSite", name: "BestAIAgent.in", url: SITE.url },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: page.title, item: url }
          ]
        }
      },
      ...(authority ? [{
        "@type": "FAQPage",
        mainEntity: [{
          "@type": "Question",
          name: page.title,
          acceptedAnswer: { "@type": "Answer", text: authority.directAnswer }
        }]
      }] : [])
    ]} />

    <p className="eyebrow">{authority ? "Evidence-first authority page" : "Authority page"}</p>
    <h1 style={{ fontSize: "48px" }}>{page.title}</h1>
    <p className="lead">{page.description}</p>

    {authority ? <>
      <section className="evidence" aria-labelledby="direct-answer-heading">
        <h2 id="direct-answer-heading">Direct answer</h2>
        <p>{authority.directAnswer}</p>
        <p className="muted">Last reviewed {authority.lastReviewed}</p>
      </section>

      {!isAuthorityPageEvidenceReady(slug, authority.evidenceIds) && !authority.methodologyReview &&
        <p className="warning">This page remains noindex while its page-level source receipts are completed and verified. It is available for review, not presented as publication-ready authority.</p>}

      {authority.methodologyReview && !isMethodologyPageReady(authority) &&
        <p className="warning">This page makes no externally-verifiable claim, so it publishes through the methodology-only review path rather than a source receipt — it remains noindex until that named editorial review is complete.</p>}

      {authority.methodologyReview && isMethodologyPageReady(authority) &&
        <p className="muted">Reviewed by {authority.methodologyReview.reviewedBy} on {authority.methodologyReview.reviewedAt} under the methodology-only publication path: this page makes no externally-verifiable factual or comparative claim, so it is reviewed for originality and disclosed limitations rather than sourced against a primary receipt.</p>}

      <div className="prose">
        {authority.sections.map((section) => <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>)}
      </div>

      {evidence.length > 0 && <section className="evidence" aria-labelledby="authority-evidence-heading">
        <h2 id="authority-evidence-heading">Primary-source evidence</h2>
        {evidence.map((record) => <div key={record.id} style={{ marginBottom: "20px" }}>
          <p><strong>{record.field}</strong> · {record.status}</p>
          <p className="muted">Publisher: {record.publisher} · Retrieved {record.retrievedAt}</p>
          <p><a href={record.sourceUrl}>Open first-party source ↗</a></p>
          <code>{record.contentHash}</code>
        </div>)}
        <p className="warning">Volatile facts such as pricing should be checked at the first-party source before purchase or deployment.</p>
      </section>}

      <section className="prose" aria-labelledby="continue-heading">
        <h2 id="continue-heading">Continue researching</h2>
        <ul>{authority.relatedLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
      </section>
    </> : <div className="prose">
      {legacy!.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {slug === "local-llm-benchmarks-india" && <><h2>Verified Indian model cards</h2><ul>{models.map((model) => <li key={model.id}><Link href={`/models/${model.slug}`}>{model.name}</Link> — {model.verification}</li>)}</ul></>}
    </div>}
  </div>;
}
