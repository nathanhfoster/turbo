import type { Resume } from "../../model/types";

export interface RightPaneProps {
  resumes: Resume[];
  currentResume: Resume | null;
  showNewResumeForm: boolean;
  newResumeName: string;
  newResumeContent: string;
  onFileSubmit: (files: globalThis.File[]) => Promise<Resume | undefined>;
  onFileSuccess: (files: globalThis.File[], result?: Resume) => void;
  onFileError: (error: string) => void;
  onFileRemoved: (file: globalThis.File) => Promise<void>;
  onFilesCleared: (files: globalThis.File[]) => Promise<void>;
  onFileClick: (file: globalThis.File) => void;
  onToggleNewResumeForm: () => void;
  onNewResumeNameChange: (value: string) => void;
  onNewResumeContentChange: (value: string) => void;
  onCreateResumeFromForm: (
    name: string,
    content: string,
  ) => Promise<Resume | null>;
  onResetNewResumeForm: () => void;
  onSelectResume: (resume: Resume | null) => void;
  onDeleteResume: (id: string) => Promise<void>;
}
