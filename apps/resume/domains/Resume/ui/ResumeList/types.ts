import type { Resume } from "../../model/types";

export interface ResumeListProps {
  resumes: Resume[];
  currentResume: Resume | null;
  onSelectResume: (resume: Resume) => void;
  onDeleteResume: (resumeId: string) => void;
  className?: string;
}

