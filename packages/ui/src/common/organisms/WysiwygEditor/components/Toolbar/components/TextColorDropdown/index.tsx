"use client";

import React from "react";
import type { Editor } from "@tiptap/core";
import { ToolbarButton } from "../../utils";
import { TEXT_COLORS } from "./constants";
import type { TextColorDropdownProps } from "./types";

/**
 * Text color dropdown component for toolbar
 * Allows users to select text color from a color palette
 */
export const TextColorDropdown: React.FC<TextColorDropdownProps> = ({
  editor,
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div className="relative">
      <ToolbarButton onClick={onToggle} title="Text Color">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeWidth={2}
            d="m6.08169 15.9817 1.57292-4m-1.57292 4h-1.1m1.1 0h1.65m-.07708-4 2.72499-6.92967c.0368-.09379.1673-.09379.2042 0l2.725 6.92967m-5.65419 0h-.00607m.00607 0h5.65419m0 0 .6169 1.569m5.1104 4.453c0 1.1025-.8543 1.9963-1.908 1.9963s-1.908-.8938-1.908-1.9963c0-1.1026 1.908-4.1275 1.908-4.1275s1.908 3.0249 1.908 4.1275Z"
          />
        </svg>
      </ToolbarButton>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-48 p-2">
          <div className="grid grid-cols-6 gap-1 mb-2">
            {TEXT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  onClose();
                }}
                className="w-6 h-6 rounded-md"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              editor.commands.unsetColor();
              onClose();
            }}
            className="w-full px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          >
            Reset color
          </button>
        </div>
      )}
    </div>
  );
};
