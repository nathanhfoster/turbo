"use client";

import { createContext, useContext } from "react";
import {
  useServiceWorkerUpdate,
  useInstallPromptHandler,
  usePushNotification,
} from "./hooks";
import type { InstallPromptContextValue } from "./types";

const InstallPromptContext = createContext<
  InstallPromptContextValue | undefined
>(undefined);

export function InstallPromptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceWorker = useServiceWorkerUpdate();
  const installPrompt = useInstallPromptHandler();
  const pushNotification = usePushNotification();

  const value: InstallPromptContextValue = {
    serviceWorker,
    installPrompt,
    pushNotification,
  };

  return (
    <InstallPromptContext.Provider value={value}>
      {children}
    </InstallPromptContext.Provider>
  );
}

export function useInstallPrompt() {
  const context = useContext(InstallPromptContext);
  if (context === undefined) {
    throw new Error(
      "useInstallPrompt must be used within InstallPromptProvider",
    );
  }
  return context;
}

// Export individual hooks for convenience
export { useServiceWorkerUpdate, useInstallPromptHandler, usePushNotification };
export type { InstallPromptContextValue } from "./types";
