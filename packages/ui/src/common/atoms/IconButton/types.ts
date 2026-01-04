import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "ghost";
  isActive?: boolean;
}
