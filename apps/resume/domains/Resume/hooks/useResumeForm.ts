"use client";

import { useState, useCallback } from "react";

/**
 * Hook for managing resume form state
 * Following FSD pattern - domain-level business logic
 */
export function useResumeForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);
  const [showNewResumeForm, setShowNewResumeForm] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [newResumeContent, setNewResumeContent] = useState("");

  // Toggle job input visibility
  const toggleJobInput = useCallback(() => {
    setShowJobInput((prev) => !prev);
  }, []);

  // Toggle new resume form visibility
  const toggleNewResumeForm = useCallback(() => {
    setShowNewResumeForm((prev) => !prev);
  }, []);

  // Reset job description form
  const resetJobForm = useCallback(() => {
    setJobDescription("");
    setShowJobInput(false);
  }, []);

  // Reset new resume form
  const resetNewResumeForm = useCallback(() => {
    setNewResumeName("");
    setNewResumeContent("");
    setShowNewResumeForm(false);
  }, []);

  return {
    // Job description form
    jobDescription,
    setJobDescription,
    showJobInput,
    setShowJobInput,
    toggleJobInput,
    resetJobForm,
    // New resume form
    newResumeName,
    setNewResumeName,
    newResumeContent,
    setNewResumeContent,
    showNewResumeForm,
    setShowNewResumeForm,
    toggleNewResumeForm,
    resetNewResumeForm,
  };
}
