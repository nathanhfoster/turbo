import type { MetadataRoute } from "next";

const BASE_URL = "https://agentnate.dev/resume";

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

