import type { DrawerPosition } from "./types";

export const DRAWER_POSITION_CLASSES: Record<DrawerPosition, string> = {
  left: "left-0",
  right: "right-0",
  top: "top-0",
  bottom: "bottom-0",
};

export const DRAWER_TRANSFORM_CLASSES: Record<DrawerPosition, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

export const DRAWER_TRANSITION_DELAY = 400;
