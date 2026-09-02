import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Events India — Conferences, Meetups & Workshops",
  description: "AI events, conferences, and meetups in India — AI agent developments, MCP workshops, and India AI ecosystem events.",
  alternates: { canonical: "/events" },
  robots: { index: false, follow: true }
};

export default function EventsPage() {
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Events</div>
    <section className="detailHero">
      <p className="eyebrow">Events</p>
      <h1>AI events in India</h1>
      <p className="lead">Conferences, meetups and workshops across India&apos;s AI agent community — MCP, sovereign AI, and Indic language models.</p>
    </section>

    <div className="prose">
      <p className="warning">No event currently has a verified first-party listing in the publication registry. This page remains noindex until an event name, organizer, venue, date, registration URL, and retrieval date are captured from the organizer&apos;s own page.</p>
      <h2>What an event listing must include</h2>
      <ul>
        <li>A first-party organizer or venue URL, not an unsourced calendar copy.</li>
        <li>The published date, timezone, location or online-attendance status.</li>
        <li>A retrieval date and a recheck before the event is surfaced publicly.</li>
        <li>No attendance estimate or superlative unless the organizer publishes it.</li>
      </ul>
      <h2>Submitting an event</h2>
      <p>Submit a proposed listing through the <a href="https://github.com/CodesbyFebin/BESTAIAGENT-MASTER/issues">project&apos;s GitHub issues</a> with the organizer&apos;s source URL and the fields above. Submission does not guarantee publication.</p>
    </div>
  </div>;
}
