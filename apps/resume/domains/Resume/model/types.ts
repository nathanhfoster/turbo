/**
 * Resume domain types
 * Following FSD pattern - domain-level types
 */

export interface Resume {
  id: string;
  name: string;
  content: string; // HTML content
  createdAt: string;
  updatedAt: string;
  jobDescription?: string; // Optional job description this resume is tailored for
  version?: number; // Version number for tracking changes
}

export interface ResumeVersion extends Resume {
  baseResumeId: string; // Reference to the original resume
  jobDescription: string; // Required for versions
}

export interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
  isSaving: boolean;
}

export interface ResumeProps {
  resumeId?: string;
}

