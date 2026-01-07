"use client";

import { useEffect, useCallback } from "react";
import {
  useEntrySelector,
  useEntryDispatch,
} from "../model/entryContext";
import { entryActions } from "../model/entrySlice";
import {
  selectEntries,
  selectCurrentEntry,
  selectIsLoading,
  selectError,
  selectEntryById,
} from "../model/selectors";
import { initializeEntryDatabase } from "../model/repository";
import type { Entry, EntryProps } from "../model/types";

/**
 * Main Entry domain hook
 * Following FSD pattern - domain-level business logic
 */
export function useEntry(props?: EntryProps) {
  const dispatch = useEntryDispatch();
  const entries = useEntrySelector(selectEntries);
  const currentEntry = useEntrySelector(selectCurrentEntry);
  const isLoading = useEntrySelector(selectIsLoading);
  const error = useEntrySelector(selectError);

  // Load entries from IndexedDB on mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        dispatch(entryActions.SetLoading(true));
        const repository = await initializeEntryDatabase();
        const allEntries = await repository.getAll();
        dispatch(entryActions.SetEntries(allEntries));

        // If entryId is provided, set it as current
        if (props?.entryId) {
          // First try to find it in the list
          let entry = allEntries.find((e) => e.id === props.entryId);
          
          // If not found in the list, fetch it directly from IndexedDB
          if (!entry) {
            entry = await repository.getById(props.entryId);
            // If found, add it to the list
            if (entry) {
              dispatch(entryActions.AddEntry(entry));
            }
          }
          
          if (entry) {
            dispatch(entryActions.SetCurrentEntry(entry));
          }
        }
      } catch (err) {
        dispatch(
          entryActions.SetError(
            err instanceof Error ? err.message : "Failed to load entries",
          ),
        );
      } finally {
        dispatch(entryActions.SetLoading(false));
      }
    };

    loadEntries();
  }, [dispatch, props?.entryId]);

  // Create a new entry
  const createEntry = useCallback(
    async (title: string, html: string, date?: Date) => {
      try {
        dispatch(entryActions.SetLoading(true));
        const repository = await initializeEntryDatabase();

        const now = date ? date.toISOString() : new Date().toISOString();
        const newEntry: Entry = {
          id: Date.now(), // Temporary ID, will be replaced by autoIncrement
          author: 1, // Default author ID
          title,
          html,
          tags: "",
          people: "",
          address: "",
          latitude: "",
          longitude: "",
          date_created: now,
          date_updated: now,
          date_created_by_author: now,
          views: 0,
          rating: 0,
          EntryFiles: [],
          is_public: false,
          size: 0,
        };

        const savedId = await repository.save(newEntry);
        // Fetch the saved entry to get the full object with generated ID
        const savedEntry = await repository.getById(savedId);
        if (!savedEntry) {
          throw new Error("Failed to retrieve saved entry");
        }
        dispatch(entryActions.AddEntry(savedEntry));
        dispatch(entryActions.SetCurrentEntry(savedEntry));
        return savedEntry;
      } catch (err) {
        dispatch(
          entryActions.SetError(
            err instanceof Error ? err.message : "Failed to create entry",
          ),
        );
        throw err;
      } finally {
        dispatch(entryActions.SetLoading(false));
      }
    },
    [dispatch],
  );

  // Update entry
  const updateEntry = useCallback(
    async (entry: Entry) => {
      try {
        dispatch(entryActions.SetSaving(true));
        const repository = await initializeEntryDatabase();

        const updatedEntry: Entry = {
          ...entry,
          date_updated: new Date().toISOString(),
        };

        await repository.save(updatedEntry);
        dispatch(entryActions.UpdateEntry(updatedEntry));
        return updatedEntry;
      } catch (err) {
        dispatch(
          entryActions.SetError(
            err instanceof Error ? err.message : "Failed to update entry",
          ),
        );
        throw err;
      } finally {
        dispatch(entryActions.SetSaving(false));
      }
    },
    [dispatch],
  );

  // Delete entry
  const deleteEntry = useCallback(
    async (entryId: number) => {
      try {
        dispatch(entryActions.SetLoading(true));
        const repository = await initializeEntryDatabase();
        await repository.delete(entryId);
        dispatch(entryActions.DeleteEntry(entryId));
      } catch (err) {
        dispatch(
          entryActions.SetError(
            err instanceof Error ? err.message : "Failed to delete entry",
          ),
        );
        throw err;
      } finally {
        dispatch(entryActions.SetLoading(false));
      }
    },
    [dispatch],
  );

  // Set current entry
  const setCurrentEntry = useCallback(
    (entry: Entry | null) => {
      dispatch(entryActions.SetCurrentEntry(entry));
    },
    [dispatch],
  );

  // Get entry by ID (helper function)
  const getEntryById = useCallback(
    (id: number) => {
      return entries.find((e) => e.id === id);
    },
    [entries],
  );

  // Set entry value (for updating individual fields)
  const setEntryValue = useCallback(
    (id: number, key: keyof Entry, value: string | number | boolean) => {
      dispatch(entryActions.SetEntryValue({ id, key, value }));
    },
    [dispatch],
  );

  return {
    entries,
    currentEntry,
    isLoading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    setCurrentEntry,
    getEntryById,
    setEntryValue,
  };
}

