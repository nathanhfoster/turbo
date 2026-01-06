import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Only use basePath in development when running standalone
  // In production, resume app is deployed separately without basePath
  basePath: isDevelopment ? "/resume" : undefined,
  // Use assetPrefix in production so assets load from resume app's domain when proxied
  // This ensures static assets are served from the correct domain
  // Set RESUME_APP_URL env var in Vercel to the resume app's URL (e.g., https://turbo-resume-ten.vercel.app)
  assetPrefix: isDevelopment ? undefined : process.env.RESUME_APP_URL || undefined,
  transpilePackages: [
    "@nathanhfoster/resurrection",
    "@nathanhfoster/ui",
    "@nathanhfoster/utils",
    "@nathanhfoster/pwa",
    "@nathanhfoster/indexeddb",
    "@nathanhfoster/openai",
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: isDevelopment
            ? "no-cache, no-store, must-revalidate"
            : "public, max-age=0, must-revalidate",
        },
        { key: "Service-Worker-Allowed", value: "/" },
      ],
    },
    ...(isDevelopment
      ? [
          {
            source: "/_next/static/:path*",
            headers: [
              {
                key: "Cache-Control",
                value: "no-cache, no-store, must-revalidate",
              },
            ],
          },
        ]
      : []),
  ],
};

export default nextConfig;

