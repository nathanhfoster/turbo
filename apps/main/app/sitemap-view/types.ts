/**
 * Type definitions for sitemap visualization
 */

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
  type: "static" | "blog";
}

export interface SitemapData {
  id: number;
  entries: SitemapEntry[];
  count: number;
}

