/**
 * Utility functions for Settings components
 */

import { MESSAGES, PERMISSION_NAMES } from "./constants";

/**
 * Clear all IndexedDB databases
 */
export async function clearIndexedDB(): Promise<void> {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return;
  }

  try {
    const databases = await indexedDB.databases();
    await Promise.all(
      databases.map((db) => {
        if (db.name) {
          return indexedDB.deleteDatabase(db.name);
        }
        return Promise.resolve();
      }),
    );
  } catch (error) {
    console.error("Error clearing IndexedDB:", error);
    throw error;
  }
}

/**
 * Clear all browser storage (localStorage, sessionStorage, IndexedDB)
 * Optionally accepts a callback to clear cookies
 */
export async function clearAllStorage(
  onClearCookies?: () => void,
): Promise<void> {
  localStorage.clear();
  sessionStorage.clear();

  if (onClearCookies) {
    onClearCookies();
  }

  await clearIndexedDB();
}

/**
 * Reset notification permission
 */
export async function resetNotificationPermission(): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return;
  }

  try {
    await Notification.requestPermission();
  } catch (error) {
    console.error("Error resetting notification permission:", error);
    throw error;
  }
}

/**
 * Query a browser permission
 */
export async function queryPermission(
  name: PermissionName,
): Promise<PermissionStatus | null> {
  if (typeof window === "undefined" || !("permissions" in navigator)) {
    return null;
  }

  try {
    return await navigator.permissions.query({ name });
  } catch (error) {
    const message =
      name === PERMISSION_NAMES.camera
        ? MESSAGES.permissions.notSupported.camera
        : name === PERMISSION_NAMES.microphone
          ? MESSAGES.permissions.notSupported.microphone
          : name === PERMISSION_NAMES.geolocation
            ? MESSAGES.permissions.notSupported.geolocation
            : `Permission ${name} not supported`;
    console.log(message);
    return null;
  }
}

/**
 * Reset all browser permissions
 */
export async function resetAllPermissions(): Promise<void> {
  // Reset notification permission
  await resetNotificationPermission();

  // Reset other permissions
  await Promise.all([
    queryPermission(PERMISSION_NAMES.camera),
    queryPermission(PERMISSION_NAMES.microphone),
    queryPermission(PERMISSION_NAMES.geolocation),
  ]);
}

/**
 * Handle permission request with denied state check
 */
export async function handleNotificationPermissionRequest(
  currentPermission: NotificationPermission,
  requestPermission: () => Promise<NotificationPermission>,
): Promise<NotificationPermission> {
  if (currentPermission === "denied") {
    alert(MESSAGES.notifications.denied);
    return currentPermission;
  }

  return await requestPermission();
}

/**
 * Confirm action with user
 */
export function confirmAction(message: string): boolean {
  return confirm(message);
}

/**
 * Show alert message
 */
export function showAlert(message: string): void {
  alert(message);
}

/**
 * Reload the page
 */
export function reloadPage(): void {
  window.location.reload();
}
