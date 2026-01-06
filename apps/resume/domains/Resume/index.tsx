"use client";

import { useResume } from "./hooks/useResume";
import { useResumeEditor } from "./hooks/useResumeEditor";
import { useResumeAI } from "./hooks/useResumeAI";
import { ResumeEditor } from "./ui/ResumeEditor";
import { ResumeList } from "./ui/ResumeList";
import {
  FileDropper,
  Box,
  Button,
  Typography,
  Input,
  TextArea,
  Card,
} from "@nathanhfoster/ui";
import { parseResumeFile } from "./lib/fileParser";
import {
  exportResumeAsHTML,
  exportResumeAsText,
  exportResumeAsPDF,
  copyResumeToClipboard,
} from "./lib/export";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "./lib/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ResumeProps } from "./model/types";

/**
 * Resume domain container component
 * Following FSD pattern - orchestration layer
 */
export function ResumeBuilder(props?: ResumeProps) {
  const router = useRouter();
  const {
    resumes,
    currentResume,
    isLoading,
    error,
    createResume,
    updateResume,
    deleteResume,
    setCurrentResume,
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

  const [jobDescription, setJobDescription] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);
  const [showNewResumeForm, setShowNewResumeForm] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [newResumeContent, setNewResumeContent] = useState("");

  const handleFileSubmit = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    if (!file) return;
    
    const content = await parseResumeFile(file);
    const name = file.name.replace(/\.[^/.]+$/, ""); // Remove extension

    const newResume = await createResume(name, content);
    if (!newResume) {
      throw new Error("Failed to create resume");
    }
    
    return newResume;
  };

  const handleFileSuccess = (files: File[], newResume?: Awaited<ReturnType<typeof handleFileSubmit>>) => {
    // Redirect after success animation completes
    if (newResume) {
      router.push(`/resume/${newResume.id}`);
    }
  };

  const handleFileError = (error: string) => {
    console.error("Failed to load resume file:", error);
    // You could show a toast notification here
  };

  const handleSave = async () => {
    if (currentResume) {
      await saveChanges(async (updatedResume) => {
        await updateResume(updatedResume);
      });
    }
  };

  const handleImprove = async () => {
    if (!currentResume) return;

    const improvedContent = await improveResume(currentResume);
    if (improvedContent) {
      handleContentChange(improvedContent);
    }
  };

  const handleTailorForJob = async () => {
    if (!currentResume || !jobDescription.trim()) return;

    const tailoredContent = await tailorForJob(currentResume, jobDescription);
    if (tailoredContent) {
      handleContentChange(tailoredContent);
    }
  };

  const handleCreateVersion = async () => {
    if (!currentResume || !jobDescription.trim()) return;

    const tailoredContent = await tailorForJob(currentResume, jobDescription);
    if (tailoredContent) {
      const versionName = `${currentResume.name} - ${jobDescription.substring(0, 30)}...`;
      const newResume = await createResume(versionName, tailoredContent, jobDescription);
      setJobDescription("");
      setShowJobInput(false);
      if (newResume) {
        router.push(`/resume/${newResume.id}`);
      }
    }
  };

  return (
    <Box variant="main" className="flex flex-1 flex-col p-4 md:p-8">
      <Box className="max-w-7xl mx-auto w-full">
          <Typography
            variant="h1"
            className="mb-6 text-4xl md:text-5xl"
            weight="font-bold"
          >
            AI Resume Builder
          </Typography>

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

        {/* File Upload Section */}
        {!currentResume && (
          <Box className="mb-8 space-y-4">
            <Box className="flex flex-col gap-4 w-full">
              <FileDropper
                accept={ACCEPTED_FILE_TYPES.join(",")}
                maxSize={MAX_FILE_SIZE}
                onSubmit={handleFileSubmit}
                onSuccess={handleFileSuccess}
                onError={handleFileError}
                label="Load Resume"
                helperText="Upload a resume file (TXT, HTML, PDF, DOC, DOCX)"
                dropZoneText="Drop your resume file here or click to browse"
                showDropZone={true}
              />
              <Box className="flex items-start">
                <Button
                  onClick={() => setShowNewResumeForm(!showNewResumeForm)}
                  variant="outlined"
                  color="primary"
                  className="w-full md:w-auto whitespace-nowrap"
                >
                  {showNewResumeForm ? "Cancel" : "Create New Resume"}
                </Button>
              </Box>
            </Box>

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
                    onChange={(e) => setNewResumeName(e.target.value)}
                    placeholder="e.g., Software Engineer Resume"
                  />
                  <TextArea
                    label="Resume Content (HTML supported)"
                    value={newResumeContent}
                    onChange={(e) => setNewResumeContent(e.target.value)}
                    placeholder="<h1>Your Name</h1><p>Your resume content here...</p>"
                    fullHeight
                    className="min-h-[300px]"
                  />
                  <Box className="flex gap-2">
                    <Button
                      onClick={async () => {
                        if (newResumeName.trim() && newResumeContent.trim()) {
                          const newResume = await createResume(
                            newResumeName,
                            newResumeContent,
                          );
                          setNewResumeName("");
                          setNewResumeContent("");
                          setShowNewResumeForm(false);
                          if (newResume) {
                            router.push(`/resume/${newResume.id}`);
                          }
                        }
                      }}
                      variant="contained"
                      color="primary"
                      disabled={!newResumeName.trim() || !newResumeContent.trim()}
                    >
                      Create Resume
                    </Button>
                    <Button
                      onClick={() => {
                        setShowNewResumeForm(false);
                        setNewResumeName("");
                        setNewResumeContent("");
                      }}
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
        )}

        {/* Resume List */}
        {resumes.length > 0 && (
          <Box className="mb-6">
            <Typography
              variant="h3"
              className="mb-4"
              size="text-xl"
              weight="font-semibold"
            >
              Your Resumes
            </Typography>
            <ResumeList
              resumes={resumes}
              currentResume={currentResume}
              onSelectResume={setCurrentResume}
              onDeleteResume={deleteResume}
            />
          </Box>
        )}

        {/* Resume Editor */}
        {currentResume && (
          <Box className="space-y-4">
            {/* Action Buttons */}
            <Box className="flex flex-wrap gap-2">
              <Button
                onClick={handleImprove}
                variant="outlined"
                color="primary"
                disabled={isGenerating}
              >
                {isGenerating ? "Improving..." : "Improve with AI"}
              </Button>
              <Button
                onClick={() => setShowJobInput(!showJobInput)}
                variant="outlined"
                color="secondary"
              >
                Tailor for Job
              </Button>
              <Button
                onClick={() => currentResume && exportResumeAsHTML(currentResume)}
                variant="outlined"
                color="inherit"
              >
                Export HTML
              </Button>
              <Button
                onClick={() => currentResume && exportResumeAsText(currentResume)}
                variant="outlined"
                color="inherit"
              >
                Export TXT
              </Button>
              <Button
                onClick={async () => {
                  if (currentResume) {
                    try {
                      await exportResumeAsPDF(currentResume);
                    } catch (error) {
                      alert(
                        `Failed to export PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
                      );
                    }
                  }
                }}
                variant="outlined"
                color="inherit"
              >
                Export PDF
              </Button>
              <Button
                onClick={async () => {
                  if (currentResume) {
                    const success = await copyResumeToClipboard(currentResume);
                    if (success) {
                      alert("Resume copied to clipboard!");
                    } else {
                      alert("Failed to copy to clipboard");
                    }
                  }
                }}
                variant="outlined"
                color="inherit"
              >
                Copy
              </Button>
              {showJobInput && (
                <>
                  <Box className="flex-1 min-w-[200px]">
                    <Input
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste job description..."
                      label="Job Description"
                    />
                  </Box>
                  <Button
                    onClick={handleTailorForJob}
                    variant="contained"
                    color="primary"
                    disabled={!jobDescription.trim() || isGenerating}
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={handleCreateVersion}
                    variant="outlined"
                    color="primary"
                    disabled={!jobDescription.trim() || isGenerating}
                  >
                    Save as Version
                  </Button>
                </>
              )}
            </Box>

            {/* Resume Editor Component */}
            <ResumeEditor
              resume={currentResume}
              content={content}
              isDirty={isDirty}
              onContentChange={handleContentChange}
              onSave={handleSave}
              onReset={resetChanges}
            />
          </Box>
        )}

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

