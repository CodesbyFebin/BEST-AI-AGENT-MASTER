import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyFrameworkSources } from "@/lib/catalog";
export const metadata: Metadata = { title: "Agent Frameworks", description: "Evidence-backed AI agent frameworks and orchestration systems.", alternates: { canonical: "/frameworks" } };
export default function Page(){return <><EntityDirectory type="framework" title="Agent frameworks" description="Framework identities backed by primary source evidence, without synthetic rankings."/><div className="shell"><section className="prose"><h2>Imported catalog coverage</h2><p>These frameworks are listed for directory coverage while field-level evidence is verified.</p><ul>{legacyFrameworkSources.map((item)=><li key={item.slug}><Link href={`/frameworks/${item.slug}`}>{item.name}</Link></li>)}</ul></section></div></>}
