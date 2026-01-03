import type { MetadataRoute } from "next";
import { getAllPosts } from "@/domains/Blog/lib/mdx";

const BASE_URL = "https://agentnate.dev";
const MAX_URLS_PER_SITEMAP = 50000; // Google's limit

// Static routes
const STATIC_ROUTES = ["", "/blog", "/portfolio", "/contact", "/services"];

/**
 * Generate sitemap IDs based on total number of URLs
 * Splits into multiple sitemaps if needed (Google limit: 50,000 URLs per sitemap)
 */
export async function generateSitemaps() {
  const posts = getAllPosts();
  const totalUrls = STATIC_ROUTES.length + posts.length;
  const numberOfSitemaps = Math.ceil(totalUrls / MAX_URLS_PER_SITEMAP);

  return Array.from({ length: numberOfSitemaps }, (_, i) => ({ id: i }));
}

/**
 * Generate individual sitemap based on ID
 */
export default async function sitemap(
  props: { id: Promise<string> },
): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const sitemapIndex = parseInt(id, 10);

  const posts = getAllPosts();
  const allUrls: MetadataRoute.Sitemap = [];

  // Static routes (always in first sitemap)
  if (sitemapIndex === 0) {
    const staticRoutes = STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }));
    allUrls.push(...staticRoutes);
  }

  // Calculate blog posts range for this sitemap
  if (sitemapIndex === 0) {
    // First sitemap: static routes + remaining slots for blog posts
    const availableSlots = MAX_URLS_PER_SITEMAP - STATIC_ROUTES.length;
    const blogPostsForSitemap = posts.slice(0, availableSlots);
    const blogPosts = blogPostsForSitemap.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    allUrls.push(...blogPosts);
    return allUrls;
  }

  // Subsequent sitemaps: only blog posts
  // Calculate the correct start index accounting for static routes in sitemap 0
  const staticRoutesCount = STATIC_ROUTES.length;
  const startIndex = sitemapIndex * MAX_URLS_PER_SITEMAP - staticRoutesCount;
  const endIndex = (sitemapIndex + 1) * MAX_URLS_PER_SITEMAP - staticRoutesCount;
  const blogPostsForSitemap = posts.slice(startIndex, endIndex);
  const blogPosts = blogPostsForSitemap.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  allUrls.push(...blogPosts);

  return allUrls;
}
