/**
 * Common Constants
 *
 * Shared constants used across the UI package.
 */

/**
 * Theme Constants
 */
export const THEME_STORAGE_KEY = "theme";
export const THEME_DEFAULT = "light" as const;
export const THEME_LIGHT = "light" as const;
export const THEME_DARK = "dark" as const;

export type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

/**
 * Theme-related class names
 */
export const THEME_CLASSES = {
  light: "light",
  dark: "dark",
} as const;

/**
 * Transition Constants
 * Used for consistent transitions across components
 */
export const TRANSITION_DURATION = {
  instant: "0ms",
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "1000ms",
} as const;

export const TRANSITION_TIMING = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

/**
 * Default transition for theme changes
 */
export const THEME_TRANSITION = {
  duration: TRANSITION_DURATION.normal,
  timing: TRANSITION_TIMING.easeInOut,
  property: "color, background-color, border-color",
} as const;
