import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyModelSources } from "@/lib/catalog";

export const metadata: Metadata = { title: "AI Models Directory", description: "Evidence-backed AI model cards with India and local-model coverage.", alternates: { canonical: "/models" } };

export default function Page() {
  return <>
    <EntityDirectory type="model" title="AI Models Directory" description="Verified model identities and model-card facts, with unknown fields left unknown." />
    <div className="shell">
      <section className="prose">
        <h2>How model verification differs from agent verification</h2>
        <p>A model card&apos;s identity is verified against its official publisher page — usually a Hugging Face model card or the developer&apos;s own documentation. Benchmark numbers reported on that page are labeled as publisher-reported, not treated as independent rankings; this site does not re-run benchmarks or convert publisher claims into comparative scores without separate reproducible evidence.</p>
        <h2>Imported catalog coverage</h2>
        <p>These {legacyModelSources.length} models are listed for directory coverage while field-level evidence is verified. Their identity is not yet independently confirmed, so no capability or pricing claim is attached.</p>
        <ul>{legacyModelSources.map((item) => <li key={item.slug}><Link href={`/models/${item.slug}`}>{item.name}</Link></li>)}</ul>
      </section>
    </div>
  </>;
}
