/**
 * Robots.txt helper utilities for Next.js App Router
 * Provides type-safe helpers for creating robots routes
 */

import type { MetadataRoute } from "next";

export interface RobotsConfig {
  baseUrl: string;
  rules?: Array<{
    userAgent?: string | string[];
    allow?: string | string[];
    disallow?: string | string[];
    crawlDelay?: number;
  }>;
  sitemap?: string | string[];
}

/**
 * Create a Next.js robots route handler
 */
export function createRobots(config: RobotsConfig): MetadataRoute.Robots {
  const defaultRules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/"],
    },
  ];

  // Filter and ensure all rules have a userAgent (required by MetadataRoute.Robots)
  const rules: MetadataRoute.Robots["rules"] =
    config.rules
      ?.filter(
        (rule): rule is typeof rule & { userAgent: string | string[] } =>
          rule.userAgent !== undefined,
      )
      .map((rule) => ({
        userAgent: rule.userAgent,
        ...(rule.allow && { allow: rule.allow }),
        ...(rule.disallow && { disallow: rule.disallow }),
        ...(rule.crawlDelay !== undefined && { crawlDelay: rule.crawlDelay }),
      })) || defaultRules;

  return {
    rules,
    ...(config.sitemap && {
      sitemap: Array.isArray(config.sitemap)
        ? config.sitemap
        : [config.sitemap],
    }),
  };
}



