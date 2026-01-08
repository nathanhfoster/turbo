'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useDeviceSelector } from '@nathanhfoster/pwa/device'
import {
	Box,
	Typography,
	Drawer,
	IconButton,
	IconMenu,
	IconCalendar,
	WysiwygEditor,
	Input,
	FormControl,
	Chip,
	Skeleton,
} from '@nathanhfoster/ui'
import { useEntry, useEntryEditor } from '../../hooks'
import { getValidDate } from '@nathanhfoster/utils'
import type { EntryLayoutProps } from './types'
import { EntryCalendar } from '../Calendar'
import { EntryList } from '../EntryList'

/**
 * EntryLayout - Presentation component for entry journal
 * Handles device-specific rendering (desktop vs mobile/tablet)
 * Following FSD pattern - UI layer
 */
export function EntryLayout({
	currentEntry,
	isLoading,
	error,
	content,
	onContentChange,
	calendarProps,
	entryListProps,
}: EntryLayoutProps) {
	// Device state
	const isMobile = useDeviceSelector((state) => state.isMobile)
	const isTablet = useDeviceSelector((state) => state.isTablet)
	const isDesktop = useDeviceSelector((state) => state.isDesktop)
	const hasScrolled = useDeviceSelector((state) => state.hasScrolled)
	const shouldUseDrawers = isMobile || isTablet

	// Drawer state for mobile/tablet
	const [isCalendarDrawerOpen, setIsCalendarDrawerOpen] = useState(false)
	const [isEntryListDrawerOpen, setIsEntryListDrawerOpen] = useState(false)

	// Entry hooks for title and date editing
	const { setEntryValue, updateEntry, entries } = useEntry()

	// Only show skeletons during initial load (when entries are empty and loading)
	const showSkeletons = isLoading && entries.length === 0

	const handleTitleChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (!currentEntry) return
		const newTitle = event.target.value
		// Update Redux state immediately
		setEntryValue(currentEntry.id, 'title', newTitle)
		// Update IndexedDB and Redux
		await updateEntry({
			...currentEntry,
			title: newTitle,
		})
	}

	const handleDateChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (!currentEntry) return
		const newDate = event.target.value
		// Update Redux state immediately
		setEntryValue(currentEntry.id, 'date_created', newDate)
		// Update IndexedDB and Redux
		await updateEntry({
			...currentEntry,
			date_created: newDate,
		})
	}

	return (
		<Box
			variant='main'
			className={`flex flex-1 flex-col ${shouldUseDrawers ? 'h-screen' : 'h-full'} py-4 ${shouldUseDrawers ? 'px-2' : 'px-4'} md:py-8 md:px-0 w-full max-w-full overflow-x-hidden ${shouldUseDrawers ? 'overflow-y-auto' : ''}`}
		>
			<Box
				className={`flex flex-1 flex-col w-full max-w-full ${shouldUseDrawers ? 'min-h-0' : ''}`}
			>
				{/* Error Messages */}
				<Box className='px-4 md:px-4 xl:px-6'>
					{error && (
						<Box className='mb-4 p-4 bg-error/10 border border-error rounded-lg'>
							<Typography variant='p' className='text-error'>
								{error}
							</Typography>
						</Box>
					)}
				</Box>

				{/* Header Bar with Title and Drawer Triggers */}
				{currentEntry && (
					<Box
						className={`${shouldUseDrawers ? 'fixed top-16 left-0 right-0 z-50 py-1 pointer-events-none' : 'mb-4'} transition-all duration-300 px-2 ${isDesktop ? 'px-4 xl:px-6' : ''}`}
					>
						<Box className='flex items-center justify-between gap-2 w-full max-w-full'>
							{/* Left: Calendar Button (Mobile/Tablet only) */}
							{shouldUseDrawers && (
								<IconButton
									onClick={() => setIsCalendarDrawerOpen(true)}
									icon={<IconCalendar />}
									aria-label='Calendar'
									variant='ghost'
									color='primary'
									size='sm'
									className={`flex-shrink-0 transition-all duration-300 pointer-events-auto ${hasScrolled ? 'bg-background-elevated/90 backdrop-blur-sm' : ''} ${isMobile ? '-ml-2' : isTablet ? '-ml-4' : ''}`}
								/>
							)}
							{/* Right: Entry List Button (Mobile/Tablet only) */}
							{shouldUseDrawers && (
								<IconButton
									onClick={() => setIsEntryListDrawerOpen(true)}
									icon={<IconMenu className='size-6' />}
									aria-label='Entries'
									variant='ghost'
									color='primary'
									size='sm'
									className={`flex-shrink-0 transition-all duration-300 pointer-events-auto ${hasScrolled ? 'bg-background-elevated/90 backdrop-blur-sm' : ''} ${isMobile ? '-mr-2' : isTablet ? '-mr-4' : ''}`}
								/>
							)}
							{/* Spacer for desktop to maintain layout */}
							{isDesktop && <Box className='w-20 flex-shrink-0' />}
						</Box>
					</Box>
				)}

				{/* Main Content: Three panes - left (calendar), middle (editor), right (entry list) */}
				<Box
					className={`flex flex-1 ${isDesktop ? 'flex-row' : 'flex-col'} gap-6 ${isDesktop ? 'gap-8' : 'gap-4'} ${isDesktop ? 'px-4 xl:px-6' : shouldUseDrawers ? 'px-2' : 'px-4'} ${shouldUseDrawers && currentEntry ? 'pt-14' : ''} w-full max-w-full min-w-0 ${isDesktop ? 'h-full' : shouldUseDrawers ? 'min-h-0' : ''}`}
				>
					{/* Left Panel: Calendar and Additional Details */}
					<>
						{/* Desktop: Direct rendering */}
						{isDesktop && (
							<Box
								className={`flex w-80 flex-shrink-0 flex-col gap-4 min-w-0 max-w-full overflow-hidden ${showSkeletons ? '' : 'animate-[fadeIn_0.4s_ease-out_0.1s_both]'}`}
							>
								{showSkeletons ? (
									<Box className='flex flex-col gap-4'>
										{/* Calendar Skeleton */}
										<Box className='w-full border border-border rounded-lg overflow-hidden bg-background p-4'>
											{/* Month/Year Selector Skeleton */}
											<Box className='flex items-center justify-between mb-4'>
												<Skeleton
													variant='rectangular'
													height='32px'
													width='120px'
													borderRadius='md'
												/>
												<Skeleton
													variant='rectangular'
													height='32px'
													width='100px'
													borderRadius='md'
												/>
											</Box>
											{/* Calendar Grid Skeleton */}
											<Box className='grid grid-cols-7 gap-2 mb-2'>
												{/* Day headers */}
												{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
													<Skeleton
														key={`day-header-${idx}`}
														variant='text'
														height='20px'
														width='100%'
													/>
												))}
											</Box>
											<Box className='grid grid-cols-7 gap-2'>
												{/* Calendar days - 6 rows x 7 columns = 42 days */}
												{Array.from({ length: 42 }).map((_, idx) => (
													<Skeleton
														key={`calendar-day-${idx}`}
														variant='rectangular'
														height='40px'
														width='100%'
														borderRadius='md'
													/>
												))}
											</Box>
										</Box>
										{/* Additional Details Skeleton */}
										<Box className='flex flex-col gap-4 p-4 bg-background-subtle rounded-lg border border-border'>
											<Skeleton variant='text' height='24px' width='40%' />
											<Box className='flex flex-col gap-3'>
												<Skeleton variant='text' height='16px' width='50%' />
												<Skeleton
													variant='rectangular'
													fullWidth
													height='40px'
													borderRadius='md'
												/>
											</Box>
											<Box className='flex flex-col gap-3'>
												<Skeleton variant='text' height='16px' width='50%' />
												<Skeleton
													variant='rectangular'
													fullWidth
													height='40px'
													borderRadius='md'
												/>
											</Box>
											<Box className='flex flex-col gap-3'>
												<Skeleton variant='text' height='16px' width='50%' />
												<Skeleton
													variant='rectangular'
													fullWidth
													height='40px'
													borderRadius='md'
												/>
											</Box>
											<Box className='grid grid-cols-2 gap-4'>
												<Box className='flex flex-col gap-2'>
													<Skeleton variant='text' height='16px' width='60%' />
													<Skeleton
														variant='rectangular'
														fullWidth
														height='40px'
														borderRadius='md'
													/>
												</Box>
												<Box className='flex flex-col gap-2'>
													<Skeleton variant='text' height='16px' width='60%' />
													<Skeleton
														variant='rectangular'
														fullWidth
														height='40px'
														borderRadius='md'
													/>
												</Box>
											</Box>
										</Box>
									</Box>
								) : (
									<>
										<EntryCalendar
											{...calendarProps}
											value={
												currentEntry
													? new Date(currentEntry.date_created)
													: null
											}
										/>
										{/* Additional Details - only show when entry is selected */}
										{currentEntry && (
											<Box className='flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700 overflow-y-auto'>
												<Typography
													variant='h6'
													className='text-gray-900 dark:text-gray-100'
												>
													Additional Details
												</Typography>

												<FormControl>
													<Typography
														variant='label'
														className='mb-2 text-gray-700 dark:text-gray-300'
													>
														Tags (comma-separated)
													</Typography>
													{/* Display tags as chips */}
													{currentEntry.tags &&
														currentEntry.tags
															.split(',')
															.filter((t) => t.trim().length > 0).length >
															0 && (
															<Box className='flex flex-wrap gap-2 mb-2'>
																{currentEntry.tags
																	.split(',')
																	.map((t) => t.trim())
																	.filter((t) => t.length > 0)
																	.map((tag, index) => (
																		<Chip
																			key={`tag-input-${index}`}
																			label={tag}
																			variant='primary'
																			size='sm'
																			onRemove={async () => {
																				const tags = currentEntry.tags
																					.split(',')
																					.map((t) => t.trim())
																					.filter(
																						(t) => t.length > 0 && t !== tag,
																					)
																				const newTags = tags.join(',')
																				// Update Redux state immediately
																				setEntryValue(
																					currentEntry.id,
																					'tags',
																					newTags,
																				)
																				// Update IndexedDB and Redux
																				await updateEntry({
																					...currentEntry,
																					tags: newTags,
																				})
																			}}
																		/>
																	))}
															</Box>
														)}
													<Input
														name='tags'
														placeholder='travel, adventure, family'
														value={currentEntry.tags || ''}
														onChange={async (e) => {
															const newTags = e.target.value
															// Update Redux state immediately
															setEntryValue(currentEntry.id, 'tags', newTags)
															// Update IndexedDB and Redux
															await updateEntry({
																...currentEntry,
																tags: newTags,
															})
														}}
														className='w-full'
													/>
												</FormControl>

												<FormControl>
													<Typography
														variant='label'
														className='mb-2 text-gray-700 dark:text-gray-300'
													>
														People (comma-separated)
													</Typography>
													{/* Display people as chips */}
													{currentEntry.people &&
														currentEntry.people
															.split(',')
															.filter((p) => p.trim().length > 0).length >
															0 && (
															<Box className='flex flex-wrap gap-2 mb-2'>
																{currentEntry.people
																	.split(',')
																	.map((p) => p.trim())
																	.filter((p) => p.length > 0)
																	.map((person, index) => (
																		<Chip
																			key={`people-input-${index}`}
																			label={person}
																			variant='secondary'
																			size='sm'
																			onRemove={async () => {
																				const people = currentEntry.people
																					.split(',')
																					.map((p) => p.trim())
																					.filter(
																						(p) => p.length > 0 && p !== person,
																					)
																				const newPeople = people.join(',')
																				// Update Redux state immediately
																				setEntryValue(
																					currentEntry.id,
																					'people',
																					newPeople,
																				)
																				// Update IndexedDB and Redux
																				await updateEntry({
																					...currentEntry,
																					people: newPeople,
																				})
																			}}
																		/>
																	))}
															</Box>
														)}
													<Input
														name='people'
														placeholder='John Doe, Jane Smith'
														value={currentEntry.people || ''}
														onChange={async (e) => {
															const newPeople = e.target.value
															// Update Redux state immediately
															setEntryValue(
																currentEntry.id,
																'people',
																newPeople,
															)
															// Update IndexedDB and Redux
															await updateEntry({
																...currentEntry,
																people: newPeople,
															})
														}}
														className='w-full'
													/>
												</FormControl>

												<FormControl>
													<Typography
														variant='label'
														className='mb-2 text-gray-700 dark:text-gray-300'
													>
														Location Address
													</Typography>
													<Input
														name='address'
														placeholder='123 Main St, City, State'
														value={currentEntry.address || ''}
														onChange={async (e) => {
															const newAddress = e.target.value
															// Update Redux state immediately
															setEntryValue(
																currentEntry.id,
																'address',
																newAddress,
															)
															// Update IndexedDB and Redux
															await updateEntry({
																...currentEntry,
																address: newAddress,
															})
														}}
														className='w-full'
													/>
												</FormControl>

												<Box className='grid grid-cols-2 gap-4'>
													<FormControl>
														<Typography
															variant='label'
															className='mb-2 text-gray-700 dark:text-gray-300'
														>
															Latitude
														</Typography>
														<Input
															name='latitude'
															type='number'
															step='any'
															placeholder='37.7749'
															value={currentEntry.latitude || ''}
															onChange={async (e) => {
																const newLatitude = e.target.value
																// Update Redux state immediately
																setEntryValue(
																	currentEntry.id,
																	'latitude',
																	newLatitude,
																)
																// Update IndexedDB and Redux
																await updateEntry({
																	...currentEntry,
																	latitude: newLatitude,
																})
															}}
															className='w-full'
														/>
													</FormControl>

													<FormControl>
														<Typography
															variant='label'
															className='mb-2 text-gray-700 dark:text-gray-300'
														>
															Longitude
														</Typography>
														<Input
															name='longitude'
															type='number'
															step='any'
															placeholder='-122.4194'
															value={currentEntry.longitude || ''}
															onChange={async (e) => {
																const newLongitude = e.target.value
																// Update Redux state immediately
																setEntryValue(
																	currentEntry.id,
																	'longitude',
																	newLongitude,
																)
																// Update IndexedDB and Redux
																await updateEntry({
																	...currentEntry,
																	longitude: newLongitude,
																})
															}}
															className='w-full'
														/>
													</FormControl>
												</Box>
											</Box>
										)}
									</>
								)}
							</Box>
						)}
						{/* Mobile/Tablet: Drawer */}
						{shouldUseDrawers && (
							<Drawer
								isOpen={isCalendarDrawerOpen}
								onClose={() => setIsCalendarDrawerOpen(false)}
								position='left'
								width='w-80'
							>
								<Box className='flex flex-col gap-4'>
									<EntryCalendar
										{...calendarProps}
										value={
											currentEntry ? new Date(currentEntry.date_created) : null
										}
									/>
									{/* Additional Details - only show when entry is selected */}
									{currentEntry && (
										<Box className='flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700'>
											<Typography
												variant='h6'
												className='text-gray-900 dark:text-gray-100'
											>
												Additional Details
											</Typography>

											<FormControl>
												<Typography
													variant='label'
													className='mb-2 text-gray-700 dark:text-gray-300'
												>
													Tags (comma-separated)
												</Typography>
												{/* Display tags as chips */}
												{currentEntry.tags &&
													currentEntry.tags
														.split(',')
														.filter((t) => t.trim().length > 0).length > 0 && (
														<Box className='flex flex-wrap gap-2 mb-2'>
															{currentEntry.tags
																.split(',')
																.map((t) => t.trim())
																.filter((t) => t.length > 0)
																.map((tag, index) => (
																	<Chip
																		key={`tag-input-drawer-${index}`}
																		label={tag}
																		variant='primary'
																		size='sm'
																		onRemove={async () => {
																			const tags = currentEntry.tags
																				.split(',')
																				.map((t) => t.trim())
																				.filter(
																					(t) => t.length > 0 && t !== tag,
																				)
																			const newTags = tags.join(',')
																			// Update Redux state immediately
																			setEntryValue(
																				currentEntry.id,
																				'tags',
																				newTags,
																			)
																			// Update IndexedDB and Redux
																			await updateEntry({
																				...currentEntry,
																				tags: newTags,
																			})
																		}}
																	/>
																))}
														</Box>
													)}
												<Input
													name='tags'
													placeholder='travel, adventure, family'
													value={currentEntry.tags || ''}
													onChange={async (e) => {
														const newTags = e.target.value
														// Update Redux state immediately
														setEntryValue(currentEntry.id, 'tags', newTags)
														// Update IndexedDB and Redux
														await updateEntry({
															...currentEntry,
															tags: newTags,
														})
													}}
													className='w-full'
												/>
											</FormControl>

											<FormControl>
												<Typography
													variant='label'
													className='mb-2 text-gray-700 dark:text-gray-300'
												>
													People (comma-separated)
												</Typography>
												{/* Display people as chips */}
												{currentEntry.people &&
													currentEntry.people
														.split(',')
														.filter((p) => p.trim().length > 0).length > 0 && (
														<Box className='flex flex-wrap gap-2 mb-2'>
															{currentEntry.people
																.split(',')
																.map((p) => p.trim())
																.filter((p) => p.length > 0)
																.map((person, index) => (
																	<Chip
																		key={`people-input-drawer-${index}`}
																		label={person}
																		variant='secondary'
																		size='sm'
																		onRemove={async () => {
																			const people = currentEntry.people
																				.split(',')
																				.map((p) => p.trim())
																				.filter(
																					(p) => p.length > 0 && p !== person,
																				)
																			const newPeople = people.join(',')
																			// Update Redux state immediately
																			setEntryValue(
																				currentEntry.id,
																				'people',
																				newPeople,
																			)
																			// Update IndexedDB and Redux
																			await updateEntry({
																				...currentEntry,
																				people: newPeople,
																			})
																		}}
																	/>
																))}
														</Box>
													)}
												<Input
													name='people'
													placeholder='John Doe, Jane Smith'
													value={currentEntry.people || ''}
													onChange={async (e) => {
														const newPeople = e.target.value
														// Update Redux state immediately
														setEntryValue(currentEntry.id, 'people', newPeople)
														// Update IndexedDB and Redux
														await updateEntry({
															...currentEntry,
															people: newPeople,
														})
													}}
													className='w-full'
												/>
											</FormControl>

											<FormControl>
												<Typography
													variant='label'
													className='mb-2 text-gray-700 dark:text-gray-300'
												>
													Location Address
												</Typography>
												<Input
													name='address'
													placeholder='123 Main St, City, State'
													value={currentEntry.address || ''}
													onChange={async (e) => {
														const newAddress = e.target.value
														// Update Redux state immediately
														setEntryValue(
															currentEntry.id,
															'address',
															newAddress,
														)
														// Update IndexedDB and Redux
														await updateEntry({
															...currentEntry,
															address: newAddress,
														})
													}}
													className='w-full'
												/>
											</FormControl>

											<Box className='grid grid-cols-2 gap-4'>
												<FormControl>
													<Typography
														variant='label'
														className='mb-2 text-gray-700 dark:text-gray-300'
													>
														Latitude
													</Typography>
													<Input
														name='latitude'
														type='number'
														step='any'
														placeholder='37.7749'
														value={currentEntry.latitude || ''}
														onChange={async (e) => {
															const newLatitude = e.target.value
															// Update Redux state immediately
															setEntryValue(
																currentEntry.id,
																'latitude',
																newLatitude,
															)
															// Update IndexedDB and Redux
															await updateEntry({
																...currentEntry,
																latitude: newLatitude,
															})
														}}
														className='w-full'
													/>
												</FormControl>

												<FormControl>
													<Typography
														variant='label'
														className='mb-2 text-gray-700 dark:text-gray-300'
													>
														Longitude
													</Typography>
													<Input
														name='longitude'
														type='number'
														step='any'
														placeholder='-122.4194'
														value={currentEntry.longitude || ''}
														onChange={async (e) => {
															const newLongitude = e.target.value
															// Update Redux state immediately
															setEntryValue(
																currentEntry.id,
																'longitude',
																newLongitude,
															)
															// Update IndexedDB and Redux
															await updateEntry({
																...currentEntry,
																longitude: newLongitude,
															})
														}}
														className='w-full'
													/>
												</FormControl>
											</Box>
										</Box>
									)}
								</Box>
							</Drawer>
						)}
					</>

					{/* Middle Panel: Entry Editor */}
					<Box
						className={`flex flex-1 flex-col min-w-0 ${isDesktop ? 'w-0' : isTablet ? 'max-w-4xl mx-auto w-full' : 'w-full'} ${!currentEntry ? (isDesktop ? 'order-1' : 'order-2') : isDesktop ? 'order-2' : 'order-1'} ${currentEntry && !showSkeletons ? 'animate-[fadeIn_0.4s_ease-out_0.2s_both]' : ''}`}
					>
						{showSkeletons ? (
							<Box className='flex flex-1 flex-col space-y-4 w-full max-w-full min-w-0 min-h-0'>
								{/* Title and Date Fields Skeleton */}
								<Box className='flex flex-col gap-4 flex-shrink-0'>
									<Box className='flex flex-col gap-2'>
										<Skeleton variant='text' height='16px' width='30%' />
										<Skeleton
											variant='rectangular'
											fullWidth
											height='48px'
											borderRadius='md'
										/>
									</Box>
									<Box className='flex flex-col gap-2'>
										<Skeleton variant='text' height='16px' width='25%' />
										<Skeleton
											variant='rectangular'
											fullWidth
											height='48px'
											borderRadius='md'
										/>
									</Box>
								</Box>
								{/* Editor Content Skeleton */}
								<Box className='flex-1 min-h-0 border border-border rounded-lg overflow-hidden bg-background p-6'>
									<Box className='flex flex-col gap-3'>
										{/* Simulate editor content lines */}
										<Skeleton variant='text' height='20px' width='100%' />
										<Skeleton variant='text' height='20px' width='95%' />
										<Skeleton variant='text' height='20px' width='100%' />
										<Box className='h-4' />
										<Skeleton variant='text' height='20px' width='90%' />
										<Skeleton variant='text' height='20px' width='100%' />
										<Skeleton variant='text' height='20px' width='85%' />
										<Box className='h-4' />
										<Skeleton variant='text' height='20px' width='100%' />
										<Skeleton variant='text' height='20px' width='92%' />
									</Box>
								</Box>
							</Box>
						) : currentEntry ? (
							<Box className='flex flex-1 flex-col space-y-4 w-full max-w-full min-w-0 min-h-0 overflow-hidden'>
								{/* Title and Date Fields */}
								<Box className='flex flex-col gap-4 flex-shrink-0'>
									<FormControl>
										<Input
											name='title'
											placeholder='My first diary entry'
											value={currentEntry?.title || ''}
											onChange={handleTitleChange}
											className='w-full'
										/>
									</FormControl>
									<FormControl>
										<Input
											type='date'
											name='date_created'
											value={getValidDate(currentEntry.date_created)}
											onChange={handleDateChange}
											className='w-full'
										/>
									</FormControl>
								</Box>

								{/* Wysiwyg Editor Component */}
								<Box className='flex-1 min-h-0 overflow-hidden'>
									<WysiwygEditor
										key={currentEntry.id}
										value={content || ''}
										defaultValue={currentEntry.html || ''}
										onChange={(html) => {
											onContentChange(html)
										}}
										placeholder='Start writing your entry...'
										editable={true}
										showBubbleMenu={true}
										className='w-full h-full'
									/>
								</Box>
							</Box>
						) : (
							<Box className='text-center py-12 md:py-24'>
								<Typography
									variant='p'
									className='text-gray-500 dark:text-gray-400'
								>
									Select or create an entry to get started
								</Typography>
							</Box>
						)}
					</Box>

					{/* Right Panel: Entry List */}
					<>
						{/* Desktop: Direct rendering */}
						{isDesktop && (
							<Box
								className={`flex w-80 xl:w-96 flex-shrink-0 min-w-0 order-3 ${showSkeletons ? '' : 'animate-[fadeIn_0.4s_ease-out_0.3s_both]'}`}
							>
								{showSkeletons ? (
									<Box className='w-full h-full border border-border rounded-lg overflow-hidden bg-background'>
										<Box className='flex flex-col'>
											{/* Entry List Skeleton - show 6 items with varying heights */}
											{Array.from({ length: 6 }).map((_, index) => (
												<Box
													key={`skeleton-entry-${index}`}
													className='flex items-start justify-between gap-2 p-4 border-b border-border last:border-b-0'
												>
													<Box className='flex-1 min-w-0 space-y-2'>
														{/* Title */}
														<Skeleton
															variant='text'
															height='18px'
															width={index % 2 === 0 ? '75%' : '85%'}
														/>
														{/* Date */}
														<Skeleton
															variant='text'
															height='14px'
															width='45%'
														/>
														{/* Tags - only show on some items */}
														{index % 3 !== 0 && (
															<Box className='flex gap-2 mt-2'>
																<Skeleton
																	variant='rectangular'
																	height='24px'
																	width='60px'
																	borderRadius='full'
																/>
																{index % 2 === 0 && (
																	<Skeleton
																		variant='rectangular'
																		height='24px'
																		width='75px'
																		borderRadius='full'
																	/>
																)}
															</Box>
														)}
													</Box>
													{/* Delete button placeholder */}
													<Skeleton
														variant='circular'
														height='32px'
														width='32px'
													/>
												</Box>
											))}
										</Box>
									</Box>
								) : (
									<EntryList {...entryListProps} currentEntry={currentEntry} />
								)}
							</Box>
						)}
						{/* Mobile/Tablet: Drawer */}
						{shouldUseDrawers && (
							<Drawer
								isOpen={isEntryListDrawerOpen}
								onClose={() => setIsEntryListDrawerOpen(false)}
								position='right'
								width='w-80'
							>
								<EntryList {...entryListProps} currentEntry={currentEntry} />
							</Drawer>
						)}
					</>
				</Box>
			</Box>
		</Box>
	)
}
