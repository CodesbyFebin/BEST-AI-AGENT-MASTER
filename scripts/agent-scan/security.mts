export type SecurityDomain = "NET" | "FILE" | "CMD" | "INJ" | "DEP";
export type FindingSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface SecurityFinding {
  id: string;
  domain: SecurityDomain;
  severity: FindingSeverity;
  file: string;
  line: number;
  pattern: string;
  description: string;
  astRef: string;
  astTitle: string;
}

export interface SecurityScanResult {
  scannedAt: string;
  standard: string;
  scannerVersion: string;
  scoreMethod: string;
  riskScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  findings: SecurityFinding[];
  badges: string[];
  filesScanned: number;
  filesSkipped: number;
}

type Rule = {
  id: string;
  domain: SecurityDomain;
  pattern: RegExp;
  severity: FindingSeverity;
  astRef: string;
  astTitle: string;
  description: string;
};

// These patterns are lightweight review signals. AST10 references identify
// related risk themes; this is not a complete OWASP assessment or certification.
const RULES: Rule[] = [
  { id: "NET-001", domain: "NET", pattern: /https?:\/\/[a-z0-9.-]+\.(?:ru|cn|ir|kp|xyz|top)\//i, severity: "WARNING", astRef: "AST01", astTitle: "Malicious Skills", description: "Reference to a watched high-risk top-level domain; verify the destination and context." },
  { id: "NET-002", domain: "NET", pattern: /socket\.(?:connect|createConnection)\s*\(/i, severity: "WARNING", astRef: "AST01", astTitle: "Malicious Skills", description: "Raw socket operation; inspect the destination and data flow." },
  { id: "NET-003", domain: "NET", pattern: /requests\.(?:get|post|put|delete)\s*\(\s*["']http:\/\//i, severity: "INFO", astRef: "AST05", astTitle: "Untrusted External Instructions", description: "Plain HTTP request literal; confirm whether transport security is required." },
  { id: "FILE-001", domain: "FILE", pattern: /(?:~\/\.ssh|\.ssh\/|id_rsa|\/etc\/(?:passwd|shadow))/i, severity: "WARNING", astRef: "AST03", astTitle: "Over-Privileged Skills", description: "Reference to a sensitive system or credential path; verify that access is necessary and scoped." },
  { id: "FILE-002", domain: "FILE", pattern: /process\.env\.(?:OPENAI|ANTHROPIC|STRIPE|AWS|GOOGLE)_/i, severity: "INFO", astRef: "AST03", astTitle: "Over-Privileged Skills", description: "Code references a provider credential environment variable; confirm least-privilege handling." },
  { id: "FILE-003", domain: "FILE", pattern: /readFileSync\s*\([^\n)]*\.env/i, severity: "WARNING", astRef: "AST03", astTitle: "Over-Privileged Skills", description: "Synchronous read appears to target an environment file." },
  { id: "CMD-001", domain: "CMD", pattern: /os\.system\s*\(|subprocess\.(?:call|run|Popen)\s*\([^\n)]*shell\s*=\s*True/i, severity: "WARNING", astRef: "AST01", astTitle: "Malicious Skills", description: "Shell execution pattern; inspect input handling and command boundaries." },
  { id: "CMD-002", domain: "CMD", pattern: /\b(?:eval|exec)\s*\(/i, severity: "WARNING", astRef: "AST01", astTitle: "Malicious Skills", description: "Dynamic code execution pattern; verify whether untrusted input can reach it." },
  { id: "CMD-003", domain: "CMD", pattern: /child_process\.(?:exec|spawnSync?)\s*\(/i, severity: "INFO", astRef: "AST01", astTitle: "Malicious Skills", description: "Child process execution pattern; review allowed commands and arguments." },
  { id: "INJ-001", domain: "INJ", pattern: /pickle\.loads?\s*\(|yaml\.load\s*\([^\n)]*(?!SafeLoader)/i, severity: "WARNING", astRef: "AST04", astTitle: "Insecure Metadata", description: "Potentially unsafe deserialization call; verify parser mode and input trust." },
  { id: "INJ-002", domain: "INJ", pattern: /innerHTML\s*=|dangerouslySetInnerHTML/i, severity: "INFO", astRef: "AST04", astTitle: "Insecure Metadata", description: "HTML injection sink pattern; verify escaping and sanitization." },
  { id: "DEP-001", domain: "DEP", pattern: /(?:pip\s+install[^\n]*--user|npm\s+install\s+-g)/i, severity: "INFO", astRef: "AST02", astTitle: "Supply Chain Compromise", description: "Global package installation instruction; review package provenance and scope." },
  { id: "DEP-002", domain: "DEP", pattern: /^git\+https?:\/\/(?!github\.com)/im, severity: "WARNING", astRef: "AST02", astTitle: "Supply Chain Compromise", description: "Git dependency from a non-GitHub host; review provenance and pinning." }
];

const RISK_POINTS: Record<FindingSeverity, number> = { CRITICAL: 25, WARNING: 10, INFO: 2 };
const MAX_FINDINGS = 20;

function riskLevel(score: number): SecurityScanResult["riskLevel"] {
  if (score >= 75) return "CRITICAL";
  if (score >= 40) return "HIGH";
  if (score >= 15) return "MEDIUM";
  return "LOW";
}

export function scanSecurity(files: Array<{ path: string; content: string }>): SecurityScanResult {
  const findings: SecurityFinding[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    if (/\.(?:min\.js|bundle\.js)$/i.test(file.path)) continue;
    const lines = file.content.split(/\r?\n/);
    for (const rule of RULES) {
      for (let index = 0; index < lines.length; index++) {
        if (!rule.pattern.test(lines[index])) continue;
        const key = `${rule.id}:${file.path}:${index + 1}`;
        if (seen.has(key)) continue;
        seen.add(key);
        findings.push({
          id: rule.id,
          domain: rule.domain,
          severity: rule.severity,
          file: file.path,
          line: index + 1,
          pattern: rule.pattern.source.slice(0, 100),
          description: rule.description,
          astRef: rule.astRef,
          astTitle: rule.astTitle
        });
        if (findings.length >= MAX_FINDINGS) break;
      }
      if (findings.length >= MAX_FINDINGS) break;
    }
    if (findings.length >= MAX_FINDINGS) break;
  }

  const score = Math.min(100, findings.reduce((total, finding) => total + RISK_POINTS[finding.severity], 0));
  const level = riskLevel(score);
  const badges = ["Static pattern scan", `Heuristic risk ${score}/100`];
  if (findings.length === 0) badges.push("No listed patterns flagged");
  if (findings.some((finding) => finding.severity === "CRITICAL")) badges.push("Critical patterns flagged");

  return {
    scannedAt: new Date().toISOString(),
    standard: "OWASP Agentic Skills Top 10 (AST10) v1.0 referenced",
    scannerVersion: "1.0.0",
    scoreMethod: "Local weighted pattern count; not an OWASP score, vulnerability probability, or security certification.",
    riskScore: score,
    riskLevel: level,
    findings,
    badges,
    filesScanned: files.length,
    filesSkipped: 0
  };
}

export function triageCandidate(confidence: number, riskScore: number) {
  const safeConfidence = Number.isFinite(confidence) ? Math.min(1, Math.max(0, confidence)) : 0;
  const safeRisk = Number.isFinite(riskScore) ? Math.min(100, Math.max(0, riskScore)) : 100;
  if (safeRisk >= 75) return { status: "reject" as const, reason: "Heuristic risk threshold reached; requires maintainer review." };
  if (safeConfidence < 0.4) return { status: "reject" as const, reason: "Insufficient agentic signals detected." };
  if (safeConfidence >= 0.7 && safeRisk < 40) return { status: "candidate" as const, reason: "Signals meet intake thresholds; still requires human review." };
  return { status: "review" as const, reason: `Manual review recommended (confidence ${safeConfidence.toFixed(2)}, heuristic risk ${safeRisk}).` };
}
