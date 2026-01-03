import { ReactNode } from "react";
import type { Size } from "../types";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;
  /**
   * Function to handle drawer close
   */
  onClose: () => void;
  /**
   * Content to be rendered inside the drawer
   */
  children: ReactNode;
  /**
   * Position of the drawer
   * @default 'right'
   */
  position?: DrawerPosition;
  /**
   * Size of the drawer
   * @default 'medium'
   */
  size?: Size;
  /**
   * Width of the drawer (for left/right position)
   * @default 'w-80'
   */
  width?: string;
  /**
   * Height of the drawer (for top/bottom position)
   * @default 'h-80'
   */
  height?: string;
  /**
   * Additional className for the drawer
   */
  className?: string;
}
