import type { ReactNode, MouseEventHandler } from "react";
import type { BaseTailwindProps } from "../../atoms/types";

export type SidebarColor = "white" | "gray" | "dark" | "slate" | "zinc";

export interface SidebarState {
  expanded: boolean;
  mobile: boolean;
}

export interface SidebarProps extends BaseTailwindProps {
  /**
   * Sidebar color variant
   * @default 'white'
   */
  color?: SidebarColor;
  /**
   * Toggle handler
   */
  onToggle?: (state: SidebarState) => void;
  /**
   * Children elements
   */
  children?: ReactNode;
  /**
   * Additional className
   */
  className?: string;
}

export interface SidebarHeadProps extends BaseTailwindProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarHeadLogoProps extends BaseTailwindProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarHeadTitleProps extends BaseTailwindProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarHeadToggleProps extends BaseTailwindProps {
  className?: string;
}

export interface SidebarNavProps extends BaseTailwindProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarNavSectionProps extends BaseTailwindProps {
  isChild?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface SidebarNavSectionTitleProps extends BaseTailwindProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarNavSectionItemProps
  extends BaseTailwindProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  icon?: ReactNode;
  label?: string;
  href?: string;
  active?: boolean;
  as?: "button" | "a";
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  className?: string;
}

export interface SidebarFooterProps extends BaseTailwindProps {
  children?: ReactNode;
  className?: string;
}
