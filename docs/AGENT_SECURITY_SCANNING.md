# Agent repository security scanning

The directory has a bounded, static scan for patterns worth human review. It scans only the explicit GitHub repositories listed in `data/agent-security-targets.json`, records the exact source commit, and opens a pull request with updated reports. The scan process never runs code from those repositories.

## Run manually

```bash
npm run agent-scan:rescan
```

The runner needs Node.js 22.18 or later and Git. It scans at most 200 repositories with four concurrent shallow clones. Per repository it reads at most 3,000 text files, 96 KiB per file, and 12 MiB total; `.git`, dependency trees, build outputs, symlinks, binaries, lockfiles, and `.env` files are excluded. The report includes the number of files checked and skipped.

## Report and triage semantics

- `heuristicRiskScore` is a local weighted count of matched patterns. It is not CVSS, an OWASP score, or a probability that the repository is unsafe.
- AST10 references point to related OWASP risk themes. This implementation covers a small set of source patterns; it does not implement the full AST10 framework.
- `typeConfidence` and `triage` are intake heuristics. `candidate` means eligible for maintainer review; it never auto-approves, verifies, or publishes an entity.
- Reports only appear on an agent card when the report matches that exact entity slug and repository URL. The report is separate from identity evidence and does not change the entity's publication state.
- A zero score means no configured pattern matched the scanned files. It does not mean the repository is secure.

The scheduled action opens a PR, so scan updates remain reviewable before entering the static site. Security findings and triage recommendations must not be used to claim an agent is safe to execute.
