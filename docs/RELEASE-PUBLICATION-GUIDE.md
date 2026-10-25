# BestAIAgent.in — Release and Publication Guide

This release package adds the 3,000+ word GitHub README, 20 technology/policy badges, live GitHub workflow and repository widgets, subject-area navigation, and SEO/AEO/GEO editorial guidance. It does **not** certify indexing, page performance, or an independent security audit.

## Publishing criteria

- Merge only after `npm run verify`, standard CI and GitHub Pages static export pass for the PR.
- Confirm the main-branch release commit and its workflow runs. A PR preview build is not a production deployment.
- The site canonical remains `https://bestaiagent.in`; live `www` → apex 301 must be verified at the Cloudflare edge and is not handled by GitHub Pages.
- A single apex `sitemap.xml` remains authoritative. Sitemap shards are disabled.
- The source repository is public/source-available, **not declared open-source licensed**; a license requires a rights-holder decision.
- Keep source provenance, unknown states, noindex/quarantine, and honest compare methodology.
- Legacy permanent redirects, Search Console submission, IndexNow/Crawler Hints, mobile field CWV and GSC indexing are separately verifiable operator gates.

## Maintainer CLI: inspect and publish

```bash
gh auth status
gh repo set-default CodesbyFebin/BEST-AI-AGENT-MASTER
gh pr list --state open
gh run list --branch main --limit 10
gh release list
git checkout main
git pull --ff-only origin main
# Choose a unique version AFTER checking existing tags and workflows.
git tag -a v2.1.0-docs -m "Evidence-first README and release documentation"
git push origin v2.1.0-docs
gh release create v2.1.0-docs --verify-tag --title "BestAIAgent.in documentation baseline" --notes-file docs/RELEASE-PUBLICATION-GUIDE.md
```

A GitHub Release is tagged source; it does not publish a commercial package or imply permission to redistribute third-party data.

## About and topics (requires `gh` write access)

```bash
gh repo edit CodesbyFebin/BEST-AI-AGENT-MASTER \
  --description "Evidence-first AI agent directory: agents, models, frameworks and MCP servers with source-linked verification and static publication." \
  --homepage https://bestaiagent.in

gh api -X PUT repos/CodesbyFebin/BEST-AI-AGENT-MASTER/topics \
  -H "Accept: application/vnd.github+json" \
  -f 'names[]=ai-agents' \
  -f 'names[]=ai-directory' \
  -f 'names[]=ai-models' \
  -f 'names[]=ai-frameworks' \
  -f 'names[]=mcp' \
  -f 'names[]=model-context-protocol' \
  -f 'names[]=nextjs' \
  -f 'names[]=typescript' \
  -f 'names[]=react' \
  -f 'names[]=github-pages' \
  -f 'names[]=static-site' \
  -f 'names[]=seo' \
  -f 'names[]=answer-engine-optimization' \
  -f 'names[]=generative-ai' \
  -f 'names[]=ai-tools' \
  -f 'names[]=structured-data' \
  -f 'names[]=knowledge-graph' \
  -f 'names[]=evidence-based' \
  -f 'names[]=source-available' \
  -f 'names[]=developer-tools'
```

Topic PUT **replaces all** existing topics, rather than appending to them. Review the old topic set first using `gh repo view --json repositoryTopics`.

## Source release notes

- Documentation: expanded README with clear product scope and architecture.
- Discovery: 20 meaningful badges and six dynamic GitHub widgets; no fabricated GitHub metrics.
- Technical SEO: apex canonical, flat sitemap, Pages redirect limitations, metadata and source-specific assertions explained.
- AEO/GEO: answer-first evidence, appropriate structured data, explicit uncertainty and no fabricated ranking or statistics.
- Contributor experience: local Node 22 commands, build gates, Git-based YAML submissions and evidence hashing.
- Publication: license is not yet selected; public readability does not equal OSI licensing.
- Outstanding operator gates remain outside the source release.

## Companion repository link

BestAIAgent.in cross-links [CodesbyFebin/Agentic-Marketplace](https://github.com/CodesbyFebin/Agentic-Marketplace), a separate publicly visible repository with no implementation files confirmed at link time. Do not treat the cross-link as a deployed integration, working marketplace backend, payment processor, or package publication. Any functional integration requires explicit contracts and qualification in a later PR.
