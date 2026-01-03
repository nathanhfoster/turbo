import type { TabVariant } from "../../atoms/Tab/types";
import type { ComponentColor } from "../../atoms/types";

export const TABS_BASE_STYLES = "flex flex-wrap text-center";

export const TABS_VARIANT_STYLES: Record<TabVariant, string> = {
  default: "border-b border-neutral-200",
  underline: "border-b border-neutral-200",
  pills: "",
};

export const TABS_COLOR_MAP: Record<ComponentColor, string> = {
  primary: "border-primary text-primary",
  secondary: "border-secondary text-secondary",
  accent: "border-accent text-accent",
  error: "border-error text-error",
  success: "border-success text-success",
  warning: "border-warning text-warning",
  info: "border-info text-info",
  white: "border-white text-white",
  black: "border-black text-black",
  gray: "border-neutral-500 text-neutral-600",
  inherit: "border-current text-current",
};
