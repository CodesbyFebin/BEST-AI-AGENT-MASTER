import Link from "next/link";

export function LearnMoreBlock({ links }: { links: { href: string; label: string; reviewed: boolean }[] }) {
  const ready = links.filter((link) => link.reviewed && link.href.startsWith("/") && !link.href.startsWith("//"));
  if (!ready.length) return null;
  return <section aria-label="Learn more"><h2>Learn more</h2><ul>{ready.map((link) =>
    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
  )}</ul></section>;
}
