import type { ResumeState } from "./types";

/**
 * Memoized selectors for Resume domain
 * Following FSD pattern - domain-level selectors
 */

export const selectResumes = (state: ResumeState): ResumeState["resumes"] =>
  state.resumes;

export const selectCurrentResume = (
  state: ResumeState,
): ResumeState["currentResume"] => state.currentResume;

export const selectIsLoading = (state: ResumeState): ResumeState["isLoading"] =>
  state.isLoading;

export const selectError = (state: ResumeState): ResumeState["error"] =>
  state.error;

export const selectIsEditing = (state: ResumeState): ResumeState["isEditing"] =>
  state.isEditing;

export const selectIsSaving = (state: ResumeState): ResumeState["isSaving"] =>
  state.isSaving;

export const selectResumeById = (state: ResumeState, id: string) =>
  state.resumes.find((r) => r.id === id);

export const selectResumeVersions = (
  state: ResumeState,
  baseResumeId: string,
) => state.resumes.filter((r) => {
  // Check if resume has baseResumeId property (for versions)
  return "baseResumeId" in r && r.baseResumeId === baseResumeId;
});

