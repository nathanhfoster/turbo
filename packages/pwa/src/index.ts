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
export { InstallPromptProvider, useInstallPrompt } from "./providers/InstallPromptProvider";

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
export { urlBase64ToUint8Array } from "./utils";
