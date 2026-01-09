import { createSlice, type Draft } from '@nathanhfoster/resurrection'
import type { EntryState, Entry } from './types'

const initialState: EntryState = {
	entries: [],
	currentEntry: null,
	isLoading: false,
	error: null,
	isEditing: false,
	isSaving: false,
}

// Action reducers
const SetEntries = (state: Draft<EntryState>, entries: Entry[]) => {
	state.entries = entries
	// Automatically set loading to false when entries are set (prevents flickering)
	if (state.isLoading) {
		state.isLoading = false
	}
}

const SetCurrentEntry = (state: Draft<EntryState>, entry: Entry | null) => {
	state.currentEntry = entry
}

const AddEntry = (state: Draft<EntryState>, entry: Entry) => {
	// Check if entry already exists to avoid duplicates
	const existingIndex = state.entries.findIndex((e) => e.id === entry.id)
	if (existingIndex === -1) {
		state.entries.push(entry)
	} else {
		// Update existing entry instead of adding duplicate
		state.entries[existingIndex] = entry
	}
}

const AddEntryAndSetCurrent = (state: Draft<EntryState>, entry: Entry) => {
	// Add entry to array (reuse AddEntry logic)
	const existingIndex = state.entries.findIndex((e) => e.id === entry.id)
	if (existingIndex === -1) {
		state.entries.push(entry)
	} else {
		state.entries[existingIndex] = entry
	}
	// Also set it as current entry in the same update
	state.currentEntry = entry
}

const UpdateEntry = (state: Draft<EntryState>, entry: Entry) => {
	const index = state.entries.findIndex((e) => e.id === entry.id)
	if (index !== -1) {
		state.entries[index] = entry
	}
	if (state.currentEntry?.id === entry.id) {
		state.currentEntry = entry
	}
}

const DeleteEntry = (state: Draft<EntryState>, entryId: number) => {
	state.entries = state.entries.filter((e) => e.id !== entryId)
	if (state.currentEntry?.id === entryId) {
		state.currentEntry = null
	}
}

const SetLoading = (state: Draft<EntryState>, isLoading: boolean) => {
	state.isLoading = isLoading
}

const SetError = (state: Draft<EntryState>, error: string | null) => {
	state.error = error
}

const SetEditing = (state: Draft<EntryState>, isEditing: boolean) => {
	state.isEditing = isEditing
}

const SetSaving = (state: Draft<EntryState>, isSaving: boolean) => {
	state.isSaving = isSaving
}

const SetEntryValue = (
	state: Draft<EntryState>,
	payload: { id: number; key: keyof Entry; value: string | number | boolean },
) => {
	const entry = state.entries.find((e) => e.id === payload.id)
	if (entry) {
		;(entry[payload.key] as string | number | boolean) = payload.value
		entry.date_updated = new Date().toISOString()
	}
	if (state.currentEntry?.id === payload.id) {
		;(state.currentEntry[payload.key] as string | number | boolean) =
			payload.value
		state.currentEntry.date_updated = new Date().toISOString()
	}
}

export const entrySlice = createSlice({
	name: 'Entry',
	initialState,
	actions: {
		SetEntries,
		SetCurrentEntry,
		AddEntry,
		AddEntryAndSetCurrent,
		UpdateEntry,
		DeleteEntry,
		SetLoading,
		SetError,
		SetEditing,
		SetSaving,
		SetEntryValue,
	},
})

// Export actions directly from slice for easier access
export const entryActions = entrySlice.actions
