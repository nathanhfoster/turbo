/**
 * Constants for Settings components
 */

// Default CSS classes
export const DEFAULT_CLASSES = {
  container: "p-4 border rounded-lg",
  title: "text-lg font-semibold mb-2 text-foreground",
  description: "text-sm text-foreground-muted mb-4",
  button: {
    primary: "px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50",
    success: "px-4 py-2 bg-green-500 text-white rounded",
    danger: "px-4 py-2 bg-red-500 text-white rounded",
    warning: "px-4 py-2 bg-orange-500 text-white rounded",
  },
  settingsContainer: "container mx-auto px-4 py-8",
  settingsTitle: "text-3xl font-bold mb-8",
  settingsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  buttonGroup: "space-y-2",
  buttonRow: "space-x-2",
} as const;

// Messages
export const MESSAGES = {
  installApp: {
    title: "Install App",
    ready: "Install the app on your device",
    notReady: "Not ready to install",
    buttonReady: "Install App",
    buttonNotReady: "Not ready to install",
  },
  serviceWorker: {
    title: "Service Worker",
    description: "Manage service worker updates and registration",
    updateAvailable: "Update Available - Click to Install",
    unregister: "Unregister Service Worker",
    confirmUnregister:
      "Are you sure you want to unregister all service workers?",
  },
  notifications: {
    title: "Notifications",
    description: "Manage push notification permissions",
    enabled: "Notifications Enabled",
    enable: "Enable Notifications",
    disable: "Disable Notifications",
    denied: "Please enable notifications in your browser settings",
  },
  permissions: {
    title: "Permissions",
    description: "Reset all browser permissions for this site",
    button: "Reset All Permissions",
    confirm:
      "Are you sure you want to reset all browser permissions? This will clear all site permissions including notifications, camera, microphone, and location access.",
    success:
      "All permissions have been reset. You may need to refresh the page to see the changes.",
    error: "There was an error resetting permissions. Please try again.",
    notSupported: {
      camera: "Camera permission not supported",
      microphone: "Microphone permission not supported",
      geolocation: "Geolocation permission not supported",
    },
  },
  storage: {
    title: "Storage Management",
    description:
      "Clear all application data including local storage, session storage, cookies, and IndexedDB",
    button: "Clear All Data",
    confirm:
      "Are you sure you want to clear all application data? This cannot be undone.",
  },
  theme: {
    title: "Theme",
    description: "Choose between light and dark mode",
  },
  settings: {
    title: "Settings",
  },
} as const;

// Permission names for querying
export const PERMISSION_NAMES = {
  camera: "camera" as PermissionName,
  microphone: "microphone" as PermissionName,
  geolocation: "geolocation" as PermissionName,
} as const;

