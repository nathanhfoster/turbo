import withBaseTheme from "../../hocs/withBaseTheme";
import withForwardRef from "../../hocs/withForwardRef";
import { TAILWIND_SIZES } from "../../../constants";
import { combineClassNames } from "@nathanhfoster/utils";
import React from "react";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import type { ComponentColor, ComponentVariant, Size } from "../types";
import type { TypographySizeProp } from "../Typography/types";
import {
  BASE_STYLES,
  BUTTON_VARIANT_MAPPING,
  COLOR_STYLES,
  DISABLED_BG_STYLES,
  DISABLED_COMMON_STYLES,
  VARIANT_STYLES,
} from "./constants";
import { AnchorProps, FinalButtonProps } from "./types";

const BaseButton = ({
  type = "button",
  variant = "contained",
  color = "inherit",
  size = "md",
  children,
  disabled = false,
  isActive = false,
  href,
  className = "",
  ...props
}: FinalButtonProps) => {
  const variantStyles = VARIANT_STYLES[variant as ComponentVariant];
  const colorStyles = COLOR_STYLES[color as ComponentColor];
  const sizeStyles = TAILWIND_SIZES[size as Size];
  const isAnchor = !!href;

  const combinedClassName = combineClassNames(
    BASE_STYLES,
    variantStyles,
    !disabled &&
      variant === "contained" &&
      combineClassNames(colorStyles.bg, "text-white", "hover:brightness-92"),
    !disabled &&
      variant === "outlined" &&
      combineClassNames(
        colorStyles.border,
        colorStyles.text,
        colorStyles.hover,
        isActive && colorStyles.bg,
      ),
    variant === "text" && (isActive ? colorStyles.active : colorStyles.hover),
    sizeStyles,
    disabled && DISABLED_COMMON_STYLES,
    disabled && variant !== "text" && DISABLED_BG_STYLES,
    className,
  );

  if (isAnchor) {
    const LinkComponent = BUTTON_VARIANT_MAPPING.a;
    const linkProps = {
      disabled,
      className: combinedClassName,
      color,
      size: size as TypographySizeProp,
      ...(props as AnchorProps),
      href,
    };
    return <LinkComponent {...linkProps}>{children}</LinkComponent>;
  }

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type,
    disabled,
    className: combinedClassName,
    ...(props as React.ButtonHTMLAttributes<HTMLButtonElement>),
  };
  return <button {...buttonProps}>{children}</button>;
};

// @ts-expect-error - HOC type is incompatible with Next.js 15's stricter typing
export default withForwardRef(withBaseTheme(withBaseTailwindProps(BaseButton)));
