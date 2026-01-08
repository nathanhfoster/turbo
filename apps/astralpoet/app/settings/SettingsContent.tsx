'use client'

import { Settings } from '@nathanhfoster/pwa/settings'
import { Box, Typography } from '@nathanhfoster/ui'

export function SettingsContent() {
	return (
		<Box className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
			<Box className='mb-12 text-center'>
				<Typography
					variant='h1'
					className='mb-4'
					size='text-5xl'
					weight='font-bold'
				>
					Settings
				</Typography>
				<Typography
					variant='p'
					className='text-xl text-gray-600 dark:text-gray-400'
				>
					Manage your Progressive Web App preferences and permissions
				</Typography>
			</Box>

			<Settings
				className=''
				titleClassName='hidden'
				gridClassName='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
			/>
		</Box>
	)
}
