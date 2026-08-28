import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyModelSources } from "@/lib/catalog";
export const metadata: Metadata = { title: "AI Models Directory", description: "Evidence-backed AI model cards with India and local-model coverage.", alternates: { canonical: "/models" } };
export default function Page(){return <><EntityDirectory type="model" title="AI models" description="Verified model identities and model-card facts, with unknown fields left unknown."/><div className="shell"><section className="prose"><h2>Imported catalog coverage</h2><p>These models are listed for directory coverage while field-level evidence is verified.</p><ul>{legacyModelSources.map((item)=><li key={item.slug}><Link href={`/models/${item.slug}`}>{item.name}</Link></li>)}</ul></section></div></>}
