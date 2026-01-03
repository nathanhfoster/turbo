import type { Size } from "../types";
import type { CardVariant } from "./types";
export const BASE_STYLES = "rounded-lg bg-white";

export const BORDER_STYLES = "border border-gray-200";

export const HOVER_STYLES =
  "transition-all hover:shadow-md hover:cursor-pointer";

export const PADDING_STYLES: Record<Size, string> = {
  inherit: "p-inherit",
  xs: "p-2",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
  "2xl": "p-12",
  "3xl": "p-14",
  "4xl": "p-16",
  "5xl": "p-18",
  "6xl": "p-20",
  "7xl": "p-22",
  "8xl": "p-24",
  "9xl": "p-26",
};

export const CARD_VARIANTS: Record<CardVariant, string> = {
  default: "",
  elevated: "shadow-md",
  flat: "shadow-none",
  bordered: BORDER_STYLES,
};
