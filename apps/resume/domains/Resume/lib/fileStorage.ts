/**
 * Utility functions for working with files stored in Resume objects
 * Files are stored directly in the Resume.fileData property
 */

import type { Resume } from "../model/types";

/**
 * Convert a File to the fileData format for storing in Resume
 */
export function fileToResumeFileData(file: File): Resume["fileData"] {
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    data: file, // File extends Blob, so this works
  };
}

/**
 * Convert Resume fileData back to a File object
 */
export function resumeFileDataToFile(
  fileData: Resume["fileData"],
): File | null {
  if (!fileData || !fileData.data) {
    return null;
  }

  try {
    // Ensure data is a Blob (it should be, but check to be safe)
    const blob =
      fileData.data instanceof Blob
        ? fileData.data
        : new Blob([fileData.data], { type: fileData.type });

    return new File([blob], fileData.name, {
      type: fileData.type || "application/octet-stream",
      lastModified: fileData.lastModified || Date.now(),
    });
  } catch (error) {
    console.error("Failed to convert fileData to File:", error);
    return null;
  }
}

/**
 * Get all files from resumes
 */
export function getFilesFromResumes(resumes: Resume[]): File[] {
  const files: File[] = [];

  for (const resume of resumes) {
    if (resume.fileData) {
      const file = resumeFileDataToFile(resume.fileData);
      if (file) {
        files.push(file);
      } else {
        console.warn(
          `Failed to convert fileData to File for resume: ${resume.name}`,
        );
      }
    }
  }

  return files;
}
