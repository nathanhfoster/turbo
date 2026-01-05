"use client";

import Box from "../../atoms/Box";
import HamburgerMenu from "../HamburgerMenu";
import { combineClassNames } from "@nathanhfoster/utils";
import { useScrollDirection } from "./hooks/useScrollDirection";
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
  hideDirection = "up",
  ...props
}: NavbarContainerProps) => {
  const isVisible = useScrollDirection();

  // Explicitly define all class combinations for Tailwind v4 scanning
  // Using semantic tokens that automatically switch in dark mode
  // Top navbar classes
  const topClasses = "w-full bg-background text-foreground shadow-sm z-50 fixed right-0 left-0 top-0 border-b border-border";
  // Bottom navbar classes
  const bottomClasses = "w-full bg-background text-foreground shadow-sm z-50 fixed right-0 left-0 bottom-0 border-t border-border";
  // Static navbar base classes
  const staticClasses = "w-full bg-background text-foreground shadow-sm z-50";

  const baseClasses = fixed
    ? (position === "top" ? topClasses : bottomClasses)
    : staticClasses;

  // Add transition and transform classes
  const transitionClasses = "transition-transform duration-300";
  const transformClasses = isVisible
    ? "translate-y-0"
    : hideDirection === "up"
      ? "-translate-y-full"
      : "translate-y-full";

  return (
    <Box
      variant="nav"
      style={{
        backgroundColor: "var(--color-background-DEFAULT)",
        color: "var(--color-foreground-DEFAULT)",
      }}
      className={combineClassNames(
        baseClasses,
        transitionClasses,
        transformClasses,
        className
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
          <Box className="flex items-center gap-4 flex-1 min-w-0">
            {logo}
            {children}
          </Box>
          <Box className="flex-shrink-0 w-10 flex items-center justify-end">
            <Box className="md:hidden">
              <HamburgerMenu position="right" {...menuProps} />
            </Box>
          </Box>
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
      hideDirection="down"
      className={className}
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
