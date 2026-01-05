"use client";

import { CookieConsentModal } from "@nathanhfoster/pwa/device";

interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

export function Body({ children }: BodyProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <CookieConsentModal />
      {children}
    </div>
  );
}

