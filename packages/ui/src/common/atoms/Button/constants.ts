import dynamic from "next/dynamic";
import type { ComponentVariant, ComponentColor } from "../types";
import type { ColorStyles } from "./types";
import { ComponentType } from "react";
import { LinkProps } from "../Link/types";

const Link = dynamic<LinkProps>(() => import("../Link"));

export type ButtonVariant = "button" | "a";

export type ButtonComponentType = {
  button: ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  a: ComponentType<LinkProps>;
};

export const BUTTON_VARIANT_MAPPING: ButtonComponentType = {
  button: "button" as unknown as ComponentType<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >,
  a: Link as ComponentType<LinkProps>,
};

export const VARIANT_STYLES: Record<ComponentVariant, string> = {
  outlined: "border-1",
  contained: "border-1 border-transparent",
  text: "",
};

export const COLOR_STYLES: Record<ComponentColor, ColorStyles> = {
  primary: {
    bg: "text-white bg-primary",
    text: "text-primary",
    hover: "hover:text-white hover:bg-primary",
    active: "text-primary",
    border: "border-primary",
  },
  secondary: {
    bg: "text-white bg-secondary",
    text: "text-secondary",
    hover: "hover:text-white hover:bg-secondary",
    active: "text-secondary",
    border: "border-secondary",
  },
  accent: {
    bg: "text-white bg-accent",
    text: "text-accent",
    hover: "hover:text-white hover:bg-accent",
    active: "text-accent",
    border: "border-accent",
  },
  error: {
    bg: "text-white bg-error",
    text: "text-error",
    hover: "hover:text-white hover:bg-error",
    active: "text-error",
    border: "border-error",
  },
  success: {
    bg: "text-white bg-success",
    text: "text-success",
    hover: "hover:text-white hover:bg-success",
    active: "text-success",
    border: "border-success",
  },
  warning: {
    bg: "text-white bg-warning",
    text: "text-warning",
    hover: "hover:text-white hover:bg-warning",
    active: "text-warning",
    border: "border-warning",
  },
  info: {
    bg: "text-white bg-info",
    text: "text-info",
    hover: "hover:text-white hover:bg-info",
    active: "text-info",
    border: "border-info",
  },
  white: {
    bg: "text-black bg-white",
    text: "text-white",
    hover: "hover:text-black hover:bg-white",
    active: "text-white",
    border: "border-white",
  },
  black: {
    bg: "text-white bg-black",
    text: "text-black",
    hover: "hover:text-white hover:bg-black",
    active: "text-black",
    border: "border-black",
  },
  gray: {
    bg: "text-white bg-gray-500",
    text: "text-gray-500",
    hover: "hover:text-white hover:bg-gray-500",
    active: "text-gray-500",
    border: "border-gray-500",
  },
  inherit: {
    bg: "text-inherit bg-inherit",
    text: "text-inherit",
    hover: "hover:text-inherit hover:bg-inherit",
    active: "text-inherit",
    border: "border-inherit",
  },
};

export const BASE_STYLES = "rounded-md transition-colors duration-200";

export const DISABLED_BG_STYLES = "bg-[#5A5D5F]";
export const DISABLED_COMMON_STYLES =
  "text-[#ACAFB0] cursor-not-allowed pointer-events-none select-none transition-colors duration-200";
