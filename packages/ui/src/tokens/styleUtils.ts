/**
 * Style Utilities
 *
 * Central factory for generating component styles using design tokens.
 * Follows SOLID principles:
 * - Single Responsibility: Each utility has one purpose
 * - Open/Closed: Extensible through composition
 * - DRY: Eliminates duplicate style definitions across components
 *
 * These utilities generate Tailwind classes that reference design tokens.
 * Components use these utilities instead of hardcoding styles.
 */

import type { ComponentColor, ComponentVariant } from "../common/atoms/types";
import { COLOR_TOKENS } from "./index";

/**
 * Style interface for color-based components
 * Used by Button, Input, Badge, etc.
 */
export interface ColorStyles {
  bg: string;
  text: string;
  hover: string;
  active: string;
  border: string;
  focus?: string;
  ring?: string;
}

/**
 * Generate background color class
 */
export function getBgColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "bg-inherit" : `bg-${token}`;
}

/**
 * Generate text color class
 */
export function getTextColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "text-inherit" : `text-${token}`;
}

/**
 * Generate border color class
 */
export function getBorderColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "border-inherit" : `border-${token}`;
}

/**
 * Generate hover border color class
 */
export function getHoverBorderColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "hover:border-inherit" : `hover:border-${token}`;
}

/**
 * Generate hover background color class
 */
export function getHoverBgColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "hover:bg-inherit" : `hover:bg-${token}`;
}

/**
 * Generate hover text color class
 */
export function getHoverTextColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "hover:text-inherit" : `hover:text-${token}`;
}

/**
 * Generate focus border color class
 */
export function getFocusBorderColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "focus:border-inherit" : `focus:border-${token}`;
}

/**
 * Generate focus ring color class
 */
export function getFocusRingColor(color: ComponentColor): string {
  const token = COLOR_TOKENS[color];
  return token === "inherit" ? "focus:ring-inherit" : `focus:ring-${token}`;
}

/**
 * Create color styles for different component variants
 * This is the central style generator used by all components
 */
export function createColorStyles(
  color: ComponentColor,
  variant: ComponentVariant = "contained",
): ColorStyles {
  switch (variant) {
    case "contained":
      return {
        bg: getBgColor(color),
        text: color === "inherit" ? "text-inherit" : "text-foreground-inverted",
        hover: `${getHoverBgColor(color)} hover:brightness-90`,
        active: getBgColor(color),
        border: "border-transparent",
      };

    case "outlined":
      // For outlined buttons, use darker text in light mode and lighter shade in dark mode for better contrast
      // Use text-gray-900 for light mode (no !important to avoid conflicts) and dark:text-*-300 for dark mode
      const outlinedTextColor =
        color === "inherit"
          ? "text-inherit"
          : color === "white" || color === "black" || color === "gray"
            ? getTextColor(color) // Keep as-is for utility colors
            : color === "primary"
              ? "text-gray-900 dark:text-primary-300"
              : color === "secondary"
                ? "text-gray-900 dark:text-secondary-300"
                : color === "accent"
                  ? "text-gray-900 dark:text-accent-300"
                  : color === "error"
                    ? "text-gray-900 dark:text-error-300"
                    : color === "success"
                      ? "text-gray-900 dark:text-success-300"
                      : color === "warning"
                        ? "text-gray-900 dark:text-warning-300"
                        : color === "info"
                          ? "text-gray-900 dark:text-info-300"
                          : `text-gray-900 dark:text-${COLOR_TOKENS[color]}-300`;
      return {
        bg: "bg-transparent",
        text: outlinedTextColor,
        hover: color === "inherit"
          ? "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 hover:border-opacity-100"
          : `${getHoverBgColor(color)} hover:text-foreground-inverted hover:border-opacity-100`,
        active: getBgColor(color),
        border: `${getBorderColor(color)} border-opacity-60 dark:border-opacity-70`, // Visible border with opacity for better visibility
        focus: getFocusBorderColor(color),
      };

    case "text":
      return {
        bg: "bg-transparent",
        text: getTextColor(color),
        hover: `${getHoverBgColor(color)} hover:bg-opacity-10`,
        active: `${getTextColor(color)} bg-opacity-20`,
        border: "border-transparent",
      };

    default:
      return {
        bg: "bg-inherit",
        text: "text-inherit",
        hover: "hover:bg-inherit hover:text-inherit",
        active: "text-inherit",
        border: "border-inherit",
      };
  }
}

/**
 * Generate color styles for all component colors
 * Used in constants.ts files
 */
export function generateColorStylesMapping(
  variant: ComponentVariant = "contained",
): Record<ComponentColor, ColorStyles> {
  const colors: ComponentColor[] = [
    "primary",
    "secondary",
    "accent",
    "error",
    "success",
    "warning",
    "info",
    "white",
    "black",
    "gray",
    "inherit",
  ];

  return colors.reduce(
    (acc, color) => {
      acc[color] = createColorStyles(color, variant);
      return acc;
    },
    {} as Record<ComponentColor, ColorStyles>,
  );
}

/**
 * Input-specific color styles
 */
export interface InputColorStyles {
  border: string;
  focus: string;
  hover?: string;
}

/**
 * Generate input color styles
 */
export function createInputColorStyles(
  color: ComponentColor,
): InputColorStyles {
  return {
    border: getBorderColor(color),
    focus: `${getFocusBorderColor(color)} ${getFocusRingColor(color)}`,
    hover: getHoverBorderColor(color),
  };
}

/**
 * Generate input color styles for all colors
 */
export function generateInputColorStylesMapping(): Record<
  ComponentColor,
  InputColorStyles
> {
  const colors: ComponentColor[] = [
    "primary",
    "secondary",
    "accent",
    "error",
    "success",
    "warning",
    "info",
    "white",
    "black",
    "gray",
    "inherit",
  ];

  return colors.reduce(
    (acc, color) => {
      acc[color] = createInputColorStyles(color);
      return acc;
    },
    {} as Record<ComponentColor, InputColorStyles>,
  );
}

/**
 * Variant-specific base styles
 */
export const VARIANT_BASE_STYLES: Record<ComponentVariant, string> = {
  outlined: "border-2 bg-transparent", // More pronounced border for visibility
  contained: "border-1",
  text: "border-0 bg-transparent",
};

/**
 * Common disabled styles
 */
export const DISABLED_STYLES = {
  common:
    "cursor-not-allowed pointer-events-none select-none opacity-50 transition-opacity duration-300",
  bg: "bg-neutral-700",
  text: "text-neutral-400",
  border: "border-neutral-600",
};

/**
 * Common transition styles
 * Uses CSS custom properties from index.css for consistency
 */
export const TRANSITION_STYLES = {
  colors: "transition-colors duration-300 ease-in-out",
  all: "transition-all duration-300 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
  // Theme-specific transitions using CSS custom properties
  theme: `transition-[color,background-color,border-color] duration-[var(--duration-normal)] ease-[var(--ease-in-out)]`,
} as const;

/**
 * Common focus styles
 */
export const FOCUS_STYLES = {
  ring: "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ringSmall: "focus:outline-none focus:ring-1",
  outline: "focus:outline-2 focus:outline-offset-2",
};

/**
 * Common interaction states
 */
export const INTERACTION_STYLES = {
  hover: "hover:brightness-90 hover:scale-105",
  active: "active:brightness-95 active:scale-95",
  disabled: DISABLED_STYLES.common,
};
