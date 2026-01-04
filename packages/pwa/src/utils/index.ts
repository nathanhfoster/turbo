/**
 * PWA Utility Functions
 */

/**
 * Helper to convert VAPID key from base64 to Uint8Array
 * Used for push notification subscriptions
 */
export function urlBase64ToUint8Array(base64String: string): BufferSource {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray as BufferSource;
}

// Service Worker utilities
export * from "./service-worker";

// Offline HTML utilities
export * from "./offline-html";

// Manifest helpers
export * from "./manifest-helpers";

// Robots helpers
export * from "./robots-helpers";
