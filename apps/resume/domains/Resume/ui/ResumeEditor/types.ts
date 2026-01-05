import type { Resume } from "../../model/types";

export interface ResumeEditorProps {
  resume: Resume | null;
  content: string;
  isDirty: boolean;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onReset: () => void;
  className?: string;
}

