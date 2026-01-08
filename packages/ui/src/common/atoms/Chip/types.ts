import { ComponentPropsWithoutRef } from "react";

export type ChipVariant = "default" | "primary" | "secondary";
export type ChipSize = "sm" | "md";

export interface ChipProps extends ComponentPropsWithoutRef<"span"> {
  label: string;
  onRemove?: () => void;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
}
