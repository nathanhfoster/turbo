"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Chip, List, IconButton, IconTrash } from "@nathanhfoster/ui";
import { useEntry } from "../../hooks";
import { getEntryViewUrl } from "../../hooks/utils/navigation";
import type { EntryListProps } from "./types";
import type { Entry } from "../../model/types";

export function EntryList({ currentEntry, onEntrySelect, onDeleteEntry }: EntryListProps) {
  const router = useRouter();
  const { entries } = useEntry();

  // Find the index of the current entry
  const selectedIndex = useMemo(() => {
    if (!currentEntry) return undefined;
    return entries.findIndex((entry) => entry.id === currentEntry.id);
  }, [currentEntry, entries]);

  const handleEntryClick = (entryId: number) => {
    if (onEntrySelect) {
      onEntrySelect(entryId);
    } else {
      router.push(getEntryViewUrl(entryId));
    }
  };

  // Calculate dynamic row height based on content
  const getRowHeight = useMemo(() => {
    return ({ index }: { index: number }) => {
      const entry = entries[index];
      if (!entry) return 80;

      const tags = entry.tags
        ? entry.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
        : [];
      const people = entry.people
        ? entry.people.split(",").map((p) => p.trim()).filter((p) => p.length > 0)
        : [];

      // Base height: title + date + padding
      let height = 60;
      // Add height for chips if present
      if (tags.length > 0 || people.length > 0) {
        height += 32; // Chip row height
      }
      return height;
    };
  }, [entries]);

  const handleDelete = async (e: React.MouseEvent, entryId: number) => {
    e.stopPropagation(); // Prevent row click
    if (onDeleteEntry && confirm("Are you sure you want to delete this entry?")) {
      try {
        await onDeleteEntry(entryId);
      } catch (error) {
        console.error("Failed to delete entry:", error);
        alert("Failed to delete entry. Please try again.");
      }
    }
  };

  const renderItem = (entry: Entry) => {
    const tags = entry.tags
      ? entry.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
      : [];

    const people = entry.people
      ? entry.people.split(",").map((p) => p.trim()).filter((p) => p.length > 0)
      : [];

    return (
      <Box className="w-full border-b border-gray-200 dark:border-gray-700 flex items-start justify-between gap-2 group">
        <Box className="flex-1 min-w-0">
          <Typography variant="p" className="font-medium">
            {entry.title || "Untitled Entry"}
          </Typography>
          <Typography
            variant="p"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {new Date(entry.date_created).toLocaleDateString()}
          </Typography>
          {(tags.length > 0 || people.length > 0) && (
            <Box className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={`entry-list-tag-${entry.id}-${index}`}
                  label={tag}
                  variant="primary"
                  size="sm"
                />
              ))}
              {tags.length > 3 && (
                <Typography
                  variant="caption"
                  className="text-gray-500 dark:text-gray-400 self-center"
                >
                  +{tags.length - 3} more tags
                </Typography>
              )}
              {people.slice(0, 3).map((person, index) => (
                <Chip
                  key={`entry-list-people-${entry.id}-${index}`}
                  label={person}
                  variant="secondary"
                  size="sm"
                />
              ))}
              {people.length > 3 && (
                <Typography
                  variant="caption"
                  className="text-gray-500 dark:text-gray-400 self-center"
                >
                  +{people.length - 3} more people
                </Typography>
              )}
            </Box>
          )}
        </Box>
        {onDeleteEntry && (
          <IconButton
            icon={<IconTrash />}
            variant="ghost"
            color="warning"
            size="sm"
            onClick={(e) => handleDelete(e, entry.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            aria-label="Delete entry"
          />
        )}
      </Box>
    );
  };

  return (
    <Box className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <List<Entry>
        data={entries}
        renderItem={renderItem}
        rowHeight={getRowHeight}
        onRowClick={({ rowData }) => handleEntryClick(rowData.id)}
        emptyMessage="No entries yet. Create your first entry!"
        className="h-full"
        selectedIndex={selectedIndex !== -1 ? selectedIndex : undefined}
        scrollToIndex={selectedIndex !== -1 ? selectedIndex : undefined}
      />
    </Box>
  );
}

export default EntryList;
