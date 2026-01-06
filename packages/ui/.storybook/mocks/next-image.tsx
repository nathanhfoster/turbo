/**
 * Mock for next/image in Storybook
 * Since Storybook doesn't run in a Next.js environment, we provide
 * a simple mock that uses a regular img tag
 */

import React from "react";
import type { ImageProps as NextImageProps } from "next/image";

type ImageProps = Omit<
  NextImageProps,
  "loader" | "unoptimized" | "priority" | "quality"
> & {
  src: string | NextImageProps["src"];
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const Image = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  ...props
}: ImageProps) => {
  // Handle different Next.js Image src types
  let imageSrc: string;
  if (typeof src === "string") {
    imageSrc = src;
  } else if (typeof src === "object") {
    // Handle StaticImageData or StaticRequire
    imageSrc = (src as any).src || (src as any).default?.src || String(src);
  } else {
    imageSrc = String(src);
  }

  const imageStyle: React.CSSProperties = {
    ...style,
    ...(fill && {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }),
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={imageStyle}
      {...props}
    />
  );
};

export default Image;

