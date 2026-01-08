import type React from "react";
import type { ComposableComponent } from "../../../types";
import type { ColoredComponent } from "../types";

export type InputSizeProp = string;

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "color" | "onClick"
    >,
    Omit<ComposableComponent, "onClick">,
    Pick<ColoredComponent, "color"> {
  label?: string;
  error?: boolean | string;
  /**
   * Input size - accepts full Tailwind class string
   * Examples: "px-4 py-2.5 text-base min-h-[44px]", "px-5 py-3 text-lg min-h-[48px]"
   */
  size?: InputSizeProp;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
