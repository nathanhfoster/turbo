"use client";

import { Box, Typography, FileDropper } from "@nathanhfoster/ui";
import { ResumeList } from "../ResumeList";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "../../lib/constants";
import type { ResumeSelectorProps } from "./types";

export function ResumeSelector({
  resumes,
  currentResume,
  onFileSubmit,
  onFileSuccess,
  onFileError,
  onFileRemoved,
  onFilesCleared,
  onFileClick,
  onSelectResume,
  onDeleteResume,
  className,
}: ResumeSelectorProps) {
  return (
    <Box className={`space-y-6 ${className || ""}`}>
      {/* File Upload Section */}
      <Box className="space-y-4">
        <FileDropper
          accept={ACCEPTED_FILE_TYPES.join(",")}
          maxSize={MAX_FILE_SIZE}
          onSubmit={onFileSubmit}
          onSuccess={onFileSuccess}
          onError={onFileError}
          onFileRemoved={onFileRemoved}
          onFilesCleared={onFilesCleared}
          onFileClick={onFileClick}
          label="Load Resume"
          helperText="Upload a resume file (TXT, HTML, PDF, DOC, DOCX)"
          dropZoneText="Drop your resume file here or click to browse"
          showDropZone
        />
      </Box>

      {/* Resume List */}
      {resumes.length > 0 && (
        <Box>
          <Typography
            variant="h3"
            className="mb-4"
            size="text-lg"
            weight="font-semibold"
          >
            Your Resumes
          </Typography>
          <ResumeList
            resumes={resumes}
            currentResume={currentResume}
            onSelectResume={onSelectResume}
            onDeleteResume={onDeleteResume}
          />
        </Box>
      )}
    </Box>
  );
}
