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
  // Multi-zone architecture: proxy routes to other apps
  rewrites: async () => {
    const astralpoetUrl = process.env.APPS_ASTRAL_POET_URL || "http://localhost:3002";
    const resumeUrl = process.env.APPS_RESUME_URL || "http://localhost:3003";
    return [
      {
        source: "/astralpoet/:path*",
        destination: `${astralpoetUrl}/:path*`,
      },
      // Resume app routes - exact match first, then wildcard
      {
        source: "/resume",
        destination: `${resumeUrl}/resume`,
      },
      {
        source: "/resume/:path*",
        destination: `${resumeUrl}/resume/:path*`,
      },
      // Proxy static assets for resume app
      {
        source: "/resume/_next/static/:path*",
        destination: `${resumeUrl}/resume/_next/static/:path*`,
      },
      {
        source: "/resume/_next/webpack-hmr",
        destination: `${resumeUrl}/resume/_next/webpack-hmr`,
      },
    ];
  },
};

export default nextConfig;
