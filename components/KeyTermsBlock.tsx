import Link from "next/link";

type KeyTerm = { slug: string; label: string; routeConfirmed: boolean };

/** Render only editorially approved existing destinations; never link to a proposed glossary slug. */
export function KeyTermsBlock({ terms }: { terms: KeyTerm[] }) {
  const ready = terms.filter((term) => term.routeConfirmed);
  if (!ready.length) return null;
  return <section aria-label="Key terms"><h2>Key terms</h2><ul>{ready.map((term) =>
    <li key={term.slug}><Link href={`/glossary/${encodeURIComponent(term.slug)}`}>{term.label}</Link></li>
  )}</ul></section>;
}
