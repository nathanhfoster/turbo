"use client";

import { CookieConsentModal } from "@nathanhfoster/pwa/device";
import { Box } from "@nathanhfoster/ui";

interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

export function Body({ children }: BodyProps) {
  return (
    <Box pt="pt-8" className="flex min-h-screen flex-col">
      <CookieConsentModal />
      {children}
    </Box>
  );
}

