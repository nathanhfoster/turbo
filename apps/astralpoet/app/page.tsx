'use client'

import { Box } from '@nathanhfoster/ui'
import { EntryContextProvider } from '@/domains/Entry/model/entryContext'
import { EntrySelector } from '@/domains/Entry/ui/EntrySelector'
import { useEntry } from '@/domains/Entry/hooks/useEntry'
import { useRouter } from 'next/navigation'
import { getEntryViewUrl } from '@/domains/Entry/hooks/utils/navigation'
import type { Entry } from '@/domains/Entry/model/types'

function EntrySelectorPage() {
	const router = useRouter()
	const {
		entries,
		currentEntry,
		createEntry,
		setCurrentEntry,
		deleteEntry,
		exportEntries,
		importEntries,
	} = useEntry()

	const handleCalendarChange = (date: Date | null) => {
		if (date) {
			// Find or create entry for selected date
			const existingEntry = entries.find((entry) => {
				const entryDate = new Date(entry.date_created)
				return (
					entryDate.getDate() === date.getDate() &&
					entryDate.getMonth() === date.getMonth() &&
					entryDate.getFullYear() === date.getFullYear()
				)
			})

			if (existingEntry) {
				// Navigate to view page
				router.push(getEntryViewUrl(existingEntry.id))
			} else {
				// Create new entry for selected date and navigate to view
				createEntry('Untitled Entry', '', date).then((newEntry) => {
					router.push(getEntryViewUrl(newEntry.id))
				})
			}
		}
	}

	const handleEntrySelect = (entry: Entry | null) => {
		if (entry) {
			router.push(getEntryViewUrl(entry.id))
		}
	}

	const handleImport = async (data: string, format: 'json' | 'csv') => {
		await importEntries(data, format)
	}

	return (
		<Box
			variant='main'
			className='flex flex-1 flex-col py-4 px-4 md:py-8 md:px-8 w-full max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out_0.1s_both]'
		>
			<EntrySelector
				entries={entries}
				currentEntry={currentEntry}
				onEntrySelect={handleEntrySelect}
				onDeleteEntry={deleteEntry}
				onCalendarChange={handleCalendarChange}
				onExport={exportEntries}
				onImport={handleImport}
			/>
		</Box>
	)
}

export default function Home() {
	return (
		<EntryContextProvider>
			<EntrySelectorPage />
		</EntryContextProvider>
	)
}
