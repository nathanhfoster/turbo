import type { NextConfig } from "next";

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
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        { key: "Service-Worker-Allowed", value: "/" },
      ],
    },
  ],
  // Multi-zone architecture: proxy /astralpoet routes to astralpoet app
  rewrites: async () => {
    const astralpoetUrl =
      process.env.ASTRALPOET_URL || "http://localhost:3002";
    return [
      {
        source: "/astralpoet/:path*",
        destination: `${astralpoetUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
