"use client";

import { Card, Typography, Box, IconButton, IconTrash } from "@nathanhfoster/ui";
import { useRouter } from "next/navigation";
import type { ResumeListProps } from "./types";

export function ResumeList({
  resumes,
  currentResume,
  onSelectResume,
  onDeleteResume,
  className,
}: ResumeListProps) {
  const router = useRouter();
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
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            onClick={() => {
              router.push(`/resume/${resume.id}`);
            }}
            hoverable
            className={`cursor-pointer transition-all duration-200 ${
              currentResume?.id === resume.id
                ? "ring-2 ring-primary ring-offset-2 border-primary"
                : ""
            }`}
            padding="p-5"
          >
            <Box className="flex flex-col h-full">
              {/* Header with name and delete button */}
              <Box className="flex items-start justify-between gap-3 mb-3">
                <Typography
                  variant="h4"
                  className="flex-1 line-clamp-2"
                  size="text-lg"
                  weight="font-semibold"
                >
                  {resume.name}
                </Typography>
                <IconButton
                  icon={<IconTrash className="w-4 h-4" />}
                  size="sm"
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
                  className="flex-shrink-0 text-warning hover:text-error hover:bg-error/10 transition-colors"
                  aria-label="Delete resume"
                />
              </Box>

              {/* Metadata section */}
              <Box className="flex flex-col gap-2 mt-auto">
                <Typography
                  variant="small"
                  className="text-gray-500 dark:text-gray-400"
                >
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </Typography>
                {resume.jobDescription && (
                  <Box className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <Typography
                      variant="small"
                      className="text-primary font-medium"
                    >
                      Tailored for job
                    </Typography>
                  </Box>
                )}
                {resume.version && resume.version > 1 && (
                  <Typography
                    variant="small"
                    className="text-gray-400 dark:text-gray-500"
                  >
                    Version {resume.version}
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

