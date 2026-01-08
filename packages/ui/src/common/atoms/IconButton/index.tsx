"use client";

import { combineClassNames } from "@nathanhfoster/utils";
import type { IconButtonProps } from "./types";
import type { ComponentColor, ComponentVariant } from "../types";
import {
  BASE_STYLES,
  VARIANT_STYLES,
  COLOR_STYLES,
  COLOR_STYLES_OUTLINED,
  COLOR_STYLES_TEXT,
  COLOR_STYLES_GHOST,
  DISABLED_BG_STYLES,
  DISABLED_COMMON_STYLES,
} from "./constants";

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "default",
  color = "inherit",
  isActive = false,
  disabled = false,
  className,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: "p-2 text-sm",
    md: "p-3 text-base",
    lg: "p-4 text-lg",
  };

  // Determine effective variant (default maps to ghost for backward compatibility)
  const effectiveVariant: ComponentVariant | "ghost" | "default" =
    variant === "default" ? "ghost" : variant;

  // Get variant styles
  const variantStyles = VARIANT_STYLES[effectiveVariant] || "";

  // Get color styles based on variant
  const colorStyles =
    effectiveVariant === "outlined"
      ? COLOR_STYLES_OUTLINED[color as ComponentColor]
      : effectiveVariant === "text"
        ? COLOR_STYLES_TEXT[color as ComponentColor]
        : effectiveVariant === "ghost"
          ? COLOR_STYLES_GHOST[color as ComponentColor]
          : COLOR_STYLES[color as ComponentColor];

  // Build classes based on variant and color
  const variantColorClasses =
    effectiveVariant === "contained"
      ? combineClassNames(
          !disabled && colorStyles.bg,
          !disabled && colorStyles.text,
          !disabled && colorStyles.hover,
          isActive && colorStyles.active,
        )
      : effectiveVariant === "outlined"
        ? combineClassNames(
            colorStyles.border,
            !disabled && colorStyles.text,
            !disabled && colorStyles.hover,
            isActive && colorStyles.active,
            "border",
          )
        : effectiveVariant === "ghost"
          ? combineClassNames(
              !disabled && colorStyles.text,
              !disabled && colorStyles.hover,
              isActive && colorStyles.active,
            )
          : combineClassNames(
              !disabled && colorStyles.text,
              !disabled && colorStyles.hover,
              isActive && colorStyles.active,
            );

  return (
    <button
      type="button"
      disabled={disabled}
      className={combineClassNames(
        BASE_STYLES,
        "flex flex-col items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500",
        sizeClasses[size],
        variantStyles,
        variantColorClasses,
        disabled && DISABLED_COMMON_STYLES,
        disabled &&
          effectiveVariant !== "text" &&
          effectiveVariant !== "ghost" &&
          DISABLED_BG_STYLES,
        className,
      )}
      aria-label={label}
      {...props}
    >
      <span className="flex-shrink-0">{icon}</span>
      {label && <span className="text-xs">{label}</span>}
    </button>
  );
}

export type { IconButtonProps } from "./types";
