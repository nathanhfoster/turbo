"use client";

import { Button, Card, Typography } from "@nathanhfoster/ui";
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
    <Button
      onClick={resetPermissions}
      variant="contained"
      color="warning"
      className={buttonClassName}
    >
      {MESSAGES.permissions.button}
    </Button>
  );

  return (
    <Card className={className || DEFAULT_CLASSES.container}>
      <Typography
        variant="h3"
        className={titleClassName || DEFAULT_CLASSES.title}
      >
        {MESSAGES.permissions.title}
      </Typography>
      <Typography
        variant="p"
        className={descriptionClassName || DEFAULT_CLASSES.description}
      >
        {MESSAGES.permissions.description}
      </Typography>
      {renderButton ? renderButton({ resetPermissions }) : defaultButton}
    </Card>
  );
}
