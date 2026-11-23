import { ImageResponse } from "next/og";

export const alt = "Figures: Chartered Accountants in Surrey & London";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image for every page (LinkedIn, WhatsApp, X, Slack). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#FFFFFF",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -2 }}>figures</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3 }}>
            Oddly satisfying accounting
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#B5B5B5" }}>
            ICAS Chartered Accountants for small businesses and startups
          </div>
        </div>
        <div style={{ display: "flex", width: 160, height: 12, background: "#FFDD4F", borderRadius: 6 }} />
      </div>
    ),
    size
  );
}
