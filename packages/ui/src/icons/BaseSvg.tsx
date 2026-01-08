import React, { FC, SVGProps } from "react";

export interface BaseProps extends SVGProps<SVGSVGElement> {}

const BaseSvg: FC<BaseProps> = ({
  children,
  className,
  width,
  height,
  style,
  ...restOfProps
}) => {
  // Check if className contains Tailwind width/height utilities
  const hasSizeClass = className?.includes("w-") || className?.includes("h-");

  // Build SVG props
  const svgProps: React.SVGProps<SVGSVGElement> = {
    ...restOfProps,
    className: className
      ? `fill-current stroke-current ${className}`
      : "fill-current stroke-current",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    fill: "currentColor",
  };

  // Only set width/height attributes if:
  // 1. No size classes in className (let CSS handle it), AND
  // 2. Explicit width/height props are provided OR we need defaults
  if (!hasSizeClass) {
    svgProps.width = width || "1rem";
    svgProps.height = height || "1rem";
  } else if (width || height) {
    // If size classes exist but explicit props provided, use props (they take precedence)
    if (width) svgProps.width = width;
    if (height) svgProps.height = height;
  }
  // If hasSizeClass and no explicit width/height, don't set attributes - let CSS handle it

  if (style) {
    svgProps.style = style;
  }

  return <svg {...svgProps}>{children}</svg>;
};

export default BaseSvg;
