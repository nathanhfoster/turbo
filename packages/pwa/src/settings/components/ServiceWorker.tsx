"use client";

import { Button, ButtonGroup, Card, Typography } from "@nathanhfoster/ui";
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
    <ButtonGroup className={DEFAULT_CLASSES.buttonGroup}>
      {waitingWorker && (
        <Button
          onClick={handleServiceWorkerUpdate}
          variant="contained"
          color="success"
          className={buttonClassName}
        >
          {MESSAGES.serviceWorker.updateAvailable}
        </Button>
      )}
      <Button
        onClick={handleUnregisterServiceWorkers}
        variant="contained"
        color="primary"
        className={buttonClassName}
      >
        {MESSAGES.serviceWorker.unregister}
      </Button>
    </ButtonGroup>
  );

  return (
    <Card className={className || DEFAULT_CLASSES.container}>
      <Typography
        variant="h3"
        className={titleClassName || DEFAULT_CLASSES.title}
      >
        {MESSAGES.serviceWorker.title}
      </Typography>
      <Typography
        variant="p"
        className={descriptionClassName || DEFAULT_CLASSES.description}
      >
        {MESSAGES.serviceWorker.description}
      </Typography>
      {renderButton
        ? renderButton({ waitingWorker, activateUpdate, unregisterServiceWorkers })
        : defaultButtons}
    </Card>
  );
}

