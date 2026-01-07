"use client";

import { Box } from "@nathanhfoster/ui";
import { ResumeContextProvider } from "@/domains/Resume/model/resumeContext";
import { ResumeSelector } from "@/domains/Resume/ui/ResumeSelector";
import { useResume } from "@/domains/Resume/hooks/useResume";
import { useResumeActions } from "@/domains/Resume/hooks/useResumeActions";
import { useResumeEditor } from "@/domains/Resume/hooks/useResumeEditor";
import { useResumeAI } from "@/domains/Resume/hooks/useResumeAI";

function ResumeSelectorPage() {
  const {
    resumes,
    currentResume,
    createResumeFromFile,
    removeFileFromResume,
    clearFilesFromResumes,
    getResumeByFileName,
    setCurrentResume,
    deleteResume,
  } = useResume();

  const { handleContentChange } = useResumeEditor(currentResume);
  const { improveResume, tailorForJob } = useResumeAI();

  const {
    handleFileSuccess,
    handleFileError,
    handleFileClick: handleFileClickAction,
  } = useResumeActions(
    currentResume,
    async () => {
      throw new Error("Not implemented");
    },
    async () => {
      throw new Error("Not implemented");
    },
    handleContentChange,
    improveResume,
    tailorForJob,
  );

  const handleFileSubmit = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    if (!file) return;
    return await createResumeFromFile(file);
  };

  const handleFileRemoved = async (removedFile: File) => {
    try {
      await removeFileFromResume(removedFile.name);
    } catch (error) {
      console.error("Failed to remove file from resume:", error);
    }
  };

  const handleFilesCleared = async (clearedFiles: File[]) => {
    try {
      const fileNames = clearedFiles.map((f) => f.name);
      await clearFilesFromResumes(fileNames);
    } catch (error) {
      console.error("Failed to clear files from resumes:", error);
    }
  };

  const handleFileClick = (file: File) => {
    const resume = getResumeByFileName(file.name);
    handleFileClickAction(resume || null);
  };

  return (
    <Box variant="main" className="flex flex-1 flex-col py-4 px-4 md:py-8 md:px-8 w-full max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out_0.1s_both]">
      <ResumeSelector
        resumes={resumes}
        currentResume={currentResume}
        onFileSubmit={handleFileSubmit}
        onFileSuccess={handleFileSuccess}
        onFileError={handleFileError}
        onFileRemoved={handleFileRemoved}
        onFilesCleared={handleFilesCleared}
        onFileClick={handleFileClick}
        onSelectResume={setCurrentResume}
        onDeleteResume={deleteResume}
      />
    </Box>
  );
}

export default function Home() {
  return (
    <ResumeContextProvider>
      <ResumeSelectorPage />
    </ResumeContextProvider>
  );
}

