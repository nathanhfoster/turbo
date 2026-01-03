import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  disable: isDev,
  reloadOnOnline: true,
  buildExcludes: [/app-build-manifest.json$/, /dynamic-css-manifest.json$/],
  fallbacks: {
    document: '/offline.html',
  },
  runtimeCaching: [
    // Blog content - NetworkFirst
    {
      urlPattern: /^\/blog\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'blog-cache',
        expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    // Images - StaleWhileRevalidate
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'image-cache',
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    // Next.js images
    {
      urlPattern: /\/_next\/image\?url=.+$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'next-image-cache',
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    // JavaScript and CSS
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-cache',
        expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    // API routes - NetworkFirst
    {
      urlPattern: /^\/api\/(?!auth).*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 16, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    // Same-origin pages
    {
      urlPattern: ({ url, request }: { url: URL; request: Request }) =>
        url.origin === self.location.origin && request.destination === 'document',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
};

const nextConfig: NextConfig = {
  transpilePackages: [
    '@nathanhfoster/resurrection',
    '@nathanhfoster/ui',
    '@nathanhfoster/utils',
    '@nathanhfoster/theme',
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        { key: 'Service-Worker-Allowed', value: '/' },
      ],
    },
  ],
};

// @ts-expect-error - next-pwa has type incompatibilities with Next.js 15
const config: NextConfig = withPWA(pwaConfig)(nextConfig);
export default config;
