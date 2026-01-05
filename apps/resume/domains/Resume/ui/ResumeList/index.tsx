"use client";

import { Card, Typography, Box, Button, IconButton } from "@nathanhfoster/ui";
import type { ResumeListProps } from "./types";

export function ResumeList({
  resumes,
  currentResume,
  onSelectResume,
  onDeleteResume,
  className,
}: ResumeListProps) {
  if (resumes.length === 0) {
    return (
      <Box className={className}>
        <Typography variant="p" className="text-gray-500 dark:text-gray-400">
          No resumes yet. Upload a file to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={className}>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            onClick={() => onSelectResume(resume)}
            hoverable
            className={`cursor-pointer relative ${
              currentResume?.id === resume.id
                ? "border-primary border-2"
                : ""
            }`}
          >
            <Box className="flex items-start justify-between">
              <Box className="flex-1">
                <Typography
                  variant="h4"
                  className="mb-2"
                  size="text-lg"
                  weight="font-semibold"
                >
                  {resume.name}
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-500 dark:text-gray-400"
                >
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </Typography>
                {resume.jobDescription && (
                  <Typography variant="small" className="mt-2 text-primary">
                    Tailored for job
                  </Typography>
                )}
                {resume.version && (
                  <Typography variant="small" className="text-gray-400">
                    Version {resume.version}
                  </Typography>
                )}
              </Box>
              <IconButton
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                }
                label="Delete resume"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      `Are you sure you want to delete "${resume.name}"?`,
                    )
                  ) {
                    onDeleteResume(resume.id);
                  }
                }}
                className="ml-2 text-warning hover:opacity-80"
              />
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

