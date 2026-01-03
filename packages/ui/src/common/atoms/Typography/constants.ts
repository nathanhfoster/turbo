import type { LinkProps } from "./../Link/types";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ComponentColor } from "../types";
import type { TypographyVariant,  TypographyWeightProp } from "./types";

const Link = dynamic(() => import("next/link"));

export const TYPOGRAPHY_VARIANT_MAPPING: Record<
  TypographyVariant,
  | ComponentType<React.HTMLAttributes<HTMLHeadingElement>>
  | ComponentType<React.HTMLAttributes<HTMLParagraphElement>>
  | ComponentType<React.HTMLAttributes<HTMLSpanElement>>
  | ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>
  | ComponentType<React.LabelHTMLAttributes<HTMLLabelElement>>
  | ComponentType<React.LiHTMLAttributes<HTMLLIElement>>
  | ComponentType<React.BlockquoteHTMLAttributes<HTMLQuoteElement>>
  | ComponentType<LinkProps>
> = {
  h1: "h1" as unknown as ComponentType<
    React.HTMLAttributes<HTMLHeadingElement>
  >,
  h2: "h2" as unknown as ComponentType<
    React.HTMLAttributes<HTMLHeadingElement>
  >,
  h3: "h3" as unknown as ComponentType<
    React.HTMLAttributes<HTMLHeadingElement>
  >,
  h4: "h4" as unknown as ComponentType<
    React.HTMLAttributes<HTMLHeadingElement>
  >,
  h5: "h5" as unknown as ComponentType<
    React.HTMLAttributes<HTMLHeadingElement>
  >,
  h6: "h6" as unknown as ComponentType<
    React.HTMLAttributes<HTMLHeadingElement>
  >,
  body1: "p" as unknown as ComponentType<
    React.HTMLAttributes<HTMLParagraphElement>
  >,
  body2: "p" as unknown as ComponentType<
    React.HTMLAttributes<HTMLParagraphElement>
  >,
  subtitle1: "p" as unknown as ComponentType<
    React.HTMLAttributes<HTMLParagraphElement>
  >,
  subtitle2: "p" as unknown as ComponentType<
    React.HTMLAttributes<HTMLParagraphElement>
  >,
  caption: "span" as unknown as ComponentType<
    React.HTMLAttributes<HTMLSpanElement>
  >,
  overline: "span" as unknown as ComponentType<
    React.HTMLAttributes<HTMLSpanElement>
  >,
  p: "p" as unknown as ComponentType<
    React.HTMLAttributes<HTMLParagraphElement>
  >,
  span: "span" as unknown as ComponentType<
    React.HTMLAttributes<HTMLSpanElement>
  >,
  a: Link as unknown as ComponentType<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >,
  label: "label" as unknown as ComponentType<
    React.LabelHTMLAttributes<HTMLLabelElement>
  >,
  li: "li" as unknown as ComponentType<React.LiHTMLAttributes<HTMLLIElement>>,
  small: "small" as unknown as ComponentType<React.HTMLAttributes<HTMLElement>>,
  strong: "strong" as unknown as ComponentType<
    React.HTMLAttributes<HTMLElement>
  >,
  em: "em" as unknown as ComponentType<React.HTMLAttributes<HTMLElement>>,
  b: "b" as unknown as ComponentType<React.HTMLAttributes<HTMLElement>>,
  blockquote: "blockquote" as unknown as ComponentType<
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>
  >,
  code: "code" as unknown as ComponentType<React.HTMLAttributes<HTMLElement>>,
  pre: "pre" as unknown as ComponentType<React.HTMLAttributes<HTMLElement>>,
  time: "time" as unknown as ComponentType<React.HTMLAttributes<HTMLElement>>,
  address: "address" as unknown as ComponentType<
    React.HTMLAttributes<HTMLElement>
  >,
};

export const TYPOGRAPHY_VARIANT_STYLES: Record<TypographyVariant, string> = {
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  body1: "",
  body2: "",
  subtitle1: "",
  subtitle2: "",
  caption: "",
  overline: "uppercase tracking-wide",
  p: "",
  span: "",
  a: "",
  label: "",
  li: "",
  small: "",
  strong: "",
  em: "italic",
  b: "",
  blockquote: "border-l-4 pl-4",
  code: "font-mono",
  pre: "font-mono whitespace-pre",
  time: "",
  address: "",
};

export const TYPOGRAPHY_COLOR_STYLES: Record<ComponentColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  error: "text-error",
  warning: "text-warning",
  info: "text-info",
  success: "text-success",
  inherit: "text-inherit",
  white: "text-white",
  black: "text-black",
  gray: "text-neutral-500",
};

export const VARIANT_DEFAULT_SIZES: Record<TypographyVariant, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl",
  h2: "text-3xl md:text-4xl lg:text-4xl",
  h3: "text-2xl md:text-3xl lg:text-3xl",
  h4: "text-xl md:text-2xl lg:text-2xl",
  h5: "text-lg md:text-xl lg:text-xl",
  h6: "text-base md:text-lg lg:text-lg",
  p: "text-base",
  span: "",
  body1: "text-base",
  body2: "text-base",
  subtitle1: "text-base",
  subtitle2: "text-base",
  caption: "text-sm",
  overline: "text-base",
  a: "text-base",
  label: "text-base",
  li: "text-base",
  small: "text-sm",
  strong: "text-base",
  em: "text-base",
  b: "text-base",
  blockquote: "text-base",
  code: "text-sm",
  pre: "text-sm",
  time: "text-sm",
  address: "text-base",
};

export const VARIANT_DEFAULT_WEIGHTS: Record<
  TypographyVariant,
  TypographyWeightProp
> = {
  h1: "font-bold",
  h2: "font-bold",
  h3: "font-bold",
  h4: "font-semibold",
  h5: "font-medium",
  h6: "font-normal",
  body1: "font-normal",
  body2: "font-normal",
  subtitle1: "font-normal",
  subtitle2: "font-normal",
  caption: "font-normal",
  overline: "font-normal",
  p: "font-normal",
  span: "font-normal",
  a: "font-normal",
  label: "font-normal",
  li: "font-normal",
  small: "font-normal",
  strong: "font-bold",
  em: "font-normal",
  b: "font-bold",
  blockquote: "font-normal",
  code: "font-normal",
  pre: "font-normal",
  time: "font-normal",
  address: "font-normal",
};

export const TYPOGRAPHY_DISABLED_STYLES = "opacity-50 cursor-not-allowed";
