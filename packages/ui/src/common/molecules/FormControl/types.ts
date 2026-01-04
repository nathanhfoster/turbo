import type { ReactNode } from "react";
import type { BaseTailwindProps, Size } from "../../atoms/types";

export interface FormControlProps extends BaseTailwindProps {
  /**
   * Size of the form control
   * @default 'md'
   */
  size?: Size | "lg" | "xl";
  /**
   * Children elements
   */
  children?: ReactNode;
  /**
   * Additional className
   */
  className?: string;
}

export interface FormControlInputProps {
  /**
   * Left icon element
   */
  leftIcon?: ReactNode;
  /**
   * Right icon element
   */
  rightIcon?: ReactNode;
  /**
   * Color tone
   */
  tone?: "transparent" | "solid";
  /**
   * Additional className
   */
  className?: string;
  /**
   * Standard HTML input attributes
   */
  [key: string]: any;
}
