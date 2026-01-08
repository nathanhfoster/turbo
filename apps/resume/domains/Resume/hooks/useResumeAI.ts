"use client";

import { useState, useCallback } from "react";
import {
  improveResumeContent,
  tailorResumeForJob,
  generateResumeSuggestions,
} from "../api/openaiApi";
import type { Resume } from "../model/types";

/**
 * Hook for AI-powered resume editing
 * Following FSD pattern - domain-level business logic
 *
 * This hook abstracts the API layer and manages state.
 * API calls are delegated to the api/ layer for better separation of concerns.
 */
export function useResumeAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Improve resume content using AI
   */
  const improveResume = useCallback(
    async (resume: Resume, instructions?: string): Promise<string | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const result = await improveResumeContent({
          content: resume.content,
          instructions,
        });

        if (result.success && result.content) {
          return result.content;
        } else {
          const errorMessage =
            result.error?.message || "Failed to improve resume";
          setError(errorMessage);
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to improve resume";
        setError(errorMessage);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  /**
   * Tailor resume for a specific job description
   */
  const tailorForJob = useCallback(
    async (resume: Resume, jobDescription: string): Promise<string | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const result = await tailorResumeForJob({
          content: resume.content,
          jobDescription,
        });

        if (result.success && result.content) {
          return result.content;
        } else {
          const errorMessage =
            result.error?.message || "Failed to tailor resume";
          setError(errorMessage);
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to tailor resume";
        setError(errorMessage);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  /**
   * Generate suggestions for improving specific sections
   */
  const generateSuggestions = useCallback(
    async (resume: Resume, section?: string): Promise<string | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const result = await generateResumeSuggestions({
          content: resume.content,
          section,
        });

        if (result.success && result.content) {
          return result.content;
        } else {
          const errorMessage =
            result.error?.message || "Failed to generate suggestions";
          setError(errorMessage);
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to generate suggestions";
        setError(errorMessage);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  return {
    improveResume,
    tailorForJob,
    generateSuggestions,
    isGenerating,
    error,
  };
}
