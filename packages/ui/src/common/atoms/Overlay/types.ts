import type { ReactNode, MouseEventHandler } from "react";
import type { BaseTailwindProps } from "../types";

export type BlurType = "none" | "sm" | "md" | "lg" | "xl";

export interface OverlayProps extends BaseTailwindProps {
  /**
   * Content to be rendered inside the overlay
   */
  children?: ReactNode;
  /**
   * Click handler for the overlay
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /**
   * Blur effect type
   * @default 'none'
   */
  blur?: BlurType;
  /**
   * Additional className for the overlay
   */
  className?: string;
}
