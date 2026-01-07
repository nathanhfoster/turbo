import type { MetadataRoute } from "next";

const BASE_URL = "https://agentnate.dev/apps/astralpoet";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

