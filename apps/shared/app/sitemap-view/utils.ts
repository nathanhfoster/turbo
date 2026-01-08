import type { SitemapData, SitemapEntry } from "./types";

export interface SitemapConfig {
  baseUrl: string;
  maxUrlsPerSitemap?: number;
  staticRoutes: string[];
  dynamicRoutes?: Array<{
    url: string;
    lastModified: string;
    changeFrequency?: string;
    priority?: number;
    type: string;
  }>;
}

const DEFAULT_MAX_URLS_PER_SITEMAP = 50000; // Google's limit

/**
 * Generate all sitemap data for visualization
 * This creates structured data that can be used for both XML sitemap generation
 * and visual sitemap display
 */
export function generateSitemapData(config: SitemapConfig): SitemapData[] {
  const {
    baseUrl,
    maxUrlsPerSitemap = DEFAULT_MAX_URLS_PER_SITEMAP,
    staticRoutes,
    dynamicRoutes = [],
  } = config;

  const sitemaps: SitemapData[] = [];
  const totalUrls = staticRoutes.length + dynamicRoutes.length;
  const numberOfSitemaps = Math.ceil(totalUrls / maxUrlsPerSitemap);

  for (let i = 0; i < numberOfSitemaps; i++) {
    const entries: SitemapEntry[] = [];

    // Static routes (only in first sitemap)
    if (i === 0) {
      const staticRouteEntries = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        type: "static",
      }));
      entries.push(...staticRouteEntries);
    }

    // Dynamic routes
    if (i === 0) {
      const availableSlots = maxUrlsPerSitemap - staticRoutes.length;
      const dynamicRoutesForSitemap = dynamicRoutes.slice(0, availableSlots);
      const dynamicEntries = dynamicRoutesForSitemap.map((route) => ({
        url: route.url.startsWith("http")
          ? route.url
          : `${baseUrl}${route.url}`,
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency || "monthly",
        priority: route.priority || 0.6,
        type: route.type,
      }));
      entries.push(...dynamicEntries);
    } else {
      const staticRoutesCount = staticRoutes.length;
      const startIndex = i * maxUrlsPerSitemap - staticRoutesCount;
      const endIndex = (i + 1) * maxUrlsPerSitemap - staticRoutesCount;
      const dynamicRoutesForSitemap = dynamicRoutes.slice(startIndex, endIndex);
      const dynamicEntries = dynamicRoutesForSitemap.map((route) => ({
        url: route.url.startsWith("http")
          ? route.url
          : `${baseUrl}${route.url}`,
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency || "monthly",
        priority: route.priority || 0.6,
        type: route.type,
      }));
      entries.push(...dynamicEntries);
    }

    sitemaps.push({
      id: i,
      entries,
      count: entries.length,
    });
  }

  return sitemaps;
}
