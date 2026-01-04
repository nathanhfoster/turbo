"use client";

import { useInstallPrompt } from "../../providers/InstallPromptProvider";
import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import type { InstallAppProps } from "../types";

export function InstallApp({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  renderButton,
}: InstallAppProps) {
  const { installPrompt } = useInstallPrompt();
  const { deferredPrompt, handleInstallClick } = installPrompt;

  const defaultButton = (
    <button
      onClick={handleInstallClick}
      disabled={!deferredPrompt}
      className={buttonClassName || DEFAULT_CLASSES.button.primary}
    >
      {deferredPrompt
        ? MESSAGES.installApp.buttonReady
        : MESSAGES.installApp.buttonNotReady}
    </button>
  );

  return (
    <div className={className || DEFAULT_CLASSES.container}>
      <h3 className={titleClassName || DEFAULT_CLASSES.title}>
        {MESSAGES.installApp.title}
      </h3>
      <p className={descriptionClassName || DEFAULT_CLASSES.description}>
        {deferredPrompt
          ? MESSAGES.installApp.ready
          : MESSAGES.installApp.notReady}
      </p>
      {renderButton
        ? renderButton({ deferredPrompt, handleInstallClick })
        : defaultButton}
    </div>
  );
}

