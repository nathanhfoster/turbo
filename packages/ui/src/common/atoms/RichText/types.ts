import type { BoxProps } from "../Box/types";
import type { Size } from "../types";

export type RichTextVariant = "default" | "compact" | "spacious";

export interface RichTextProps extends Omit<BoxProps, "children" | "variant"> {
  children: string;
  size?: Size;
  variant?: RichTextVariant;
}

