/**
 * Resume domain types
 * Following FSD pattern - domain-level types
 */

export interface Resume {
  id: string;
  name: string;
  content: string; // HTML content - primary display format
  plainText?: string; // Plain text version for search/indexing (auto-generated)
  contentLength?: number; // Character count for quick stats/comparison
  createdAt: string;
  updatedAt: string; // Last time any field was updated
  lastSavedAt?: string; // Last successful auto-save to IndexedDB
  jobDescription?: string; // Optional job description this resume is tailored for
  version?: number; // Version number for tracking changes
  // File data stored directly in the resume (rarely changes)
  fileData?: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    data: Blob;
  };
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

