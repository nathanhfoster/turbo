import type { NavItem } from "@nathanhfoster/ui";
import {
  IconBriefcase,
  IconEnvelopeOpen,
  IconHome,
  IconSliders,
} from "@nathanhfoster/ui";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Settings", href: "/settings" },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", Icon: <IconHome /> },
  { label: "Apps", href: "/apps", Icon: <IconBriefcase /> },
  { label: "Newsletter", href: "/newsletter", Icon: <IconEnvelopeOpen /> },
  { label: "Settings", href: "/settings", Icon: <IconSliders /> },
];

