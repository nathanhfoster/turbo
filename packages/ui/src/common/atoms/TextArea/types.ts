import type { ComposableComponent } from "../../../types";
import type { ColoredComponent, Size } from "../types";

export interface TextAreaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "color" | "onClick"
    >,
    Pick<ColoredComponent, "color">,
    ComposableComponent {
  label?: string;
  error?: boolean | string;
  size?: Size;
  fullWidth?: boolean;
  fullHeight?: boolean;
  rows?: number;
}
