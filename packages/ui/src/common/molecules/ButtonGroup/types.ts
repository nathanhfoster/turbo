import type { ButtonProps } from "./../../atoms/Button/types";
import type { BoxProps } from "./../../atoms/Box/types";
import type { ComposableComponent } from "../../../types";

export interface ButtonGroupProps
  extends Omit<ButtonProps, "children" | "className" | "onClick">,
    Pick<BoxProps, "display" | "justify">,
    ComposableComponent {}
