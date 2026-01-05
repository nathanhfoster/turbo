import type { HamburgerMenuProps } from "../HamburgerMenu/types";

export type NavbarHideDirection = "up" | "down";

export interface NavbarContainerProps {
  children?: React.ReactNode;
  className?: string;
  position?: "top" | "bottom";
  fixed?: boolean;
  hideDirection?: NavbarHideDirection;
}

export interface TopNavbarProps extends Omit<NavbarContainerProps, "position"> {
  logo?: React.ReactNode;
  menuProps?: Partial<HamburgerMenuProps>;
  rightContent?: React.ReactNode;
}

export interface BottomNavbarProps
  extends Omit<NavbarContainerProps, "position"> {}
