"use client";

import { useState, useCallback } from "react";
import { generateContent } from "@nathanhfoster/openai";
import type { Resume } from "../model/types";

/**
 * Hook for AI-powered resume editing
 * Following FSD pattern - domain-level business logic
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
        const prompt = instructions
          ? `Improve the following resume based on these instructions: ${instructions}\n\nResume content:\n${resume.content}`
          : `Improve the following resume content to make it more professional and impactful:\n\n${resume.content}`;

        const result = await generateContent({
          prompt,
          model: "gpt-4o",
          temperature: 0.7,
          max_tokens: 2000,
        });

        if (result.success && result.content) {
          return result.content;
        } else {
          throw new Error(result.error?.message || "Failed to generate improved resume");
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
    async (
      resume: Resume,
      jobDescription: string,
    ): Promise<string | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const prompt = `Tailor the following resume to match this job description. Keep the same structure and format, but adjust the content to highlight relevant skills and experiences:\n\nJob Description:\n${jobDescription}\n\nResume content:\n${resume.content}`;

        const result = await generateContent({
          prompt,
          model: "gpt-4o",
          temperature: 0.7,
          max_tokens: 2000,
        });

        if (result.success && result.content) {
          return result.content;
        } else {
          throw new Error(
            result.error?.message || "Failed to tailor resume for job",
          );
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
    async (
      resume: Resume,
      section?: string,
    ): Promise<string | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const prompt = section
          ? `Analyze the following resume and provide specific suggestions for improving the "${section}" section:\n\nResume content:\n${resume.content}`
          : `Analyze the following resume and provide specific suggestions for improvement:\n\n${resume.content}`;

        const result = await generateContent({
          prompt,
          model: "gpt-4o",
          temperature: 0.7,
          max_tokens: 1000,
        });

        if (result.success && result.content) {
          return result.content;
        } else {
          throw new Error(
            result.error?.message || "Failed to generate suggestions",
          );
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

