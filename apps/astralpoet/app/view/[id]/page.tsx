'use client'

import { use } from 'react'
import { EntryContextProvider } from '@/domains/Entry/model/entryContext'
import { EntryJournal } from '@/domains/Entry'

interface EntryViewPageProps {
	params: Promise<{
		id: string
	}>
}

export default function EntryViewPage({ params }: EntryViewPageProps) {
	const { id } = use(params)
	// Parse entryId - handle both number strings and ensure it's a valid number
	const entryId = id ? Number(id) : undefined

	// Only render if we have a valid entryId
	if (!entryId || isNaN(entryId)) {
		return (
			<EntryContextProvider>
				<div>Invalid entry ID</div>
			</EntryContextProvider>
		)
	}

	return (
		<EntryContextProvider>
			<EntryJournal entryId={entryId} />
		</EntryContextProvider>
	)
}
