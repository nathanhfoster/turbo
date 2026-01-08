"use client";

import React from "react";
import type { Editor } from "@tiptap/core";
import { ToolbarButton } from "../../utils";
import { FONT_FAMILIES } from "./constants";
import type { FontFamilyDropdownProps } from "./types";

/**
 * Font family dropdown component for toolbar
 * Allows users to select from predefined font families
 */
export const FontFamilyDropdown: React.FC<FontFamilyDropdownProps> = ({
  editor,
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div className="relative">
      <ToolbarButton onClick={onToggle} title="Font Family">
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
            d="m10.5785 19 4.2979-10.92966c.0369-.09379.1674-.09379.2042 0L19.3785 19m-8.8 0H9.47851m1.09999 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.9846h4.4M3 16l1.56685-3.9846m0 0 2.73102-6.94506c.03688-.09379.16738-.09379.20426 0l2.50367 6.94506H4.56685Z"
          />
        </svg>
      </ToolbarButton>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-48">
          <div className="p-2 space-y-1">
            {FONT_FAMILIES.map((font) => (
              <button
                key={font.value}
                type="button"
                onClick={() => {
                  editor.chain().focus().setFontFamily(font.value).run();
                  onClose();
                }}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
