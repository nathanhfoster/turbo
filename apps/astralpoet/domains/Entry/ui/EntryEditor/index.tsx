'use client'

import { FC } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Box, Input, FormControl } from '@nathanhfoster/ui'
import { useEntry, useEntryEditor } from '../../hooks'
import { getValidDate } from '@nathanhfoster/utils'
import Ellipsis from './components/Ellipsis'
import type { EntryEditorProps } from './types'

const WysiwygEditor = dynamic(
	() =>
		import('@nathanhfoster/ui').then((mod) => ({ default: mod.WysiwygEditor })),
	{ ssr: false },
)

export function EntryEditor({ entryId }: EntryEditorProps) {
	const router = useRouter()
	const { currentEntry, setEntryValue, updateEntry } = useEntry({ entryId })
	const { handleContentChange, handleTitleChange } =
		useEntryEditor(currentEntry)

	if (!currentEntry) {
		router.push('/')
		return null
	}

	const handleDateChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newDate = event.target.value
		setEntryValue(currentEntry.id, 'date_created', newDate)
		// Also persist to IndexedDB
		await updateEntry({
			...currentEntry,
			date_created: newDate,
		})
	}

	return (
		<Box className='flex flex-col gap-4 p-4'>
			<FormControl>
				<Box className='flex items-center gap-2'>
					<Input
						type='date'
						name='date_created'
						value={getValidDate(currentEntry.date_created)}
						onChange={handleDateChange}
						className='flex-1'
					/>
					<Ellipsis entryId={currentEntry.id} />
				</Box>
			</FormControl>

			<FormControl>
				<Input
					name='title'
					placeholder='My first diary entry'
					value={currentEntry.title}
					onChange={(e) => handleTitleChange(e.target.value)}
					className='w-full'
				/>
			</FormControl>

			<Box className='flex-1 min-h-0'>
				<WysiwygEditor
					className='h-full min-h-[600px]'
					onChange={handleContentChange}
					value={currentEntry.html}
					placeholder='Start writing your entry...'
					editable={true}
					showBubbleMenu={true}
				/>
			</Box>
		</Box>
	)
}
