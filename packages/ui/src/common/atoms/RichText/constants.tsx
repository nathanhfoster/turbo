import type { Size } from "../types";
import type { RichTextVariant } from "./types";
import React from "react";
import Typography from "../Typography";
import Box from "../Box";
import parse, { Element, domToReact, DOMNode } from "html-react-parser";

export const RICH_TEXT_SIZES: Record<Size, string> = {
  inherit: "prose-inherit",
  xs: "prose-xs",
  sm: "prose-sm",
  md: "prose-md",
  lg: "prose-lg",
  xl: "prose-xl",
  "2xl": "prose-2xl",
  "3xl": "prose-3xl",
  "4xl": "prose-4xl",
  "5xl": "prose-5xl",
  "6xl": "prose-6xl",
  "7xl": "prose-7xl",
  "8xl": "prose-8xl",
  "9xl": "prose-9xl",
};

export const RICH_TEXT_VARIANTS: Record<RichTextVariant, string> = {
  default: "",
  compact: "prose-headings:mb-2 prose-p:mb-2",
  spacious: "prose-headings:mb-6 prose-p:mb-4",
};

export const parseHtml = (html: string): React.ReactNode => {
  if (typeof html !== "string" || !html.trim()) {
    return null;
  }
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === "tag") {
        const element = domNode as Element;
        const variant = element.name.toLowerCase();
        const children = domToReact(element.children as DOMNode[], options);
        const className = element.attribs?.class;

        switch (variant) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            const headingText =
              domToReact(element.children as DOMNode[], options)?.toString() ||
              "";
            const headingId = headingText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            return (
              <Typography
                id={element.attribs?.id || headingId}
                variant={variant}
                className={className}
              >
                {children}
              </Typography>
            );
          case "caption":
          case "overline":
          case "li":
          case "p":
          case "span":
          case "label":
          case "small":
          case "strong":
          case "em":
          case "blockquote":
          case "code":
          case "pre":
            return (
              <Typography variant={variant} className={className}>
                {children}
              </Typography>
            );
          case "a":
            const href = element.attribs?.href;
            return href ? (
              <Typography
                variant="a"
                underline
                href={href}
                color="primary"
                className={className}
              >
                {children}
              </Typography>
            ) : (
              <Typography className={className}>{children}</Typography>
            );

          case "div":
          case "section":
          case "article":
          case "main":
          case "header":
          case "footer":
          case "nav":
          case "aside":
          case "ul":
          case "ol":
          case "form":
            return (
              <Box variant={variant} className={className}>
                {children}
              </Box>
            );

          default:
            return undefined; // Let html-react-parser handle other elements
        }
      }
      return undefined; // Let html-react-parser handle other node types
    },
  };

  try {
    return parse(html, options);
  } catch (error) {
    console.error("Error parsing HTML in RichText:", error);
    return null;
  }
};


