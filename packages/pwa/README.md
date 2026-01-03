# @nathanhfoster/pwa

Progressive Web App utilities for React and Next.js applications.

## Features

- 🔄 **Service Worker Management** - Automatic registration and update handling
- 📲 **Install Prompt** - Capture and trigger PWA install prompts
- 🔔 **Push Notifications** - Subscribe, unsubscribe, and send push notifications
- ⚛️ **React Hooks** - Easy-to-use React hooks for all PWA features
- 🎯 **TypeScript** - Full TypeScript support with type definitions

## Installation

This package is part of the monorepo and is referenced via workspace protocol:

```json
{
  "dependencies": {
    "@nathanhfoster/pwa": "workspace:*"
  }
}
```

## Usage

### 1. Wrap your app with the provider

```tsx
// app/layout.tsx (Next.js)
import { InstallPromptProvider } from '@nathanhfoster/pwa';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <InstallPromptProvider>
          {children}
        </InstallPromptProvider>
      </body>
    </html>
  );
}
```

### 2. Use PWA features in your components

```tsx
'use client';

import { useInstallPrompt } from '@nathanhfoster/pwa';

export function InstallButton() {
  const { installPrompt, serviceWorker, pushNotification } = useInstallPrompt();

  return (
    <div>
      {/* Install PWA */}
      {installPrompt.deferredPrompt && (
        <button onClick={installPrompt.handleInstallClick}>
          Install App
        </button>
      )}

      {/* Update Service Worker */}
      {serviceWorker.waitingWorker && (
        <button onClick={serviceWorker.activateUpdate}>
          Update Available - Click to Refresh
        </button>
      )}

      {/* Push Notifications */}
      <button onClick={pushNotification.subscribeToPush}>
        Enable Notifications
      </button>
    </div>
  );
}
```

## API Reference

### InstallPromptProvider

Context provider that manages PWA state.

```tsx
<InstallPromptProvider>
  {children}
</InstallPromptProvider>
```

### useInstallPrompt()

Main hook that provides access to all PWA features.

```tsx
const { serviceWorker, installPrompt, pushNotification } = useInstallPrompt();
```

Returns:
- `serviceWorker` - Service worker management
- `installPrompt` - PWA install prompt handling
- `pushNotification` - Push notification management

### Service Worker API

```tsx
const { serviceWorker } = useInstallPrompt();

// Properties
serviceWorker.waitingWorker; // ServiceWorker | null

// Methods
serviceWorker.activateUpdate(); // Activate waiting service worker
serviceWorker.unregisterServiceWorkers(); // Unregister all service workers
```

### Install Prompt API

```tsx
const { installPrompt } = useInstallPrompt();

// Properties
installPrompt.deferredPrompt; // BeforeInstallPromptEvent | null

// Methods
installPrompt.handleInstallClick(); // Show install prompt
```

### Push Notification API

```tsx
const { pushNotification } = useInstallPrompt();

// Properties
pushNotification.subscription; // PushSubscription | null
pushNotification.permission; // NotificationPermission

// Methods
pushNotification.requestPermission(); // Request notification permission
pushNotification.subscribeToPush(); // Subscribe to push notifications
pushNotification.unsubscribeFromPush(); // Unsubscribe from push
pushNotification.sendPushNotification(payload); // Send a push notification
```

### Individual Hooks

You can also use individual hooks directly:

```tsx
import {
  useServiceWorkerUpdate,
  useInstallPromptHandler,
  usePushNotification,
} from '@nathanhfoster/pwa/hooks';

const serviceWorker = useServiceWorkerUpdate();
const installPrompt = useInstallPromptHandler();
const pushNotification = usePushNotification();
```

## Environment Variables

For push notifications, set your VAPID public key:

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
```

## API Routes Required

For push notifications to work, you need these API routes in your app:

- `POST /api/push/subscribe` - Handle push subscription
- `POST /api/push/unsubscribe` - Handle unsubscribe
- `POST /api/push/send` - Send push notification

## TypeScript Types

All types are exported and available:

```tsx
import type {
  BeforeInstallPromptEvent,
  ServiceWorkerUpdateState,
  InstallPromptState,
  PushNotificationState,
  PushNotificationPayload,
  InstallPromptContextValue,
} from '@nathanhfoster/pwa';
```

## Architecture

This package follows the monorepo architecture guidelines:

```
packages/pwa/
├── src/
│   ├── providers/        # React context providers
│   ├── hooks/           # React hooks for PWA features
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── index.ts         # Main exports
├── package.json
├── tsconfig.json
└── README.md
```

## Browser Support

- Service Workers: Modern browsers (Chrome, Firefox, Safari, Edge)
- Install Prompt: Chromium-based browsers
- Push Notifications: Modern browsers with notification support

## License

Part of the @nathanhfoster monorepo.
