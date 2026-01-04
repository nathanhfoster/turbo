"use client";

import { Button, Card, Typography } from "@nathanhfoster/ui";
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
    <Button
      onClick={handleInstallClick}
      disabled={!deferredPrompt}
      variant="contained"
      color="primary"
      className={buttonClassName}
    >
      {deferredPrompt
        ? MESSAGES.installApp.buttonReady
        : MESSAGES.installApp.buttonNotReady}
    </Button>
  );

  return (
    <Card className={className || DEFAULT_CLASSES.container}>
      <Typography
        variant="h3"
        className={titleClassName || DEFAULT_CLASSES.title}
      >
        {MESSAGES.installApp.title}
      </Typography>
      <Typography
        variant="p"
        className={descriptionClassName || DEFAULT_CLASSES.description}
      >
        {deferredPrompt
          ? MESSAGES.installApp.ready
          : MESSAGES.installApp.notReady}
      </Typography>
      {renderButton
        ? renderButton({ deferredPrompt, handleInstallClick })
        : defaultButton}
    </Card>
  );
}

