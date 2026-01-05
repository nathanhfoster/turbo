import type { ComponentColor, Size } from "../types";

export const FILE_DROPPER_BASE_STYLES =
  "border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer";

export const FILE_DROPPER_COLOR_STYLES: Record<
  ComponentColor | "error",
  string
> = {
  primary: "border-primary hover:border-primary-dark hover:bg-primary/5",
  secondary: "border-secondary hover:border-secondary-dark hover:bg-secondary/5",
  accent: "border-accent hover:border-accent-dark hover:bg-accent/5",
  error: "border-error hover:border-error-dark hover:bg-error/5",
  success: "border-success hover:border-success-dark hover:bg-success/5",
  warning: "border-warning hover:border-warning-dark hover:bg-warning/5",
  info: "border-info hover:border-info-dark hover:bg-info/5",
  inherit: "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
  white: "border-white hover:border-gray-100 hover:bg-white/5",
  black: "border-black hover:border-gray-900 hover:bg-black/5",
  gray: "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
};

export const FILE_DROPPER_DISABLED_STYLES =
  "opacity-50 cursor-not-allowed pointer-events-none";

export const FILE_DROPPER_DRAG_OVER_STYLES =
  "border-primary bg-primary/10 scale-[1.02]";

export const FILE_DROPPER_SIZE_STYLES: Record<Size, string> = {
  inherit: "p-4",
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-10",
  "3xl": "p-12",
  "4xl": "p-14",
  "5xl": "p-16",
  "6xl": "p-18",
  "7xl": "p-20",
  "8xl": "p-22",
  "9xl": "p-24",
};

