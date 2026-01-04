import type { HamburgerMenuProps } from "../HamburgerMenu/types";

export interface NavbarContainerProps {
  children?: React.ReactNode;
  className?: string;
  position?: "top" | "bottom";
  fixed?: boolean;
}

export interface TopNavbarProps extends Omit<NavbarContainerProps, "position"> {
  logo?: React.ReactNode;
  menuProps?: Partial<HamburgerMenuProps>;
}

export interface BottomNavbarProps extends Omit<NavbarContainerProps, "position"> {}
