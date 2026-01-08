"use client";

import React from "react";
import type { Editor } from "@tiptap/core";
import { ToolbarButton } from "../../utils";
import { TEXT_SIZES } from "./constants";
import type { TextSizeDropdownProps } from "./types";

/**
 * Text size dropdown component for toolbar
 * Allows users to select from predefined text sizes
 */
export const TextSizeDropdown: React.FC<TextSizeDropdownProps> = ({
  editor,
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div className="relative">
      <ToolbarButton onClick={onToggle} title="Text Size">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3"
          />
        </svg>
      </ToolbarButton>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-48">
          <div className="p-2 space-y-1">
            {TEXT_SIZES.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setMark("textStyle", { fontSize: size.value })
                    .run();
                  onClose();
                }}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
