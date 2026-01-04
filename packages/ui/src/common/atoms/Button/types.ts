import type { LinkProps } from "./../Link/types";
import type { BaseTailwindProps, ColoredComponent, Size } from "../types";

/**
 * ColorStyles type is now exported from centralized token utilities
 * @see ../../../tokens/styleUtils
 */

export type ButtonSizeProp = string;

export interface BaseButtonProps
  extends ColoredComponent,
    BaseTailwindProps,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /**
   * Button size - accepts full Tailwind class string
   * Examples: "px-4 py-2.5 text-base min-h-[44px]", "px-5 py-3 text-lg min-h-[48px]"
   */
  size?: ButtonSizeProp;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
}

export interface AnchorProps
  extends Omit<LinkProps, "onClick" | "children">,
    Omit<BaseButtonProps, "color" | "size" | "children"> {
  href: LinkProps["href"];
  children?: React.ReactNode;
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onClick"> {
  href?: string;
}

export type FinalButtonProps = AnchorProps | ButtonProps;
