import withBaseTheme from "../../hocs/withBaseTheme";
import { combineClassNames } from "@nathanhfoster/utils";
import React, { ComponentType, forwardRef } from "react";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import type { ComponentColor } from "../types";
import {
  BACKGROUND_COLOR_STYLES,
  COLOR_STYLES,
  CONTAINER_STYLES,
  DEFAULT_CONTAINER_STYLE,
  VARIANTS,
} from "./constants";
import { BoxProps } from "./types";

const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      variant = "div",
      className,
      position,
      overflow,
      bg,
      color,
      border,
      opacity,
      zIndex,
      container = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = (VARIANTS[variant] ??
      "div") as unknown as ComponentType<any>;

    const containerClasses = container
      ? typeof container === "string"
        ? CONTAINER_STYLES[container]
        : DEFAULT_CONTAINER_STYLE
      : "";

    const backgroundColorClasses =
      BACKGROUND_COLOR_STYLES[bg as ComponentColor] ?? bg;

    const colorClasses = COLOR_STYLES[color as ComponentColor] ?? color;

    const baseClasses = combineClassNames(
      containerClasses,
      position,
      overflow,
      backgroundColorClasses,
      colorClasses,
      border,
      opacity,
      zIndex,
      className,
    );

    return React.createElement(
      Component,
      {
        ref,
        className: baseClasses,
        ...(props as React.HTMLProps<HTMLElement>),
      },
      children,
    );
  },
);

Box.displayName = "Box";

// Compose HOCs with forwardRef component
// Type assertion needed because forwardRef returns ForwardRefExoticComponent
// which doesn't perfectly match ComponentType expected by HOCs
const BoxWithTailwind = withBaseTailwindProps(
  Box as unknown as ComponentType<BoxProps>
);
const BoxWithTheme = withBaseTheme(BoxWithTailwind);

export default BoxWithTheme as ComponentType<BoxProps>;
