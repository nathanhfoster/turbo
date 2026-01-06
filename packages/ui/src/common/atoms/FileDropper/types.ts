import type { InputHTMLAttributes } from "react";
import type { BaseTailwindProps, ComponentColor, Size } from "../types";

export interface FileDropperProps extends BaseTailwindProps {
  /**
   * Accepted file types (e.g., "application/pdf", ".pdf,.doc,.docx")
   */
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Whether multiple files are allowed
   */
  multiple?: boolean;
  /**
   * Callback when files are selected/dropped (called immediately)
   */
  onFilesSelected?: (files: File[]) => void;
  /**
   * Callback after thinking animation completes - useful for API calls
   * Called after the "thinking" animation (1.5s delay) but before success state
   * Can return a value that will be passed to onSuccess
   */
  onSubmit?: (files: File[]) => void | Promise<any>;
  /**
   * Callback when upload is successful (called after success animation completes)
   * Receives the files and optionally the result from onSubmit
   */
  onSuccess?: (files: File[], result?: any) => void;
  /**
   * Callback when upload fails (called immediately on error)
   */
  onError?: (error: string, files?: File[]) => void;
  /**
   * Component color variant
   */
  color?: ComponentColor;
  /**
   * Component size
   */
  size?: Size | string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Error message
   */
  errorMessage?: string;
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether to show drag and drop zone
   */
  showDropZone?: boolean;
  /**
   * Custom drop zone text
   */
  dropZoneText?: string;
  /**
   * Custom icon (React node)
   */
  icon?: React.ReactNode;
  /**
   * Loading state - shows loading indicator and disables interactions
   */
  loading?: boolean;
  /**
   * Loading text to display when loading
   */
  loadingText?: string;
  /**
   * Initial files to preload (e.g., from IndexedDB or other storage)
   * These files will be set as selected files when the component mounts
   */
  initialFiles?: File[];
  /**
   * Callback when a file is removed
   * Receives the removed file and the remaining files
   */
  onFileRemoved?: (removedFile: File, remainingFiles: File[]) => void;
  /**
   * Callback when all files are cleared
   * Receives the files that were cleared
   */
  onFilesCleared?: (clearedFiles: File[]) => void;
  /**
   * Callback when a file is clicked
   * Receives the clicked file
   */
  onFileClick?: (file: File) => void;
}

