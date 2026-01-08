'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography } from '@nathanhfoster/ui'
import { useEntry } from '@/domains/Entry'

export interface EntryListProps {}

export function EntryList({}: EntryListProps) {
	const router = useRouter()
	const { entries } = useEntry()

	return (
		<Box className='w-full h-full overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg'>
			<ul className='w-full'>
				{entries.map((entry) => (
					<li
						key={entry.id}
						className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-700 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
						onClick={() => {
							router.push(`/entry/${entry.id}`)
						}}
					>
						<Typography variant='p' className='font-medium'>
							{entry.title}
						</Typography>
						<Typography
							variant='p'
							className='text-sm text-gray-500 dark:text-gray-400'
						>
							{new Date(entry.date_created).toLocaleDateString()}
						</Typography>
					</li>
				))}
			</ul>
		</Box>
	)
}

export default EntryList
