import type { Resume } from "../../model/types";

export interface ResumeViewerProps {
  resume: Resume | null;
  className?: string;
}
