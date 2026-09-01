import type { Entity, EntityType, EvidenceRecord } from "@/lib/catalog-types";
import type { Comparison } from "@/lib/comparisons";
import { evidence as baseEvidence } from "@/lib/evidence";
import { entities as baseEntities } from "@/lib/entities";
import { legacyAgentSources as baseLegacyAgentSources } from "@/lib/legacy-agents";
import { importedAgentSources } from "@/lib/imported-agents";
import { importedModelSources } from "@/lib/imported-models";
import { importedFrameworkSources } from "@/lib/imported-frameworks";
import { recoveryEntities } from "@/lib/recovery-entities";
import { recoveryEvidence } from "@/lib/recovery-evidence";
import { comparisons as baseComparisons } from "@/lib/comparisons";

export type { Entity, EntityType, EvidenceRecord, EvidenceAuthority, VerificationState } from "@/lib/catalog-types";

export const legacyAgentSources = [...baseLegacyAgentSources, ...importedAgentSources];
export const legacyModelSources = importedModelSources;
export const legacyFrameworkSources = importedFrameworkSources;

export const evidence: EvidenceRecord[] = [...baseEvidence, ...recoveryEvidence];
export const entities: Entity[] = [...baseEntities, ...recoveryEntities];

export const getEvidence = (entityId: string) => evidence.filter((item) => item.entityId === entityId);
export const isValidHash = (hash: string) => /^sha256:[0-9a-f]{64}$/.test(hash);
export const isEvidenceVerified = (item: EvidenceRecord) =>
  item.status === "verified" &&
  item.authority === "primary" &&
  Boolean(item.retrievedAt) &&
  isValidHash(item.contentHash);

/**
 * Canonical predicate for whether an entity may appear on indexable HTML, JSON,
 * sitemap, and llms.txt surfaces. This is the single source of truth.
 *
 * `isEntityIndexable` is preserved as an alias for backwards compatibility.
 */
export const isPublicIndexableEntity = (entity: Entity): boolean =>
  entity.verification === "verified" &&
  entity.evidenceIds.some((id) => {
    const item = evidence.find((candidate) => candidate.id === id);
    return item ? isEvidenceVerified(item) : false;
  });

export const isEntityIndexable = isPublicIndexableEntity;

/**
 * Canonical predicate for whether a comparison may appear on indexable HTML,
 * JSON, sitemap, and llms.txt surfaces.
 *
 * "evidence-ready" means both sides of the comparison have a verified identity
 * and the compared fields are independently evidenced.
 */
export const isPublicIndexableComparison = (comparison: Comparison): boolean =>
  comparison.status === "evidence-ready";

export const publicEntities: Entity[] = entities.filter(isPublicIndexableEntity);
export const entitiesByType = (type: EntityType): Entity[] =>
  publicEntities.filter((entity) => entity.type === type);
export const getEntity = (type: EntityType, slug: string): Entity | null =>
  entities.find((entity) => entity.type === type && entity.slug === slug) ?? null;
export const getPublicEntity = (type: EntityType, slug: string): Entity | null =>
  publicEntities.find((entity) => entity.type === type && entity.slug === slug) ?? null;

/**
 * Returns the public catalog path for an entity. MCP server entities use
 * `/mcp/servers/[slug]`; all others use `/[type]s/[slug]`.
 */
export const getPublicEntityPath = (entity: Entity): string =>
  entity.type === "mcp-server" ? `/mcp/servers/${entity.slug}` : `/${entity.type}s/${entity.slug}`;

/**
 * Strict public-comparison filter: the comparison must be `evidence-ready`
 * AND both compared entities must resolve to verified public records. This
 * is the version that surfaces in HTML, sitemap, JSON, and llms.txt outputs.
 *
 * The looser status-only filter lives in `@/lib/comparisons` as `publicComparisons`
 * for backwards compatibility with internal code that does not need entity
 * cross-checks.
 */
export const publicIndexableComparisons: Comparison[] = baseComparisons.filter((comparison) => {
  if (comparison.status !== "evidence-ready") return false;
  const a = getPublicEntity(comparison.a.type, comparison.a.slug);
  const b = getPublicEntity(comparison.b.type, comparison.b.slug);
  return Boolean(a && b);
});

/**
 * Source-of-truth counts for the public catalog. Every consumer that displays
 * a number about the site (homepage, /press, /methodology, /api-docs, llms.txt)
 * must call this and not hardcode values.
 */
export type PublicCatalogStats = {
  entities: number;
  agents: number;
  models: number;
  frameworks: number;
  providers: number;
  mcpServers: number;
  evidenceReceipts: number;
  comparisons: number;
};

export const getPublicCatalogStats = (): PublicCatalogStats => {
  const counts: Record<EntityType, number> = {
    agent: 0,
    model: 0,
    framework: 0,
    provider: 0,
    "mcp-server": 0
  };
  for (const entity of publicEntities) counts[entity.type] += 1;
  const verifiedReceipts = evidence.filter(isEvidenceVerified).length;
  return {
    entities: publicEntities.length,
    agents: counts.agent,
    models: counts.model,
    frameworks: counts.framework,
    providers: counts.provider,
    mcpServers: counts["mcp-server"],
    evidenceReceipts: verifiedReceipts,
    comparisons: publicIndexableComparisons.length
  };
};

/**
 * Re-exported so JSON, sitemap, and HTML surfaces don't need to import
 * directly from lib/comparisons.
 */
export { baseComparisons as allComparisons };
