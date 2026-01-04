/**
 * useEntries - Main domain hook for entries management
 * Business logic layer following Container/Presentation pattern
 */

import { useEffect, useCallback } from 'react'
import {
	useEntriesSelector,
	useEntriesDispatch,
} from '../model/contexts'
import {
	selectEntries,
	selectIsLoading,
	selectError,
	selectSortedEntries,
	selectAllTags,
	selectEntriesForMonth,
	selectEntriesByDate,
	selectTotalEntries,
} from '../model/selectors'
import {
	createEntryThunk,
	deleteEntryThunk,
} from '../model/thunks'
import { entriesSlice } from '../model/entriesSlice'
import { Entry, CreateEntryPayload } from '../model/types'

export function useEntries() {
	const state = useEntriesSelector((state) => state)
	const dispatch = useEntriesDispatch()

	// Selectors
	const entries = selectEntries(state)
	const sortedEntries = selectSortedEntries(state)
	const allTags = selectAllTags(state)
	const entriesByDate = selectEntriesByDate(state)
	const totalEntries = selectTotalEntries(state)
	const isLoading = selectIsLoading(state)
	const error = selectError(state)

	// Load entries on mount
	useEffect(() => {
		if (entries.length === 0 && !isLoading) {
			// Inline thunk to avoid import issues
			const loadEntries = async () => {
				try {
					dispatch(entriesSlice.actions.setLoading(true))
					const { EntryRepository } = await import('../model/repository')
					const repository = await EntryRepository.getInstance()
					const loadedEntries = await repository.getAll()
					dispatch(entriesSlice.actions.initializeEntries(loadedEntries))
				} catch (error) {
					console.error('Failed to load entries:', error)
					dispatch(entriesSlice.actions.setError('Failed to load entries'))
				}
			}
			loadEntries()
		}
	}, [entries.length, isLoading, dispatch]) // Only run once on mount

	// Actions
	const createEntry = useCallback(
		async (payload: CreateEntryPayload) => {
			return await dispatch(createEntryThunk(payload))
		},
		[dispatch],
	)

	const deleteEntry = useCallback(
		async (id: number) => {
			await dispatch(deleteEntryThunk(id))
		},
		[dispatch],
	)

	const setSearch = useCallback(
		(search: string) => {
			dispatch(entriesSlice.actions.setSearch(search))
		},
		[dispatch],
	)

	const getEntriesForMonth = useCallback(
		(year: number, month: number): Entry[] => {
			return selectEntriesForMonth(state, year, month)
		},
		[state],
	)

	return {
		// State
		entries,
		sortedEntries,
		entriesByDate,
		totalEntries,
		allTags,
		isLoading,
		error,

		// Actions
		createEntry,
		deleteEntry,
		setSearch,
		getEntriesForMonth,
	}
}
