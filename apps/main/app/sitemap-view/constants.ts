/**
 * Constants for sitemap generation and visualization
 */

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://agentnate.dev";
export const MAX_URLS_PER_SITEMAP = 50000; // Google's limit

export const STATIC_ROUTES = ["", "/blog", "/portfolio", "/contact", "/services"] as const;

