import type { ComponentColor } from "../types";
import type { TabVariant } from "./types";

export const VARIANT_STYLES: Record<TabVariant, string> = {
  default: "",
  underline: "",
  pills: "rounded-full",
};

/**
 * Mobile-first tab styles with proper touch targets (minimum 44px height)
 * Uses responsive spacing for better mobile experience
 */
export const BASE_STYLES =
  "inline-flex items-center justify-center px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] transition-colors duration-200 font-medium";

export const DISABLED_STYLES = "!text-neutral-400 !cursor-not-allowed";

export const getTabStyles = ({
  isActive,
  isDisabled,
  variant = "default",
  color = "primary",
  fullWidth = false,
}: {
  isActive: boolean;
  isDisabled: boolean;
  variant?: TabVariant;
  color?: ComponentColor;
  fullWidth?: boolean;
}) => {
  const variantStyles = VARIANT_STYLES[variant];
  const widthStyles = fullWidth ? "flex-1" : "";

  if (isDisabled) {
    return `${BASE_STYLES} ${variantStyles} ${widthStyles} ${DISABLED_STYLES}`;
  }

  return `${BASE_STYLES} ${variantStyles} ${widthStyles}`;
};
