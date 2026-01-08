import type { Resume } from "../../model/types";

export interface ResumeSelectorProps {
  resumes: Resume[];
  currentResume: Resume | null;
  onFileSubmit: (files: globalThis.File[]) => Promise<Resume | undefined>;
  onFileSuccess: (files: globalThis.File[], result?: Resume) => void;
  onFileError: (error: string) => void;
  onFileRemoved: (file: globalThis.File) => Promise<void>;
  onFilesCleared: (files: globalThis.File[]) => Promise<void>;
  onFileClick: (file: globalThis.File) => void;
  onSelectResume: (resume: Resume | null) => void;
  onDeleteResume: (id: string) => Promise<void>;
  className?: string;
}
