import type { Entry } from '../../model/types'

export interface EntrySelectorProps {
	entries: Entry[]
	currentEntry: Entry | null
	onEntrySelect: (entry: Entry | null) => void
	onDeleteEntry: (id: number) => Promise<void>
	onCalendarChange?: (date: Date | null) => void
	onExport?: (format: 'json' | 'csv') => string
	onImport?: (data: string, format: 'json' | 'csv') => Promise<void>
	className?: string
}
