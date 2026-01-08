"use client";

import React from "react";
import type { Editor } from "@tiptap/core";
import { ToolbarButton } from "../../utils";
import { HEADING_LEVELS } from "./constants";
import type { TypographyDropdownProps } from "./types";

/**
 * Typography dropdown component for toolbar
 * Allows users to select paragraph or heading levels
 */
export const TypographyDropdown: React.FC<TypographyDropdownProps> = ({
  editor,
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div className="relative">
      <ToolbarButton onClick={onToggle} title="Format">
        <span className="text-sm font-medium">Format</span>
        <svg
          className="w-3.5 h-3.5 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 9-7 7-7-7"
          />
        </svg>
      </ToolbarButton>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-72">
          <div className="p-2 space-y-1">
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().setParagraph().run();
                onClose();
              }}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Paragraph
            </button>
            {HEADING_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level }).run();
                  onClose();
                }}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Heading {level}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
