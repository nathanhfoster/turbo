"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TopNavbar,
  BottomNavbar,
  Box,
  Typography,
  IconHome,
  IconBriefcase,
  IconEnvelopeOpen,
  IconSliders,
  ThemeToggle,
} from "@nathanhfoster/ui";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Settings", href: "/settings" },
];

const BOTTOM_NAV_ITEMS = [
  { label: "Home", href: "/", Icon: IconHome },
  { label: "Portfolio", href: "/portfolio", Icon: IconBriefcase },
  { label: "Newsletter", href: "/newsletter", Icon: IconEnvelopeOpen },
  { label: "Settings", href: "/settings", Icon: IconSliders },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <TopNavbar
        logo={
          <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            AgentNate
          </Link>
        }
        menuProps={{
          menuItems: NAV_ITEMS,
        }}
        rightContent={<ThemeToggle variant="text" size="md" />}
      >
        <Box className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
        </Box>
      </TopNavbar>
      <BottomNavbar className="md:hidden">
        <Box className="flex w-full justify-around">
          {BOTTOM_NAV_ITEMS.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-colors ${
                pathname === href
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {Icon && (
                <span className="h-6 w-6 mb-1 flex items-center justify-center">
                  <Icon />
                </span>
              )}
              <Typography className="text-center">{label}</Typography>
            </Link>
          ))}
        </Box>
      </BottomNavbar>
    </>
  );
}

