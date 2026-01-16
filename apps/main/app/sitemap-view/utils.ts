import { getAllPosts } from "@/domains/Newsletter/lib/mdxParser";
import type { SitemapData, SitemapEntry } from "./types";
import { BASE_URL, MAX_URLS_PER_SITEMAP, STATIC_ROUTES } from "./constants";

/**
 * Generate all sitemap data for visualization
 * This mirrors the logic from sitemap.ts but returns structured data
 */
export function getAllSitemapData(): SitemapData[] {
  const posts = getAllPosts();
  const sitemaps: SitemapData[] = [];
  const totalUrls = STATIC_ROUTES.length + posts.length;
  const numberOfSitemaps = Math.ceil(totalUrls / MAX_URLS_PER_SITEMAP);

  for (let i = 0; i < numberOfSitemaps; i++) {
    const entries: SitemapEntry[] = [];

    // Static routes (only in first sitemap)
    if (i === 0) {
      const staticRoutes = STATIC_ROUTES.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        type: "static" as const,
      }));
      entries.push(...staticRoutes);
    }

    // Newsletter posts
    if (i === 0) {
      const availableSlots = MAX_URLS_PER_SITEMAP - STATIC_ROUTES.length;
      const newsletterPostsForSitemap = posts.slice(0, availableSlots);
      const newsletterPosts = newsletterPostsForSitemap.map((post) => ({
        url: `${BASE_URL}/newsletter/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: "monthly",
        priority: 0.6,
        type: "newsletter" as const,
      }));
      entries.push(...newsletterPosts);
    } else {
      const staticRoutesCount = STATIC_ROUTES.length;
      const startIndex = i * MAX_URLS_PER_SITEMAP - staticRoutesCount;
      const endIndex = (i + 1) * MAX_URLS_PER_SITEMAP - staticRoutesCount;
      const newsletterPostsForSitemap = posts.slice(startIndex, endIndex);
      const newsletterPosts = newsletterPostsForSitemap.map((post) => ({
        url: `${BASE_URL}/newsletter/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: "monthly",
        priority: 0.6,
        type: "newsletter" as const,
      }));
      entries.push(...newsletterPosts);
    }

    sitemaps.push({
      id: i,
      entries,
      count: entries.length,
    });
  }

  return sitemaps;
}
