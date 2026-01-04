"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@nathanhfoster/ui";
import { DEFAULT_CLASSES, MESSAGES } from "./constants";
import type { SettingsProps } from "./types";
import type {
  InstallAppProps,
  NotificationsProps,
  PermissionsProps,
  ServiceWorkerProps,
  StorageProps,
} from "./types";

// Dynamic imports for code splitting using Next.js dynamic
// Next.js resolves .tsx files without extensions, but TypeScript requires them
const InstallApp = dynamic<InstallAppProps>(
  () => import("./components/InstallApp").then((mod) => mod.InstallApp),
  { ssr: false }
);

const Notifications = dynamic<NotificationsProps>(
  () => import("./components/Notifications").then((mod) => mod.Notifications),
  { ssr: false }
);

const Permissions = dynamic<PermissionsProps>(
  () => import("./components/Permissions").then((mod) => mod.Permissions),
  { ssr: false }
);

const ServiceWorker = dynamic<ServiceWorkerProps>(
  () => import("./components/ServiceWorker").then((mod) => mod.ServiceWorker),
  { ssr: false }
);

const Storage = dynamic<StorageProps>(
  () => import("./components/Storage").then((mod) => mod.Storage),
  { ssr: false }
);

// Loading fallback component
const ComponentLoader = () => (
  <Box className="animate-pulse rounded-lg border border-gray-200 bg-gray-100 p-6 dark:border-gray-700 dark:bg-gray-800">
    <Box className="mb-2 h-6 w-32 rounded bg-gray-300 dark:bg-gray-600" />
    <Box className="mb-4 h-4 w-full rounded bg-gray-300 dark:bg-gray-600" />
    <Box className="h-10 w-24 rounded bg-gray-300 dark:bg-gray-600" />
  </Box>
);

export function Settings({
  className = "",
  titleClassName = "",
  gridClassName = "",
  showInstallApp = true,
  showServiceWorker = true,
  showNotifications = true,
  showPermissions = true,
  showStorage = true,
  onClearCookies,
  renderInstallApp,
  renderServiceWorker,
  renderNotifications,
  renderPermissions,
  renderStorage,
}: SettingsProps) {
  return (
    <Box className={className || DEFAULT_CLASSES.settingsContainer}>
      <Typography
        variant="h1"
        className={titleClassName || DEFAULT_CLASSES.settingsTitle}
        size="text-3xl"
        weight="font-bold"
      >
        {MESSAGES.settings.title}
      </Typography>
      <Box className={gridClassName || DEFAULT_CLASSES.settingsGrid}>
        {showInstallApp && (
          <Suspense fallback={<ComponentLoader />}>
            <InstallApp renderButton={renderInstallApp} />
          </Suspense>
        )}
        {showServiceWorker && (
          <Suspense fallback={<ComponentLoader />}>
            <ServiceWorker renderButton={renderServiceWorker} />
          </Suspense>
        )}
        {showPermissions && (
          <Suspense fallback={<ComponentLoader />}>
            <Permissions renderButton={renderPermissions} />
          </Suspense>
        )}
        {showStorage && (
          <Suspense fallback={<ComponentLoader />}>
            <Storage renderButton={renderStorage} onClearCookies={onClearCookies} />
          </Suspense>
        )}
        {showNotifications && (
          <Suspense fallback={<ComponentLoader />}>
            <Notifications renderButton={renderNotifications} />
          </Suspense>
        )}
      </Box>
    </Box>
  );
}

// Export individual components for custom layouts
export { InstallApp } from "./components/InstallApp";
export { ServiceWorker } from "./components/ServiceWorker";
export { Notifications } from "./components/Notifications";
export { Permissions } from "./components/Permissions";
export { Storage } from "./components/Storage";

// Export types
export type {
  SettingsProps,
  InstallAppProps,
  ServiceWorkerProps,
  NotificationsProps,
  PermissionsProps,
  StorageProps,
  InstallAppRenderProps,
  ServiceWorkerRenderProps,
  NotificationsRenderProps,
  PermissionsRenderProps,
  StorageRenderProps,
} from "./types";

// Export constants and utils
export { DEFAULT_CLASSES, MESSAGES, PERMISSION_NAMES } from "./constants";
export {
  clearIndexedDB,
  clearAllStorage,
  resetNotificationPermission,
  queryPermission,
  resetAllPermissions,
  handleNotificationPermissionRequest,
  confirmAction,
  showAlert,
  reloadPage,
} from "./utils";

