"use client";

import type { ChangeEvent, MouseEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CLEAR_BUTTON_POSITIONS } from "./constants";
import type { ClearButtonProps } from "./types";

const ClearButton = ({ onChange, size = "md", value }: ClearButtonProps) => {
  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    if (onChange) {
      onChange({
        target: { value: "" },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  const positionClass = size in CLEAR_BUTTON_POSITIONS
    ? CLEAR_BUTTON_POSITIONS[size as keyof typeof CLEAR_BUTTON_POSITIONS]
    : CLEAR_BUTTON_POSITIONS.md;

  return (
    <button
      type="button"
      onClick={handleClear}
      className={`absolute right-2 flex h-4 w-4 items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none ${positionClass} ${!value ? "invisible" : ""}`}
      aria-label="Clear input"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  );
};

export default ClearButton;
