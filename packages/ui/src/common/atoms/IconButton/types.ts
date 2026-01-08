import { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ComponentColor, ComponentVariant } from "../types";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: ComponentVariant | "ghost" | "default";
  color?: ComponentColor;
  isActive?: boolean;
}
