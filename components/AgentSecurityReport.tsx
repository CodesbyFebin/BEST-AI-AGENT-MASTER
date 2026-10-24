import scanData from "@/data/agent-security-scans.json";

type Finding = {
  id: string;
  domain: string;
  severity: string;
  file: string;
  line: number;
  description: string;
  astRef: string;
  astTitle: string;
};

type Report = {
  entitySlug: string;
  repository: string;
  repositoryCommit: string;
  scannedAt: string;
  heuristicRiskScore: number;
  heuristicRiskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  publicationStatus: "unreviewed" | "approved";
  findings: Finding[];
  filesScanned: number;
  filesSkipped: number;
  scopeNote: string;
};

const reports = (scanData.reports ?? []) as Report[];

export function AgentSecurityReport({ entitySlug, sourceUrl, compact = false }: {
  entitySlug: string;
  sourceUrl: string;
  compact?: boolean;
}) {
  const report = reports.find((item) => item.publicationStatus === "approved" && item.entitySlug === entitySlug && item.repository === sourceUrl);
  if (!report) return null;

  const commitUrl = `${report.repository}/commit/${report.repositoryCommit}`;
  return <section className={`agentSecurityReport${compact ? " agentSecurityReportCompact" : ""}`} aria-label="Heuristic repository scan">
    <div className="agentSecurityReportTop">
      <strong>Static pattern scan</strong>
      <span className={`agentRisk agentRisk-${report.heuristicRiskLevel.toLowerCase()}`}>Heuristic risk {report.heuristicRiskScore}/100</span>
    </div>
    <p className="muted">Scanned {new Date(report.scannedAt).toLocaleDateString("en-IN")} · <a href={commitUrl} rel="noopener noreferrer">commit {report.repositoryCommit.slice(0, 8)}</a> · {report.filesScanned} text files checked</p>
    {!compact && <>
      <p className="agentSecurityCaveat">This is a limited pattern scan with OWASP AST10 risk references. It is not a security audit, and a low score does not establish that the repository is safe.</p>
      {report.findings.length > 0 ? <details>
        <summary>{report.findings.length} pattern finding{report.findings.length === 1 ? "" : "s"}</summary>
        <ul>{report.findings.map((finding, index) => <li key={`${finding.id}-${finding.file}-${finding.line}-${index}`}>
          <strong>[{finding.severity}] {finding.description}</strong>
          <span>{finding.file}:{finding.line} · {finding.astRef} {finding.astTitle}</span>
        </li>)}</ul>
      </details> : <p className="muted">No patterns from this limited rule set were flagged.</p>}
      {report.filesSkipped > 0 && <p className="muted">{report.filesSkipped} files were skipped by size, type, or repository limits.</p>}
    </>}
  </section>;
}
