import type { EntryState } from './types'

/**
 * Memoized selectors for Entry domain
 * Following FSD pattern - domain-level selectors
 */

export const selectEntries = (state: EntryState): EntryState['entries'] =>
	state.entries

export const selectCurrentEntry = (
	state: EntryState,
): EntryState['currentEntry'] => state.currentEntry

export const selectIsLoading = (state: EntryState): EntryState['isLoading'] =>
	state.isLoading

export const selectError = (state: EntryState): EntryState['error'] =>
	state.error

export const selectIsEditing = (state: EntryState): EntryState['isEditing'] =>
	state.isEditing

export const selectIsSaving = (state: EntryState): EntryState['isSaving'] =>
	state.isSaving

export const selectEntryById = (state: EntryState, id: number) =>
	state.entries.find((e) => e.id === id)
