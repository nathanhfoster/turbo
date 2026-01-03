import { ImageResponse } from "next/og";
import {
  PRIMARY_COLOR,
  PRIMARY_600,
  BACKGROUND_DEFAULT,
  BACKGROUND_ELEVATED,
  FOREGROUND_DEFAULT,
  FOREGROUND_MUTED,
  NEUTRAL_800,
} from "./lib/opengraph-constants";

export const runtime = "edge";

export const alt = "AgentNate - Portfolio & Consultancy";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: `linear-gradient(135deg, ${BACKGROUND_DEFAULT} 0%, ${BACKGROUND_ELEVATED} 100%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            background: BACKGROUND_ELEVATED,
            borderRadius: "24px",
            padding: "60px 80px",
            border: `1px solid ${NEUTRAL_800}`,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: FOREGROUND_DEFAULT,
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            AgentNate
          </div>
          <div
            style={{
              fontSize: 40,
              color: FOREGROUND_MUTED,
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Portfolio & Consultancy
          </div>
          <div
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_600} 100%)`,
              color: FOREGROUND_DEFAULT,
              fontSize: 32,
              fontWeight: "600",
              padding: "20px 40px",
              borderRadius: "12px",
              boxShadow: `0 8px 16px rgba(0, 119, 197, 0.3)`,
            }}
          >
            agentnate.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
