/**
 * IconButton Component Constants
 *
 * Uses centralized design tokens and style utilities.
 * Follows SOLID principles - components depend on token abstractions,
 * not concrete Tailwind classes.
 */

import type { ComponentVariant, ComponentColor } from "../types";
import type { ColorStyles } from "../../../tokens/styleUtils";
import {
  generateColorStylesMapping,
  VARIANT_BASE_STYLES,
  DISABLED_STYLES,
  TRANSITION_STYLES,
} from "../../../tokens/styleUtils";

/**
 * Variant-specific styles
 * Uses centralized variant styles from tokens
 */
export const VARIANT_STYLES: Record<ComponentVariant | "ghost", string> = {
  ...VARIANT_BASE_STYLES,
  ghost: "bg-transparent",
};

/**
 * Color styles for contained variant
 * Static mapping ensures Tailwind recognizes the classes
 */
export const COLOR_STYLES: Record<ComponentColor, ColorStyles> = {
  primary: {
    bg: "bg-primary",
    text: "text-foreground-inverted",
    hover: "hover:bg-primary hover:brightness-90",
    active: "bg-primary",
    border: "border-transparent",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-foreground-inverted",
    hover: "hover:bg-secondary hover:brightness-90",
    active: "bg-secondary",
    border: "border-transparent",
  },
  accent: {
    bg: "bg-accent",
    text: "text-foreground-inverted",
    hover: "hover:bg-accent hover:brightness-90",
    active: "bg-accent",
    border: "border-transparent",
  },
  error: {
    bg: "bg-error",
    text: "text-foreground-inverted",
    hover: "hover:bg-error hover:brightness-90",
    active: "bg-error",
    border: "border-transparent",
  },
  success: {
    bg: "bg-success",
    text: "text-foreground-inverted",
    hover: "hover:bg-success hover:brightness-90",
    active: "bg-success",
    border: "border-transparent",
  },
  warning: {
    bg: "bg-warning",
    text: "text-foreground-inverted",
    hover: "hover:bg-warning hover:brightness-90",
    active: "bg-warning",
    border: "border-transparent",
  },
  info: {
    bg: "bg-info",
    text: "text-foreground-inverted",
    hover: "hover:bg-info hover:brightness-90",
    active: "bg-info",
    border: "border-transparent",
  },
  white: {
    bg: "bg-white",
    text: "text-foreground-inverted",
    hover: "hover:bg-white hover:brightness-90",
    active: "bg-white",
    border: "border-transparent",
  },
  black: {
    bg: "bg-black",
    text: "text-foreground-inverted",
    hover: "hover:bg-black hover:brightness-90",
    active: "bg-black",
    border: "border-transparent",
  },
  gray: {
    bg: "bg-neutral-500",
    text: "text-foreground-inverted",
    hover: "hover:bg-neutral-500 hover:brightness-90",
    active: "bg-neutral-500",
    border: "border-transparent",
  },
  inherit: {
    bg: "bg-inherit",
    text: "text-inherit",
    hover: "hover:bg-inherit hover:text-inherit",
    active: "text-inherit",
    border: "border-inherit",
  },
};

/**
 * Color styles for outlined variant
 */
export const COLOR_STYLES_OUTLINED: Record<ComponentColor, ColorStyles> =
  generateColorStylesMapping("outlined");

/**
 * Color styles for text variant
 */
export const COLOR_STYLES_TEXT: Record<ComponentColor, ColorStyles> =
  generateColorStylesMapping("text");

/**
 * Color styles for ghost variant (text-like but with hover background)
 */
export const COLOR_STYLES_GHOST: Record<ComponentColor, ColorStyles> = {
  primary: {
    bg: "bg-transparent",
    text: "text-primary",
    hover: "hover:bg-primary/10 dark:hover:bg-primary/20",
    active: "bg-primary/20 dark:bg-primary/30",
    border: "border-transparent",
  },
  secondary: {
    bg: "bg-transparent",
    text: "text-secondary",
    hover: "hover:bg-secondary/10 dark:hover:bg-secondary/20",
    active: "bg-secondary/20 dark:bg-secondary/30",
    border: "border-transparent",
  },
  accent: {
    bg: "bg-transparent",
    text: "text-accent",
    hover: "hover:bg-accent/10 dark:hover:bg-accent/20",
    active: "bg-accent/20 dark:bg-accent/30",
    border: "border-transparent",
  },
  error: {
    bg: "bg-transparent",
    text: "text-error",
    hover: "hover:bg-error/10 dark:hover:bg-error/20",
    active: "bg-error/20 dark:bg-error/30",
    border: "border-transparent",
  },
  success: {
    bg: "bg-transparent",
    text: "text-success",
    hover: "hover:bg-success/10 dark:hover:bg-success/20",
    active: "bg-success/20 dark:bg-success/30",
    border: "border-transparent",
  },
  warning: {
    bg: "bg-transparent",
    text: "text-warning",
    hover: "hover:bg-warning/10 dark:hover:bg-warning/20",
    active: "bg-warning/20 dark:bg-warning/30",
    border: "border-transparent",
  },
  info: {
    bg: "bg-transparent",
    text: "text-info",
    hover: "hover:bg-info/10 dark:hover:bg-info/20",
    active: "bg-info/20 dark:bg-info/30",
    border: "border-transparent",
  },
  white: {
    bg: "bg-transparent",
    text: "text-white",
    hover: "hover:bg-white/10 dark:hover:bg-white/20",
    active: "bg-white/20 dark:bg-white/30",
    border: "border-transparent",
  },
  black: {
    bg: "bg-transparent",
    text: "text-black",
    hover: "hover:bg-black/10 dark:hover:bg-black/20",
    active: "bg-black/20 dark:bg-black/30",
    border: "border-transparent",
  },
  gray: {
    bg: "bg-transparent",
    text: "text-gray-500 dark:text-gray-400",
    hover: "hover:bg-gray-100 dark:hover:bg-gray-800",
    active: "bg-gray-200 dark:bg-gray-700",
    border: "border-transparent",
  },
  inherit: {
    bg: "bg-transparent",
    text: "text-inherit",
    hover: "hover:bg-inherit hover:text-inherit",
    active: "text-inherit",
    border: "border-inherit",
  },
};

/**
 * Base icon button styles
 * Uses token-based border radius and transitions
 */
export const BASE_STYLES = `rounded-lg ${TRANSITION_STYLES.colors}`;

/**
 * Disabled styles
 * Uses centralized disabled state styles
 */
export const DISABLED_BG_STYLES = DISABLED_STYLES.bg;
export const DISABLED_COMMON_STYLES = DISABLED_STYLES.common;

/**
 * Re-export ColorStyles type for component use
 */
export type { ColorStyles };
