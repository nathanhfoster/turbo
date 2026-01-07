"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "@nathanhfoster/react-hooks";
import { useResumeDispatch } from "../model/resumeContext";
import { resumeActions } from "../model/resumeSlice";
import type { Resume } from "../model/types";

/**
 * Hook for inline editing of resume content with auto-save
 * Following FSD pattern - domain-level business logic
 */
export function useResumeEditor(resume: Resume | null) {
  const dispatch = useResumeDispatch();
  const [content, setContent] = useState(resume?.content || "");
  const [isDirty, setIsDirty] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Update content when resume changes
  useEffect(() => {
    if (resume) {
      // Ensure we set content even if it's empty string
      setContent(resume.content || "");
      setIsDirty(false);
    } else {
      // Reset content when resume is null
      setContent("");
      setIsDirty(false);
    }
  }, [resume?.id, resume?.content]);

  // Auto-save to IndexedDB with debounce (1 second after user stops typing)
  const autoSaveToIndexedDB = useDebouncedCallback(
    async (newContent: string, currentResume: Resume) => {
      if (!currentResume) return;

      try {
        setIsAutoSaving(true);

        // Strip HTML tags for plain text search/indexing
        const plainText = newContent
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const now = new Date().toISOString();

        const updatedResume: Resume = {
          ...currentResume,
          content: newContent,
          plainText,
          contentLength: plainText.length,
          updatedAt: now,
          lastSavedAt: now, // Track successful auto-save
          version: (currentResume.version || 1) + 1,
        };

        dispatch(resumeActions.UpdateResume(updatedResume));
        setIsDirty(false);
      } catch (error) {
        console.error("Auto-save failed:", error);
        // Note: lastSavedAt won't be updated if save fails
      } finally {
        setIsAutoSaving(false);
      }
    },
    [dispatch],
    1000, // Wait 1 second after user stops typing
    { leading: false, trailing: true } // Only save after pause
  );

  // Handle content changes with auto-save
  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent);
      setIsDirty(true);

      // Auto-save to IndexedDB
      if (resume) {
        autoSaveToIndexedDB(newContent, resume);
      }
    },
    [resume, autoSaveToIndexedDB]
  );

  // Manual save (for explicit save button if needed)
  const saveChanges = useCallback(
    async (onSave?: (updatedResume: Resume) => void) => {
      if (!resume) return;

      const plainText = content
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const now = new Date().toISOString();

      const updatedResume: Resume = {
        ...resume,
        content,
        plainText,
        contentLength: plainText.length,
        updatedAt: now,
        lastSavedAt: now,
        version: (resume.version || 1) + 1,
      };

      dispatch(resumeActions.UpdateResume(updatedResume));
      setIsDirty(false);
      onSave?.(updatedResume);
    },
    [resume, content, dispatch],
  );

  // Reset to original content
  const resetChanges = useCallback(() => {
    if (resume) {
      setContent(resume.content);
      setIsDirty(false);
    }
  }, [resume]);

  return {
    content,
    isDirty,
    isAutoSaving,
    handleContentChange,
    saveChanges,
    resetChanges,
  };
}

