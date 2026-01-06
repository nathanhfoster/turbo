"use client";

import React, { useRef, useState, useCallback, useId } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import withBaseTheme from "../../hocs/withBaseTheme";
import withForwardRef from "../../hocs/withForwardRef";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import Box from "../Box";
import Typography from "../Typography";
import { IconCloudUpload } from "../../../icons";
import {
  FILE_DROPPER_BASE_STYLES,
  FILE_DROPPER_COLOR_STYLES,
  FILE_DROPPER_DISABLED_STYLES,
  FILE_DROPPER_DRAG_OVER_STYLES,
  FILE_DROPPER_SIZE_STYLES,
} from "./constants";
import type { FileDropperProps } from "./types";
import { TAILWIND_SIZES } from "../../../constants";
import type { Size } from "../types";

const FileDropper = ({
  accept,
  maxSize,
  multiple = false,
  onFilesSelected,
  color = "primary",
  size = "md",
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  className,
  showDropZone = true,
  dropZoneText = "Drop files here or click to browse",
  icon,
  ...props
}: FileDropperProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const sizeStyles =
    typeof size === "string" && size.includes(" ")
      ? size
      : FILE_DROPPER_SIZE_STYLES[(size as Size) || "md"];

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File size exceeds maximum of ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
      }
      return null;
    },
    [maxSize],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const errors: string[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) errors.push(`${file.name}: ${error}`);
      });

      if (errors.length > 0) {
        setDragError(errors.join(", "));
        return;
      }

      setDragError(null);
      onFilesSelected?.(fileArray);
    },
    [validateFile, onFilesSelected],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;

      const files = e.dataTransfer.files;
      handleFiles(files);
    },
    [disabled, handleFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLabelElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      // For desktop: if clicking directly on the label (not a child), programmatically trigger
      // For mobile: let the label's htmlFor handle it naturally
      if (e.target === e.currentTarget) {
        e.preventDefault();
        fileInputRef.current?.click();
      }
      // Otherwise, let the label's natural behavior work (htmlFor will handle it)
    },
    [disabled],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLLabelElement>) => {
      // Don't prevent default on touch - let the label's htmlFor work naturally
      // This is crucial for mobile browsers
      if (disabled) {
        e.preventDefault();
      }
    },
    [disabled],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFiles],
  );

  const colorStyles = FILE_DROPPER_COLOR_STYLES[error ? "error" : color];
  const displayError = errorMessage || dragError;

  return (
    <Box fullWidth className={className} {...props}>
      {label && (
        <Typography variant="label" className="mb-2">
          {label}
        </Typography>
      )}
      {showDropZone ? (
        <label
          htmlFor={inputId}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          className={combineClassNames(
            FILE_DROPPER_BASE_STYLES,
            colorStyles,
            sizeStyles,
            isDragOver && FILE_DROPPER_DRAG_OVER_STYLES,
            disabled && FILE_DROPPER_DISABLED_STYLES,
            displayError && FILE_DROPPER_COLOR_STYLES.error,
            "block",
          )}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          <Box
            variant="div"
            className="flex flex-col items-center justify-center text-center gap-2 w-full"
          >
            {icon || (
              <IconCloudUpload className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            )}
            <Typography variant="p" className="text-gray-600 dark:text-gray-400">
              {dropZoneText}
            </Typography>
            {accept && (
              <Box variant="div" className="w-full min-w-0 px-2">
                <Typography 
                  variant="small" 
                  truncate
                  className="text-gray-500 dark:text-gray-500 text-left"
                >
                  Accepted: {accept}
                </Typography>
              </Box>
            )}
          </Box>
        </label>
      ) : (
        <label
          htmlFor={inputId}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          className={combineClassNames(
            "cursor-pointer block",
            disabled && FILE_DROPPER_DISABLED_STYLES,
          )}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          <Typography variant="p" color={color}>
            {dropZoneText}
          </Typography>
        </label>
      )}
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        aria-label={label || "File input"}
      />
      {helperText && !displayError && (
        <Typography variant="small" className="mt-1 text-gray-500 dark:text-gray-400">
          {helperText}
        </Typography>
      )}
      {displayError && (
        <Typography variant="small" className="mt-1 text-error">
          {displayError}
        </Typography>
      )}
    </Box>
  );
};

export default withForwardRef(
  withBaseTheme(withBaseTailwindProps(FileDropper)),
);

