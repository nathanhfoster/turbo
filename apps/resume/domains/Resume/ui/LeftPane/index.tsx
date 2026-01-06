"use client";

import { Box, Button, Typography, Input, Switch, IconDocument, IconCode } from "@nathanhfoster/ui";
import { ACTION_BUTTONS, EXPORT_BUTTONS, JOB_INPUT_BUTTONS } from "../../lib/buttonConstants";
import type { LeftPaneProps } from "./types";

export function LeftPane({
  currentResume,
  isGenerating,
  showJobInput,
  jobDescription,
  onJobDescriptionChange,
  onImprove,
  onTailorForJob,
  onCreateVersion,
  onToggleJobInput,
  onResetJobForm,
  onExportHTML,
  onExportTXT,
  onExportPDF,
  onCopy,
  isEditing,
  isDirty,
  showPlainText,
  onEdit,
  onSave,
  onReset,
  onTogglePlainText,
}: LeftPaneProps) {
  if (!currentResume) return null;

  // Action button handlers map
  const actionHandlers: Record<string, () => void> = {
    improve: onImprove,
    tailor: onToggleJobInput,
  };

  // Export button handlers map
  const exportHandlers: Record<string, (resume: typeof currentResume) => void | Promise<void>> = {
    "export-html": (resume) => {
      if (resume) onExportHTML(resume);
    },
    "export-txt": (resume) => {
      if (resume) onExportTXT(resume);
    },
    "export-pdf": async (resume) => {
      if (resume) {
        await onExportPDF(resume);
      }
    },
    "copy": async (resume) => {
      if (resume) {
        await onCopy(resume);
      }
    },
  };

  // Job input button handlers map
  const jobInputHandlers: Record<string, () => void | Promise<void>> = {
    apply: () => onTailorForJob(jobDescription),
    "save-version": async () => {
      await onCreateVersion(jobDescription);
      onResetJobForm();
    },
  };

  return (
    <Box className="flex flex-col gap-4 p-4 w-full max-w-full min-w-0">
      <Box className="flex flex-col gap-3">
        {/* Edit and Toggle Controls */}
        <Box className="flex flex-col gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
          {!isEditing && (
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2">
                <IconDocument 
                  className={`w-5 h-5 transition-opacity ${showPlainText ? 'opacity-40' : 'opacity-100'}`}
                />
                <Switch
                  checked={showPlainText}
                  onChange={(e) => onTogglePlainText(e.target.checked)}
                  name="plain-text-toggle"
                />
                <IconCode 
                  className={`w-5 h-5 transition-opacity ${showPlainText ? 'opacity-100' : 'opacity-40'}`}
                />
              </Box>
            </Box>
          )}
          <Box className="flex gap-2">
            {!isEditing ? (
              <>
                <Button onClick={onEdit} variant="outlined" color="primary" className="w-full">
                  Edit
                </Button>
                {isDirty && (
                  <>
                    <Button onClick={onSave} variant="contained" color="primary" className="flex-1">
                      Save
                    </Button>
                    <Button onClick={onReset} variant="text" color="inherit" className="flex-1">
                      Reset
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button onClick={onSave} variant="contained" color="primary" className="flex-1">
                  Save
                </Button>
                <Button onClick={onReset} variant="outlined" color="inherit" className="flex-1">
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>
        {ACTION_BUTTONS.map((button) => {
          const handler = actionHandlers[button.id];
          const isDisabled =
            typeof button.disabled === "function"
              ? button.disabled(isGenerating)
              : button.disabled ?? false;
          const displayLabel =
            isGenerating && button.loadingLabel
              ? button.loadingLabel
              : button.label;

          return (
            <Button
              key={button.id}
              onClick={handler}
              variant={button.variant}
              color={button.color}
              disabled={isDisabled}
              className={button.className}
            >
              {displayLabel}
            </Button>
          );
        })}
        <Box className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
          <Typography
            variant="p"
            className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400"
          >
            Export
          </Typography>
          <Box className="flex flex-col gap-2">
            {EXPORT_BUTTONS.map((button) => {
              const handler = exportHandlers[button.id];
              return (
                <Button
                  key={button.id}
                  onClick={() => handler?.(currentResume)}
                  variant={button.variant}
                  color={button.color}
                  className={button.className}
                >
                  {button.label}
                </Button>
              );
            })}
          </Box>
        </Box>
        {showJobInput && (
          <Box className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Box className="flex flex-col gap-3">
              <Input
                value={jobDescription}
                onChange={(e) => onJobDescriptionChange(e.target.value)}
                placeholder="Paste job description..."
                label="Job Description"
              />
              <Box className="flex flex-col gap-2">
                {JOB_INPUT_BUTTONS.map((button) => {
                  const handler = jobInputHandlers[button.id];
                  const isDisabled = button.disabled
                    ? button.disabled(jobDescription, isGenerating)
                    : false;

                  return (
                    <Button
                      key={button.id}
                      onClick={() => handler?.()}
                      variant={button.variant}
                      color={button.color}
                      disabled={isDisabled}
                      className={button.className}
                    >
                      {button.label}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

