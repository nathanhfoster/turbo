/**
 * @nathanhfoster/pwa
 *
 * Progressive Web App utilities for React applications.
 * Provides hooks and providers for:
 * - Service Worker management
 * - PWA install prompts
 * - Push notifications
 *
 * @example
 * ```tsx
 * import { InstallPromptProvider, useInstallPrompt } from '@nathanhfoster/pwa';
 *
 * // In your root layout
 * <InstallPromptProvider>{children}</InstallPromptProvider>
 *
 * // In your components
 * const { installPrompt, serviceWorker, pushNotification } = useInstallPrompt();
 * ```
 */

// Providers
export {
  InstallPromptProvider,
  useInstallPrompt,
} from "./providers/InstallPromptProvider";

// Hooks
export {
  useServiceWorkerUpdate,
  useInstallPromptHandler,
  usePushNotification,
} from "./hooks";

// Types
export type {
  BeforeInstallPromptEvent,
  ServiceWorkerUpdateState,
  InstallPromptState,
  PushNotificationState,
  PushNotificationPayload,
  InstallPromptContextValue,
} from "./types";

// Utils
export {
  urlBase64ToUint8Array,
  generateServiceWorker,
  registerServiceWorker,
  generateOfflineHTML,
  createManifest,
  createRobots,
} from "./utils";
export type { ServiceWorkerConfig } from "./utils/service-worker";
export type { OfflineHTMLConfig } from "./utils/offline-html";
export type { ManifestConfig, ManifestIcon } from "./utils/manifest-helpers";
export type { RobotsConfig } from "./utils/robots-helpers";

// Settings
export {
  Settings,
  InstallApp,
  ServiceWorker,
  Notifications,
  Permissions,
  Storage,
} from "./settings";
export type {
  SettingsProps,
  InstallAppProps,
  ServiceWorkerProps,
  NotificationsProps,
  PermissionsProps,
  StorageProps,
} from "./settings";
