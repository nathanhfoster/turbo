import withForwardRef from "./../../hocs/withForwardRef";
import { combineClassNames } from "@nathanhfoster/utils";
import type { ComponentType } from "react";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import type { ComponentColor } from "../types";
import {
  TYPOGRAPHY_COLOR_STYLES,
  TYPOGRAPHY_DISABLED_STYLES,
  TYPOGRAPHY_VARIANT_MAPPING,
  TYPOGRAPHY_VARIANT_STYLES,
  VARIANT_DEFAULT_SIZES,
  VARIANT_DEFAULT_WEIGHTS,
} from "./constants";
import type { TypographyProps } from "./types";

const BaseTypography = ({
  font,
  href,
  variant = href ? "a" : "span",
  italic = false,
  size,
  color,
  lineHeight = "leading-normal",
  weight,
  truncate = false,
  ellipsis = false,
  whiteSpaceNoWrap = false,
  noWrap = false,
  center = false,
  capitalize = false,
  uppercase = false,
  underline = false,
  lineClamp,
  className,
  disabled = false,
  children,
  ...props
}: TypographyProps) => {
  const defaultSize = VARIANT_DEFAULT_SIZES[variant] ?? "text-base";
  const sizeClass = size ?? defaultSize;
  const Component = TYPOGRAPHY_VARIANT_MAPPING[variant] as ComponentType<any>;
  const baseStyles = TYPOGRAPHY_VARIANT_STYLES[variant];
  
  // Default color: for headings, use text that works in both light and dark modes
  // For other variants, default to inherit
  // If color is explicitly provided, use it; otherwise use defaults
  const effectiveColor = color !== undefined 
    ? color 
    : (variant === "h1" || variant === "h2" || variant === "h3" || variant === "h4" || variant === "h5" || variant === "h6")
      ? undefined // Will use default heading color from baseStyles
      : "inherit";
  
  const colorStyle = effectiveColor 
    ? (TYPOGRAPHY_COLOR_STYLES[effectiveColor as ComponentColor] ?? effectiveColor)
    : "";
  const defaultWeight = VARIANT_DEFAULT_WEIGHTS[variant];
  const weightStyle = weight ?? defaultWeight;

  return (
    <Component
      {...props}
      href={href}
      className={combineClassNames(
        font && font,
        baseStyles,
        colorStyle,
        sizeClass,
        lineHeight && lineHeight,
        weightStyle && weightStyle,
        italic && "italic",
        truncate && "truncate",
        ellipsis && "ellipsis",
        whiteSpaceNoWrap && "whitespace-nowrap",
        noWrap && "nowrap",
        underline && (variant === "a" ? "hover:underline" : "underline"),
        capitalize && "capitalize",
        uppercase && "uppercase",
        center && "text-center",
        lineClamp && lineClamp,
        disabled && TYPOGRAPHY_DISABLED_STYLES,
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default withForwardRef(withBaseTailwindProps(BaseTypography));
