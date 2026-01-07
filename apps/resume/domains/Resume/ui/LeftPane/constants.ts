import type { ActionButtonConfig, ExportButtonConfig, JobInputButtonConfig } from "./types";

export const ACTION_BUTTONS: ActionButtonConfig[] = [
  {
    id: "improve",
    label: "Improve with AI",
    variant: "outlined",
    color: "primary",
    disabled: (isGenerating) => isGenerating,
    loadingLabel: "Improving...",
  },
  {
    id: "tailor",
    label: "Tailor for Job",
    variant: "outlined",
    color: "primary",
  },
];

export const EXPORT_BUTTONS: ExportButtonConfig[] = [
  {
    id: "export-html",
    label: "Export HTML",
    variant: "outlined",
    color: "primary",
    className: "justify-start",
  },
  {
    id: "export-txt",
    label: "Export TXT",
    variant: "outlined",
    color: "primary",
    className: "justify-start",
  },
  {
    id: "export-pdf",
    label: "Export PDF",
    variant: "outlined",
    color: "primary",
    className: "justify-start",
  },
  {
    id: "copy",
    label: "Copy",
    variant: "outlined",
    color: "primary",
    className: "justify-start",
  },
];

export const JOB_INPUT_BUTTONS: JobInputButtonConfig[] = [
  {
    id: "apply",
    label: "Apply",
    variant: "contained",
    color: "primary",
    disabled: (jobDescription, isGenerating) =>
      !jobDescription.trim() || isGenerating,
  },
  {
    id: "save-version",
    label: "Save as Version",
    variant: "outlined",
    color: "primary",
    disabled: (jobDescription, isGenerating) =>
      !jobDescription.trim() || isGenerating,
  },
];
