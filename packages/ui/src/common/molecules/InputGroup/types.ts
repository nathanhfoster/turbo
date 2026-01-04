import type { ReactNode } from "react";
import type {
  BaseTailwindProps,
  Size,
  ComponentColor,
} from "../../atoms/types";

export interface InputGroupProps extends BaseTailwindProps {
  /**
   * Size of the input group
   * @default 'md'
   */
  size?: Size | "lg" | "xl";
  /**
   * Color tone
   */
  tone?: ComponentColor | "transparent" | "solid";
  /**
   * Children elements
   */
  children?: ReactNode;
  /**
   * Additional className
   */
  className?: string;
}

export interface InputGroupButtonProps extends BaseTailwindProps {
  /**
   * Color tone
   */
  tone?: ComponentColor | "transparent" | "solid";
  /**
   * Children elements
   */
  children?: ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
