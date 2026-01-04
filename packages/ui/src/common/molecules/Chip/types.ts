import { ComponentPropsWithoutRef } from "react";

export interface ChipProps extends ComponentPropsWithoutRef<"span"> {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md";
}
