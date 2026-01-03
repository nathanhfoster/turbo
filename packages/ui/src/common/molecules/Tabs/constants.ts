import type { TabVariant } from "../../atoms/Tab/types";
import type { ComponentColor } from "../../atoms/types";

export const TABS_BASE_STYLES = "flex flex-wrap text-center";

export const TABS_VARIANT_STYLES: Record<TabVariant, string> = {
  default: "border-b border-gray-200",
  underline: "border-b border-gray-200",
  pills: "",
};

export const TABS_COLOR_MAP: Record<ComponentColor, string> = {
  primary: "border-blue-500 text-blue-600",
  secondary: "border-gray-500 text-gray-600",
  accent: "border-purple-500 text-purple-600",
  error: "border-red-500 text-red-600",
  success: "border-green-500 text-green-600",
  warning: "border-yellow-500 text-yellow-600",
  info: "border-cyan-500 text-cyan-600",
  white: "border-white text-white",
  black: "border-black text-black",
  gray: "border-gray-500 text-gray-600",
  inherit: "border-current text-current",
};
