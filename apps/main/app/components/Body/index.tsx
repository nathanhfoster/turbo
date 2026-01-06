"use client";

import { CookieConsentModal } from "@nathanhfoster/pwa/device";
import { AppBody } from "@nathanhfoster/ui";
import type { BodyProps } from "./types";

export function Body({ children, className }: BodyProps) {
  return (
    <AppBody 
      enableGoogleTagManager 
      className={className}
      consentModal={<CookieConsentModal />}
    >
      {children}
    </AppBody>
  );
}

