"use client";

import Link from "next/link";
import {
  AppNavbar,
  BubbleAI,
  IconHome,
  IconBriefcase,
  IconEnvelopeOpen,
  IconSliders,
} from "@nathanhfoster/ui";
import type { NavItem } from "@nathanhfoster/ui";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Settings", href: "/settings" },
];

const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", Icon: <IconHome /> },
  { label: "Apps", href: "/apps", Icon: <IconBriefcase /> },
  { label: "Newsletter", href: "/newsletter", Icon: <IconEnvelopeOpen /> },
  { label: "Settings", href: "/settings", Icon: <IconSliders /> },
];

export function Navbar() {
  return (
    <AppNavbar
      logo={
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <BubbleAI size={28} state="idle" quality="low" ringCount={2} particleSize={0.5} />
          <span>AgentNate</span>
        </Link>
      }
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
    />
  );
}
