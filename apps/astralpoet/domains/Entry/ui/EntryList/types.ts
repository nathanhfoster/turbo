import type { Entry } from '../../model/types'

export interface EntryListProps {
	currentEntry?: Entry | null
	onEntrySelect?: (entryId: number) => void
	onDeleteEntry?: (entryId: number) => Promise<void>
}
