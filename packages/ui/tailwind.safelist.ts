/**
 * Shared Tailwind safelist for UI package components
 * 
 * This safelist ensures that classes used in UI components (especially those
 * in string literals or dynamically generated) are always included in the
 * final CSS output, even if Tailwind's content scanning doesn't detect them.
 * 
 * Apps should import this and merge it into their own Tailwind config.
 */

export const uiSafelist = [
  // Navbar positioning utilities - required for Navbar component
  "fixed",
  "top-0",
  "bottom-0",
  "left-0",
  "right-0",
  "z-50",
  // Navbar background and styling
  "bg-white",
  "shadow-sm",
  "border-gray-200",
  "dark:bg-gray-900",
  "dark:border-gray-800",
  // Navbar transform utilities for scroll animations
  "translate-y-0",
  "-translate-y-full",
  "translate-y-full",
  "transition-transform",
  "duration-300",
];

