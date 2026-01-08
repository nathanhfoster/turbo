import type { NavItem } from "@nathanhfoster/ui";
import { IconHome, IconSliders } from "@nathanhfoster/ui";

export const getNavItems = (mainAppUrl: string): NavItem[] => [
  { label: "Home", href: `${mainAppUrl}/apps/resume` },
  { label: "Settings", href: `${mainAppUrl}/apps/resume/settings` },
];

export const getBottomNavItems = (mainAppUrl: string): NavItem[] => [
  { label: "Home", href: `${mainAppUrl}/apps/resume`, Icon: <IconHome /> },
  {
    label: "Settings",
    href: `${mainAppUrl}/apps/resume/settings`,
    Icon: <IconSliders />,
  },
];

export const STRIP_PREFIX = "/apps/resume";
export const BASE_PATH = "/resume";
