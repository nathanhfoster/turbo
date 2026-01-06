"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Resume } from "../model/types";
import { fileToResumeFileData } from "../lib/fileStorage";
import { getMainAppUrl } from "../../../../shared/utils/getMainAppUrl";

/**
 * Hook for resume action handlers
 * Following FSD pattern - domain-level business logic
 */
export function useResumeActions(
  currentResume: Resume | null,
  createResume: (name: string, content: string, jobDescription?: string) => Promise<Resume>,
  updateResume: (resume: Resume) => Promise<Resume>,
  saveChanges: (onSave?: (updatedResume: Resume) => void) => Promise<void>,
  handleContentChange: (content: string) => void,
  improveResume: (resume: Resume, instructions?: string) => Promise<string | null>,
  tailorForJob: (resume: Resume, jobDescription: string) => Promise<string | null>,
) {
  const router = useRouter();

  // Handle file submission success (navigation)
  const handleFileSuccess = useCallback(
    (files: File[], result?: Resume) => {
      // Redirect after success animation completes
      if (result?.id) {
        // Use absolute URL to ensure navigation works from main app
        // The route is /view/[id] within the app, so full path is /apps/resume/view/[id]
        const mainAppUrl = getMainAppUrl();
        router.push(`${mainAppUrl}/apps/resume/view/${result.id}`);
      }
    },
    [router],
  );

  // Handle file submission error
  const handleFileError = useCallback((error: string) => {
    console.error("Failed to load resume file:", error);
    // You could show a toast notification here
  }, []);

  // Handle file click (navigation)
  const handleFileClick = useCallback(
    (resume: Resume | null) => {
      if (resume?.id) {
        // Use absolute URL to ensure navigation works from main app
        // The route is /view/[id] within the app, so full path is /apps/resume/view/[id]
        const mainAppUrl = getMainAppUrl();
        router.push(`${mainAppUrl}/apps/resume/view/${resume.id}`);
      }
    },
    [router],
  );

  // Handle save action
  const handleSave = useCallback(
    async () => {
      if (currentResume) {
        await saveChanges(async (updatedResume) => {
          await updateResume(updatedResume);
        });
      }
    },
    [currentResume, saveChanges, updateResume],
  );

  // Handle improve action
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

  // Handle tailor for job action
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

  // Handle create version action
  const handleCreateVersion = useCallback(
    async (jobDescription: string) => {
      if (!currentResume || !jobDescription.trim()) return;

      const tailoredContent = await tailorForJob(currentResume, jobDescription);
      if (tailoredContent) {
        const versionName = `${currentResume.name} - ${jobDescription.substring(0, 30)}...`;
        const newResume = await createResume(versionName, tailoredContent, jobDescription);
        if (newResume?.id) {
          // Use absolute URL to ensure navigation works from main app
          // The route is /view/[id] within the app, so full path is /apps/resume/view/[id]
          const mainAppUrl = getMainAppUrl();
          router.push(`${mainAppUrl}/apps/resume/view/${newResume.id}`);
        }
        return newResume;
      }
      return null;
    },
    [currentResume, createResume, tailorForJob, router],
  );

  // Handle create resume from form
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
          // Use absolute URL to ensure navigation works from main app
          // The route is /view/[id] within the app, so full path is /apps/resume/view/[id]
          const mainAppUrl = getMainAppUrl();
          router.push(`${mainAppUrl}/apps/resume/view/${updatedResume.id}`);
          return updatedResume;
        } catch (error) {
          console.warn("Failed to store file data in resume:", error);
          // Continue even if file storage fails
          // Use absolute URL to ensure navigation works from main app
          // The route is /view/[id] within the app, so full path is /apps/resume/view/[id]
          const mainAppUrl = getMainAppUrl();
          router.push(`${mainAppUrl}/apps/resume/view/${newResume.id}`);
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
    handleSave,
    handleImprove,
    handleTailorForJob,
    handleCreateVersion,
    handleCreateResumeFromForm,
  };
}

