import type { BaseBoxProps, BoxVariant } from "../Box/types";
import type { Size } from "../types";
import type { LinkProps } from "../Link/types";

export type CardVariant = "default" | "elevated" | "flat" | "bordered";

export type CardPaddingProp =
  | `p-${Size}`
  | `p-${Size} sm:p-${Size}`
  | `p-${Size} sm:p-${Size} md:p-${Size}`
  | `p-${Size} sm:p-${Size} md:p-${Size} lg:p-${Size}`
  | `px-${Size}`
  | `px-${Size} sm:px-${Size}`
  | `px-${Size} sm:px-${Size} md:px-${Size}`
  | `py-${Size}`
  | `py-${Size} sm:py-${Size}`
  | `py-${Size} sm:py-${Size} md:py-${Size}`
  | string
  | false;

export interface BaseCardProps
  extends Omit<BaseBoxProps, "variant" | "padding"> {
  /**
   * Card content
   */
  children?: React.ReactNode;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Whether the card should have a hover effect
   */
  hoverable?: boolean;
  /**
   * Whether the card should have a border
   */
  bordered?: boolean;
  /**
   * The padding of the card
   * Accepts Tailwind padding classes like "p-md", "p-lg", "p-md sm:p-lg md:p-xl", etc.
   */
  padding?: CardPaddingProp;
  /**
   * The visual variant of the card
   */
  variant?: CardVariant;
  /**
   * The variant of the box
   */
  boxVariant?: BoxVariant;
  /**
   * Click handler for the card
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface CardWithHrefProps
  extends BaseCardProps,
    Omit<LinkProps, "children"> {
  /**
   * URL to navigate to when card is clicked
   * When provided, card renders as a link
   */
  href: LinkProps["href"];
}

export interface CardWithoutHrefProps extends BaseCardProps {
  href?: never;
}

export type CardProps = CardWithHrefProps | CardWithoutHrefProps;
