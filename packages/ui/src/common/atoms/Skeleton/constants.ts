import type { SkeletonVariant } from "./types";
import type { ComponentColor } from "../types";

export const VARIANTS: Record<SkeletonVariant, string> = {
  rectangular: "rounded",
  circular: "rounded-full",
  text: "rounded",
};

export const ANIMATION_STYLES: Record<string, string> = {
  pulse: "animate-pulse",
  wave: "animate-shimmer",
  none: "",
};

export const COLOR_STYLES: Record<ComponentColor, string> = {
  primary: "bg-primary/20",
  secondary: "bg-secondary/20",
  accent: "bg-accent/20",
  error: "bg-error/20",
  success: "bg-success/20",
  warning: "bg-warning/20",
  info: "bg-info/20",
  white: "bg-white/20",
  black: "bg-black/20",
  inherit: "bg-inherit/20",
  gray: "bg-gray-200",
};

export const DEFAULT_ANIMATION = "pulse";
export const DEFAULT_VARIANT = "rectangular";
export const DEFAULT_COLOR = "gray";
