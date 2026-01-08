import type { SkeletonVariant } from "./types";
import type { ComponentColor } from "../types";

export const VARIANTS: Record<SkeletonVariant, string> = {
  rectangular: "rounded",
  circular: "rounded-full",
  text: "rounded",
};

export const ANIMATION_STYLES: Record<string, string> = {
  pulse: "animate-pulse",
  wave: "skeleton-wave",
  none: "",
};

export const COLOR_STYLES: Record<ComponentColor, string> = {
  primary: "bg-primary/10",
  secondary: "bg-secondary/10",
  accent: "bg-accent/10",
  error: "bg-error/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
  info: "bg-info/10",
  white: "bg-white/10",
  black: "bg-black/10",
  inherit: "bg-inherit/10",
  gray: "bg-background-muted",
};

export const DEFAULT_ANIMATION = "wave";
export const DEFAULT_VARIANT = "rectangular";
export const DEFAULT_COLOR = "gray";
