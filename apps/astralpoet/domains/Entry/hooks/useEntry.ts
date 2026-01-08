'use client'

import { useEffect, useCallback } from 'react'
import { useEntrySelector, useEntryDispatch } from '../model/entryContext'
import { entryActions } from '../model/entrySlice'
import {
	selectEntries,
	selectCurrentEntry,
	selectIsLoading,
	selectError,
	selectEntryById,
} from '../model/selectors'
import { initializeEntryDatabase } from '../model/repository'
import type { Entry, EntryProps } from '../model/types'
import {
	exportEntriesToJson,
	exportEntriesToCsv,
	importEntriesFromJson,
	importEntriesFromCsv,
} from '../utils/importExport'

/**
 * Main Entry domain hook
 * Following FSD pattern - domain-level business logic
 */
export function useEntry(props?: EntryProps) {
	const dispatch = useEntryDispatch()
	const entries = useEntrySelector(selectEntries)
	const currentEntry = useEntrySelector(selectCurrentEntry)
	const isLoading = useEntrySelector(selectIsLoading)
	const error = useEntrySelector(selectError)

	// Load entries from IndexedDB on mount
	useEffect(() => {
		const loadEntries = async () => {
			try {
				dispatch(entryActions.SetLoading(true))
				const repository = await initializeEntryDatabase()
				const allEntries = await repository.getAll()

				// Set all entries first, then set current entry in callback to ensure entry is in array
				if (props?.entryId) {
					// First try to find it in the loaded entries (check both number and string comparison)
					let entry = allEntries.find((e) => {
						const entryId = typeof e.id === 'string' ? Number(e.id) : e.id
						const searchId =
							typeof props.entryId === 'string'
								? Number(props.entryId)
								: props.entryId
						return entryId === searchId
					})

					if (entry) {
						// Entry found in loaded entries
						// Use callback to ensure entry is in state before setting as current
						dispatch(entryActions.SetEntries(allEntries), (state) => {
							const entryInState = state.entries.find((e) => {
								const entryId = typeof e.id === 'string' ? Number(e.id) : e.id
								const searchId =
									typeof props.entryId === 'string'
										? Number(props.entryId)
										: props.entryId
								return entryId === searchId
							})
							if (entryInState) {
								dispatch(entryActions.SetCurrentEntry(entryInState))
							}
						})
					} else {
						// Not found, try fetching it from IndexedDB with different ID formats
						dispatch(entryActions.SetEntries(allEntries))

						// Try both number and string formats
						const entryIdAsNumber =
							typeof props.entryId === 'string'
								? Number(props.entryId)
								: props.entryId
						const entryIdAsString = String(props.entryId)

						let fetchedEntry: Entry | undefined

						// Try number first
						try {
							fetchedEntry = await repository.getById(entryIdAsNumber)
						} catch (error) {
							// Ignore error, try string format
						}

						// If not found, try string
						if (!fetchedEntry) {
							try {
								fetchedEntry = await repository.getById(entryIdAsString)
							} catch (error) {
								// Ignore error
							}
						}

						if (fetchedEntry) {
							// Use AddEntryAndSetCurrent to add it and set as current atomically
							dispatch(entryActions.AddEntryAndSetCurrent(fetchedEntry))
						} else {
							// Entry not found - set error state so component can handle redirect
							dispatch(
								entryActions.SetError(
									`Entry with ID ${props.entryId} not found`,
								),
							)
						}
					}
				} else {
					// No entryId, just set entries
					dispatch(entryActions.SetEntries(allEntries))
				}
			} catch (err) {
				dispatch(
					entryActions.SetError(
						err instanceof Error ? err.message : 'Failed to load entries',
					),
				)
			} finally {
				dispatch(entryActions.SetLoading(false))
			}
		}

		loadEntries()
	}, [dispatch, props?.entryId])

	// Set current entry when entryId changes or when entry appears in entries array
	// This handles navigation between entries and ensures entry is set when it's added to array
	useEffect(() => {
		if (props?.entryId) {
			// Check if we need to update the current entry
			const needsUpdate = !currentEntry || currentEntry.id !== props.entryId

			if (needsUpdate) {
				// Try to find it in the entries array
				const entry = entries.find((e) => e.id === props.entryId)

				if (entry) {
					// Entry found in array, set it as current
					// Only dispatch if it's actually different to avoid unnecessary updates
					if (!currentEntry || currentEntry.id !== entry.id) {
						dispatch(entryActions.SetCurrentEntry(entry))
					}
				} else if (entries.length > 0) {
					// Entry not found but entries are loaded - might need to fetch it
					// Only fetch if we haven't already tried (avoid infinite loops)
					const fetchEntry = async () => {
						try {
							const repository = await initializeEntryDatabase()
							if (!props.entryId) return
							const entryIdAsNumber =
								typeof props.entryId === 'string'
									? Number(props.entryId)
									: props.entryId
							const fetchedEntry = await repository.getById(entryIdAsNumber)
							if (fetchedEntry) {
								// Add entry to array and set as current in a single action
								dispatch(entryActions.AddEntryAndSetCurrent(fetchedEntry))
							} else {
								// Entry not found - set error state
								dispatch(
									entryActions.SetError(
										`Entry with ID ${props.entryId} not found`,
									),
								)
							}
						} catch (err) {
							dispatch(
								entryActions.SetError(
									err instanceof Error ? err.message : 'Failed to fetch entry',
								),
							)
						}
					}
					fetchEntry()
				}
			}
		}
	}, [dispatch, props?.entryId, entries, currentEntry])

	// Create a new entry
	const createEntry = useCallback(
		async (title: string, html: string, date?: Date) => {
			try {
				dispatch(entryActions.SetLoading(true))
				const repository = await initializeEntryDatabase()

				const now = date ? date.toISOString() : new Date().toISOString()

				// Default HTML content if none provided
				const defaultHtml =
					html ||
					`<p>After I've installed Astral Poet today, I will make a diary entry every day from now on. In case I forget to make an entry, the app will remind me with a notification in the evening. In addition to photos, videos, audio recordings or other files, I can also add a location, tags or people to my diary entries.✍ I can use it on all my devices and synchronize the journal with the sync button on the main page. I am already looking forward to revisiting all those memories in a few months or years. ✨</p>`

				const newEntry: Entry = {
					id: Date.now(), // Temporary ID, will be replaced by autoIncrement
					author: 1, // Default author ID
					title,
					html: defaultHtml,
					tags: '',
					people: '',
					address: '',
					latitude: '',
					longitude: '',
					date_created: now,
					date_updated: now,
					date_created_by_author: now,
					views: 0,
					rating: 0,
					EntryFiles: [],
					is_public: false,
					size: 0,
				}

				const savedId = await repository.save(newEntry)
				// Fetch the saved entry to get the full object with generated ID
				const savedEntry = await repository.getById(savedId)
				if (!savedEntry) {
					throw new Error('Failed to retrieve saved entry')
				}
				dispatch(entryActions.AddEntry(savedEntry))
				dispatch(entryActions.SetCurrentEntry(savedEntry))
				return savedEntry
			} catch (err) {
				dispatch(
					entryActions.SetError(
						err instanceof Error ? err.message : 'Failed to create entry',
					),
				)
				throw err
			} finally {
				dispatch(entryActions.SetLoading(false))
			}
		},
		[dispatch],
	)

	// Update entry
	const updateEntry = useCallback(
		async (entry: Entry) => {
			try {
				dispatch(entryActions.SetSaving(true))
				const repository = await initializeEntryDatabase()

				const updatedEntry: Entry = {
					...entry,
					date_updated: new Date().toISOString(),
				}

				await repository.save(updatedEntry)
				dispatch(entryActions.UpdateEntry(updatedEntry))
				return updatedEntry
			} catch (err) {
				dispatch(
					entryActions.SetError(
						err instanceof Error ? err.message : 'Failed to update entry',
					),
				)
				throw err
			} finally {
				dispatch(entryActions.SetSaving(false))
			}
		},
		[dispatch],
	)

	// Delete entry
	const deleteEntry = useCallback(
		async (entryId: number) => {
			try {
				dispatch(entryActions.SetLoading(true))
				const repository = await initializeEntryDatabase()
				await repository.delete(entryId)
				dispatch(entryActions.DeleteEntry(entryId))
			} catch (err) {
				dispatch(
					entryActions.SetError(
						err instanceof Error ? err.message : 'Failed to delete entry',
					),
				)
				throw err
			} finally {
				dispatch(entryActions.SetLoading(false))
			}
		},
		[dispatch],
	)

	// Set current entry
	const setCurrentEntry = useCallback(
		(entry: Entry | null) => {
			dispatch(entryActions.SetCurrentEntry(entry))
		},
		[dispatch],
	)

	// Get entry by ID (helper function)
	const getEntryById = useCallback(
		(id: number) => {
			return entries.find((e) => e.id === id)
		},
		[entries],
	)

	// Set entry value (for updating individual fields)
	const setEntryValue = useCallback(
		(id: number, key: keyof Entry, value: string | number | boolean) => {
			dispatch(entryActions.SetEntryValue({ id, key, value }))
		},
		[dispatch],
	)

	// Export entries to JSON or CSV
	const exportEntries = useCallback(
		(format: 'json' | 'csv' = 'json') => {
			if (format === 'csv') {
				return exportEntriesToCsv(entries)
			}
			return exportEntriesToJson(entries)
		},
		[entries],
	)

	// Import entries from JSON or CSV
	const importEntries = useCallback(
		async (data: string, format: 'json' | 'csv' = 'json') => {
			try {
				dispatch(entryActions.SetLoading(true))
				const repository = await initializeEntryDatabase()

				const importedEntries =
					format === 'csv'
						? importEntriesFromCsv(data)
						: importEntriesFromJson(data)

				// Save each imported entry to IndexedDB
				for (const entry of importedEntries) {
					// Remove the id to let IndexedDB generate a new one
					const { id, ...entryWithoutId } = entry
					const newId = await repository.save(entryWithoutId as Entry)
					const savedEntry = await repository.getById(newId)
					if (savedEntry) {
						dispatch(entryActions.AddEntry(savedEntry))
					}
				}

				return importedEntries
			} catch (err) {
				dispatch(
					entryActions.SetError(
						err instanceof Error ? err.message : 'Failed to import entries',
					),
				)
				throw err
			} finally {
				dispatch(entryActions.SetLoading(false))
			}
		},
		[dispatch],
	)

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
		exportEntries,
		importEntries,
	}
}
