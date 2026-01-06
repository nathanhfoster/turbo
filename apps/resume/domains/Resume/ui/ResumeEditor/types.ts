import type { Resume } from "../../model/types";

export interface ResumeEditorProps {
  resume: Resume | null;
  content: string;
  isDirty: boolean;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onReset: () => void;
  className?: string;
  // Expose editing state and handlers for external control
  isEditing?: boolean;
  showPlainText?: boolean;
  onEdit?: () => void;
  onTogglePlainText?: (checked: boolean) => void;
  onCancel?: () => void;
  // Control title visibility
  showTitle?: boolean;
}

