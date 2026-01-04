import type { DrawerProps } from "../../atoms/Drawer/types";

export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface HamburgerMenuProps extends Pick<DrawerProps, "position"> {
  menuItems?: MenuItem[];
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
