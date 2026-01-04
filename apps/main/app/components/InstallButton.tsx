"use client";

import { Button, IconDownload } from "@nathanhfoster/ui";
import { useInstallPrompt } from "@nathanhfoster/pwa";

export function InstallButton() {
  const { installPrompt } = useInstallPrompt();
  const { deferredPrompt, handleInstallClick } = installPrompt;

  // Only show the button if the install prompt is available
  if (!deferredPrompt) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant="text"
      color="inherit"
      aria-label="Install App"
    >
      <IconDownload />
    </Button>
  );
}

