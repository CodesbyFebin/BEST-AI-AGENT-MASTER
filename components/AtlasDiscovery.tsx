"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type AtlasRecord = {
  id: string;
  name: string;
  type: string;
  summary: string;
  categories: string[];
  path: string;
};

type Mission = "coding" | "voice" | "research" | "automation" | "all";

const missions: { value: Mission; label: string; terms: string[] }[] = [
  { value: "all", label: "All verified records", terms: [] },
  { value: "coding", label: "Coding and engineering", terms: ["coding", "developer", "software", "cli", "ide"] },
  { value: "voice", label: "Voice and languages", terms: ["voice", "speech", "language", "translation", "indic"] },
  { value: "research", label: "Research and retrieval", terms: ["research", "search", "rag", "retrieval"] },
  { value: "automation", label: "Workflow automation", terms: ["automation", "workflow", "orchestration", "business"] }
];

const types = [
  { value: "all", label: "All types" },
  { value: "agent", label: "AI agents" },
  { value: "model", label: "Models" },
  { value: "framework", label: "Frameworks" },
  { value: "provider", label: "Providers" },
  { value: "mcp-server", label: "MCP servers" }
];

export function AtlasDiscovery({ records }: { records: AtlasRecord[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [mission, setMission] = useState<Mission>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const terms = missions.find((item) => item.value === mission)?.terms ?? [];
    return records.filter((record) => {
      if (type !== "all" && record.type !== type) return false;
      const haystack = [record.name, record.summary, ...record.categories].join(" ").toLowerCase();
      return (!q || haystack.includes(q)) && (!terms.length || terms.some((term) => haystack.includes(term)));
    });
  }, [records, query, type, mission]);
  const chosen = matches.find((item) => item.id === selected) ?? matches[0];

  return (
    <div className="atlasExplorer">
      <div className="atlasControls">
        <label>
          Search the evidence graph
          <input value={query} maxLength={120} onChange={(event) => setQuery(event.target.value)} placeholder="Search agents, models, MCP..." />
        </label>
        <label>
          Entity type
          <select value={type} onChange={(event) => setType(event.target.value)}>
            {types.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label>
          Mission focus
          <select value={mission} onChange={(event) => setMission(event.target.value as Mission)}>
            {missions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
      </div>
      <div className="atlasDiscoveryLayout">
        <div className="atlasResults" aria-live="polite">
          <div className="atlasResultsCaption">{matches.length} verified {matches.length === 1 ? "record" : "records"} match your filters. No rankings or hidden scores.</div>
          {matches.length ? matches.slice(0, 12).map((record) => (
            <button type="button" key={record.id} className={`atlasResult ${chosen?.id === record.id ? "atlasResultActive" : ""}`} onClick={() => setSelected(record.id)}>
              <span><strong>{record.name}</strong><small>{record.type.replace("-", " ")}</small></span>
              <span aria-hidden="true">↗</span>
            </button>
          )) : <p className="muted">No verified records match. Try another category or search term.</p>}
          {matches.length > 12 && <p className="muted">Showing the first 12 matches. Refine the filters to narrow your selection.</p>}
        </div>
        <div className="atlasDetail">
          <p className="eyebrow">Evidence-first advisor · transparent matching</p>
          {chosen ? <>
            <h3>{chosen.name}</h3>
            <p>{chosen.summary}</p>
            <div className="tagRow">{chosen.categories.slice(0, 5).map((cat) => <span className="tag" key={cat}>{cat}</span>)}</div>
            <p className="atlasExplain">Displayed because this record passes the master publication gate and matches your selected filters. This is a directory match, not a measured performance recommendation.</p>
            <Link className="button buttonPrimary" href={chosen.path}>Inspect verified identity →</Link>
          </> : <p className="muted">Choose different filters to inspect an eligible record.</p>}
          <Link className="atlasMore" href="/methodology">How evidence and publication gates work →</Link>
        </div>
      </div>
    </div>
  );
}

export function AtlasCostScenario() {
  const [seats, setSeats] = useState(5);
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(1200);
  const [monthlyCost, setMonthlyCost] = useState(12000);
  const gross = seats * hours * rate;
  const net = gross - monthlyCost;
  const format = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  return (
    <div className="atlasCostGrid">
      <div className="atlasCostInputs">
        <p className="eyebrow">Your assumptions · not a benchmark</p>
        <label>Team size <strong>{seats}</strong><input type="range" min="1" max="50" value={seats} onChange={(e) => setSeats(Number(e.target.value))} /></label>
        <label>Hours saved per person per month <strong>{hours}</strong><input type="range" min="0" max="40" value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
        <label>Hourly labor cost (₹) <input type="number" min="0" max="1000000" value={rate} onChange={(e) => setRate(Math.max(0, Math.min(1000000, Number(e.target.value) || 0)))} /></label>
        <label>Monthly AI/tool cost (₹) <input type="number" min="0" max="100000000" value={monthlyCost} onChange={(e) => setMonthlyCost(Math.max(0, Math.min(100000000, Number(e.target.value) || 0)))} /></label>
      </div>
      <div className="atlasCostOutput" aria-live="polite">
        <span>Illustrative monthly labor value</span><strong>{format(gross)}</strong>
        <span>Your entered monthly tool cost</span><strong>{format(monthlyCost)}</strong>
        <span>Illustrative net difference</span><strong className={net >= 0 ? "atlasPositive" : "atlasNegative"}>{format(net)}</strong>
        <p>Formula: seats × assumed hours saved × hourly cost − entered tool cost. No hours saved, cost savings, productivity gain, or ROI is independently verified by this calculator. It excludes implementation time, taxes and other operating costs.</p>
      </div>
    </div>
  );
}
