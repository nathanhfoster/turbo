"use client";

import { AppNavbar } from "@nathanhfoster/ui";
import { BOTTOM_NAV_ITEMS, NAV_ITEMS } from "./constants";
import type { NavbarProps } from "./types";

export function Navbar({ logo, logoHref }: NavbarProps = {}) {
  return (
    <AppNavbar
      logo={logo}
      logoHref={logoHref}
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
    />
  );
}

