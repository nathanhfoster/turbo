"use client";

import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import { confirmAction, resetAllPermissions, showAlert } from "../utils";
import type { PermissionsProps } from "../types";

export function Permissions({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  renderButton,
}: PermissionsProps) {
  const resetPermissions = async () => {
    if (confirmAction(MESSAGES.permissions.confirm)) {
      try {
        await resetAllPermissions();
        showAlert(MESSAGES.permissions.success);
      } catch (error) {
        console.error("Error resetting permissions:", error);
        showAlert(MESSAGES.permissions.error);
      }
    }
  };

  const defaultButton = (
    <button
      onClick={resetPermissions}
      className={buttonClassName || DEFAULT_CLASSES.button.warning}
    >
      {MESSAGES.permissions.button}
    </button>
  );

  return (
    <div className={className || DEFAULT_CLASSES.container}>
      <h3 className={titleClassName || DEFAULT_CLASSES.title}>
        {MESSAGES.permissions.title}
      </h3>
      <p className={descriptionClassName || DEFAULT_CLASSES.description}>
        {MESSAGES.permissions.description}
      </p>
      {renderButton ? renderButton({ resetPermissions }) : defaultButton}
    </div>
  );
}

