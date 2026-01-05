"use client";

import { useInstallPrompt } from "../providers/InstallPromptProvider";

export interface InstallButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InstallButton({
  children,
  className,
  onClick,
}: InstallButtonProps) {
  const { installPrompt } = useInstallPrompt();
  const { deferredPrompt, handleInstallClick } = installPrompt;

  // Only show the button if the install prompt is available
  if (!deferredPrompt) {
    return null;
  }

  const handleClick = () => {
    handleInstallClick();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label="Install App"
      type="button"
    >
      {children}
    </button>
  );
}
