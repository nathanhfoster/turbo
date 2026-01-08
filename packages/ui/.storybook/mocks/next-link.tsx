/**
 * Mock for next/link in Storybook
 * Since Storybook doesn't run in a Next.js environment, we provide
 * a simple mock that uses a regular anchor tag
 */

import React from "react";
import type { LinkProps } from "next/link";

type LinkComponentProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Link = ({
  href,
  children,
  className,
  style,
  ...props
}: LinkComponentProps) => {
  const hrefString =
    typeof href === "string" ? href : href.pathname || href.href || "#";

  return (
    <a href={hrefString} className={className} style={style} {...props}>
      {children}
    </a>
  );
};

export default Link;
