/**
 * Type definitions for Settings components
 */

import type { ReactNode } from "react";
import type { BeforeInstallPromptEvent } from "../types";

// Common base props for all setting components
export interface BaseSettingProps {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
}

// Install App types
export interface InstallAppRenderProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  handleInstallClick: () => Promise<void>;
}

export interface InstallAppProps extends BaseSettingProps {
  renderButton?: (props: InstallAppRenderProps) => ReactNode;
}

// Service Worker types
export interface ServiceWorkerRenderProps {
  waitingWorker: ServiceWorker | null;
  activateUpdate: () => void;
  unregisterServiceWorkers: () => Promise<void>;
}

export interface ServiceWorkerProps extends BaseSettingProps {
  renderButton?: (props: ServiceWorkerRenderProps) => ReactNode;
}

// Notifications types
export interface NotificationsRenderProps {
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  unsubscribeFromPush: () => Promise<void>;
}

export interface NotificationsProps extends BaseSettingProps {
  renderButton?: (props: NotificationsRenderProps) => ReactNode;
}

// Permissions types
export interface PermissionsRenderProps {
  resetPermissions: () => Promise<void>;
}

export interface PermissionsProps extends BaseSettingProps {
  renderButton?: (props: PermissionsRenderProps) => ReactNode;
}

// Storage types
export interface StorageRenderProps {
  clearStorage: () => void;
}

export interface StorageProps extends BaseSettingProps {
  renderButton?: (props: StorageRenderProps) => ReactNode;
  onClearCookies?: () => void;
}

// Theme types
export interface ThemeRenderProps {}

export interface ThemeProps extends BaseSettingProps {
  renderButton?: (props: ThemeRenderProps) => ReactNode;
}

// Main Settings component types
export interface SettingsProps {
  className?: string;
  titleClassName?: string;
  gridClassName?: string;
  showTheme?: boolean;
  showInstallApp?: boolean;
  showServiceWorker?: boolean;
  showNotifications?: boolean;
  showPermissions?: boolean;
  showStorage?: boolean;
  onClearCookies?: () => void;
  renderTheme?: (props: ThemeRenderProps) => ReactNode;
  renderInstallApp?: (props: InstallAppRenderProps) => ReactNode;
  renderServiceWorker?: (props: ServiceWorkerRenderProps) => ReactNode;
  renderNotifications?: (props: NotificationsRenderProps) => ReactNode;
  renderPermissions?: (props: PermissionsRenderProps) => ReactNode;
  renderStorage?: (props: StorageRenderProps) => ReactNode;
}
