"use client";

import dynamic from "next/dynamic";
import { useDeviceSelector } from "@nathanhfoster/pwa/device";
import { TopNavbar, Box, Typography } from "@nathanhfoster/ui";
import { InstallButton } from "./InstallButton";
import { SettingsMenu } from "./SettingsMenu";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconBriefcase,
  IconEnvelopeOpen,
  IconSliders,
} from "@nathanhfoster/ui";

const BottomNavbar = dynamic(
  () => import("@nathanhfoster/ui").then((mod) => ({ default: mod.BottomNavbar })),
  { ssr: false }
);

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
  const isDesktop = useDeviceSelector((state) => state.isDesktop);
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
          footer: (
            <Box className="flex flex-row gap-2 items-center justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
              <ThemeToggle />
              <InstallButton />
              <SettingsMenu />
            </Box>
          ),
        }}
      >
        {isDesktop && (
          <Box className="flex gap-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </Box>
        )}
      </TopNavbar>
      {!isDesktop && (
        <BottomNavbar>
          <Box className="flex w-full justify-around">
            {BOTTOM_NAV_ITEMS.map(({ label, href, Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-colors ${
                  pathname === href
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
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
      )}
    </>
  );
}
