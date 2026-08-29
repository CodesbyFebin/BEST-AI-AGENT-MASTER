# Contributing

This repo has one rule that overrides all the usual "just add data" instincts:
**an entity is only ever as verified as its evidence record, never as verified as its listing.**
Read `docs/EVIDENCE_POLICY.md` before opening a PR — everything below assumes it.

## The two tiers, and what separates them

| | Lives in | Shows up as | Requires |
|---|---|---|---|
| Legacy / imported | `lib/imported-agents.ts`, `lib/imported-models.ts`, `lib/imported-frameworks.ts` | `noindex` detail page | just a name + real `sourceUrl` |
| Verified | `lib/entities.ts` + `lib/evidence.ts` | indexed detail page | a real evidence receipt (see below) |

`isEntityIndexable()` in `lib/catalog.ts` is the actual gate:

```ts
export const isEntityIndexable = (entity: Entity) =>
  entity.verification === "verified" &&
  entity.evidenceIds.some((id) => {
    const item = evidence.find((candidate) => candidate.id === id);
    return item ? isEvidenceVerified(item) : false;
  });
```

`isEvidenceVerified` checks `status === "verified"`, `authority === "primary"`, a real `retrievedAt`, and a `contentHash` matching `sha256:[0-9a-f]{64}`. That hash format is enforced by regex, not cryptographically re-verified at build time — which means the gate trusts you to have actually computed it from something real. Writing a random 64-hex-character string that happens to match the pattern is not "verifying" the entity; it's forging the one signal this whole site is built around. Don't do it, and don't approve a PR that does it via a normal code review — check that the hash actually matches the cited `sourceUrl`.

## Adding a new entity

**If you only have a name and a link** (a blog post, a product homepage, a tweet): add it to the matching `lib/imported-*.ts` file. Follow the existing shape exactly:

```ts
{ slug: "your-slug", name: "Product Name", developer: "Company", sourceUrl: "https://...", summary: "One sentence, no pricing/benchmark claims. Imported for catalog coverage; pricing, scoring and benchmark claims are intentionally omitted pending source verification.", categories: ["agent"] }
```

Before adding it:
1. `grep -i "product name" lib/imported-agents.ts lib/imported-models.ts lib/imported-frameworks.ts lib/entities.ts` — catch a near-duplicate before it's shipped as two entries.
2. `grep -oE 'slug: "[a-z0-9-]+"' lib/imported-agents.ts | sort | uniq -d` after your edit — must return nothing.

This entity will render but stay `noindex` until someone does the next step.

**If you can independently verify identity from a real API** (a GitHub repo, a Hugging Face model card, an npm/PyPI package): promote it to `lib/entities.ts` instead. This is the only path that flips a page to indexed, and it means actually fetching the source, not writing a plausible-looking record:

```bash
gh api repos/OWNER/REPO   # or: curl -s https://huggingface.co/api/models/OWNER/MODEL
```

Take the real response, build a small canonical snapshot (see the existing entries in `lib/evidence.ts` for the field set — `id`, `fullName`, `defaultBranch`, `archived`, `visibility`, `size` for a GitHub repo), hash *that exact snapshot* with `sha256`, and write both the `Entity` record and the matching `EvidenceRecord`. Then remove the old entry from whichever `imported-*.ts` file it came from, so the same product doesn't exist in both tiers at once.

Before opening the PR, diff your hand-written evidence line against a fresh script-generated one — a transcription error here produces a syntactically valid but factually wrong hash, which is worse than no hash at all because it *looks* verified. (This has actually happened during this project's own bulk-verification passes; catching it before merge is the whole point of this note.)

`python3 scripts/audit-sources.py` will tell you, right now, which entries in the imported-\* pools have a source URL that's actually API-checkable (GitHub, Hugging Face) versus one that needs a human to read it (`docs` / `marketing` buckets). Start with the former.

## Comparisons

A comparison in `lib/comparisons.ts` can only carry `status: "evidence-ready"` if **both** sides are independently verified entities (`type` and `slug` resolve via `getPublicEntity`) *and* the comparison's title actually matches what `a`/`b` point to. Check the second part by eye — this repo has shipped a comparison titled "Cursor vs GitHub Copilot" whose `a`/`b` fields quietly pointed at two unrelated entities from an earlier legacy-URL migration. Don't repeat that: if you're not certain the title and the entities match, leave it `refreshing`.

## Content pages (authority pages, glossary)

These don't have an evidence gate — they're editorial, and `index: true` by default. What we do check:

- No fabricated compliance/certification claims about a named company or product (see `docs/EVIDENCE_POLICY.md` and this repo's own history of refusing exactly this).
- No invented statistics, ratings, or "trusted by" claims. If a number isn't sourced, don't put a number there — say the plain-language version instead.
- Every internal link actually resolves. Before merging a batch of new pages:
  ```bash
  grep -ohE 'href: "/[a-z0-9-]+"' lib/authority-pages.ts lib/glossary.ts | sed 's/href: "\///;s/"$//' | sort -u > /tmp/linked.txt
  # compare against the real set of authority-page keys, glossary slugs, and static routes
  ```
  This has caught real broken links before (wrong slug, missing `/agents/` prefix) — it's cheap enough to run every time.

## Before opening a PR

```bash
npx tsc --noEmit
npm run verify        # catalog + GSC + quarantine checks, typecheck, lint, build
python3 scripts/validate-jsonld.py   # after the build — checks every JSON-LD block in the real output
```

All three run in CI (`.github/workflows/ci.yml`) on every push and PR. A red CI run on any of them is a blocker, not a suggestion.

## What we won't merge

- An entity promoted to `verified` without a real, checkable evidence receipt.
- A schema.org block asserting something not backed by data on the page — `aggregateRating` with invented numbers, `offers.price` for an entity whose pricing is genuinely unknown, anything implying a partnership or endorsement that doesn't exist.
- A "lower the bar so more pages get indexed" change to `isEntityIndexable()`, `isEvidenceVerified()`, or the comparison gate. If a page isn't clearing the gate, the fix is better evidence, not a smaller gate.
