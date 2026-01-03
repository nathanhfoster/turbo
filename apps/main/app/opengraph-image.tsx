import { ImageResponse } from "next/og";

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
          background: "linear-gradient(135deg, #f5f7fa 0%, #e2e8f0 100%)",
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
            background: "white",
            borderRadius: "24px",
            padding: "60px 80px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
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
              color: "#2d3748",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            AgentNate
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#4a5568",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Portfolio & Consultancy
          </div>
          <div
            style={{
              background: "#FFE500",
              color: "#000",
              fontSize: 32,
              fontWeight: "600",
              padding: "20px 40px",
              borderRadius: "12px",
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
