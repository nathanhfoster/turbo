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
    "shadow-sm",
    "border-b",
    "border-t",
    // Navbar transform utilities for scroll animations
    "translate-y-0",
    "-translate-y-full",
    "translate-y-full",
    "transition-transform",
    "duration-300",
    // Footer background and styling
    "border-t",
    "mt-auto",
    // Card background and styling - using semantic tokens
    "rounded-lg",
    "bg-background",
    "text-foreground",
    "border",
    "border-border",
    // Card text colors for contrast - using semantic tokens
    "text-foreground-muted",
    "text-foreground-subtle",
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
    // Drawer background and styling
    "bg-background",
    "text-foreground",
    "shadow-lg",
    "transition-transform",
    "duration-400",
    "ease-out",
    // Drawer transform classes
    "-translate-x-full",
    "translate-x-full",
    "-translate-y-full",
    "translate-y-full",
    "translate-x-0",
    "translate-y-0",
    // Drawer size classes
    "w-80",
    "h-80",
    "h-full",
    "w-full",
    // Drawer positioning
    "left-0",
    "right-0",
    "top-0",
    "bottom-0",
    "fixed",
    "z-[60]",
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
        // Semantic background colors - automatically switch in dark mode
        background: {
          DEFAULT: "var(--color-background-DEFAULT)",
          elevated: "var(--color-background-elevated)",
          subtle: "var(--color-background-subtle)",
          muted: "var(--color-background-muted)",
        },
        // Semantic foreground/text colors - automatically contrast in dark mode
        foreground: {
          DEFAULT: "var(--color-foreground-DEFAULT)",
          muted: "var(--color-foreground-muted)",
          subtle: "var(--color-foreground-subtle)",
          inverted: "var(--color-foreground-inverted)",
        },
        // Semantic border colors - automatically switch in dark mode
        border: {
          DEFAULT: "var(--color-border-DEFAULT)",
          subtle: "var(--color-border-subtle)",
          accent: "var(--color-border-accent)",
        },
      },
    },
  },
  plugins: [],
};

export default preset;
