import type React from "react";
import type { AnchorProps } from "../Typography/types";

export interface LinkProps extends Omit<AnchorProps, "variant"> {
  children?: React.ReactNode;
}
