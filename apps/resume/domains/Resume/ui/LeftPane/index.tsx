"use client";

import { Box, Button, Typography, Input } from "@nathanhfoster/ui";
import { ACTION_BUTTONS, EXPORT_BUTTONS, JOB_INPUT_BUTTONS } from "./constants";
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

