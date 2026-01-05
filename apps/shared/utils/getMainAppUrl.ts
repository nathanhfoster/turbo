/**
 * Get the main app URL for cross-app navigation
 * 
 * Works in both client and server contexts:
 * - Client-side: Uses window.location.origin (doesn't need env var)
 * - Server-side: Uses APPS_MAIN_URL env var or localhost fallback
 * 
 * Note: Uses non-prefixed env var since it's only needed server-side.
 * Client-side always uses window.location.origin, so no env var exposure needed.
 * 
 * @returns The main app URL (e.g., "https://www.agentnate.dev" or "http://localhost:3000")
 * 
 * @example
 * ```ts
 * import { getMainAppUrl } from '../../shared/utils/getMainAppUrl';
 * 
 * const mainAppUrl = getMainAppUrl();
 * const resumeUrl = `${mainAppUrl}/apps/resume`;
 * ```
 */
export function getMainAppUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback for SSR - in production this would be your actual domain
  return process.env.APPS_MAIN_URL || "http://localhost:3000";
}

