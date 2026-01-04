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
