"use client";

import { combineClassNames } from "@nathanhfoster/utils";
import type { ChipProps } from "./types";
import { BASE_STYLES, VARIANT_STYLES, SIZE_STYLES } from "./constants";

export function Chip({
  label,
  onRemove,
  variant = "default",
  size = "md",
  className,
  ...props
}: ChipProps) {
  return (
    <span
      className={combineClassNames(
        BASE_STYLES,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
          aria-label={`Remove ${label}`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

export type { ChipProps } from "./types";
