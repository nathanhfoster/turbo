/**
 * Chip Component Constants
 *
 * Defines variant and size styles for the Chip component.
 * Follows the same pattern as Button component.
 */

import type { ChipVariant, ChipSize } from "./types";

/**
 * Variant-specific styles
 */
export const VARIANT_STYLES: Record<ChipVariant, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  primary:
    "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300",
  secondary:
    "bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300",
};

/**
 * Size-specific styles
 */
export const SIZE_STYLES: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

/**
 * Base chip styles
 */
export const BASE_STYLES = "inline-flex items-center gap-1 rounded-full font-medium";
