"use client";

import {
  AppBody,
  AppNavbar,
} from "@nathanhfoster/ui";
import { CookieConsentModal } from "@nathanhfoster/pwa/device";
import { getMainAppUrl } from "../../../../shared/utils/getMainAppUrl";
import {
  BASE_PATH,
  getBottomNavItems,
  getNavItems,
  STRIP_PREFIX,
} from "./constants";
import type { ResumeLayoutContentProps } from "./types";

export function ResumeLayoutContent({
  children,
}: ResumeLayoutContentProps) {
  const mainAppUrl = getMainAppUrl();

  // Use absolute URLs to bypass basePath in development
  // This ensures links go to /apps/resume instead of /resume/apps/resume
  const navItems = getNavItems(mainAppUrl);
  const bottomNavItems = getBottomNavItems(mainAppUrl);

  return (
    <AppBody className="pt-16" consentModal={<CookieConsentModal />}>
      <AppNavbar
        logoHref={`${mainAppUrl}/`}
        navItems={navItems}
        bottomNavItems={bottomNavItems}
        stripPrefix={STRIP_PREFIX}
        basePath={BASE_PATH}
      />
      {children}
    </AppBody>
  );
}

