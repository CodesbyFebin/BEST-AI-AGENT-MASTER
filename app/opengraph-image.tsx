import { ImageResponse } from "next/og";
import { publicEntities, evidence, isEvidenceVerified } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — Evidence-backed AI agent & model graph`;

export default async function OGImage() {
  const entityCount = publicEntities.length;
  const receiptCount = evidence.filter(isEvidenceVerified).length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #04060d 0%, #090d1c 55%, #0d1325 100%)",
          color: "#f7f8ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <svg width="52" height="52" viewBox="0 0 64 64">
            <path d="M30 8l5 17 17 5-17 5-5 17-5-17-17-5 17-5z" fill="#7c5cff" />
            <path d="M47 6l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z" fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 900, textTransform: "lowercase" }}>
            <span>best&nbsp;</span><span style={{ color: "#9c8cff" }}>ai</span><span>&nbsp;agent</span><span style={{ color: "#6b7690" }}>.in</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 60, fontWeight: 900, lineHeight: 1.08, maxWidth: 920 }}>
          Find AI agents backed by evidence.
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#b9c5e6", marginTop: 22, maxWidth: 860 }}>
          Agents, models, frameworks &amp; providers — every entity has a source trail.
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 900, color: "#8fe4ff" }}>{entityCount}</div>
            <div style={{ display: "flex", fontSize: 16, color: "#8e9abc", textTransform: "uppercase", letterSpacing: 2 }}>
              Verified entities
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 900, color: "#8fe4ff" }}>{receiptCount}</div>
            <div style={{ display: "flex", fontSize: 16, color: "#8e9abc", textTransform: "uppercase", letterSpacing: 2 }}>
              Evidence receipts
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
