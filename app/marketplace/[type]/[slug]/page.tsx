import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApprovedSubmission, getApprovedSubmissions } from "@/lib/submissions";
type Props = { params: Promise<{ type: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return getApprovedSubmissions().map((s) => ({type: s.type, slug: s.slug}));
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
  const {type,slug}=await params;
  const s=getApprovedSubmission(type,slug);
  if(!s)return {title:"Not found",robots:{index:false,follow:true}};
  const url=`/marketplace/${type}/${slug}`;
  return {title:s.name,description:s.tagline,alternates:{canonical:url},robots:{index:false,follow:true},
    openGraph:{title:s.name,description:s.tagline,url,images:[{url:"/opengraph-image",width:1200,height:630,alt:"BestAIAgent.in"}]}};
}
export default async function Page({params}:Props) {
  const {type,slug}=await params;
  const s=getApprovedSubmission(type,slug);if(!s)notFound();
  return <article className="shell detail">
    <p className="eyebrow">Community-submitted · Editorially approved · Not independently verified</p>
    <h1>{s.name}</h1><p className="lead">{s.tagline}</p>
    <p>{s.description}</p>
    <section className="section"><h2>Publisher-declared information</h2>
      <p>Type: {s.type} · Deployment: {s.deployment} · Pricing model: {s.pricing.model}</p>
      <p>Capabilities listed by the submitter are not necessarily independently tested.</p>
      <ul>{s.capabilities.map(c=><li key={c}>{c}</li>)}</ul>
    </section>
    <section className="section"><h2>Source and review status</h2>
      <p><a href={s.repository} rel="noopener noreferrer">Upstream repository</a></p>
      <p>Source evidence: {s.evidence?.sourceUrl || "Not available"} · Editorial status: {s.status}</p>
      <p>A submitted SHA-256 field is only a claimed snapshot digest. It does not establish verification of all marketing statements.</p>
      <p><Link href="/submit">Submit a project</Link></p>
    </section>
  </article>;
}
