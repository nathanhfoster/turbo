import type { ErrorVariant } from "./types";

export const ERROR_VARIANTS: Record<ErrorVariant, string> = {
  default: "flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 rounded-lg bg-error/10",
  full: "flex flex-col items-center justify-center min-h-[200px] p-6 sm:p-8 md:p-10 rounded-lg bg-error/10",
  minimal: "flex items-center gap-2 text-error",
};

export const ERROR_ICON_STYLES = "w-6 h-6 text-error";
export const ERROR_TITLE_STYLES = "text-lg font-semibold text-error mb-2";
export const ERROR_MESSAGE_STYLES = "text-sm text-error/80";
