/**
 * Determines if a navigation item is active based on the current pathname.
 * 
 * Handles:
 * - Relative paths (e.g., "/", "/settings")
 * - Absolute URLs (e.g., "http://localhost:3000/apps/resume")
 * - Nested routes (e.g., "/apps/resume" prefix extraction)
 * - Path normalization (trailing slashes, exact matching)
 * 
 * @param href - The href from the nav item (can be relative or absolute URL)
 * @param pathname - The current pathname from usePathname()
 * @param options - Optional configuration
 * @returns true if the nav item should be considered active
 * 
 * @example
 * ```ts
 * // Main app - relative paths
 * isNavItemActive("/settings", "/settings") // true
 * isNavItemActive("/", "/") // true
 * 
 * // Resume app - absolute URLs with nested routes
 * isNavItemActive("http://localhost:3000/apps/resume", "/") // true
 * isNavItemActive("http://localhost:3000/apps/resume/settings", "/settings") // true
 * ```
 */
export function isNavItemActive(
  href: string,
  pathname: string,
  options?: {
    /**
     * Prefix to strip from absolute URLs before comparing.
     * Useful for multi-zone architectures where absolute URLs point to nested routes.
     * @example "/apps/resume" - strips this prefix from href pathname before comparison
     */
    stripPrefix?: string;
    /**
     * Base path that might be included in the pathname (e.g., from Next.js basePath).
     * If provided, this will be stripped from the pathname before comparison.
     * @example "/resume" - strips this from pathname if present
     */
    basePath?: string;
  }
): boolean {
  // Normalize pathname (remove trailing slash except for root, handle empty strings)
  const normalizePath = (path: string): string => {
    // Handle empty string or just whitespace
    if (!path || path.trim() === "") return "/";
    // Handle root path
    if (path === "/") return "/";
    // Remove trailing slash and ensure it starts with /
    const cleaned = path.replace(/\/$/, "").trim();
    return cleaned || "/";
  };

  // Strip prefixes from pathname if present
  let normalizedPathname = pathname;
  // Handle empty pathname (Next.js may return "" for root with basePath)
  if (!normalizedPathname || normalizedPathname.trim() === "") {
    normalizedPathname = "/";
  } else {
    // Strip stripPrefix first (for multi-zone architecture where pathname includes the proxy prefix)
    if (options?.stripPrefix && normalizedPathname.startsWith(options.stripPrefix)) {
      normalizedPathname = normalizedPathname.slice(options.stripPrefix.length) || "/";
    }
    // Then strip basePath if still present (Next.js basePath handling)
    else if (options?.basePath && normalizedPathname.startsWith(options.basePath)) {
      normalizedPathname = normalizedPathname.slice(options.basePath.length) || "/";
    }
  }
  normalizedPathname = normalizePath(normalizedPathname);

  // Handle absolute URLs
  try {
    // Check if href is already an absolute URL
    const isAbsoluteUrl = href.startsWith("http://") || href.startsWith("https://");
    const url = isAbsoluteUrl 
      ? new URL(href)
      : new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    
    let hrefPath = url.pathname;

    // Strip prefix if provided (for nested routes in multi-zone architecture)
    if (options?.stripPrefix && hrefPath.startsWith(options.stripPrefix)) {
      hrefPath = hrefPath.slice(options.stripPrefix.length) || "/";
    }

    const normalizedHrefPath = normalizePath(hrefPath);
    
    // Exact match
    return normalizedPathname === normalizedHrefPath;
  } catch {
    // Not a valid URL, treat as relative path
    const normalizedHref = normalizePath(href);
    return normalizedPathname === normalizedHref;
  }
}

