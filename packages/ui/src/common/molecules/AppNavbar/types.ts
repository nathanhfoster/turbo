import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
  Icon?: ReactNode;
}

export interface AppNavbarProps {
  logo?: ReactNode;
  /**
   * Custom href for the default logo. Only used when logo is not provided.
   * @default "/"
   */
  logoHref?: string;
  navItems: NavItem[];
  bottomNavItems: NavItem[];
  rightContent?: ReactNode;
  /**
   * Prefix to strip from absolute URLs before comparing paths.
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

