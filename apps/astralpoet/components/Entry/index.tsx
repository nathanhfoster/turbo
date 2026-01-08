'use client'

import { FC } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Box, Input, FormControl } from '@nathanhfoster/ui'
import { useEntry, useEntryEditor } from '@/domains/Entry'
import { getValidDate } from '@nathanhfoster/utils'
import Ellipsis from './components/Ellipsis'
import type { EntryProps } from './types'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export function Entry({ entryId }: EntryProps) {
	const router = useRouter()
	const { currentEntry, setEntryValue } = useEntry({ entryId })
	const { handleContentChange, handleTitleChange } =
		useEntryEditor(currentEntry)

	if (!currentEntry) {
		router.push('/')
		return null
	}

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEntryValue(currentEntry.id, 'date_created', event.target.value)
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
				<Editor
					className='h-full min-h-[600px]'
					onChange={handleContentChange}
					value={currentEntry.html}
				/>
			</Box>
		</Box>
	)
}
