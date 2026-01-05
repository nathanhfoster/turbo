"use client";

import { useState, useCallback, useEffect } from "react";
import { useResumeDispatch, resumeContextActions } from "../model/resumeContext";
import type { Resume } from "../model/types";

/**
 * Hook for inline editing of resume content
 * Following FSD pattern - domain-level business logic
 */
export function useResumeEditor(resume: Resume | null) {
  const dispatch = useResumeDispatch();
  const [content, setContent] = useState(resume?.content || "");
  const [isDirty, setIsDirty] = useState(false);

  // Update content when resume changes
  useEffect(() => {
    if (resume) {
      setContent(resume.content);
      setIsDirty(false);
    }
  }, [resume?.id, resume?.content]);

  // Handle content changes
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    setIsDirty(true);
  }, []);

  // Save changes
  const saveChanges = useCallback(
    async (onSave?: (updatedResume: Resume) => void) => {
      if (!resume || !isDirty) return;

      const updatedResume: Resume = {
        ...resume,
        content,
        updatedAt: new Date().toISOString(),
        version: (resume.version || 1) + 1,
      };

      dispatch(resumeContextActions.UpdateResume(updatedResume));
      setIsDirty(false);
      onSave?.(updatedResume);
    },
    [resume, content, isDirty, dispatch],
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
    handleContentChange,
    saveChanges,
    resetChanges,
  };
}

