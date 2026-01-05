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

