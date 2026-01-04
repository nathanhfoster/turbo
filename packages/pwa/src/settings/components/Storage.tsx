"use client";

import { Button, Card, Typography } from "@nathanhfoster/ui";
import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import { confirmAction, clearAllStorage, reloadPage } from "../utils";
import type { StorageProps } from "../types";

export function Storage({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  renderButton,
  onClearCookies,
}: StorageProps) {
  const clearStorage = async () => {
    if (confirmAction(MESSAGES.storage.confirm)) {
      await clearAllStorage(onClearCookies);
      reloadPage();
    }
  };

  const defaultButton = (
    <Button
      onClick={clearStorage}
      variant="contained"
      color="warning"
      className={buttonClassName}
    >
      {MESSAGES.storage.button}
    </Button>
  );

  return (
    <Card className={className || DEFAULT_CLASSES.container}>
      <Typography
        variant="h3"
        className={titleClassName || DEFAULT_CLASSES.title}
      >
        {MESSAGES.storage.title}
      </Typography>
      <Typography
        variant="p"
        className={descriptionClassName || DEFAULT_CLASSES.description}
      >
        {MESSAGES.storage.description}
      </Typography>
      {renderButton ? renderButton({ clearStorage }) : defaultButton}
    </Card>
  );
}

