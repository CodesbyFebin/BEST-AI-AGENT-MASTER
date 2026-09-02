import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Events India — Conferences, Meetups & Workshops",
  description: "AI events, conferences, and meetups in India — AI agent developments, MCP workshops, and India AI ecosystem events.",
  alternates: { canonical: "/events" }
};

const events = [
  { type: "Conference", date: "September 15-17, 2026", location: "Bengaluru, Karnataka", title: "India AI Summit 2026", desc: "India's largest AI conference bringing together researchers, developers, and enterprises. Features tracks on AI agents, MCP infrastructure, and sovereign AI deployment. Over 2000 attendees expected.", tags: ["AI Agents", "MCP", "Sovereign AI", "Indic Models"] },
  { type: "Workshop", date: "October 5, 2026", location: "Hyderabad, Telangana", title: "MCP Developer Workshop", desc: "Hands-on workshop for building and deploying MCP servers. Learn transport configuration, security best practices, and enterprise integration patterns.", tags: ["MCP Servers", "Security", "Enterprise Integration"] },
  { type: "Seminar", date: "October 20, 2026", location: "Mumbai, Maharashtra", title: "DPDP Compliance for AI", desc: "Expert seminar on implementing DPDP Act compliance for AI systems. Covers data residency, consent management, and audit requirements.", tags: ["DPDP Act", "Data Residency", "Consent Management"] }
];

export default function EventsPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Events</div>
    <section className="detailHero">
      <p className="eyebrow">Events</p>
      <h1>AI events in India</h1>
      <p className="lead">Conferences, meetups and workshops across India&apos;s AI agent community — MCP, sovereign AI, and Indic language models.</p>
    </section>

    <div className="prose">
      <h2>Upcoming events</h2>
    </div>
    <div className="grid" style={{ gridTemplateColumns: "1fr", marginBottom: 24 }}>
      {events.map((e) => (
        <article className="card" key={e.title}>
          <div className="cardTop">
            <span className="tag">{e.type}</span>
            <span className="muted">{e.date} · {e.location}</span>
          </div>
          <h3>{e.title}</h3>
          <p>{e.desc}</p>
          <div className="tagRow">{e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        </article>
      ))}
    </div>

    <div className="prose">
      <h2>Online events</h2>
      <p>Many AI events offer online or hybrid attendance options. We indicate which listed events offer online attendance where that information is available.</p>
      <h2>Submitting an event</h2>
      <p>If you are organizing an AI event in India relevant to this community, submit it through our <a href="https://github.com/CodesbyFebin/bestaiagent.in">GitHub repository</a> — include the event name, date, location, description and topics covered. Please submit at least two weeks in advance.</p>
    </div>
  </div>;
}
