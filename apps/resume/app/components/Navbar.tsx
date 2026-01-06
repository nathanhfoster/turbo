"use client";

import Link from "next/link";
import { AppNavbar, IconHome, IconSliders } from "@nathanhfoster/ui";
import type { NavItem } from "@nathanhfoster/ui";
import { getMainAppUrl } from "../../../shared/utils/getMainAppUrl";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/apps/resume" },
  { label: "Settings", href: "/apps/resume/settings" },
];

const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/apps/resume", Icon: <IconHome /> },
  { label: "Settings", href: "/apps/resume/settings", Icon: <IconSliders /> },
];

export function Navbar() {
  const mainAppUrl = getMainAppUrl();

  return (
    <AppNavbar
      logo={
        <Link
          href={`${mainAppUrl}/`}
          className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          AgentNate
        </Link>
      }
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
    />
  );
}
