"use client";

import { useInstallPrompt } from "../../providers/InstallPromptProvider";
import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import { confirmAction } from "../utils";
import type { ServiceWorkerProps } from "../types";

export function ServiceWorker({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  renderButton,
}: ServiceWorkerProps) {
  const { serviceWorker } = useInstallPrompt();
  const { waitingWorker, activateUpdate, unregisterServiceWorkers } = serviceWorker;

  const handleUnregisterServiceWorkers = () => {
    if (confirmAction(MESSAGES.serviceWorker.confirmUnregister)) {
      unregisterServiceWorkers();
    }
  };

  const handleServiceWorkerUpdate = () => {
    if (waitingWorker) {
      activateUpdate();
    }
  };

  const defaultButtons = (
    <div className={DEFAULT_CLASSES.buttonGroup}>
      {waitingWorker && (
        <button
          onClick={handleServiceWorkerUpdate}
          className={buttonClassName || DEFAULT_CLASSES.button.success}
        >
          {MESSAGES.serviceWorker.updateAvailable}
        </button>
      )}
      <button
        onClick={handleUnregisterServiceWorkers}
        className={buttonClassName || DEFAULT_CLASSES.button.primary}
      >
        {MESSAGES.serviceWorker.unregister}
      </button>
    </div>
  );

  return (
    <div className={className || DEFAULT_CLASSES.container}>
      <h3 className={titleClassName || DEFAULT_CLASSES.title}>
        {MESSAGES.serviceWorker.title}
      </h3>
      <p className={descriptionClassName || DEFAULT_CLASSES.description}>
        {MESSAGES.serviceWorker.description}
      </p>
      {renderButton
        ? renderButton({ waitingWorker, activateUpdate, unregisterServiceWorkers })
        : defaultButtons}
    </div>
  );
}

