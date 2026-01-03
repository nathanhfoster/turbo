/**
 * Design System Tokens
 *
 * Central source of truth for all design tokens used across components.
 * Follows SOLID principles:
 * - Single Responsibility: Each token has one clear purpose
 * - Open/Closed: Extensible through composition, closed for modification
 * - Dependency Inversion: Components depend on token abstractions
 *
 * This file exports token utilities that reference the CSS custom properties
 * defined in index.css. Apps can override tokens by providing their own
 * @theme block in their globals.css.
 */

import type { ComponentColor, Size } from "../common/atoms/types";

/**
 * Color Token System
 * Maps component color props to semantic Tailwind classes
 * These reference the --color-* tokens in index.css
 */
export const COLOR_TOKENS = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  error: "error",
  success: "success",
  warning: "warning",
  info: "info",
  neutral: "neutral-500",
  inherit: "inherit",
  // Utility colors
  white: "white",
  black: "black",
  gray: "neutral-500",
} as const satisfies Record<ComponentColor, string>;

/**
 * Foreground/Text Color Tokens
 * Semantic color tokens for text and foreground elements
 */
export const FOREGROUND_TOKENS = {
  DEFAULT: "foreground-DEFAULT",
  muted: "foreground-muted",
  subtle: "foreground-subtle",
  inverted: "foreground-inverted",
} as const;

/**
 * Background Color Tokens
 * Semantic color tokens for backgrounds
 */
export const BACKGROUND_TOKENS = {
  DEFAULT: "background-DEFAULT",
  elevated: "background-elevated",
  subtle: "background-subtle",
  muted: "background-muted",
} as const;

/**
 * Border Color Tokens
 * Semantic color tokens for borders
 */
export const BORDER_TOKENS = {
  DEFAULT: "border-DEFAULT",
  subtle: "border-subtle",
  accent: "border-accent",
} as const;

/**
 * Spacing Tokens
 * Maps size props to spacing scale
 */
export const SPACING_TOKENS: Record<Size, string> = {
  inherit: "0",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  "4xl": "4.5",
  "5xl": "15",
  "6xl": "18",
  "7xl": "84",
  "8xl": "100",
  "9xl": "329",
};

/**
 * Radius Tokens
 * Border radius values
 */
export const RADIUS_TOKENS = {
  none: "none",
  sm: "sm",
  DEFAULT: "md",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  full: "full",
} as const;

/**
 * Shadow Tokens
 * Elevation system
 */
export const SHADOW_TOKENS = {
  none: "none",
  xs: "xs",
  sm: "sm",
  DEFAULT: "DEFAULT",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  inner: "inner",
  // Colored shadows
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
} as const;

/**
 * Duration Tokens
 * Animation/transition durations
 */
export const DURATION_TOKENS = {
  instant: "instant",
  fast: "fast",
  normal: "normal",
  slow: "slow",
  slower: "slower",
} as const;

/**
 * Font Weight Tokens
 */
export const FONT_WEIGHT_TOKENS = {
  light: "light",
  normal: "normal",
  medium: "medium",
  semibold: "semibold",
  bold: "bold",
  extrabold: "extrabold",
} as const;

/**
 * Z-Index Tokens
 */
export const Z_INDEX_TOKENS = {
  dropdown: "dropdown",
  sticky: "sticky",
  fixed: "fixed",
  modalBackdrop: "modal-backdrop",
  modal: "modal",
  popover: "popover",
  tooltip: "tooltip",
} as const;

/**
 * Type exports for token values
 */
export type ColorToken = keyof typeof COLOR_TOKENS;
export type SpacingToken = keyof typeof SPACING_TOKENS;
export type RadiusToken = keyof typeof RADIUS_TOKENS;
export type ShadowToken = keyof typeof SHADOW_TOKENS;
export type DurationToken = keyof typeof DURATION_TOKENS;
export type FontWeightToken = keyof typeof FONT_WEIGHT_TOKENS;
export type ZIndexToken = keyof typeof Z_INDEX_TOKENS;
