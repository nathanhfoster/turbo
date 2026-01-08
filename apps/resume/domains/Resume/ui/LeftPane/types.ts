import type { ComponentColor, ComponentVariant } from "@nathanhfoster/ui";
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
}

export interface ActionButtonConfig {
  id: string;
  label: string;
  variant: ComponentVariant;
  color: ComponentColor;
  className?: string;
  disabled?: boolean | ((isGenerating: boolean) => boolean);
  loadingLabel?: string;
}

export interface ExportButtonConfig {
  id: string;
  label: string;
  variant: ComponentVariant;
  color: ComponentColor;
  className?: string;
}

export interface JobInputButtonConfig {
  id: string;
  label: string;
  variant: ComponentVariant;
  color: ComponentColor;
  className?: string;
  disabled?: (jobDescription: string, isGenerating: boolean) => boolean;
}
