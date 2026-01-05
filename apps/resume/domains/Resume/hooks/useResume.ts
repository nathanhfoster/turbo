"use client";

import { useEffect, useCallback } from "react";
import {
  useResumeSelector,
  useResumeDispatch,
  resumeContextActions,
} from "../model/resumeContext";
import {
  selectResumes,
  selectCurrentResume,
  selectIsLoading,
  selectError,
  selectResumeById,
} from "../model/selectors";
import { initializeResumeDatabase } from "../model/repository";
import type { Resume, ResumeProps } from "../model/types";

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
        dispatch(resumeContextActions.SetLoading(true));
        const repository = await initializeResumeDatabase();
        const allResumes = await repository.getAll();
        dispatch(resumeContextActions.SetResumes(allResumes));

        // If resumeId is provided, set it as current
        if (props?.resumeId) {
          const resume = allResumes.find((r) => r.id === props.resumeId);
          if (resume) {
            dispatch(resumeContextActions.SetCurrentResume(resume));
          }
        }
      } catch (err) {
        dispatch(
          resumeContextActions.SetError(
            err instanceof Error ? err.message : "Failed to load resumes",
          ),
        );
      } finally {
        dispatch(resumeContextActions.SetLoading(false));
      }
    };

    loadResumes();
  }, [dispatch, props?.resumeId]);

  // Create a new resume
  const createResume = useCallback(
    async (name: string, content: string, jobDescription?: string) => {
      try {
        dispatch(resumeContextActions.SetLoading(true));
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
        dispatch(resumeContextActions.AddResume(newResume));
        dispatch(resumeContextActions.SetCurrentResume(newResume));
        return newResume;
      } catch (err) {
        dispatch(
          resumeContextActions.SetError(
            err instanceof Error ? err.message : "Failed to create resume",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeContextActions.SetLoading(false));
      }
    },
    [dispatch],
  );

  // Update resume
  const updateResume = useCallback(
    async (resume: Resume) => {
      try {
        dispatch(resumeContextActions.SetSaving(true));
        const repository = await initializeResumeDatabase();

        const updatedResume: Resume = {
          ...resume,
          updatedAt: new Date().toISOString(),
          version: (resume.version || 1) + 1,
        };

        await repository.save(updatedResume);
        dispatch(resumeContextActions.UpdateResume(updatedResume));
        return updatedResume;
      } catch (err) {
        dispatch(
          resumeContextActions.SetError(
            err instanceof Error ? err.message : "Failed to update resume",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeContextActions.SetSaving(false));
      }
    },
    [dispatch],
  );

  // Delete resume
  const deleteResume = useCallback(
    async (resumeId: string) => {
      try {
        dispatch(resumeContextActions.SetLoading(true));
        const repository = await initializeResumeDatabase();
        await repository.delete(resumeId);
        dispatch(resumeContextActions.DeleteResume(resumeId));
      } catch (err) {
        dispatch(
          resumeContextActions.SetError(
            err instanceof Error ? err.message : "Failed to delete resume",
          ),
        );
        throw err;
      } finally {
        dispatch(resumeContextActions.SetLoading(false));
      }
    },
    [dispatch],
  );

  // Set current resume
  const setCurrentResume = useCallback(
    (resume: Resume | null) => {
      dispatch(resumeContextActions.SetCurrentResume(resume));
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
  };
}

