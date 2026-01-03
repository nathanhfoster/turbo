import type React from "react";
import type { LinkProps, LinkProps as NextLinkProps } from "next/link";
import { PickPartial } from "@nathanhfoster/utils";
import type { BaseTailwindProps, ComponentColor } from "../types";

export type TypographyHeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TypographyParagraphVariant =
  | "p"
  | "body1"
  | "body2"
  | "subtitle1"
  | "subtitle2"
  | "caption"
  | "overline";

export type TypographySpanVariant = "span" | "small" | "strong" | "em" | "b";

export type TypographyLinkVariant = "a";

export type TypographyLabelVariant = "label";

export type TypographyListItemVariant = "li";

export type TypographyBlockquoteVariant = "blockquote";

export type TypographyCodeVariant = "code" | "pre";

export type TypographyTimeVariant = "time";

export type TypographyAddressVariant = "address";

export type TypographySize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

export type TypographyWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TypographyWeightProp = `font-${TypographyWeight}`;
export type TypographyLineHeight =
  | "none"
  | "tight"
  | "snug"
  | "normal"
  | "relaxed"
  | "loose";
export type TypographyLineHeightProp = `leading-${TypographyLineHeight}`;
export type TypographyFonts = "sans" | "serif" | "mono" | "inter";
export type TypographyFontProp = `font-${TypographyFonts}`;
export type TypographyLineClamp = 1 | 2 | 3 | 4 | 5 | 6;
export type TypographyLineClampProp = `line-clamp-${TypographyLineClamp}`;

export type TypographyVariant =
  | TypographyHeadingVariant
  | TypographyParagraphVariant
  | TypographySpanVariant
  | TypographyLinkVariant
  | TypographyLabelVariant
  | TypographyListItemVariant
  | TypographyBlockquoteVariant
  | TypographyCodeVariant
  | TypographyTimeVariant
  | TypographyAddressVariant;

export type TypographySizeProp = `text-${TypographySize}`;

export interface BaseTypographyProps
  extends BaseTailwindProps,
    PickPartial<LinkProps, "href"> {
  font?: TypographyFontProp;
  size?: TypographySizeProp;
  color?: ComponentColor | string;
  weight?: TypographyWeightProp;
  lineHeight?: TypographyLineHeightProp;
  italic?: boolean;
  truncate?: boolean;
  ellipsis?: boolean;
  whiteSpaceNoWrap?: boolean;
  noWrap?: boolean;
  underline?: boolean;
  capitalize?: boolean;
  uppercase?: boolean;
  center?: boolean;
  lineClamp?: TypographyLineClampProp;
  title?: string;
  disabled?: boolean;
}

export interface HeadingProps
  extends BaseTypographyProps,
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "onClick"> {
  variant: TypographyHeadingVariant;
}

export interface ParagraphProps
  extends BaseTypographyProps,
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "onClick"> {
  variant: TypographyParagraphVariant;
}

export interface SpanProps
  extends BaseTypographyProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick"> {
  variant?: TypographySpanVariant;
}

export interface AnchorProps
  extends BaseTypographyProps,
    Omit<NextLinkProps, "onClick"> {
  variant: TypographyLinkVariant;
  href: NextLinkProps["href"];
  children?: React.ReactNode;
}

export interface LabelProps
  extends BaseTypographyProps,
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onClick"> {
  variant: TypographyLabelVariant;
  htmlFor?: string;
}

export interface ListItemProps
  extends BaseTypographyProps,
    Omit<React.LiHTMLAttributes<HTMLLIElement>, "onClick"> {
  variant: TypographyListItemVariant;
}

export interface BlockquoteProps
  extends BaseTypographyProps,
    Omit<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, "onClick"> {
  variant: TypographyBlockquoteVariant;
}

export interface CodeProps
  extends BaseTypographyProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  variant: TypographyCodeVariant;
}

export interface TimeProps
  extends BaseTypographyProps,
    Omit<React.HTMLAttributes<HTMLTimeElement>, "onClick"> {
  variant: TypographyTimeVariant;
  dateTime?: HTMLTimeElement["dateTime"];
}

export interface AddressProps
  extends BaseTypographyProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  variant: TypographyAddressVariant;
}

export type TypographyProps =
  | HeadingProps
  | ParagraphProps
  | SpanProps
  | AnchorProps
  | LabelProps
  | ListItemProps
  | BlockquoteProps
  | CodeProps
  | TimeProps
  | AddressProps;
