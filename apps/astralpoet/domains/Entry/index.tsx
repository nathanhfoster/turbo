"use client";

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

