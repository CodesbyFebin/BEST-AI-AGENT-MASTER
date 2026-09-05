import records from "@/data/authority-evidence.json";
import type { AuthorityPage } from "@/lib/authority-pages";

export type AuthorityEvidenceRecord = {
  id: string;
  pageSlug: string;
  field: string;
  sourceUrl: string;
  publisher: string;
  retrievedAt: string;
  contentHash: `sha256:${string}`;
  status: "verified" | "stale";
  snapshot: Record<string, unknown>;
};

export const authorityEvidence = records as AuthorityEvidenceRecord[];

export function getAuthorityEvidence(pageSlug: string) {
  return authorityEvidence.filter((record) => record.pageSlug === pageSlug);
}

const validSha256 = (value: string) => /^sha256:[0-9a-f]{64}$/.test(value);

/**
 * Fail-closed publication predicate for authority pages. A page is not made
 * indexable merely because prose exists: every declared receipt must exist,
 * belong to this page, be verified, and carry a syntactically valid SHA-256
 * digest. Pages without declared receipts remain reachable but noindex.
 */
export function isAuthorityPageEvidenceReady(pageSlug: string, evidenceIds?: string[]) {
  if (!evidenceIds?.length) return false;
  return evidenceIds.every((id) => {
    const record = authorityEvidence.find((candidate) => candidate.id === id);
    return Boolean(
      record &&
      record.pageSlug === pageSlug &&
      record.status === "verified" &&
      validSha256(record.contentHash)
    );
  });
}

/**
 * Fail-closed publication predicate for pages with no external factual claim
 * to attach an evidence receipt to. Requires a named reviewer (not blank) and
 * every attestation explicitly true — a missing or partial review does not
 * qualify. Mutually exclusive with the evidence path: a page carrying
 * evidenceIds must clear isAuthorityPageEvidenceReady instead, never this gate.
 */
export function isMethodologyPageReady(page: Pick<AuthorityPage, "evidenceIds" | "methodologyReview">) {
  if (page.evidenceIds?.length) return false;
  const review = page.methodologyReview;
  if (!review) return false;
  return Boolean(
    review.reviewedBy.trim().length > 0 &&
    review.reviewedAt.trim().length > 0 &&
    review.noUnsupportedClaims === true &&
    review.limitationsDisclosed === true &&
    review.originalityChecked === true &&
    review.noUnsupportedSuperlatives === true
  );
}
