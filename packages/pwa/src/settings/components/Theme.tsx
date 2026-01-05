"use client";

import { Card, Typography, ThemeToggle } from "@nathanhfoster/ui";
import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import type { ThemeProps } from "../types";

export function Theme({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  renderButton,
}: ThemeProps = {}) {
  const defaultButton = <ThemeToggle variant="outlined" showLabel />;

  return (
    <Card className={className || DEFAULT_CLASSES.container}>
      <Typography
        variant="h3"
        className={titleClassName || DEFAULT_CLASSES.title}
      >
        {MESSAGES.theme.title}
      </Typography>
      <Typography
        variant="p"
        className={descriptionClassName || DEFAULT_CLASSES.description}
      >
        {MESSAGES.theme.description}
      </Typography>
      {renderButton ? renderButton({}) : defaultButton}
    </Card>
  );
}
