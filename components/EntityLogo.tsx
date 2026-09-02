"use client";

import { useState } from "react";
import catalogIconManifest from "@/lib/catalog-icon-manifest.json";

type IconManifestEntry = { name: string; category: string; slug: string; svg: string; png: string; type: string };

const iconBySlug = new Map<string, IconManifestEntry>(
  (catalogIconManifest as IconManifestEntry[]).map((entry) => [entry.slug, entry])
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Looks up a neutral catalog icon (see public/icons/svg + lib/catalog-icon-manifest.json)
 * by trying the entity's own slug, then its developer name, then its display
 * name. These are intentionally generic name/initial badges, not third-party
 * trademarks — see public/icons/svg for the originals and their README.
 */
function findCatalogIcon(candidates: Array<string | null | undefined>): string | null {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const match = iconBySlug.get(slugify(candidate));
    if (match) return `/icons/${match.svg}`;
  }
  return null;
}

/**
 * Renders a first-party neutral catalog icon where one exists, otherwise a
 * deterministic initials glyph. Avoiding a live third-party favicon proxy
 * removes an external request, a privacy dependency, and layout variability.
 */
export function EntityLogo({
  name,
  developer,
  size = 40,
}: {
  name: string;
  sourceUrl?: string | null;
  developer?: string | null;
  size?: number;
}) {
  const [catalogFailed, setCatalogFailed] = useState(false);
  const catalogIcon = findCatalogIcon([name, developer]);

  if (!catalogFailed && catalogIcon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="glyph"
        src={catalogIcon}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
        onError={() => setCatalogFailed(true)}
      />
    );
  }

  return <div className="glyph" aria-hidden="true" style={{ width: size, height: size }}>{name.slice(0, 2).toUpperCase()}</div>;
}
