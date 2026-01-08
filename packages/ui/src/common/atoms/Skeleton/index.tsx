import { combineClassNames } from "@nathanhfoster/utils";
import type { SkeletonProps } from "./types";
import {
  VARIANTS,
  ANIMATION_STYLES,
  COLOR_STYLES,
  DEFAULT_ANIMATION,
  DEFAULT_VARIANT,
  DEFAULT_COLOR,
} from "./constants";
import type { ComponentColor } from "../types";
import withBaseTheme from "../../hocs/withBaseTheme";
import withForwardRef from "../../hocs/withForwardRef";

const Skeleton = ({
  variant = DEFAULT_VARIANT,
  fullWidth,
  fullHeight,
  width,
  height,
  borderRadius,
  animation = DEFAULT_ANIMATION,
  color = DEFAULT_COLOR,
  className,
  style,
  ...props
}: SkeletonProps) => {
  const variantClasses = VARIANTS[variant];
  const animationClasses = ANIMATION_STYLES[animation];
  const colorClasses = COLOR_STYLES[color as ComponentColor] ?? color;

  const baseClasses = combineClassNames(
    variantClasses,
    animationClasses,
    colorClasses,
    fullWidth && "w-full",
    fullHeight && "h-full",
    "relative",
    "overflow-hidden",
    className,
  );

  const sizeStyle: React.CSSProperties = {
    width: fullWidth ? "100%" : width,
    height: fullHeight ? "100%" : height,
    borderRadius: borderRadius,
    ...style,
  };

  return (
    <div className={baseClasses} style={sizeStyle} {...props}>
      {animation === "wave" && (
        <div
          className="absolute inset-0 skeleton-shimmer pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default withForwardRef(withBaseTheme(Skeleton));
