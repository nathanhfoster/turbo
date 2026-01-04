import type { ComposableComponent } from "../../../types";
import type { ColoredComponent, Size } from "../types";

export type TextAreaSizeProp = string;

export interface TextAreaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "color" | "onClick"
    >,
    Pick<ColoredComponent, "color">,
    ComposableComponent {
  label?: string;
  error?: boolean | string;
  /**
   * TextArea size - accepts full Tailwind class string
   * Examples: "px-4 py-2.5 text-base min-h-[44px]", "px-5 py-3 text-lg min-h-[48px]"
   */
  size?: TextAreaSizeProp;
  fullWidth?: boolean;
  fullHeight?: boolean;
  rows?: number;
}
