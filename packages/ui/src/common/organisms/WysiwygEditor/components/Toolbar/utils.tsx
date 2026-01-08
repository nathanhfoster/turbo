import React from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import type { ToolbarButtonProps } from "./types";

/**
 * Toolbar button component for formatting actions
 */
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive = false,
  children,
  title,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={combineClassNames(
      "p-1.5 text-gray-600 dark:text-gray-400 rounded-sm cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
      isActive &&
        "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
      className,
    )}
  >
    {children}
  </button>
);
