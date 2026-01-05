import type { BaseTailwindProps, ComponentColor, Size } from "../types";

export interface FileDropperProps extends BaseTailwindProps {
  /**
   * Accepted file types (e.g., "application/pdf", ".pdf,.doc,.docx")
   */
  accept?: string;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Whether multiple files are allowed
   */
  multiple?: boolean;
  /**
   * Callback when files are selected/dropped
   */
  onFilesSelected?: (files: File[]) => void;
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
}

