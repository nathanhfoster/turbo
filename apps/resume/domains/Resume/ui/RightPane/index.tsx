"use client";

import {
  Box,
  Button,
  Typography,
  Input,
  TextArea,
  Card,
} from "@nathanhfoster/ui";
import { ResumeSelector } from "../ResumeSelector";
import type { RightPaneProps } from "./types";

export function RightPane({
  resumes,
  currentResume,
  showNewResumeForm,
  newResumeName,
  newResumeContent,
  onFileSubmit,
  onFileSuccess,
  onFileError,
  onFileRemoved,
  onFilesCleared,
  onFileClick,
  onToggleNewResumeForm,
  onNewResumeNameChange,
  onNewResumeContentChange,
  onCreateResumeFromForm,
  onResetNewResumeForm,
  onSelectResume,
  onDeleteResume,
}: RightPaneProps) {
  return (
    <Box className="space-y-6 p-4 w-full max-w-full min-w-0">
      <ResumeSelector
        resumes={resumes}
        currentResume={currentResume}
        onFileSubmit={onFileSubmit}
        onFileSuccess={onFileSuccess}
        onFileError={onFileError}
        onFileRemoved={onFileRemoved}
        onFilesCleared={onFilesCleared}
        onFileClick={onFileClick}
        onSelectResume={onSelectResume}
        onDeleteResume={onDeleteResume}
      />

      <Button
        onClick={onToggleNewResumeForm}
        variant="outlined"
        color="primary"
        className="w-full whitespace-nowrap"
      >
        {showNewResumeForm ? "Cancel" : "Create New Resume"}
      </Button>

      {showNewResumeForm && (
        <Card className="p-6">
          <Typography
            variant="h3"
            className="mb-4"
            size="text-xl"
            weight="font-semibold"
          >
            Create New Resume
          </Typography>
          <Box className="space-y-4">
            <Input
              label="Resume Name"
              value={newResumeName}
              onChange={(e) => onNewResumeNameChange(e.target.value)}
              placeholder="e.g., Software Engineer Resume"
            />
            <TextArea
              label="Resume Content (HTML supported)"
              value={newResumeContent}
              onChange={(e) => onNewResumeContentChange(e.target.value)}
              placeholder="<h1>Your Name</h1><p>Your resume content here...</p>"
              fullHeight
              className="min-h-[300px]"
            />
            <Box className="flex gap-2">
              <Button
                onClick={async () => {
                  if (newResumeName.trim() && newResumeContent.trim()) {
                    await onCreateResumeFromForm(
                      newResumeName,
                      newResumeContent,
                    );
                    onResetNewResumeForm();
                  }
                }}
                variant="contained"
                color="primary"
                disabled={!newResumeName.trim() || !newResumeContent.trim()}
              >
                Create Resume
              </Button>
              <Button
                onClick={onResetNewResumeForm}
                variant="outlined"
                color="inherit"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
}
