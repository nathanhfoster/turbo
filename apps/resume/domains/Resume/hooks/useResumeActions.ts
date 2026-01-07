"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Resume } from "../model/types";
import { fileToResumeFileData } from "../lib/fileStorage";
import { getResumeViewUrl } from "./utils/navigation";

/**
 * Hook for resume action handlers
 * Following FSD pattern - domain-level business logic
 *
 * This hook provides handlers for:
 * - File upload/navigation actions
 * - AI-powered resume improvements
 * - Resume version creation
 * - Form-based resume creation
 */
export function useResumeActions(
  currentResume: Resume | null,
  createResume: (name: string, content: string, jobDescription?: string) => Promise<Resume>,
  updateResume: (resume: Resume) => Promise<Resume>,
  handleContentChange: (content: string) => void,
  improveResume: (resume: Resume, instructions?: string) => Promise<string | null>,
  tailorForJob: (resume: Resume, jobDescription: string) => Promise<string | null>,
) {
  const router = useRouter();

  /**
   * Handle file submission success and navigate to resume view
   */
  const handleFileSuccess = useCallback(
    (files: File[], result?: Resume) => {
      if (result?.id) {
        router.push(getResumeViewUrl(result.id));
      }
    },
    [router],
  );

  /**
   * Handle file submission error
   */
  const handleFileError = useCallback((error: string) => {
    console.error("Failed to load resume file:", error);
  }, []);

  /**
   * Handle file click and navigate to resume view
   */
  const handleFileClick = useCallback(
    (resume: Resume | null) => {
      if (resume?.id) {
        router.push(getResumeViewUrl(resume.id));
      }
    },
    [router],
  );

  /**
   * Handle AI-powered resume improvement
   */
  const handleImprove = useCallback(
    async () => {
      if (!currentResume) return;

      const improvedContent = await improveResume(currentResume);
      if (improvedContent) {
        handleContentChange(improvedContent);
      }
    },
    [currentResume, improveResume, handleContentChange],
  );

  /**
   * Handle tailoring resume for a specific job description
   */
  const handleTailorForJob = useCallback(
    async (jobDescription: string) => {
      if (!currentResume || !jobDescription.trim()) return;

      const tailoredContent = await tailorForJob(currentResume, jobDescription);
      if (tailoredContent) {
        handleContentChange(tailoredContent);
      }
    },
    [currentResume, tailorForJob, handleContentChange],
  );

  /**
   * Handle creating a new resume version for a job
   * Creates a new resume with tailored content and navigates to it
   */
  const handleCreateVersion = useCallback(
    async (jobDescription: string) => {
      if (!currentResume || !jobDescription.trim()) return;

      const tailoredContent = await tailorForJob(currentResume, jobDescription);
      if (tailoredContent) {
        const versionName = `${currentResume.name} - ${jobDescription.substring(0, 30)}...`;
        const newResume = await createResume(versionName, tailoredContent, jobDescription);
        if (newResume?.id) {
          router.push(getResumeViewUrl(newResume.id));
        }
        return newResume;
      }
      return null;
    },
    [currentResume, createResume, tailorForJob, router],
  );

  /**
   * Handle creating a new resume from the form
   * Stores file data and navigates to the new resume
   */
  const handleCreateResumeFromForm = useCallback(
    async (name: string, content: string) => {
      const newResume = await createResume(name, content);

      // Create and store file data directly in the resume
      if (newResume) {
        try {
          const fileName = `${newResume.name}.html`;
          const blob = new Blob([newResume.content], { type: "text/html" });
          const file = new File([blob], fileName, {
            type: "text/html",
            lastModified: new Date(newResume.createdAt).getTime(),
          });
          const fileData = fileToResumeFileData(file);
          // Update resume with file data
          const updatedResume = await updateResume({
            ...newResume,
            fileData,
          });
          router.push(getResumeViewUrl(updatedResume.id));
          return updatedResume;
        } catch (error) {
          console.warn("Failed to store file data in resume:", error);
          // Continue even if file storage fails
          router.push(getResumeViewUrl(newResume.id));
          return newResume;
        }
      }
      return null;
    },
    [createResume, updateResume, router],
  );

  return {
    handleFileSuccess,
    handleFileError,
    handleFileClick,
    handleImprove,
    handleTailorForJob,
    handleCreateVersion,
    handleCreateResumeFromForm,
  };
}

