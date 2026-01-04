import { ComponentPropsWithoutRef } from "react";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  count?: number;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  dot?: boolean;
}
