"use client";

import { useRouter } from "next/navigation";
import { useEntry } from "./hooks/useEntry";
import { useEntryEditor } from "./hooks/useEntryEditor";
import { EntryLayout } from "./ui/EntryLayout";
import { getMainAppUrl } from "../../../shared/utils/getMainAppUrl";
import type { EntryProps } from "./model/types";

// Export provider for wrapping app
export { EntryContextProvider } from "./model/entryContext";

// Export hooks for direct use
export { useEntry, useEntryEditor } from "./hooks";

// Export types
export type { Entry, EntryProps, EntryState, EntryFile } from "./model/types";

// Export actions and selectors
export { entryActions } from "./model/entrySlice";
export * from "./model/selectors";

// Export repository
export { initializeEntryDatabase, EntryRepository } from "./model/repository";

// Export import/export utilities
export * from "./utils/importExport";

// Export UI components
export * from "./ui";

/**
 * EntryJournal - Domain container component
 * Following FSD pattern - clean orchestration layer
 *
 * This container:
 * - Orchestrates all domain hooks
 * - Prepares data and callbacks
 * - Delegates presentation to EntryLayout
 */
export function EntryJournal(props?: EntryProps) {
  const router = useRouter();
  
  // Domain hooks - business logic
  const {
    entries,
    currentEntry,
    isLoading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    setCurrentEntry,
    getEntryById,
  } = useEntry(props);

  const { content, handleContentChange } = useEntryEditor(currentEntry);

  // Calendar handler
  const handleCalendarChange = (date: Date | null) => {
    if (date) {
      // Find or create entry for selected date
      const existingEntry = entries.find((entry) => {
        const entryDate = new Date(entry.date_created);
        return (
          entryDate.getDate() === date.getDate() &&
          entryDate.getMonth() === date.getMonth() &&
          entryDate.getFullYear() === date.getFullYear()
        );
      });

      if (existingEntry) {
        setCurrentEntry(existingEntry);
      } else {
        // Create new entry for selected date
        createEntry("Untitled Entry", "", date);
      }
    }
  };

  // Entry list handler
  const handleEntrySelect = (entryId: number) => {
    const entry = getEntryById(entryId);
    if (entry) {
      setCurrentEntry(entry);
    }
  };

  // Delete entry handler - handles navigation if current entry is deleted
  const handleDeleteEntry = async (entryId: number) => {
    const isCurrentEntry = currentEntry?.id === entryId;
    
    try {
      await deleteEntry(entryId);
      
      // If we deleted the current entry, navigate to home page
      if (isCurrentEntry) {
        const mainAppUrl = getMainAppUrl();
        // Use absolute URL to bypass basePath in multi-zone setup
        router.push(`${mainAppUrl}/apps/astralpoet`);
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
      throw error; // Re-throw so EntryList can show error
    }
  };

  // Get the current entry's date for the calendar
  const currentEntryDate = currentEntry
    ? new Date(currentEntry.date_created)
    : null;

  // Prepare props for layout component
  return (
    <EntryLayout
      currentEntry={currentEntry}
      isLoading={isLoading}
      error={error}
      content={content}
      onContentChange={handleContentChange}
      calendarProps={{
        value: currentEntryDate,
        onChange: handleCalendarChange,
      }}
      entryListProps={{
        onEntrySelect: handleEntrySelect,
        onDeleteEntry: handleDeleteEntry,
      }}
    />
  );
}

