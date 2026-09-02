import Link from "next/link";

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; text: string }
  | { type: "table"; rows: string[][] };

function renderInline(text: string, keyPrefix: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]*)\]\(([^)]+)\)|`([^`]+)`|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-${i++}`}>{match[1]}</strong>);
    } else if (match[3] !== undefined) {
      const href = match[3];
      const label = match[2] || href;
      if (href.startsWith("/")) {
        parts.push(<Link key={`${keyPrefix}-${i++}`} href={href}>{label}</Link>);
      } else {
        parts.push(<a key={`${keyPrefix}-${i++}`} href={href}>{label}</a>);
      }
    } else if (match[4] !== undefined) {
      parts.push(<code key={`${keyPrefix}-${i++}`}>{match[4]}</code>);
    } else if (match[5] !== undefined) {
      parts.push(<em key={`${keyPrefix}-${i++}`}>{match[5]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return <div className="prose">
    {blocks.map((block, idx) => {
      if (block.type === "h2") return <h2 key={idx}>{block.text}</h2>;
      if (block.type === "h3") return <h3 key={idx}>{block.text}</h3>;
      if (block.type === "p") return <p key={idx}>{renderInline(block.text, `p${idx}`)}</p>;
      if (block.type === "ul") return <ul key={idx}>{block.items.map((item, i) => <li key={i}>{renderInline(item, `ul${idx}-${i}`)}</li>)}</ul>;
      if (block.type === "ol") return <ol key={idx}>{block.items.map((item, i) => <li key={i}>{renderInline(item, `ol${idx}-${i}`)}</li>)}</ol>;
      if (block.type === "code") return <pre key={idx}><code>{block.text}</code></pre>;
      if (block.type === "table") {
        const [header, ...rows] = block.rows;
        return <table className="facts" key={idx}>
          <thead><tr>{header.map((cell, ci) => <th key={ci}>{renderInline(cell, `th${idx}-${ci}`)}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{renderInline(cell, `t${idx}-${ri}-${ci}`)}</td>)}</tr>
            ))}
          </tbody>
        </table>;
      }
      return null;
    })}
  </div>;
}
