export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface ServiceWorkerUpdateState {
  waitingWorker: ServiceWorker | null;
  activateUpdate: () => void;
  unregisterServiceWorkers: () => Promise<void>;
}

export interface InstallPromptState {
  deferredPrompt: BeforeInstallPromptEvent | null;
  handleInstallClick: () => Promise<void>;
}

export interface PushNotificationState {
  subscription: PushSubscription | null;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  subscribeToPush: () => Promise<void>;
  unsubscribeFromPush: () => Promise<void>;
  sendPushNotification: (payload: PushNotificationPayload) => Promise<void>;
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, unknown>;
}

export interface InstallPromptContextValue {
  serviceWorker: ServiceWorkerUpdateState;
  installPrompt: InstallPromptState;
  pushNotification: PushNotificationState;
}
