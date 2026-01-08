'use client'

import { FC } from 'react'
import {
	Box,
	Typography,
	Chip,
	Badge,
	IconMapPin,
	IconUsers,
} from '@nathanhfoster/ui'
import type { Entry } from '../../model/types'

export interface EntryMetadataProps {
	entry: Entry
	onTagRemove?: (tag: string) => void
	onPeopleRemove?: (person: string) => void
}

/**
 * EntryMetadata - Displays entry metadata (tags, people, location, stats)
 * Following FSD pattern - UI component
 */
export const EntryMetadata: FC<EntryMetadataProps> = ({
	entry,
	onTagRemove,
	onPeopleRemove,
}) => {
	// Parse tags and people from comma-separated strings
	const tags = entry.tags
		? entry.tags
				.split(',')
				.map((t) => t.trim())
				.filter((t) => t.length > 0)
		: []

	const people = entry.people
		? entry.people
				.split(',')
				.map((p) => p.trim())
				.filter((p) => p.length > 0)
		: []

	const hasLocation = entry.address || (entry.latitude && entry.longitude)

	// Open location in maps
	const handleLocationClick = () => {
		if (entry.latitude && entry.longitude) {
			const url = `https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`
			window.open(url, '_blank', 'noopener,noreferrer')
		} else if (entry.address) {
			const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entry.address)}`
			window.open(url, '_blank', 'noopener,noreferrer')
		}
	}

	// Format coordinates for display
	const formatCoordinates = () => {
		if (entry.latitude && entry.longitude) {
			const lat = parseFloat(entry.latitude)
			const lng = parseFloat(entry.longitude)
			if (!isNaN(lat) && !isNaN(lng)) {
				return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
			}
		}
		return null
	}

	const coordinates = formatCoordinates()

	// Don't render if there's no metadata to show
	if (
		tags.length === 0 &&
		people.length === 0 &&
		!hasLocation &&
		entry.views === 0 &&
		entry.rating === 0
	) {
		return null
	}

	return (
		<Box className='flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700'>
			{/* Tags Section */}
			{tags.length > 0 && (
				<Box className='flex flex-col gap-2'>
					<Typography
						variant='label'
						className='text-gray-600 dark:text-gray-400'
					>
						Tags
					</Typography>
					<Box className='flex flex-wrap gap-2'>
						{tags.map((tag, index) => (
							<Chip
								key={`tag-${index}`}
								label={tag}
								variant='primary'
								size='sm'
								onRemove={onTagRemove ? () => onTagRemove(tag) : undefined}
							/>
						))}
					</Box>
				</Box>
			)}

			{/* People Section */}
			{people.length > 0 && (
				<Box className='flex flex-col gap-2'>
					<Box className='flex items-center gap-2'>
						<IconUsers className='w-4 h-4 text-gray-600 dark:text-gray-400' />
						<Typography
							variant='label'
							className='text-gray-600 dark:text-gray-400'
						>
							People
						</Typography>
					</Box>
					<Box className='flex flex-wrap gap-2'>
						{people.map((person, index) => (
							<Chip
								key={`person-${index}`}
								label={person}
								variant='secondary'
								size='sm'
								onRemove={
									onPeopleRemove ? () => onPeopleRemove(person) : undefined
								}
							/>
						))}
					</Box>
				</Box>
			)}

			{/* Location Section */}
			{hasLocation && (
				<Box className='flex flex-col gap-2'>
					<Box className='flex items-center gap-2'>
						<IconMapPin className='w-4 h-4 text-gray-600 dark:text-gray-400' />
						<Typography
							variant='label'
							className='text-gray-600 dark:text-gray-400'
						>
							Location
						</Typography>
					</Box>
					<Box
						className='flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity'
						onClick={handleLocationClick}
						role='button'
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								handleLocationClick()
							}
						}}
						aria-label='Open location in maps'
					>
						{entry.address && (
							<Typography
								variant='p'
								className='text-gray-900 dark:text-gray-100 font-medium'
							>
								{entry.address}
							</Typography>
						)}
						{coordinates && (
							<Typography
								variant='caption'
								className='text-gray-600 dark:text-gray-400 font-mono text-xs'
							>
								{coordinates}
							</Typography>
						)}
						{!entry.address && coordinates && (
							<Typography
								variant='p'
								className='text-gray-900 dark:text-gray-100 font-medium'
							>
								{coordinates}
							</Typography>
						)}
					</Box>
				</Box>
			)}

			{/* Stats Section */}
			{(entry.views > 0 || entry.rating > 0) && (
				<Box className='flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700'>
					{entry.views > 0 && (
						<Box className='flex items-center gap-2'>
							<Typography
								variant='caption'
								className='text-gray-600 dark:text-gray-400'
							>
								Views:
							</Typography>
							<Badge count={entry.views} variant='default' size='sm' />
						</Box>
					)}
					{entry.rating > 0 && (
						<Box className='flex items-center gap-2'>
							<Typography
								variant='caption'
								className='text-gray-600 dark:text-gray-400'
							>
								Rating:
							</Typography>
							<Box className='flex items-center gap-1'>
								{Array.from({ length: 5 }).map((_, i) => (
									<span
										key={i}
										className={`text-lg ${
											i < entry.rating
												? 'text-yellow-400'
												: 'text-gray-300 dark:text-gray-600'
										}`}
									>
										★
									</span>
								))}
							</Box>
						</Box>
					)}
				</Box>
			)}
		</Box>
	)
}
