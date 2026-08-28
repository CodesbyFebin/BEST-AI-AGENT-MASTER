import type { Metadata } from "next";
import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "India & Indic AI",
  description: "Indian and Indic AI models, local inference and agent infrastructure with primary-source evidence.",
  alternates: { canonical: "/india" }
};

export default function Page(){
  const models=entitiesByType("model").filter((model)=>Boolean(model.indiaRelevance));
  const publishers=new Set(models.map((model)=>model.developer));
  return <div className="shell detail">
    <section className="indiaHero">
      <div>
        <div className="heroBadge">🇮🇳 Built in India evidence hub</div>
        <p className="eyebrow">Indian & Indic AI</p>
        <h1 style={{fontSize:"clamp(42px,6vw,66px)"}}>India-first discovery, <span className="gradient">without sovereignty theatre.</span></h1>
        <p className="lead">A source-first map of Indian and Indic model work. India relevance is recorded from primary publisher evidence; it is not automatically converted into a DPDP, residency, security or sovereignty claim.</p>
        <div className="directoryMeta"><span>{models.length} verified India-relevant model cards</span><span>{publishers.size} primary publishers represented</span><span>Publisher benchmarks stay publisher-reported</span></div>
        <div className="ctaRow"><Link className="button buttonPrimary" href="/models">Browse model cards</Link><Link className="button" href="/local-llm-benchmarks-india">Benchmark methodology</Link></div>
      </div>
      <div className="indiaMap" aria-hidden="true"><div className="indiaMapShape">🇮🇳</div></div>
    </section>

    <section className="section"><div className="sectionHead"><div><p className="eyebrow">Verified model identities</p><h2>Indian and Indic model cards</h2><p>These records pass the same primary-source identity gate as the rest of the public graph.</p></div></div><div className="grid">{models.map((model)=><EntityCard key={model.id} entity={model}/>)}</div></section>

    <section className="section sectionAlt" style={{marginInline:"calc(50% - 50vw)",paddingInline:"calc(50vw - 50%)"}}><div className="sectionHead"><div><p className="eyebrow">How to read this hub</p><h2>India relevance is a fact field, not a badge.</h2></div></div><div className="grid"><article className="card"><div className="categoryIcon">◎</div><h3>Publisher identity</h3><p>Developer and model identity must resolve to a primary model card, repository or official publisher page.</p></article><article className="card"><div className="categoryIcon">▥</div><h3>Benchmarks</h3><p>Publisher-reported benchmarks are labeled as such and are not converted into independent rankings.</p></article><article className="card"><div className="categoryIcon">◇</div><h3>Compliance</h3><p>No DPDP, data-residency or sovereignty status is inferred from a model being Indian, Indic or locally runnable.</p></article></div></section>

    <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Local inference</p><h2>Reproducible before impressive.</h2><p>The India local-LLM benchmark route documents methodology and evidence requirements rather than publishing unsupported hardware or performance numbers.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/local-llm-benchmarks-india">Read methodology</Link><Link className="button" href="/methodology">Evidence policy</Link></div></div></div></section>

    <section className="section">
      <div className="sectionHead"><div><p className="eyebrow">Policy &amp; governance</p><h2>Government initiatives and policy</h2><p>National missions, infrastructure investment, and the regulatory framework AI deployments in India operate under.</p></div></div>
      <details>
        <summary>IndiaAI Mission (₹10,000 crore)<svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></summary>
        <div className="prose" style={{ marginTop: 12 }}>
          <p>The IndiaAI Mission, announced in 2024, allocates ₹10,000 crore (~$1.25 billion) to accelerate domestic AI development.</p>
          <ul>
            <li>AIRAWAT — high-performance computing infrastructure for startups, researchers, and academia.</li>
            <li>IndiaAI datasets — curated, multilingual datasets for Indian languages.</li>
            <li>Safe AI — guidelines for responsible AI deployment under the DPDP Act.</li>
            <li>Application development grants for AI applications in healthcare, agriculture, and education.</li>
          </ul>
        </div>
      </details>
      <details>
        <summary>BHASHINI — India&apos;s language translation platform<svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></summary>
        <div className="prose" style={{ marginTop: 12 }}>
          <p>BHASHINI builds language translation capabilities across 22 Indian languages and 11 global languages, with open APIs for integrating multilingual capabilities into applications.</p>
          <ul>
            <li>22 Indian languages supported with voice and text translation.</li>
            <li>Open-source models and datasets available via the IndiaAI portal.</li>
            <li>API-first architecture.</li>
          </ul>
        </div>
      </details>
      <details>
        <summary>DPDP Act and AI deployment<svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></summary>
        <div className="prose" style={{ marginTop: 12 }}>
          <p>The Digital Personal Data Protection Act (DPDP Act), 2023 governs how personal data — including voice data, classified as biometric data — can be collected, processed, and stored by AI systems in India.</p>
          <ul>
            <li>Explicit informed consent required for voice/biometric data processing.</li>
            <li>Data fiduciary obligations for data security and breach notification.</li>
            <li>Preference for data localization; cross-border data transfers subject to approval.</li>
          </ul>
        </div>
      </details>
    </section>

    <section className="section sectionAlt" style={{marginInline:"calc(50% - 50vw)",paddingInline:"calc(50vw - 50%)"}}>
      <div className="sectionHead"><div><p className="eyebrow">Resources</p><h2>Developer resources for India</h2><p>Datasets, APIs, tutorials, and community resources for Indian AI developers.</p></div></div>
      <div className="grid">
        <article className="card"><h3>Datasets</h3><p>Indic language datasets, translated corpora, and region-specific data via the IndiaAI portal and Bhashini API.</p><a href="https://indiaai.gov.in">indiaai.gov.in ↗</a></article>
        <article className="card"><h3>APIs</h3><p>Bhashini translation API, and Sarvam and Krutrim models with INR pricing and Hindi documentation.</p><a href="https://bhashini.gov.in">bhashini.gov.in ↗</a></article>
        <article className="card"><h3>Communities</h3><p>Indian AI communities: Hugging Face India, Indic NLP research groups, and local MCP developer forums.</p><Link href="/agents">Explore agents ↗</Link></article>
      </div>
    </section>
  </div>;
}
