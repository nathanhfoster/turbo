# Shared App Utilities

This directory contains shared utilities, components, and templates that can be used across all apps in the monorepo.

## Structure

```
apps/shared/
├── layouts/          # Shared layout utilities
├── styles/           # Shared CSS templates
├── public/           # Shared public assets
├── app/              # Shared Next.js app directory files
├── config/           # Shared configuration templates
└── utils/            # Shared utility functions
```

## Usage

### Layout Utilities

Use `createRootLayout` to set up a consistent layout structure:

```tsx
// apps/main/app/layout.tsx
import {
  createRootLayout,
  createAppMetadata,
  createAppViewport,
} from "@/shared/layouts/createRootLayout";

export const metadata = createAppMetadata({
  name: "My App",
  shortName: "App",
  description: "My app description",
  baseUrl: "https://myapp.dev",
});

export const viewport = createAppViewport("#0077c5");

export default async function RootLayout({ children }) {
  return createRootLayout({
    children,
    appConfig: {
      name: "My App",
      shortName: "App",
      description: "My app description",
      baseUrl: "https://myapp.dev",
    },
    additionalProviders: <YourCustomProvider>{children}</YourCustomProvider>,
  });
}
```

### Global Styles

Import the shared globals.css template and customize:

```css
/* apps/main/app/globals.css */
@import "../../../shared/styles/globals.css";

/* Add your app-specific @source directives */
@source "../**/*.{ts,tsx,js,jsx,mdx}";
@source "../../domains/**/*.{ts,tsx,js,jsx,mdx}";

/* Override theme if needed */
@theme {
  --color-primary: #YOUR_COLOR;
}
```

### Service Worker & Offline Page

Copy the service worker and offline.html to your app's public directory:

```bash
cp apps/shared/public/service-worker.js apps/main/public/
cp apps/shared/public/offline.html apps/main/public/
```

Then customize:

- Update `CACHE_NAME` in service-worker.js
- Update `PRECACHE_ASSETS` with your app's critical assets
- Customize offline.html title and styling if needed

### Sitemap Utilities

Use the shared sitemap utilities:

```tsx
// apps/main/app/sitemap-view/page.tsx
import { SitemapViewPage } from "@/shared/app/sitemap-view/page";
import { generateSitemapData } from "@/shared/app/sitemap-view/utils";

export default function Page() {
  const sitemaps = generateSitemapData({
    baseUrl: "https://myapp.dev",
    staticRoutes: ["", "/about", "/contact"],
    dynamicRoutes: posts.map((post) => ({
      url: `/posts/${post.slug}`,
      lastModified: post.date,
      type: "post",
    })),
  });

  return <SitemapViewPage sitemaps={sitemaps} baseUrl="https://myapp.dev" />;
}
```

### OpenGraph Image

Use the shared OpenGraph image generator:

```tsx
// apps/main/app/opengraph-image.tsx
import { createOpenGraphImage } from "@/shared/app/opengraph-image";

export default createOpenGraphImage({
  title: "My App",
  subtitle: "My App Description",
  domain: "myapp.dev",
});
```

### Manifest Icons

Use shared manifest icon sets:

```tsx
// apps/main/app/manifest.ts
import { STANDARD_MANIFEST_ICONS } from "@/shared/config/manifest-icons";
import { createManifest } from "@nathanhfoster/pwa/utils";

export default function manifest() {
  return createManifest({
    name: "My App",
    shortName: "App",
    description: "My app description",
    icons: STANDARD_MANIFEST_ICONS,
    // ... other config
  });
}
```

### Vercel Configuration

Use the vercel.json template:

```json
{
  "buildCommand": "cd ../.. && pnpm lint && pnpm check-types && pnpm turbo build --filter=@nathanhfoster/main",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

## Best Practices

1. **Don't modify shared files directly** - Copy and customize in your app
2. **Keep shared utilities generic** - They should work for all apps
3. **Document app-specific customizations** - Note what you changed and why
4. **Update shared utilities carefully** - Changes affect all apps

## Adding New Shared Utilities

When adding new shared utilities:

1. Place them in the appropriate directory (`layouts/`, `styles/`, `app/`, etc.)
2. Make them configurable via props/parameters
3. Document usage in this README
4. Ensure they work across all apps
