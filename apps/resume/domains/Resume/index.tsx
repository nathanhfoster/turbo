"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useDeviceSelector } from "@nathanhfoster/pwa/device";
import { useResume } from "./hooks/useResume";
import { useResumeEditor } from "./hooks/useResumeEditor";
import { useResumeAI } from "./hooks/useResumeAI";
import { useResumeForm } from "./hooks/useResumeForm";
import { useResumeActions } from "./hooks/useResumeActions";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  IconMenu,
  IconDocument,
} from "@nathanhfoster/ui";
import type { ResumeEditorProps } from "./ui/ResumeEditor/types";
import type { LeftPaneProps } from "./ui/LeftPane/types";
import type { RightPaneProps } from "./ui/RightPane/types";

// Dynamic imports for conditionally rendered components
const ResumeEditor = dynamic<ResumeEditorProps>(
  () => import("./ui/ResumeEditor").then((mod) => ({ default: mod.ResumeEditor })),
  { ssr: false },
);

const LeftPane = dynamic<LeftPaneProps>(
  () => import("./ui/LeftPane").then((mod) => ({ default: mod.LeftPane })),
  { ssr: false },
);

const RightPane = dynamic<RightPaneProps>(
  () => import("./ui/RightPane").then((mod) => ({ default: mod.RightPane })),
  { ssr: false },
);
import {
  exportResumeAsHTML,
  exportResumeAsText,
  exportResumeAsPDF,
  copyResumeToClipboard,
} from "./lib/export";
import type { ResumeProps } from "./model/types";

/**
 * Resume domain container component
 * Following FSD pattern - orchestration layer
 */
export function ResumeBuilder(props?: ResumeProps) {
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

  const { content, isDirty, handleContentChange, saveChanges, resetChanges } =
    useResumeEditor(currentResume);

  const {
    improveResume,
    tailorForJob,
    generateSuggestions,
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
    handleSave,
    handleImprove,
    handleTailorForJob,
    handleCreateVersion,
    handleCreateResumeFromForm,
  } = useResumeActions(
    currentResume,
    createResume,
    updateResume,
    saveChanges,
    handleContentChange,
    improveResume,
    tailorForJob,
  );

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
    // Find the resume that has this file
    const resume = getResumeByFileName(file.name);
    handleFileClickAction(resume || null);
  };

  // Device state
  const isMobile = useDeviceSelector((state) => state.isMobile);
  const isTablet = useDeviceSelector((state) => state.isTablet);
  const isDesktop = useDeviceSelector((state) => state.isDesktop);
  const hasScrolled = useDeviceSelector((state) => state.hasScrolled);
  const shouldUseDrawers = isMobile || isTablet;

  // Drawer state for mobile/tablet
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [showPlainText, setShowPlainText] = useState(false);

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

  return (
    <Box variant="main" className={`flex flex-1 flex-col py-4 ${shouldUseDrawers ? 'px-2' : 'px-4'} md:py-8 md:px-0 w-full max-w-full overflow-x-hidden`}>
      <Box className="w-full max-w-full">
        <Box className="px-4 md:px-4 xl:px-6">
          {error && (
            <Box className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
              <Typography variant="p" className="text-error">
                {error}
              </Typography>
            </Box>
          )}

          {aiError && (
            <Box className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
              <Typography variant="p" className="text-error">
                AI Error: {aiError}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Header Bar with Title and Drawer Triggers */}
        {currentResume && (
          <Box className={`${shouldUseDrawers ? 'fixed top-20 left-0 right-0 z-50' : 'mb-4'} transition-all duration-300 px-2 ${isDesktop ? 'px-4 xl:px-6' : ''}`}>
            <Box className="flex items-center justify-between gap-2 w-full max-w-full">
              {/* Left: Actions Button (Mobile/Tablet only) */}
              {shouldUseDrawers && (
                <IconButton
                  onClick={() => setIsLeftDrawerOpen(true)}
                  icon={<IconMenu className="size-6" />}
                  aria-label="Actions"
                  variant="primary"
                  size="sm"
                  className={`flex-shrink-0 transition-all duration-300 ${hasScrolled ? 'bg-background-elevated/90 backdrop-blur-sm' : ''} ${isMobile ? '-ml-2' : isTablet ? '-ml-4' : ''}`}
                />
              )}
              {/* Center: Title */}
              <Box className="flex-1 min-w-0 flex justify-center px-2">
                <Typography 
                  variant="h2" 
                  size={shouldUseDrawers ? "text-lg" : "text-2xl"} 
                  weight="font-bold" 
                  className={`text-center truncate transition-all duration-300 ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  {currentResume.name}
                </Typography>
              </Box>
              {/* Right: Resumes Button (Mobile/Tablet only) */}
              {shouldUseDrawers && (
                <IconButton
                  onClick={() => setIsRightDrawerOpen(true)}
                  icon={<IconDocument className="size-6" />}
                  aria-label="Resumes"
                  variant="primary"
                  size="sm"
                  className={`flex-shrink-0 transition-all duration-300 ${hasScrolled ? 'bg-background-elevated/90 backdrop-blur-sm' : ''} ${isMobile ? '-mr-2' : isTablet ? '-mr-4' : ''}`}
                />
              )}
              {/* Spacer for desktop to maintain layout */}
              {isDesktop && <Box className="w-20 flex-shrink-0" />}
            </Box>
          </Box>
        )}

        {/* Desktop Layout: Three panes - left (actions), middle (editor), right (selection) */}
        <Box className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} gap-6 ${isDesktop ? 'gap-8' : 'gap-4'} ${isDesktop ? 'px-4 xl:px-6' : shouldUseDrawers ? 'px-2' : 'px-4'} ${shouldUseDrawers && currentResume ? 'pt-20' : ''} w-full max-w-full min-w-0 ${isDesktop ? 'h-full' : ''}`}>

          {/* Left Panel: Action Buttons */}
          {currentResume && (
            <>
              {/* Desktop: Direct rendering */}
              {isDesktop && (
                <Box className="flex w-64 flex-shrink-0 flex-col gap-4 min-w-0 animate-[fadeIn_0.4s_ease-out_0.1s_both]">
                  <LeftPane
                    currentResume={currentResume}
                    isGenerating={isGenerating}
                    showJobInput={showJobInput}
                    jobDescription={jobDescription}
                    onJobDescriptionChange={setJobDescription}
                    onImprove={handleImprove}
                    onTailorForJob={handleTailorForJob}
                    onCreateVersion={handleCreateVersion}
                    onToggleJobInput={toggleJobInput}
                    onResetJobForm={resetJobForm}
                    onExportHTML={handleExportHTML}
                    onExportTXT={handleExportTXT}
                    onExportPDF={handleExportPDF}
                    onCopy={handleCopy}
                    isEditing={isEditing}
                    isDirty={isDirty}
                    showPlainText={showPlainText}
                    onEdit={() => setIsEditing(true)}
                    onSave={handleSave}
                    onReset={resetChanges}
                    onTogglePlainText={setShowPlainText}
                  />
                </Box>
              )}
              {/* Mobile/Tablet: Drawer */}
              {shouldUseDrawers && (
                <Drawer
                  isOpen={isLeftDrawerOpen}
                  onClose={() => setIsLeftDrawerOpen(false)}
                  position="left"
                  width="w-64"
                >
                  <LeftPane
                    currentResume={currentResume}
                    isGenerating={isGenerating}
                    showJobInput={showJobInput}
                    jobDescription={jobDescription}
                    onJobDescriptionChange={setJobDescription}
                    onImprove={handleImprove}
                    onTailorForJob={handleTailorForJob}
                    onCreateVersion={handleCreateVersion}
                    onToggleJobInput={toggleJobInput}
                    onResetJobForm={resetJobForm}
                    onExportHTML={handleExportHTML}
                    onExportTXT={handleExportTXT}
                    onExportPDF={handleExportPDF}
                    onCopy={handleCopy}
                    isEditing={isEditing}
                    isDirty={isDirty}
                    showPlainText={showPlainText}
                    onEdit={() => setIsEditing(true)}
                    onSave={handleSave}
                    onReset={resetChanges}
                    onTogglePlainText={setShowPlainText}
                  />
                </Drawer>
              )}
            </>
          )}

          {/* Middle Panel: Resume Editor */}
          <Box className={`flex-1 min-w-0 ${isDesktop ? 'w-0' : isTablet ? 'max-w-4xl mx-auto w-full' : 'w-full'} ${!currentResume ? (isDesktop ? 'order-1' : 'order-2') : (isDesktop ? 'order-2' : 'order-1')} ${currentResume ? 'animate-[fadeIn_0.4s_ease-out_0.2s_both]' : ''}`}>
            {currentResume ? (
              <Box className="space-y-4 w-full max-w-full min-w-0 overflow-hidden">
                {/* Resume Editor Component */}
                <ResumeEditor
                  resume={currentResume}
                  content={content}
                  isDirty={isDirty}
                  onContentChange={handleContentChange}
                  onSave={() => {
                    handleSave();
                    setIsEditing(false);
                  }}
                  onReset={() => {
                    resetChanges();
                    setIsEditing(false);
                  }}
                  isEditing={isEditing}
                  showPlainText={showPlainText}
                  onEdit={() => setIsEditing(true)}
                  onTogglePlainText={setShowPlainText}
                  onCancel={() => setIsEditing(false)}
                  showTitle={false}
                />
              </Box>
            ) : (
              <Box className="text-center py-12 md:py-24">
                <Typography variant="p" className="text-gray-500 dark:text-gray-400">
                  Select or create a resume to get started
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Panel: Resume Selection and Loading */}
          <>
            {/* Desktop: Direct rendering */}
            {isDesktop && (
              <Box className={`flex w-80 xl:w-96 flex-shrink-0 min-w-0 order-3 animate-[fadeIn_0.4s_ease-out_0.3s_both]`}>
                <RightPane
                  resumes={resumes}
                  currentResume={currentResume}
                  showNewResumeForm={showNewResumeForm}
                  newResumeName={newResumeName}
                  newResumeContent={newResumeContent}
                  onFileSubmit={handleFileSubmit}
                  onFileSuccess={handleFileSuccess}
                  onFileError={handleFileError}
                  onFileRemoved={handleFileRemoved}
                  onFilesCleared={handleFilesCleared}
                  onFileClick={handleFileClick}
                  onToggleNewResumeForm={toggleNewResumeForm}
                  onNewResumeNameChange={setNewResumeName}
                  onNewResumeContentChange={setNewResumeContent}
                  onCreateResumeFromForm={handleCreateResumeFromForm}
                  onResetNewResumeForm={resetNewResumeForm}
                  onSelectResume={setCurrentResume}
                  onDeleteResume={deleteResume}
                />
              </Box>
            )}
            {/* Mobile/Tablet: Drawer */}
            {shouldUseDrawers && (
              <Drawer
                isOpen={isRightDrawerOpen}
                onClose={() => setIsRightDrawerOpen(false)}
                position="right"
                width="w-80"
              >
                <RightPane
                  resumes={resumes}
                  currentResume={currentResume}
                  showNewResumeForm={showNewResumeForm}
                  newResumeName={newResumeName}
                  newResumeContent={newResumeContent}
                  onFileSubmit={handleFileSubmit}
                  onFileSuccess={handleFileSuccess}
                  onFileError={handleFileError}
                  onFileRemoved={handleFileRemoved}
                  onFilesCleared={handleFilesCleared}
                  onFileClick={handleFileClick}
                  onToggleNewResumeForm={toggleNewResumeForm}
                  onNewResumeNameChange={setNewResumeName}
                  onNewResumeContentChange={setNewResumeContent}
                  onCreateResumeFromForm={handleCreateResumeFromForm}
                  onResetNewResumeForm={resetNewResumeForm}
                  onSelectResume={setCurrentResume}
                  onDeleteResume={deleteResume}
                />
              </Drawer>
            )}
          </>
        </Box>

        {isLoading && (
          <Box className="text-center py-8">
            <Typography variant="p" className="text-gray-500 dark:text-gray-400">
              Loading...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

