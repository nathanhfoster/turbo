import type { InputProps } from "../Input/types";

export interface SwitchProps
  extends Pick<
    InputProps,
    "label" | "name" | "required" | "checked" | "onChange" | "disabled"
  > {}
