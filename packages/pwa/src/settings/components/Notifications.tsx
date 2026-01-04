"use client";

import { Button, ButtonGroup, Card, Typography } from "@nathanhfoster/ui";
import { useInstallPrompt } from "../../providers/InstallPromptProvider";
import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import { handleNotificationPermissionRequest } from "../utils";
import type { NotificationsProps } from "../types";

export function Notifications({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  renderButton,
}: NotificationsProps) {
  const { pushNotification } = useInstallPrompt();
  const { permission, requestPermission, unsubscribeFromPush } = pushNotification;

  const handlePermissionRequest = async () => {
    await handleNotificationPermissionRequest(permission, requestPermission);
  };

  const defaultButtons = (
    <ButtonGroup className={DEFAULT_CLASSES.buttonRow}>
      <Button
        onClick={handlePermissionRequest}
        disabled={permission === "granted"}
        variant="contained"
        color="primary"
        className={buttonClassName}
      >
        {permission === "granted"
          ? MESSAGES.notifications.enabled
          : MESSAGES.notifications.enable}
      </Button>
      {permission === "granted" && (
        <Button
          onClick={unsubscribeFromPush}
          variant="contained"
          color="error"
          className={buttonClassName}
        >
          {MESSAGES.notifications.disable}
        </Button>
      )}
    </ButtonGroup>
  );

  return (
    <Card className={className || DEFAULT_CLASSES.container}>
      <Typography
        variant="h3"
        className={titleClassName || DEFAULT_CLASSES.title}
      >
        {MESSAGES.notifications.title}
      </Typography>
      <Typography
        variant="p"
        className={descriptionClassName || DEFAULT_CLASSES.description}
      >
        {MESSAGES.notifications.description}
      </Typography>
      {renderButton
        ? renderButton({ permission, requestPermission, unsubscribeFromPush })
        : defaultButtons}
    </Card>
  );
}

