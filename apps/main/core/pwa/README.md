# PWA Core Feature

Progressive Web App (PWA) functionality for the main app, including service worker management, offline support, and device detection.

## Purpose

This core feature provides PWA capabilities shared across domains in the main app:
- Service worker management
- Offline support
- Install prompts
- Push notifications
- Device detection
- PWA manifest configuration

## Structure

```
pwa/
├── hooks/              # PWA-related hooks
├── services/           # PWA services
├── providers/          # React context providers
├── types/              # Type definitions
└── utils/              # Utility functions
```

## Usage

### PWA Provider

Wrap your app with the PWA provider:

```typescript
import { PWAProvider } from '@/core/pwa';

function App() {
  return (
    <PWAProvider>
      {/* Your app */}
    </PWAProvider>
  );
}
```

### Device Detection

```typescript
import { useDeviceSelector } from '@nathanhfoster/pwa/device';

function MyComponent() {
  const {
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
  } = useDeviceSelector();

  if (isMobile) {
    return <MobileView />;
  }

  return <DesktopView />;
}
```

### Service Worker

Service worker is automatically registered and managed by the PWA package.

### Install Prompt

```typescript
import { useInstallPrompt } from '@nathanhfoster/pwa';

function InstallButton() {
  const { prompt, isInstallable, install } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button onClick={install}>
      Install App
    </button>
  );
}
```

## Configuration

### Manifest

PWA manifest is configured in `app/manifest.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My App',
    short_name: 'App',
    description: 'App description',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      // ... more icons
    ],
  };
}
```

### Service Worker

Service worker configuration is handled by `@nathanhfoster/pwa` package.

## Features

### Offline Support

- Automatic caching of static assets
- Offline fallback page
- Cache strategies for different resource types

### Push Notifications

Configure VAPID keys in environment variables:

```bash
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-public-key
VAPID_PRIVATE_KEY=your-private-key
VAPID_EMAIL=mailto:your-email@example.com
```

### Install Prompt

Users can install the app on their devices:
- Mobile: Add to home screen
- Desktop: Install as app

## Related Packages

- `@nathanhfoster/pwa` - Core PWA package
- `@nathanhfoster/ui` - UI components

## Architecture

This core feature follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../../../FRONTEND_ARCHITECTURE.md) principles:

- **App-Specific** - Shared across domains in main app only
- **Cross-Domain** - Can be used by any domain in the app
- **Top-Down Flow** - Uses packages, not domains
