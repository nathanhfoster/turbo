import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@nathanhfoster/resurrection",
    "@nathanhfoster/ui",
    "@nathanhfoster/utils",
    "@nathanhfoster/pwa",
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
    // Aggressive no-cache for development assets
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
  // Multi-zone architecture: proxy /astralpoet routes to astralpoet app
  rewrites: async () => {
    const astralpoetUrl = process.env.ASTRALPOET_URL || "http://localhost:3002";
    return [
      {
        source: "/astralpoet/:path*",
        destination: `${astralpoetUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
