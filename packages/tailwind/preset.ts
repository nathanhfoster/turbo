import type { Config } from "tailwindcss";

/**
 * Shared Tailwind CSS Preset
 *
 * This preset contains shared configuration used by the root Tailwind config.
 * It includes:
 * - darkMode configuration
 * - safelist for dynamic classes
 * - theme extensions (colors mapped to CSS variables)
 * - plugins
 *
 * Rules:
 * - No content (content is defined in root tailwind.config.ts)
 * - No CSS (@tailwind directives go in CSS files)
 * - No app or library knowledge (tokens + plugins only)
 */
const preset: Config = {
  darkMode: "class",
  // @ts-expect-error - safelist exists but may not be in type definition
  safelist: [
    // Navbar positioning utilities
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
    "border-b",
    "border-t",
    "dark:bg-gray-900",
    "dark:bg-gray-800",
    "dark:border-gray-800",
    "dark:border-gray-700",
    // Navbar transform utilities for scroll animations
    "translate-y-0",
    "-translate-y-full",
    "translate-y-full",
    "transition-transform",
    "duration-300",
    // Footer background and styling
    "border-t",
    "mt-auto",
    // Card background and styling
    "rounded-lg",
    "!bg-white",
    "dark:!bg-gray-800",
    "border",
    "border-neutral-200",
    "dark:border-gray-700",
    // Card text colors for contrast
    "text-gray-900",
    "text-gray-600",
    "text-gray-400",
    "dark:text-white",
    "dark:text-gray-100",
    "dark:text-gray-400",
    // Modal width utilities
    "max-w-sm",
    "max-w-md",
    "max-w-lg",
    "max-w-xl",
    "max-w-2xl",
    "max-w-3xl",
    "max-w-full",
    "w-full",
    // Modal backdrop and positioning
    "inset-0",
    "bg-black/50",
    "backdrop-blur-sm",
    "pointer-events-auto",
    "pointer-events-none",
    // Modal transform and transition
    "scale-100",
    "scale-95",
    "opacity-100",
    "opacity-0",
    "translate-y-2",
    "transition-all",
    "duration-400",
    "ease-out",
    "origin-center",
    // Outlined button dark mode text colors
    "dark:text-primary-300",
    "dark:text-secondary-300",
    "dark:text-accent-300",
    "dark:text-success-300",
    "dark:text-error-300",
    "dark:text-warning-300",
    "dark:text-info-300",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
      },
    },
  },
  plugins: [],
};

export default preset;

