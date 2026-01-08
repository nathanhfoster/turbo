import type { Entry } from '../../model/types'

/**
 * Props for EntryLayout component
 * Presentation layer that handles device-specific rendering
 */
export interface EntryLayoutProps {
	// State
	currentEntry: Entry | null
	isLoading: boolean
	error: string | null
	content: string

	// Editor callbacks
	onContentChange: (content: string) => void

	// Calendar props
	calendarProps: {
		value?: Date | null
		onChange?: (date: Date | null) => void
	}

	// Entry list props
	entryListProps: {
		onEntrySelect?: (entryId: number) => void
		onDeleteEntry?: (entryId: number) => Promise<void>
	}
}
