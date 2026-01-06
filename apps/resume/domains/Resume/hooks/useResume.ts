"use client";

import { useEffect, useCallback } from "react";
import {
  useResumeSelector,
  useResumeDispatch,
} from "../model/resumeContext";
import { resumeActions } from "../model/resumeSlice";
import {
  selectResumes,
  selectCurrentResume,
  selectIsLoading,
  selectError,
  selectResumeById,
} from "../model/selectors";
import { initializeResumeDatabase } from "../model/repository";
import type { Resume, ResumeProps } from "../model/types";
import { parseResumeFile } from "../lib/fileParser";
import { fileToResumeFileData } from "../lib/fileStorage";

/**
 * Main Resume domain hook
 * Following FSD pattern - domain-level business logic
 */
export function useResume(props?: ResumeProps) {
  const dispatch = useResumeDispatch();
  const resumes = useResumeSelector(selectResumes);
  const currentResume = useResumeSelector(selectCurrentResume);
  const isLoading = useResumeSelector(selectIsLoading);
  const error = useResumeSelector(selectError);

  // Load resumes from IndexedDB on mount
  useEffect(() => {
    const loadResumes = async () => {
      try {
        dispatch(resumeActions.SetLoading(true));
        const repository = await initializeResumeDatabase();
        const allResumes = await repository.getAll();
        dispatch(resumeActions.SetResumes(allResumes));

        // If resumeId is provided, set it as current
        if (props?.resumeId) {
          // First try to find it in the list
          let resume = allResumes.find((r) => r.id === props.resumeId);
          
          // If not found in the list, fetch it directly from IndexedDB
          if (!resume) {
            resume = await repository.getById(props.resumeId);
            // If found, add it to the list
            if (resume) {
              dispatch(resumeActions.AddResume(resume));
            }
          }
          
          if (resume) {
            dispatch(resumeActions.SetCurrentResume(resume));
          }
        }
      } catch (err) {
        dispatch(
          resumeActions.SetError(
            err instanceof Error ? err.message : "Failed to load resumes",
          ),
        );
      } finally {
        dispatch(resumeActions.SetLoading(false));
      }
    };

    loadResumes();
  }, [dispatch, props?.resumeId]);

  // Create a new resume
  const createResume = useCallback(
    async (name: string, content: string, jobDescription?: string) => {
      try {
        dispatch(resumeActions.SetLoading(true));
        const repository = await initializeResumeDatabase();

        const newResume: Resume = {
          id: `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          jobDescription,
          version: 1,
        };

        await repository.save(newResume);
        dispatch(resumeActions.AddResume(newResume));
        dispatch(resumeActions.SetCurrentResume(newResume));
        return newResume;
      } catch (err) {
        dispatch(
          resumeActions.SetError(
            err instanceof Error ? err.message : "Failed to create resume",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeActions.SetLoading(false));
      }
    },
    [dispatch],
  );

  // Update resume
  const updateResume = useCallback(
    async (resume: Resume) => {
      try {
        dispatch(resumeActions.SetSaving(true));
        const repository = await initializeResumeDatabase();

        const updatedResume: Resume = {
          ...resume,
          updatedAt: new Date().toISOString(),
          version: (resume.version || 1) + 1,
        };

        await repository.save(updatedResume);
        dispatch(resumeActions.UpdateResume(updatedResume));
        return updatedResume;
      } catch (err) {
        dispatch(
          resumeActions.SetError(
            err instanceof Error ? err.message : "Failed to update resume",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeActions.SetSaving(false));
      }
    },
    [dispatch],
  );

  // Delete resume
  const deleteResume = useCallback(
    async (resumeId: string) => {
      try {
        dispatch(resumeActions.SetLoading(true));
        const repository = await initializeResumeDatabase();
        await repository.delete(resumeId);
        dispatch(resumeActions.DeleteResume(resumeId));
      } catch (err) {
        dispatch(
          resumeActions.SetError(
            err instanceof Error ? err.message : "Failed to delete resume",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeActions.SetLoading(false));
      }
    },
    [dispatch],
  );

  // Set current resume
  const setCurrentResume = useCallback(
    (resume: Resume | null) => {
      dispatch(resumeActions.SetCurrentResume(resume));
    },
    [dispatch],
  );

  // Get resume by ID (helper function, not a hook)
  const getResumeById = useCallback(
    (id: string) => {
      return resumes.find((r) => r.id === id);
    },
    [resumes],
  );

  // Get resume by file name
  const getResumeByFileName = useCallback(
    (fileName: string) => {
      return resumes.find((r) => r.fileData?.name === fileName);
    },
    [resumes],
  );

  // Create a resume from a file upload
  const createResumeFromFile = useCallback(
    async (file: File) => {
      try {
        dispatch(resumeActions.SetLoading(true));
        
        // Parse file content
        const content = await parseResumeFile(file);
        const name = file.name.replace(/\.[^/.]+$/, ""); // Remove extension

        // Store file data directly in the resume
        const fileData = fileToResumeFileData(file);
        const newResume = await createResume(name, content);
        
        if (!newResume) {
          throw new Error("Failed to create resume");
        }

        // Update resume with file data
        try {
          await updateResume({
            ...newResume,
            fileData,
          });
        } catch (error) {
          console.warn("Failed to update resume with file data:", error);
          // Continue even if update fails
        }

        return { ...newResume, fileData };
      } catch (err) {
        dispatch(
          resumeActions.SetError(
            err instanceof Error ? err.message : "Failed to create resume from file",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeActions.SetLoading(false));
      }
    },
    [dispatch, createResume, updateResume],
  );

  // Remove file from a resume by file name
  const removeFileFromResume = useCallback(
    async (fileName: string) => {
      const resume = resumes.find((r) => r.fileData?.name === fileName);
      if (resume) {
        try {
          await updateResume({
            ...resume,
            fileData: undefined,
          });
        } catch (error) {
          console.error("Failed to remove file from resume:", error);
          throw error;
        }
      }
    },
    [resumes, updateResume],
  );

  // Clear files from multiple resumes
  const clearFilesFromResumes = useCallback(
    async (fileNames: string[]) => {
      const resumesToUpdate = resumes.filter(
        (r) => r.fileData && fileNames.includes(r.fileData.name),
      );

      const updates = resumesToUpdate.map((resume) =>
        updateResume({
          ...resume,
          fileData: undefined,
        }),
      );

      try {
        await Promise.all(updates);
      } catch (error) {
        console.error("Failed to clear files from resumes:", error);
        throw error;
      }
    },
    [resumes, updateResume],
  );

  return {
    resumes,
    currentResume,
    isLoading,
    error,
    createResume,
    updateResume,
    deleteResume,
    setCurrentResume,
    getResumeById,
    getResumeByFileName,
    createResumeFromFile,
    removeFileFromResume,
    clearFilesFromResumes,
  };
}

