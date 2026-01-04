/**
 * Robots.txt helper utilities for Next.js App Router
 * Provides type-safe helpers for creating robots routes
 */

import type { MetadataRoute } from "next"

export interface RobotsConfig {
	baseUrl: string
	rules?: Array<{
		userAgent?: string | string[]
		allow?: string | string[]
		disallow?: string | string[]
		crawlDelay?: number
	}>
	sitemap?: string | string[]
}

/**
 * Create a Next.js robots route handler
 */
export function createRobots(config: RobotsConfig): MetadataRoute.Robots {
	return {
		rules: config.rules || [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/private/"],
			},
		],
		...(config.sitemap && {
			sitemap: Array.isArray(config.sitemap) ? config.sitemap : [config.sitemap],
		}),
	}
}


