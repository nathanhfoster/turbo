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
    const astralpoetUrl = process.env.APPS_ASTRAL_POET_URL || "http://localhost:3004";
    const resumeUrl = process.env.APPS_RESUME_URL || "http://localhost:3003";
    
    // In development, apps have basePath, so we need to include it
    // In production, apps are deployed separately without basePath
    const isAstralpoetLocalhost = astralpoetUrl.includes("localhost");
    const astralpoetBasePath = isAstralpoetLocalhost ? "/astralpoet" : "";
    const isResumeLocalhost = resumeUrl.includes("localhost");
    const resumeBasePath = isResumeLocalhost ? "/resume" : "";
    
    return [
      // Astralpoet app routes - more specific routes first, then wildcard
      {
        source: "/apps/astralpoet",
        destination: `${astralpoetUrl}${astralpoetBasePath}`,
      },
      // Proxy static assets for astralpoet app (must come before wildcard)
      {
        source: "/apps/astralpoet/_next/static/:path*",
        destination: `${astralpoetUrl}${astralpoetBasePath}/_next/static/:path*`,
      },
      {
        source: "/apps/astralpoet/_next/webpack-hmr",
        destination: `${astralpoetUrl}${astralpoetBasePath}/_next/webpack-hmr`,
      },
      // Wildcard route (must come last to catch all other paths)
      {
        source: "/apps/astralpoet/:path*",
        destination: `${astralpoetUrl}${astralpoetBasePath}/:path*`,
      },
      // Proxy astralpoet app basePath routes (astralpoet app generates /astralpoet/* paths due to basePath)
      // Only needed in development when astralpoet app has basePath
      ...(isAstralpoetLocalhost
        ? [
            {
              source: "/astralpoet",
              destination: `${astralpoetUrl}/astralpoet`,
            },
            {
              source: "/astralpoet/:path*",
              destination: `${astralpoetUrl}/astralpoet/:path*`,
            },
          ]
        : []),
      // Resume app routes - more specific routes first, then wildcard
      {
        source: "/apps/resume",
        destination: `${resumeUrl}${resumeBasePath}`,
      },
      // Proxy static assets for resume app (must come before wildcard)
      {
        source: "/apps/resume/_next/static/:path*",
        destination: `${resumeUrl}${resumeBasePath}/_next/static/:path*`,
      },
      {
        source: "/apps/resume/_next/webpack-hmr",
        destination: `${resumeUrl}${resumeBasePath}/_next/webpack-hmr`,
      },
      // Wildcard route (must come last to catch all other paths)
      {
        source: "/apps/resume/:path*",
        destination: `${resumeUrl}${resumeBasePath}/:path*`,
      },
      // Proxy resume app basePath routes (resume app generates /resume/* paths due to basePath)
      // Only needed in development when resume app has basePath
      ...(isResumeLocalhost
        ? [
            {
              source: "/resume",
              destination: `${resumeUrl}/resume`,
            },
            {
              source: "/resume/:path*",
              destination: `${resumeUrl}/resume/:path*`,
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
