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
  // Use classes directly so Tailwind v4 can detect them
  const isTop = position === "top";
  
  return (
    <Box
      variant="nav"
      className={combineClassNames(
        "w-full bg-white dark:bg-gray-900 shadow-sm z-50",
        fixed && "fixed right-0 left-0",
        isTop && "top-0 border-b border-gray-200 dark:border-gray-800",
        !isTop && "bottom-0 border-t border-gray-200 dark:border-gray-800",
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
      className={combineClassNames("md:hidden bottom-0", className)} 
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
