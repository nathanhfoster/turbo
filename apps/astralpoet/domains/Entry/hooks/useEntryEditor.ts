'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { useDebouncedCallback } from '@nathanhfoster/react-hooks'
import { useEntryDispatch } from '../model/entryContext'
import { entryActions } from '../model/entrySlice'
import type { Entry } from '../model/types'
import { initializeEntryDatabase } from '../model/repository'

/**
 * Hook for inline editing of entry content with auto-save
 * Following FSD pattern - domain-level business logic
 */
export function useEntryEditor(entry: Entry | null) {
	const dispatch = useEntryDispatch()
	const [content, setContent] = useState(entry?.html || '')
	const [title, setTitle] = useState(entry?.title || '')
	const [isDirty, setIsDirty] = useState(false)
	const [isAutoSaving, setIsAutoSaving] = useState(false)
	const lastEntryIdRef = useRef<number | null>(entry?.id || null)
	const lastContentRef = useRef<string>(entry?.html || '')

	// Update content when entry changes
	useEffect(() => {
		if (entry) {
			// Only update if entry ID changed (new entry selected)
			// Don't update if it's the same entry (prevents cursor jumping on auto-save)
			if (entry.id !== lastEntryIdRef.current) {
				setContent(entry.html || '')
				setTitle(entry.title || '')
				setIsDirty(false)
				lastEntryIdRef.current = entry.id
				lastContentRef.current = entry.html || ''
			}
			// Don't sync content from entry if we're dirty (user is typing)
			// This prevents cursor jumping when auto-save updates the entry
		} else {
			setContent('')
			setTitle('')
			setIsDirty(false)
			lastEntryIdRef.current = null
			lastContentRef.current = ''
		}
		// Only depend on entry ID to prevent unnecessary updates
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [entry?.id])

	// Memoize content to prevent unnecessary re-renders when value hasn't changed
	const memoizedContent = useMemo(() => content, [content])

	// Auto-save to IndexedDB with debounce (1 second after user stops typing)
	// NOTE: We do NOT dispatch UpdateEntry during auto-save to prevent cursor jumping
	// The state will be updated when the user selects a different entry or manually saves
	const autoSaveToIndexedDB = useDebouncedCallback(
		async (newContent: string, newTitle: string, currentEntry: Entry) => {
			if (!currentEntry) return

			try {
				setIsAutoSaving(true)
				const repository = await initializeEntryDatabase()

				const now = new Date().toISOString()

				const updatedEntry: Entry = {
					...currentEntry,
					html: newContent,
					title: newTitle,
					date_updated: now,
					size: newContent.length,
				}

				// Save to IndexedDB but don't update Redux state
				// This prevents re-renders that cause cursor jumping
				await repository.save(updatedEntry)
				lastContentRef.current = newContent
				setIsDirty(false)
			} catch (error) {
				console.error('Auto-save failed:', error)
			} finally {
				setIsAutoSaving(false)
			}
		},
		[],
		1000, // Wait 1 second after user stops typing
		{ leading: false, trailing: true }, // Only save after pause
	)

	// Handle content changes with auto-save
	const handleContentChange = useCallback(
		(newContent: string) => {
			setContent(newContent)
			setIsDirty(true)

			// Auto-save to IndexedDB
			if (entry) {
				autoSaveToIndexedDB(newContent, title, entry)
			}
		},
		[entry, title, autoSaveToIndexedDB],
	)

	// Handle title changes with auto-save
	const handleTitleChange = useCallback(
		(newTitle: string) => {
			setTitle(newTitle)
			setIsDirty(true)

			// Auto-save to IndexedDB
			if (entry) {
				autoSaveToIndexedDB(content, newTitle, entry)
			}
		},
		[entry, content, autoSaveToIndexedDB],
	)

	// Manual save (for explicit save button if needed)
	const saveChanges = useCallback(
		async (onSave?: (updatedEntry: Entry) => void) => {
			if (!entry) return

			const repository = await initializeEntryDatabase()
			const now = new Date().toISOString()

			const updatedEntry: Entry = {
				...entry,
				html: content,
				title,
				date_updated: now,
				size: content.length,
			}

			await repository.save(updatedEntry)
			dispatch(entryActions.UpdateEntry(updatedEntry))
			setIsDirty(false)
			onSave?.(updatedEntry)
		},
		[entry, content, title, dispatch],
	)

	// Reset to original content
	const resetChanges = useCallback(() => {
		if (entry) {
			setContent(entry.html || '')
			setTitle(entry.title || '')
			setIsDirty(false)
		}
	}, [entry])

	return {
		content: memoizedContent,
		title,
		isDirty,
		isAutoSaving,
		handleContentChange,
		handleTitleChange,
		saveChanges,
		resetChanges,
	}
}
