/**
 * Constants for sitemap generation and visualization
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.NODE_ENV === "production"
    ? "https://agentnate.dev"
    : "http://localhost:3000";
export const MAX_URLS_PER_SITEMAP = 50000; // Google's limit

export const STATIC_ROUTES = [
  "",
  "/newsletter",
  "/apps",
  "/services",
  "/settings",
  "/sitemap-view",
] as const;
