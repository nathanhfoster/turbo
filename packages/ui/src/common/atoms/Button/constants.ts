/**
 * Button Component Constants
 *
 * Uses centralized design tokens and style utilities.
 * Follows SOLID principles - components depend on token abstractions,
 * not concrete Tailwind classes.
 */

import dynamic from "next/dynamic";
import type { ComponentVariant, ComponentColor } from "../types";
import type { ColorStyles } from "../../../tokens/styleUtils";
import { ComponentType } from "react";
import { LinkProps } from "../Link/types";
import {
  generateColorStylesMapping,
  VARIANT_BASE_STYLES,
  DISABLED_STYLES,
  TRANSITION_STYLES,
} from "../../../tokens/styleUtils";

const Link = dynamic<LinkProps>(() => import("../Link"));

export type ButtonVariant = "button" | "a";

export type ButtonComponentType = {
  button: ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  a: ComponentType<LinkProps>;
};

export const BUTTON_VARIANT_MAPPING: ButtonComponentType = {
  button: "button" as unknown as ComponentType<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >,
  a: Link as ComponentType<LinkProps>,
};

/**
 * Variant-specific styles
 * Uses centralized variant styles from tokens
 */
export const VARIANT_STYLES: Record<ComponentVariant, string> = VARIANT_BASE_STYLES;

/**
 * Color styles for contained variant
 * Generated from centralized style utilities
 */
export const COLOR_STYLES: Record<ComponentColor, ColorStyles> =
  generateColorStylesMapping("contained");

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
 * Base button styles
 * Uses token-based border radius and transitions
 */
export const BASE_STYLES = `rounded-md ${TRANSITION_STYLES.colors}`;

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
