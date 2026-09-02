import records from "@/data/authority-evidence.json";

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
