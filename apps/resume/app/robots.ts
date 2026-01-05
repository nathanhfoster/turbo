import type { MetadataRoute } from "next";
import { createRobots } from "@nathanhfoster/pwa/utils";

export default function robots(): MetadataRoute.Robots {
  return createRobots({
    baseUrl: "https://agentnate.dev",
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://agentnate.dev/resume/sitemap.xml",
  });
}

