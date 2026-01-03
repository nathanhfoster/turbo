import type { ComponentColor } from "../types";

export type InputColorStyles = {
  border: string;
  focus: string;
  hover?: string;
};

export const COLOR_STYLES: Record<ComponentColor, InputColorStyles> = {
  primary: {
    border: "border-primary",
    focus: "focus:border-primary focus:ring-primary",
  },
  secondary: {
    border: "border-secondary",
    focus: "focus:border-secondary focus:ring-secondary",
  },
  accent: {
    border: "border-accent",
    focus: "focus:border-accent focus:ring-accent",
  },
  error: {
    border: "border-error",
    focus: "focus:border-error focus:ring-error",
  },
  success: {
    border: "border-success",
    focus: "focus:border-success focus:ring-success",
  },
  warning: {
    border: "border-warning",
    focus: "focus:border-warning focus:ring-warning",
  },
  info: {
    border: "border-info",
    focus: "focus:border-info focus:ring-info",
  },
  white: {
    border: "border-white",
    focus: "focus:border-white focus:ring-white",
  },
  inherit: {
    border: "border-inherit",
    focus: "focus:border-inherit focus:ring-inherit",
  },
  black: {
    border: "border-black",
    focus: "focus:border-black focus:ring-black",
  },
  gray: {
    border: "border-gray-500",
    focus: "focus:border-gray-500 focus:ring-gray-500",
  },
};

export const BASE_STYLES =
  "rounded-md border shadow-sm focus:outline-none focus:ring-1 transition-colors duration-200";

export const ERROR_STYLES = "absolute mt-1";
