"use client";

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
    <div className={DEFAULT_CLASSES.buttonRow}>
      <button
        onClick={handlePermissionRequest}
        disabled={permission === "granted"}
        className={buttonClassName || DEFAULT_CLASSES.button.primary}
      >
        {permission === "granted"
          ? MESSAGES.notifications.enabled
          : MESSAGES.notifications.enable}
      </button>
      {permission === "granted" && (
        <button
          onClick={unsubscribeFromPush}
          className={buttonClassName || DEFAULT_CLASSES.button.danger}
        >
          {MESSAGES.notifications.disable}
        </button>
      )}
    </div>
  );

  return (
    <div className={className || DEFAULT_CLASSES.container}>
      <h3 className={titleClassName || DEFAULT_CLASSES.title}>
        {MESSAGES.notifications.title}
      </h3>
      <p className={descriptionClassName || DEFAULT_CLASSES.description}>
        {MESSAGES.notifications.description}
      </p>
      {renderButton
        ? renderButton({ permission, requestPermission, unsubscribeFromPush })
        : defaultButtons}
    </div>
  );
}

