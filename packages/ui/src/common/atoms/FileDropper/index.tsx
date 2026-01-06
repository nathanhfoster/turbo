"use client";

import React, { useRef, useState, useCallback, useId, useMemo, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { combineClassNames } from "@nathanhfoster/utils";
// @ts-expect-error - useEventListener is exported but TypeScript may not resolve it correctly
import { useEventListener } from "@nathanhfoster/resurrection";
import withBaseTheme from "../../hocs/withBaseTheme";
import withForwardRef from "../../hocs/withForwardRef";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import Box from "../Box";
import Typography from "../Typography";
import BubbleAI from "../BubbleAI";
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
  onSubmit,
  onSuccess,
  onError,
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
  loading = false,
  loadingText = "Processing files...",
  ...props
}: FileDropperProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const sizeStyles =
    typeof size === "string" && size.includes(" ")
      ? size
      : FILE_DROPPER_SIZE_STYLES[(size as Size) || "md"];

  const isDisabled = disabled || loading;

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
        const errorMessage = errors.join(", ");
        setDragError(errorMessage);
        setUploadStatus("error");
        // Call onError callback immediately
        onError?.(errorMessage, fileArray);
        // Reset error state after 3 seconds
        setTimeout(() => {
          setUploadStatus("idle");
        }, 3000);
        return;
      }

      setDragError(null);
      setSelectedFiles((prev) => (multiple ? [...prev, ...fileArray] : fileArray));
      
      // Call onFilesSelected immediately (for immediate file access)
      onFilesSelected?.(fileArray);
      
      // Set loading state if loading prop is true
      if (loading) {
        setUploadStatus("loading");
      } else {
        // Show thinking animation first, then success
        setUploadStatus("loading");
        setTimeout(async () => {
          // Call onSubmit after thinking animation (useful for API calls)
          try {
            const result = await onSubmit?.(fileArray);
            // Transition to success after onSubmit completes
            setUploadStatus("success");
            setTimeout(() => {
              // Call onSuccess after success animation completes, passing the result
              onSuccess?.(fileArray, result);
              setUploadStatus("idle");
            }, 2000);
          } catch (err) {
            // Handle errors from onSubmit
            const errorMsg = err instanceof Error ? err.message : "Upload failed";
            setDragError(errorMsg);
            setUploadStatus("error");
            onError?.(errorMsg, fileArray);
            setTimeout(() => {
              setUploadStatus("idle");
            }, 3000);
          }
        }, 1500); // Show thinking animation for 1.5 seconds
      }
    },
    [validateFile, onFilesSelected, multiple, loading],
  );

  // Update upload status when loading prop changes
  useEffect(() => {
    if (loading) {
      setUploadStatus("loading");
    } else if (uploadStatus === "loading" && !loading) {
      // Transition from loading to success when loading completes
      // Add a small delay to ensure the thinking animation is visible
      setTimeout(async () => {
        // Call onSubmit if provided (useful for API calls)
        try {
          const result = await onSubmit?.(selectedFiles);
          setUploadStatus("success");
          setTimeout(() => {
            // Call onSuccess after success animation completes, passing the result
            onSuccess?.(selectedFiles, result);
            setUploadStatus("idle");
          }, 2000);
        } catch (err) {
          // Handle errors from onSubmit
          const errorMsg = err instanceof Error ? err.message : "Upload failed";
          setDragError(errorMsg);
          setUploadStatus("error");
          onError?.(errorMsg, selectedFiles);
          setTimeout(() => {
            setUploadStatus("idle");
          }, 3000);
        }
      }, 500); // Small delay to show the transition
    }
  }, [loading, uploadStatus, onSubmit, onSuccess, onError, selectedFiles]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (isDisabled) return;

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    },
    [isDisabled, handleFiles],
  );

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;
    setIsDragOver(true);
  }, [isDisabled]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;
    // Set dataTransfer dropEffect to show it's a valid drop target
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
    setIsDragOver(true);
  }, [isDisabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if we're actually leaving the label element
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLabelElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      const target = e.target as HTMLElement;
      
      // If clicking on a button or interactive element inside, don't trigger file input
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        e.stopPropagation();
        return;
      }
      
      // Always prevent default to avoid double-triggering from label's htmlFor
      // Then manually trigger the file input for consistent behavior
      e.preventDefault();
      e.stopPropagation();
      
      if (fileInputRef.current && !fileInputRef.current.disabled) {
        fileInputRef.current.click();
      }
    },
    [isDisabled],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLLabelElement>) => {
      // Don't prevent default on touch - let the label's htmlFor work naturally
      // This is crucial for mobile browsers
      if (isDisabled) {
        e.preventDefault();
      }
    },
    [isDisabled],
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
  const hasSelectedFiles = selectedFiles.length > 0;

  // Calculate BubbleAI size based on component size
  const bubbleAISize = useMemo(() => {
    const sizeMap: Record<Size, number> = {
      inherit: 60,
      xs: 40,
      sm: 50,
      md: 60,
      lg: 80,
      xl: 100,
      "2xl": 120,
      "3xl": 140,
      "4xl": 160,
      "5xl": 180,
      "6xl": 200,
      "7xl": 220,
      "8xl": 240,
      "9xl": 260,
    };
    return typeof size === "string" && size.includes(" ")
      ? 60 // default for custom size strings
      : sizeMap[(size as Size) || "md"];
  }, [size]);

  // Determine BubbleAI state based on component state
  const bubbleAIState = useMemo<"idle" | "listening" | "thinking" | "speaking" | "navigating">(() => {
    if (loading || uploadStatus === "loading") {
      return "thinking";
    }
    if (uploadStatus === "success") {
      return "speaking";
    }
    if (isDragOver) {
      return "listening";
    }
    if (displayError || uploadStatus === "error") {
      return "idle"; // Will use error colors
    }
    return "idle";
  }, [loading, uploadStatus, isDragOver, displayError]);

  // Get file type and size info for better visual feedback
  const fileInfo = useMemo(() => {
    if (!hasSelectedFiles || selectedFiles.length === 0) return null;
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    const fileTypes = new Set(selectedFiles.map((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'file';
      return ext;
    }));
    return {
      count: selectedFiles.length,
      totalSize,
      types: Array.from(fileTypes),
    };
  }, [selectedFiles, hasSelectedFiles]);

  const handleClearFiles = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  // Global drag event handlers to prevent default browser behavior
  // and handle drag events outside the component
  const handleGlobalDragOver = useCallback((e: DragEvent) => {
    // Prevent default to allow drop
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleGlobalDrop = useCallback((e: DragEvent) => {
    // Prevent default browser behavior (opening files)
    e.preventDefault();
    e.stopPropagation();
    // Reset drag over state if drag ends outside component
    setIsDragOver(false);
  }, []);

  const handleGlobalDragLeave = useCallback((e: DragEvent) => {
    // Only reset if we're leaving the window entirely
    // (relatedTarget will be null when leaving window)
    if (!e.relatedTarget) {
      setIsDragOver(false);
    }
  }, []);

  useEventListener<DragEvent>(
    "dragover",
    handleGlobalDragOver,
    undefined,
    typeof window !== "undefined" ? window : undefined,
  );

  useEventListener<DragEvent>(
    "drop",
    handleGlobalDrop,
    undefined,
    typeof window !== "undefined" ? window : undefined,
  );

  useEventListener<DragEvent>(
    "dragleave",
    handleGlobalDragLeave,
    undefined,
    typeof window !== "undefined" ? window : undefined,
  );

  return (
    <Box fullWidth className={className} {...props}>
      {label && (
        <Typography 
          variant="label" 
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {label}
        </Typography>
      )}
      {showDropZone ? (
        <label
          htmlFor={inputId}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          className={combineClassNames(
            FILE_DROPPER_BASE_STYLES,
            colorStyles,
            sizeStyles,
            isDragOver && FILE_DROPPER_DRAG_OVER_STYLES,
            isDisabled && FILE_DROPPER_DISABLED_STYLES,
            displayError && FILE_DROPPER_COLOR_STYLES.error,
            "block",
          )}
          style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
        >
          <Box
            variant="div"
            className="flex flex-col items-center justify-center text-center gap-2 w-full min-h-0 overflow-hidden p-4"
          >
            {icon ? (
              icon
            ) : (
              <>
                <BubbleAI
                  size={bubbleAISize}
                  state={bubbleAIState}
                  quality="medium"
                  ringCount={3}
                  particleCount={Math.min(100, Math.max(25, bubbleAISize / 2))}
                  particleSize={0.5}
                  rings={
                    displayError || uploadStatus === "error"
                      ? [
                          { color: "#ef4444", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
                          { color: "#dc2626", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
                          { color: "#991b1b", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
                        ]
                      : uploadStatus === "success"
                        ? [
                            { color: "#10b981", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
                            { color: "#059669", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
                            { color: "#34d399", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
                          ]
                        : undefined
                  }
                  opacity={isDisabled ? 0.5 : 1}
                />
                <Typography variant="p" className="text-gray-600 dark:text-gray-400">
                  {loading ? (
                    loadingText
                  ) : uploadStatus === "success" ? (
                    hasSelectedFiles
                      ? multiple
                        ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} uploaded successfully`
                        : `${selectedFiles[0]?.name || "File"} uploaded successfully`
                      : "Upload successful"
                  ) : displayError || uploadStatus === "error" ? (
                    displayError || "Upload failed"
                  ) : hasSelectedFiles ? (
                    multiple
                      ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} selected`
                      : selectedFiles[0]?.name || dropZoneText
                  ) : (
                    dropZoneText
                  )}
                </Typography>
                {fileInfo && uploadStatus !== "error" && (
                  <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                    {fileInfo.count} file{fileInfo.count > 1 ? "s" : ""} •{" "}
                    {(fileInfo.totalSize / 1024 / 1024).toFixed(2)} MB
                    {fileInfo.types.length > 0 && ` • ${fileInfo.types.slice(0, 3).join(", ")}${fileInfo.types.length > 3 ? "..." : ""}`}
                  </Typography>
                )}
              </>
            )}
            {accept && (
              <Box variant="div" className="w-full min-w-0 max-w-full px-2 text-left">
                <Typography 
                  variant="small" 
                  truncate
                  className="text-gray-500 dark:text-gray-500 block w-full overflow-hidden"
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
            "appearance-none",
            "outline-none",
            "focus:outline-none",
            isDisabled && FILE_DROPPER_DISABLED_STYLES,
          )}
          style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
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
        disabled={isDisabled}
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
      {hasSelectedFiles && (
        <Box variant="div" className="mt-3 space-y-2">
          {selectedFiles.map((file, index) => (
            <Box
              key={`${file.name}-${index}`}
              variant="div"
              className="flex items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
            >
              <Box variant="div" className="flex-1 min-w-0">
                <Typography 
                  variant="small" 
                  className="font-medium text-gray-900 dark:text-gray-100 truncate"
                  title={file.name}
                >
                  {file.name}
                </Typography>
                <Typography 
                  variant="small" 
                  className="text-gray-500 dark:text-gray-400 text-xs"
                >
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label={`Remove ${file.name}`}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </Box>
          ))}
          {selectedFiles.length > 0 && (
            <button
              type="button"
              onClick={handleClearFiles}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
            >
              Clear all
            </button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default withForwardRef(
  withBaseTheme(withBaseTailwindProps(FileDropper)),
);

