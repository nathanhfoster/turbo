import type { Resume } from "../../model/types";

export interface LeftPaneProps {
  currentResume: Resume | null;
  isGenerating: boolean;
  showJobInput: boolean;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onImprove: () => void;
  onTailorForJob: (jobDescription: string) => void;
  onCreateVersion: (jobDescription: string) => void;
  onToggleJobInput: () => void;
  onResetJobForm: () => void;
  onExportHTML: (resume: Resume) => void;
  onExportTXT: (resume: Resume) => void;
  onExportPDF: (resume: Resume) => Promise<void>;
  onCopy: (resume: Resume) => Promise<void>;
  // Edit and toggle props
  isEditing: boolean;
  isDirty: boolean;
  showPlainText: boolean;
  onEdit: () => void;
  onSave: () => void;
  onReset: () => void;
  onTogglePlainText: (checked: boolean) => void;
}

