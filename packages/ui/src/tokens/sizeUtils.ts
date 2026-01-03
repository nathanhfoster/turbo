/**
 * Size Utilities
 *
 * Central utilities for generating size-based component styles.
 * Follows mobile-first responsive design principles.
 * All sizes follow WCAG minimum touch target guidelines (44x44px minimum).
 */

import type { Size } from "../common/atoms/types";

/**
 * Button/Interactive Element Sizes
 * Mobile-first with proper touch targets (minimum 44x44px)
 * Uses theme spacing tokens and responsive scaling
 */
export const BUTTON_SIZES: Record<Size, string> = {
  inherit: "px-0 py-0 text-inherit",
  xs: "px-2 py-1.5 text-xs min-h-[32px] sm:px-2.5 sm:py-2",
  sm: "px-3 py-2 text-sm min-h-[40px] sm:px-4 sm:py-2.5",
  md: "px-4 py-2.5 text-base min-h-[44px] sm:px-5 sm:py-3",
  lg: "px-5 py-3 text-lg min-h-[48px] sm:px-6 sm:py-3.5",
  xl: "px-6 py-3.5 text-xl min-h-[52px] sm:px-8 sm:py-4",
  "2xl": "px-8 py-4 text-2xl min-h-[56px] sm:px-10 sm:py-5",
  "3xl": "px-10 py-5 text-3xl min-h-[64px] sm:px-12 sm:py-6",
  "4xl": "px-12 py-6 text-4xl min-h-[72px] sm:px-14 sm:py-7",
  "5xl": "px-14 py-7 text-5xl min-h-[80px] sm:px-16 sm:py-8",
  "6xl": "px-16 py-8 text-6xl min-h-[88px] sm:px-18 sm:py-9",
  "7xl": "px-18 py-9 text-7xl min-h-[96px] sm:px-20 sm:py-10",
  "8xl": "px-20 py-10 text-8xl min-h-[104px] sm:px-22 sm:py-11",
  "9xl": "px-22 py-11 text-9xl min-h-[112px] sm:px-24 sm:py-12",
};

/**
 * Input Sizes
 * Matches button sizes for consistency
 */
export const INPUT_SIZES: Record<Size, string> = {
  inherit: "px-0 py-0 text-inherit",
  xs: "px-2 py-1.5 text-xs min-h-[32px]",
  sm: "px-3 py-2 text-sm min-h-[40px]",
  md: "px-4 py-2.5 text-base min-h-[44px]",
  lg: "px-5 py-3 text-lg min-h-[48px]",
  xl: "px-6 py-3.5 text-xl min-h-[52px]",
  "2xl": "px-8 py-4 text-2xl min-h-[56px]",
  "3xl": "px-10 py-5 text-3xl min-h-[64px]",
  "4xl": "px-12 py-6 text-4xl min-h-[72px]",
  "5xl": "px-14 py-7 text-5xl min-h-[80px]",
  "6xl": "px-16 py-8 text-6xl min-h-[88px]",
  "7xl": "px-18 py-9 text-7xl min-h-[96px]",
  "8xl": "px-20 py-10 text-8xl min-h-[104px]",
  "9xl": "px-22 py-11 text-9xl min-h-[112px]",
};

/**
 * Card/Container Padding Sizes
 * Mobile-first responsive padding using theme spacing tokens
 */
export const PADDING_SIZES: Record<Size, string> = {
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

/**
 * Icon Sizes
 * Standard icon dimensions
 */
export const ICON_SIZES: Record<Size, string> = {
  inherit: "w-inherit h-inherit",
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
  "3xl": "w-12 h-12",
  "4xl": "w-16 h-16",
  "5xl": "w-20 h-20",
  "6xl": "w-24 h-24",
  "7xl": "w-32 h-32",
  "8xl": "w-40 h-40",
  "9xl": "w-48 h-48",
};

/**
 * Avatar/Circle Sizes
 */
export const AVATAR_SIZES: Record<Size, string> = {
  inherit: "w-inherit h-inherit",
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
  "3xl": "w-24 h-24",
  "4xl": "w-32 h-32",
  "5xl": "w-40 h-40",
  "6xl": "w-48 h-48",
  "7xl": "w-56 h-56",
  "8xl": "w-64 h-64",
  "9xl": "w-72 h-72",
};

/**
 * Gap/Spacing Sizes
 * For flex/grid containers
 */
export const GAP_SIZES: Record<Size, string> = {
  inherit: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-5",
  "2xl": "gap-6",
  "3xl": "gap-8",
  "4xl": "gap-10",
  "5xl": "gap-12",
  "6xl": "gap-16",
  "7xl": "gap-20",
  "8xl": "gap-24",
  "9xl": "gap-32",
};

/**
 * Border Radius Sizes
 */
export const RADIUS_SIZES: Record<Size, string> = {
  inherit: "rounded-inherit",
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "4xl": "rounded-[2rem]",
  "5xl": "rounded-[2.5rem]",
  "6xl": "rounded-[3rem]",
  "7xl": "rounded-[4rem]",
  "8xl": "rounded-[5rem]",
  "9xl": "rounded-[6rem]",
};
