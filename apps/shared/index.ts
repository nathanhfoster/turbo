/**
 * Shared app utilities index
 * Export commonly used shared utilities for easy importing
 */

// Layout utilities
export {
  createRootLayout,
  createAppMetadata,
  createAppViewport,
  getInitialAppState,
  parseCookie,
  type AppConfig,
  type RootLayoutProps,
} from "./layouts/createRootLayout";

// Sitemap utilities
export {
  generateSitemapData,
  type SitemapConfig,
} from "./app/sitemap-view/utils";
export { SitemapViewPage } from "./app/sitemap-view/page";
export type { SitemapData, SitemapEntry } from "./app/sitemap-view/types";

// OpenGraph image
export {
  createOpenGraphImage,
  type OpenGraphImageConfig,
} from "./app/opengraph-image";

// Manifest icons
export {
  STANDARD_MANIFEST_ICONS,
  FULL_MANIFEST_ICONS,
} from "./config/manifest-icons";
