import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AI Resume Builder";
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
          background: "linear-gradient(135deg, #020617 0%, #1e293b 100%)",
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
            background: "#1e293b",
            borderRadius: "24px",
            padding: "60px 80px",
            border: "1px solid #334155",
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
              color: "#ffffff",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            AI Resume Builder
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#94a3b8",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Build, Edit & Customize Resumes
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #0077c5 0%, #005a9e 100%)",
              color: "#ffffff",
              fontSize: 32,
              fontWeight: "600",
              padding: "20px 40px",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 119, 197, 0.3)",
            }}
          >
            Powered by AI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

