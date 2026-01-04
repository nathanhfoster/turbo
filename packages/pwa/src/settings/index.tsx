"use client";

import { InstallApp } from "./components/InstallApp";
import { Notifications } from "./components/Notifications";
import { Permissions } from "./components/Permissions";
import { ServiceWorker } from "./components/ServiceWorker";
import { Storage } from "./components/Storage";
import { DEFAULT_CLASSES, MESSAGES } from "./constants";
import type { SettingsProps } from "./types";

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
    <div className={className || DEFAULT_CLASSES.settingsContainer}>
      <h1 className={titleClassName || DEFAULT_CLASSES.settingsTitle}>
        {MESSAGES.settings.title}
      </h1>
      <div className={gridClassName || DEFAULT_CLASSES.settingsGrid}>
        {showInstallApp && <InstallApp renderButton={renderInstallApp} />}
        {showServiceWorker && (
          <ServiceWorker renderButton={renderServiceWorker} />
        )}
        {showPermissions && <Permissions renderButton={renderPermissions} />}
        {showStorage && (
          <Storage renderButton={renderStorage} onClearCookies={onClearCookies} />
        )}
        {showNotifications && (
          <Notifications renderButton={renderNotifications} />
        )}
      </div>
    </div>
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

