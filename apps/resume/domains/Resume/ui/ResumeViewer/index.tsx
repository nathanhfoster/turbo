import { RichText, Box } from "@nathanhfoster/ui";
import type { ResumeViewerProps } from "./types";

export function ResumeViewer({ resume, className }: ResumeViewerProps) {
  if (!resume) {
    return (
      <Box className={className}>
        <p className="text-gray-500 dark:text-gray-400">
          No resume selected. Please load or create a resume.
        </p>
      </Box>
    );
  }

  return (
    <Box className={className}>
      <RichText size="lg" variant="spacious">
        {resume.content}
      </RichText>
    </Box>
  );
}

