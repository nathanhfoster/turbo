/**
 * Type definitions for sitemap visualization
 */

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
  type: string; // e.g., "static" | "newsletter" | "dynamic"
}

export interface SitemapData {
  id: number;
  entries: SitemapEntry[];
  count: number;
}
