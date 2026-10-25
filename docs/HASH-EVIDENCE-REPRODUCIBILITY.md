# Reproducible evidence hashes (offline)

Use `scripts/hash-evidence.mjs` with a retained JSON snapshot structured as:

```json
{"sourceUrl":"https://example.org/primary-source","retrievedAt":"2026-10-25T00:00:00Z","facts":{"field":"observed-value"}}
```

Run `node scripts/hash-evidence.mjs snapshot.json` to obtain a deterministic `sha256:<digest>`. Re-run with `--verify sha256:<digest>` to compare against a receipt. The canonicalization sorts object keys recursively and matches the authority-evidence JSON hash input in `scripts/verify-catalog.mjs`.

**Limits:** hashing is offline; it does not fetch URLs, prove publisher authenticity, independently verify a claim, or promote a record. The snapshot, URL, locator, retrieval date and editorial disposition must all be retained and reviewed. Do not invent historical timestamps or replace existing hashes without the exact retained source material.
