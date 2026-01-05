import type { Size } from "../types";
import type { CardVariant } from "./types";
/**
 * Mobile-first card base styles using semantic theme tokens
 * Uses background which automatically switches between white (light) and dark (dark mode)
 * Text color uses foreground for proper contrast
 */
export const BASE_STYLES = "rounded-lg bg-background text-foreground";

export const BORDER_STYLES = "border border-border";

export const HOVER_STYLES =
  "transition-all hover:shadow-md hover:cursor-pointer";

/**
 * Mobile-first responsive padding using theme spacing tokens
 * Scales from mobile (smaller) to desktop (larger)
 */
export const PADDING_STYLES: Record<Size, string> = {
  inherit: "p-inherit",
  xs: "p-2 sm:p-3",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5 md:p-6",
  lg: "p-5 sm:p-6 md:p-8",
  xl: "p-6 sm:p-8 md:p-10",
  "2xl": "p-8 sm:p-10 md:p-12",
  "3xl": "p-10 sm:p-12 md:p-14",
  "4xl": "p-12 sm:p-14 md:p-16",
  "5xl": "p-14 sm:p-16 md:p-18",
  "6xl": "p-16 sm:p-18 md:p-20",
  "7xl": "p-18 sm:p-20 md:p-22",
  "8xl": "p-20 sm:p-22 md:p-24",
  "9xl": "p-22 sm:p-24 md:p-26",
};

export const CARD_VARIANTS: Record<CardVariant, string> = {
  default: "",
  elevated: "shadow-md",
  flat: "shadow-none",
  bordered: BORDER_STYLES,
};
