"use client";

import Link from "next/link";
import { AppNavbar, BubbleAI, IconHome, IconSliders } from "@nathanhfoster/ui";
import type { NavItem } from "@nathanhfoster/ui";
import { getMainAppUrl } from "../../../shared/utils/getMainAppUrl";

export function Navbar() {
  const mainAppUrl = getMainAppUrl();

  // Use absolute URLs to bypass basePath in development
  // This ensures links go to /apps/resume instead of /resume/apps/resume
  const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: `${mainAppUrl}/apps/resume` },
    { label: "Settings", href: `${mainAppUrl}/apps/resume/settings` },
  ];

  const BOTTOM_NAV_ITEMS: NavItem[] = [
    { label: "Home", href: `${mainAppUrl}/apps/resume`, Icon: <IconHome /> },
    { label: "Settings", href: `${mainAppUrl}/apps/resume/settings`, Icon: <IconSliders /> },
  ];

  return (
    <AppNavbar
      logo={
        <Link
          href={`${mainAppUrl}/`}
          className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <BubbleAI size={28} state="idle" quality="low" ringCount={2} particleSize={0.5} />
          <span>AgentNate</span>
        </Link>
      }
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
      stripPrefix="/apps/resume"
      basePath="/resume"
    />
  );
}
