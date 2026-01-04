"use client";

import Box from "../../atoms/Box";
import HamburgerMenu from "../HamburgerMenu";
import { combineClassNames } from "@nathanhfoster/utils";
import type {
  NavbarContainerProps,
  TopNavbarProps,
  BottomNavbarProps,
} from "./types";

const NavbarContainer = ({
  children,
  className,
  position = "top",
  fixed = true,
  ...props
}: NavbarContainerProps) => {
  const positionClasses =
    position === "top"
      ? "top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800"
      : "bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800";

  return (
    <Box
      variant="nav"
      className={combineClassNames(
        "w-full bg-white dark:bg-gray-900 shadow-sm z-50",
        fixed && "fixed",
        positionClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  );
};

const TopNavbar = ({
  children,
  logo,
  menuProps,
  className,
  ...props
}: TopNavbarProps) => {
  return (
    <NavbarContainer position="top" className={className} {...props}>
      <Box className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <Box className="h-16 relative flex items-center justify-between">
          <Box className="flex items-center md:items-stretch gap-4">
            {logo}
            {children}
          </Box>
          <HamburgerMenu position="right" {...menuProps} />
        </Box>
      </Box>
    </NavbarContainer>
  );
};

const BottomNavbar = ({
  children,
  className,
  ...props
}: BottomNavbarProps) => {
  return (
    <NavbarContainer 
      position="bottom" 
      className={combineClassNames("md:hidden", className)} 
      {...props}
    >
      <Box className="mx-auto max-w-7xl px-4">
        <Box className="h-16 flex items-center justify-center">
          {children}
        </Box>
      </Box>
    </NavbarContainer>
  );
};

// Attach sub-components
const NavbarWithSubComponents = NavbarContainer as typeof NavbarContainer & {
  Top: typeof TopNavbar;
  Bottom: typeof BottomNavbar;
};

NavbarWithSubComponents.Top = TopNavbar;
NavbarWithSubComponents.Bottom = BottomNavbar;

export default NavbarWithSubComponents;
export { TopNavbar, BottomNavbar };
