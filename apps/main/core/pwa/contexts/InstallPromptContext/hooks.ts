"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  BeforeInstallPromptEvent,
  ServiceWorkerUpdateState,
  InstallPromptState,
  PushNotificationState,
  PushNotificationPayload,
} from "./types";

/**
 * Hook to manage service worker updates
 */
export function useServiceWorkerUpdate(): ServiceWorkerUpdateState {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");

        // Check for waiting worker
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
        }

        // Listen for new service worker
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
            }
          });
        });

        // Listen for controller change
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    registerSW();
  }, []);

  const activateUpdate = useCallback(() => {
    if (!waitingWorker) return;

    waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setWaitingWorker(null);
  }, [waitingWorker]);

  const unregisterServiceWorkers = useCallback(async () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );
    setWaitingWorker(null);
  }, []);

  return {
    waitingWorker,
    activateUpdate,
    unregisterServiceWorkers,
  };
}

/**
 * Hook to handle PWA install prompt
 */
export function useInstallPromptHandler(): InstallPromptState {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      console.warn("Install prompt not available");
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error("Install prompt failed:", error);
    }
  }, [deferredPrompt]);

  return {
    deferredPrompt,
    handleInstallClick,
  };
}

/**
 * Hook to manage push notifications
 */
export function usePushNotification(): PushNotificationState {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    setPermission(Notification.permission);

    const checkSubscription = async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription =
          await registration.pushManager.getSubscription();
        setSubscription(existingSubscription);
      }
    };

    checkSubscription();
  }, []);

  const requestPermission =
    useCallback(async (): Promise<NotificationPermission> => {
      if (!("Notification" in window)) {
        console.warn("Notifications not supported");
        return "denied";
      }

      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }, []);

  const subscribeToPush = useCallback(async () => {
    if (permission !== "granted") {
      const result = await requestPermission();
      if (result !== "granted") {
        throw new Error("Notification permission denied");
      }
    }

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      throw new Error("Push notifications not supported");
    }

    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      console.warn("VAPID public key not configured");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      setSubscription(sub);

      // Send subscription to server
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
    } catch (error) {
      console.error("Push subscription failed:", error);
      throw error;
    }
  }, [permission, requestPermission]);

  const unsubscribeFromPush = useCallback(async () => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();
      setSubscription(null);

      // Notify server
      await fetch("/api/push/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
    } catch (error) {
      console.error("Push unsubscribe failed:", error);
      throw error;
    }
  }, [subscription]);

  const sendPushNotification = useCallback(
    async (payload: PushNotificationPayload) => {
      if (!subscription) {
        throw new Error("No push subscription available");
      }

      try {
        await fetch("/api/push/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription, payload }),
        });
      } catch (error) {
        console.error("Send push notification failed:", error);
        throw error;
      }
    },
    [subscription],
  );

  return {
    subscription,
    permission,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    sendPushNotification,
  };
}

/**
 * Helper to convert VAPID key from base64 to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): BufferSource {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray as BufferSource;
}
