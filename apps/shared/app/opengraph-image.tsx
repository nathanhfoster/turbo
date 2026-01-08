import { ImageResponse } from "next/og";

export interface OpenGraphImageConfig {
  title: string;
  subtitle?: string;
  domain?: string;
  primaryColor?: string;
  primaryColor600?: string;
  backgroundDefault?: string;
  backgroundElevated?: string;
  foregroundDefault?: string;
  foregroundMuted?: string;
  neutral800?: string;
}

const DEFAULT_CONFIG: Required<OpenGraphImageConfig> = {
  title: "App",
  subtitle: "Description",
  domain: "app.dev",
  primaryColor: "#0077c5",
  primaryColor600: "#0891b2",
  backgroundDefault: "#020617",
  backgroundElevated: "#0f172a",
  foregroundDefault: "#f8fafc",
  foregroundMuted: "#cbd5e1",
  neutral800: "#1e293b",
};

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Create an OpenGraph image component
 * Use this in your app's opengraph-image.tsx:
 *
 * import { createOpenGraphImage } from "@/shared/app/opengraph-image";
 *
 * export default createOpenGraphImage({
 *   title: "My App",
 *   subtitle: "My App Description",
 *   domain: "myapp.dev",
 * });
 */
export function createOpenGraphImage(config: OpenGraphImageConfig) {
  const {
    title,
    subtitle,
    domain,
    primaryColor,
    primaryColor600,
    backgroundDefault,
    backgroundElevated,
    foregroundDefault,
    foregroundMuted,
    neutral800,
  } = { ...DEFAULT_CONFIG, ...config };

  return async function Image() {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: `linear-gradient(135deg, ${backgroundDefault} 0%, ${backgroundElevated} 100%)`,
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
              background: backgroundElevated,
              borderRadius: "24px",
              padding: "60px 80px",
              border: `1px solid ${neutral800}`,
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
                color: foregroundDefault,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 40,
                  color: foregroundMuted,
                  textAlign: "center",
                  marginBottom: "30px",
                }}
              >
                {subtitle}
              </div>
            )}
            {domain && (
              <div
                style={{
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor600} 100%)`,
                  color: foregroundDefault,
                  fontSize: 32,
                  fontWeight: "600",
                  padding: "20px 40px",
                  borderRadius: "12px",
                  boxShadow: `0 8px 16px rgba(0, 119, 197, 0.3)`,
                }}
              >
                {domain}
              </div>
            )}
          </div>
        </div>
      ),
      {
        ...size,
      },
    );
  };
}
