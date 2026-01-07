"use client";

import { useResume } from "./hooks/useResume";
import { useResumeEditor } from "./hooks/useResumeEditor";
import { useResumeAI } from "./hooks/useResumeAI";
import { useResumeForm } from "./hooks/useResumeForm";
import { useResumeActions } from "./hooks/useResumeActions";
import { ResumeLayout } from "./ui/ResumeLayout";
import {
  exportResumeAsHTML,
  exportResumeAsText,
  exportResumeAsPDF,
  copyResumeToClipboard,
} from "./lib/export";
import type { ResumeProps } from "./model/types";

/**
 * Resume domain container component
 * Following FSD pattern - clean orchestration layer
 *
 * This container:
 * - Orchestrates all domain hooks
 * - Prepares data and callbacks
 * - Delegates presentation to ResumeLayout
 */
export function ResumeBuilder(props?: ResumeProps) {
  // Domain hooks - business logic
  const {
    resumes,
    currentResume,
    isLoading,
    error,
    createResume,
    updateResume,
    deleteResume,
    setCurrentResume,
    getResumeByFileName,
    createResumeFromFile,
    removeFileFromResume,
    clearFilesFromResumes,
  } = useResume(props);

  const { content, handleContentChange } = useResumeEditor(currentResume);

  const {
    improveResume,
    tailorForJob,
    isGenerating,
    error: aiError,
  } = useResumeAI();

  const {
    jobDescription,
    setJobDescription,
    showJobInput,
    toggleJobInput,
    resetJobForm,
    newResumeName,
    setNewResumeName,
    newResumeContent,
    setNewResumeContent,
    showNewResumeForm,
    toggleNewResumeForm,
    resetNewResumeForm,
  } = useResumeForm();

  const {
    handleFileSuccess,
    handleFileError,
    handleFileClick: handleFileClickAction,
    handleImprove,
    handleTailorForJob,
    handleCreateVersion,
    handleCreateResumeFromForm,
  } = useResumeActions(
    currentResume,
    createResume,
    updateResume,
    handleContentChange,
    improveResume,
    tailorForJob,
  );

  // File handlers
  const handleFileSubmit = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    if (!file) return;
    return await createResumeFromFile(file);
  };

  const handleFileRemoved = async (removedFile: File) => {
    try {
      await removeFileFromResume(removedFile.name);
    } catch (error) {
      console.error("Failed to remove file from resume:", error);
    }
  };

  const handleFilesCleared = async (clearedFiles: File[]) => {
    try {
      const fileNames = clearedFiles.map((f) => f.name);
      await clearFilesFromResumes(fileNames);
    } catch (error) {
      console.error("Failed to clear files from resumes:", error);
    }
  };

  const handleFileClick = (file: File) => {
    const resume = getResumeByFileName(file.name);
    handleFileClickAction(resume || null);
  };

  // Export handlers
  const handleExportHTML = (resume: typeof currentResume) => {
    if (resume) exportResumeAsHTML(resume);
  };

  const handleExportTXT = (resume: typeof currentResume) => {
    if (resume) exportResumeAsText(resume);
  };

  const handleExportPDF = async (resume: typeof currentResume) => {
    if (resume) {
      try {
        await exportResumeAsPDF(resume);
      } catch (error) {
        alert(
          `Failed to export PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }
  };

  const handleCopy = async (resume: typeof currentResume) => {
    if (resume) {
      const success = await copyResumeToClipboard(resume);
      if (success) {
        alert("Resume copied to clipboard!");
      } else {
        alert("Failed to copy to clipboard");
      }
    }
  };

  // Prepare props for layout component
  return (
    <ResumeLayout
      currentResume={currentResume}
      isLoading={isLoading}
      error={error}
      aiError={aiError}
      content={content}
      onContentChange={handleContentChange}
      leftPaneProps={{
        isGenerating,
        showJobInput,
        jobDescription,
        onJobDescriptionChange: setJobDescription,
        onImprove: handleImprove,
        onTailorForJob: handleTailorForJob,
        onCreateVersion: handleCreateVersion,
        onToggleJobInput: toggleJobInput,
        onResetJobForm: resetJobForm,
        onExportHTML: handleExportHTML,
        onExportTXT: handleExportTXT,
        onExportPDF: handleExportPDF,
        onCopy: handleCopy,
      }}
      rightPaneProps={{
        resumes,
        currentResume,
        showNewResumeForm,
        newResumeName,
        newResumeContent,
        onFileSubmit: handleFileSubmit,
        onFileSuccess: handleFileSuccess,
        onFileError: handleFileError,
        onFileRemoved: handleFileRemoved,
        onFilesCleared: handleFilesCleared,
        onFileClick: handleFileClick,
        onToggleNewResumeForm: toggleNewResumeForm,
        onNewResumeNameChange: setNewResumeName,
        onNewResumeContentChange: setNewResumeContent,
        onCreateResumeFromForm: handleCreateResumeFromForm,
        onResetNewResumeForm: resetNewResumeForm,
        onSelectResume: setCurrentResume,
        onDeleteResume: deleteResume,
      }}
    />
  );
}
