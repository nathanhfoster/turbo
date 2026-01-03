import type { ComponentColor, Size } from "../types";
import type { BoxVariant } from "./types";

export const VARIANTS: Record<BoxVariant, string> = {
  html: "html",
  div: "div",
  section: "section",
  article: "article",
  main: "main",
  header: "header",
  footer: "footer",
  nav: "nav",
  aside: "aside",
  ul: "ul",
  ol: "ol",
  form: "form",
  span: "span",
  dialog: "dialog",
  details: "details",
  summary: "summary",
};

export const CONTAINER_STYLES: Record<Size, string> = {
  inherit: "",
  xs: "container mx-auto px-4 max-w-screen-xs",
  sm: "container mx-auto px-4 max-w-screen-sm",
  md: "container mx-auto px-4 max-w-screen-md",
  lg: "container mx-auto px-4 max-w-screen-lg",
  xl: "container mx-auto px-4 max-w-screen-xl",
  "2xl": "container mx-auto px-4 max-w-screen-2xl",
  "3xl": "container mx-auto px-4 max-w-screen-3xl",
  "4xl": "container mx-auto px-4 max-w-screen-4xl",
  "5xl": "container mx-auto px-4 max-w-screen-5xl",
  "6xl": "container mx-auto px-4 max-w-screen-6xl",
  "7xl": "container mx-auto px-4 max-w-screen-7xl",
  "8xl": "container mx-auto px-4 max-w-screen-8xl",
  "9xl": "container mx-auto px-4 max-w-screen-9xl",
};

export const BACKGROUND_COLOR_STYLES: Record<ComponentColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  error: "bg-error",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  white: "bg-white",
  black: "bg-black",
  inherit: "bg-inherit",
  gray: "bg-neutral-500",
};

export const COLOR_STYLES: Record<ComponentColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  white: "text-white",
  black: "text-black",
  inherit: "text-inherit",
  gray: "text-neutral-500",
};

export const DEFAULT_CONTAINER_STYLE = "container mx-auto px-4";
