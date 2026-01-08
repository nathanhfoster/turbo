"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dropdown,
  IconDownload,
  IconUpload,
  FileDropper,
} from "@nathanhfoster/ui";
import { downloadFile, readFileAsText } from "@nathanhfoster/utils";
import { EntryCalendar } from "../Calendar";
import { EntryList } from "../EntryList";
import type { EntrySelectorProps } from "./types";

export function EntrySelector({
  entries,
  currentEntry,
  onEntrySelect,
  onDeleteEntry,
  onCalendarChange,
  onExport,
  onImport,
  className,
}: EntrySelectorProps) {
  const [fileContent, setFileContent] = useState<{ text: string; format: "json" | "csv" } | null>(null);

  const handleExport = (format: "json" | "csv") => {
    if (onExport) {
      const data = onExport(format);
      const mimeType = format === "json" ? "application/json" : "text/csv";
      downloadFile(data, `entries.${format}`, mimeType);
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    const file = files[0];
    if (!file || !onImport) {
      // Clear any previous file content
      setFileContent(null);
      return;
    }

    try {
      // Read the file immediately when selected
      const text = await readFileAsText(file);
      
      // Validate that we got content
      if (!text || text.trim().length === 0) {
        setFileContent(null);
        throw new Error("File is empty or could not be read");
      }

      const format = file.name.endsWith(".csv") ? "csv" : "json";
      
      // Basic validation for JSON files
      if (format === "json") {
        const trimmed = text.trim();
        if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
          setFileContent(null);
          throw new Error("File does not appear to be valid JSON (must start with { or [)");
        }
      }

      setFileContent({ text, format });
    } catch (error) {
      // Clear file content on error
      setFileContent(null);
      // Call error handler directly since FileDropper might not catch errors from onFilesSelected
      const errorMessage = error instanceof Error ? error.message : "Failed to read file";
      handleImportError(errorMessage);
      // Re-throw to let FileDropper know there was an error
      throw error;
    }
  };

  const handleImportSubmit = async (files: File[]) => {
    if (!fileContent || !onImport) {
      throw new Error("No file content available. Please select a file again.");
    }

    // Validate file content is not empty
    if (!fileContent.text || fileContent.text.trim().length === 0) {
      setFileContent(null);
      throw new Error("File content is empty. Please select a valid file.");
    }

    try {
      await onImport(fileContent.text, fileContent.format);
      // Clear the file content after successful import
      setFileContent(null);
      return { success: true, format: fileContent.format };
    } catch (error) {
      // Clear file content on error so user can try again
      setFileContent(null);
      throw new Error(error instanceof Error ? error.message : "Failed to import entries");
    }
  };

  const handleImportSuccess = (files: File[], result?: any) => {
    const format = result?.format || "file";
    // Success animation is handled by FileDropper
  };

  const handleImportError = (error: string) => {
    alert(`Failed to import: ${error}`);
  };

  return (
    <Box className={`space-y-6 ${className || ""}`}>
      {/* Import/Export Section */}
      <Box className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Typography
          variant="h3"
          size="text-lg"
          weight="font-semibold"
        >
          Astral Poet
        </Typography>
        <Box className="flex items-center gap-2">
          <Box className="inline-flex">
            <FileDropper
              accept=".json,.csv"
              showDropZone={false}
              dropZoneText="Import"
              icon={<IconUpload className="w-4 h-4" />}
              size="sm"
              color="primary"
              onFilesSelected={handleFilesSelected}
              onSubmit={handleImportSubmit}
              onSuccess={handleImportSuccess}
              onError={handleImportError}
              loadingText="Importing entries..."
              className="[&_label]:cursor-pointer [&_label]:inline-flex [&_label]:items-center [&_label]:gap-2 [&_label]:px-4 [&_label]:py-2 [&_label]:rounded-md [&_label]:border [&_label]:border-gray-300 [&_label]:dark:border-gray-600 [&_label]:bg-white [&_label]:dark:bg-gray-800 [&_label]:hover:bg-gray-50 [&_label]:dark:hover:bg-gray-700 [&_label]:transition-colors"
            />
          </Box>
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                variant="contained"
                size="sm"
                className="flex items-center gap-2"
              >
                <IconDownload className="w-4 h-4" />
                Export
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item onClick={() => handleExport("json")}>
                Export as JSON
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleExport("csv")}>
                Export as CSV
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </Box>
      </Box>

      {/* Calendar Section */}
      <Box className="space-y-4">
        <Typography
          variant="h3"
          className="mb-4"
          size="text-lg"
          weight="font-semibold"
        >
          Calendar
        </Typography>
        <EntryCalendar onChange={onCalendarChange} />
      </Box>

      {/* Entry List */}
      <Box>
        <Typography
          variant="h3"
          className="mb-4"
          size="text-lg"
          weight="font-semibold"
        >
          Your Entries
        </Typography>
        <Box className="h-[400px] md:h-[600px]">
          <EntryList
            onEntrySelect={(entryId) => {
              const entry = entries.find((e) => e.id === entryId);
              onEntrySelect(entry || null);
            }}
            onDeleteEntry={onDeleteEntry}
          />
        </Box>
      </Box>
    </Box>
  );
}

