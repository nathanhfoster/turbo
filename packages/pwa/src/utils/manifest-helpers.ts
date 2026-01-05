/**
 * Manifest helper utilities for Next.js App Router
 * Provides type-safe helpers for creating manifest routes
 */

export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: "any" | "maskable" | "monochrome";
}

export interface ManifestConfig {
  name: string;
  short_name: string;
  description: string;
  id?: string;
  start_url?: string;
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  background_color?: string;
  theme_color?: string;
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape-primary"
    | "landscape-secondary";
  dir?: "ltr" | "rtl" | "auto";
  scope?: string;
  lang?: string;
  categories?: string[];
  icons: ManifestIcon[];
}

/**
 * Create a Next.js manifest route handler
 * Returns a manifest object compatible with Next.js MetadataRoute.Manifest
 */
export function createManifest<T = any>(config: ManifestConfig): T {
  return {
    name: config.name,
    short_name: config.short_name,
    description: config.description,
    ...(config.id && { id: config.id }),
    start_url: config.start_url || "/",
    display: config.display || "standalone",
    ...(config.background_color && {
      background_color: config.background_color,
    }),
    ...(config.theme_color && { theme_color: config.theme_color }),
    ...(config.orientation && { orientation: config.orientation }),
    ...(config.dir && { dir: config.dir }),
    ...(config.scope && { scope: config.scope }),
    ...(config.lang && { lang: config.lang }),
    ...(config.categories && { categories: config.categories }),
    icons: config.icons.map((icon) => ({
      src: icon.src,
      sizes: icon.sizes,
      type: icon.type,
      ...(icon.purpose && { purpose: icon.purpose }),
    })),
  } as T;
}


