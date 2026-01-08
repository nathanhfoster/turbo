import type { NextConfig } from 'next'

const isDevelopment = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
	// Only use basePath in development when running standalone
	// In production, astralpoet app is deployed separately without basePath
	basePath: isDevelopment ? '/astralpoet' : undefined,
	// Use assetPrefix in production so assets load from astralpoet app's domain when proxied
	// This ensures static assets are served from the correct domain
	// Set APPS_ASTRAL_POET_URL env var in Vercel to override the default astralpoet app URL
	assetPrefix: isDevelopment
		? undefined
		: process.env.APPS_ASTRAL_POET_URL || 'https://turbo-astralpoet.vercel.app',
	transpilePackages: [
		'@nathanhfoster/react-hooks',
		'@nathanhfoster/resurrection',
		'@nathanhfoster/ui',
		'@nathanhfoster/utils',
		'@nathanhfoster/pwa',
		'@nathanhfoster/indexeddb',
	],
	headers: async () => [
		{
			source: '/(.*)',
			headers: [
				{
					key: 'Cache-Control',
					value: isDevelopment
						? 'no-cache, no-store, must-revalidate'
						: 'public, max-age=0, must-revalidate',
				},
				{ key: 'Service-Worker-Allowed', value: '/' },
			],
		},
		...(isDevelopment
			? [
					{
						source: '/_next/static/:path*',
						headers: [
							{
								key: 'Cache-Control',
								value: 'no-cache, no-store, must-revalidate',
							},
						],
					},
				]
			: []),
	],
}

export default nextConfig
