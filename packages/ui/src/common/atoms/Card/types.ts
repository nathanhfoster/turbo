import type { BaseBoxProps, BoxVariant } from "../Box/types";
import type { Size } from "../types";

export type CardVariant = "default" | "elevated" | "flat" | "bordered";

export interface CardProps extends Omit<BaseBoxProps, "variant" | "padding"> {
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
   */
  padding?: false | Size;
  /**
   * The visual variant of the card
   */
  variant?: CardVariant;
  /**
   * The variant of the box
   */
  boxVariant?: BoxVariant;
}
