"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMounted } from "@nathanhfoster/resurrection";
import { isNavItemActive } from "@nathanhfoster/utils";
import { Box, Typography, BubbleAI } from "../../atoms";
import { ThemeToggle } from "../../Theme";
import { TopNavbar, BottomNavbar } from "../Navbar";
import type { AppNavbarProps, NavItem } from "./types";

export type { AppNavbarProps, NavItem };

const getDefaultLogo = (href: string = "/") => (
  <Link
    href={href}
    className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
  >
    <BubbleAI size={28} state="idle" quality="low" ringCount={2} particleSize={0.5} />
    <span>AgentNate</span>
  </Link>
);

export function AppNavbar({
  logo,
  logoHref = "/",
  navItems,
  bottomNavItems,
  rightContent,
  stripPrefix,
  basePath,
}: AppNavbarProps) {
  const defaultLogo = logo ?? getDefaultLogo(logoHref);
  const pathname = usePathname();
  const mounted = useIsMounted(false);

  // Only use pathname after hydration to avoid SSR/client mismatch
  // Use the reusable utility function for active state detection
  const isActive = (href: string) => {
    if (!mounted) return false;
    return isNavItemActive(href, pathname, { stripPrefix, basePath });
  };

  return (
    <>
      <TopNavbar
        logo={defaultLogo}
        menuProps={{
          menuItems: navItems.map(({ label, href }) => ({ label, href })),
        }}
        rightContent={rightContent || <ThemeToggle variant="text" size="md" />}
      >
        <Box className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(href)
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
          {bottomNavItems.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-colors ${
                isActive(href) ? "text-primary" : "text-foreground"
              }`}
            >
              {Icon && (
                <span className="h-6 w-6 mb-1 flex items-center justify-center">
                  {Icon}
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

