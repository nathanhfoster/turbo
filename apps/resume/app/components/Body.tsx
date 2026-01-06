"use client";

import { CookieConsentModal } from "@nathanhfoster/pwa/device";
import { AppBody } from "@nathanhfoster/ui";

interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

export function Body({ children, className }: BodyProps) {
  return (
    <AppBody 
      className={className}
      consentModal={<CookieConsentModal />}
    >
      {children}
    </AppBody>
  );
}
