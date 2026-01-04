'use client'

import { combineClassNames } from '@nathanhfoster/utils'
import Link from 'next/link'
import { IconButton } from '../../atoms/IconButton'
import type { BottomNavigationProps } from './types'

export function BottomNavigation({
	items,
	activeItemId,
	className,
}: BottomNavigationProps) {
	return (
		<nav
			className={combineClassNames(
				'fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden',
				'safe-area-inset-bottom',
				className,
			)}
		>
			<div className="flex items-center justify-around px-2 py-1">
				{items.map((item) => {
					const isActive = item.id === activeItemId
					const button = (
						<IconButton
							key={item.id}
							icon={item.icon}
							label={item.label}
							isActive={isActive}
							onClick={item.onClick}
							size="md"
							variant="ghost"
						/>
					)

					return item.href ? (
						<Link key={item.id} href={item.href} className="flex-1">
							{button}
						</Link>
					) : (
						button
					)
				})}
			</div>
		</nav>
	)
}

export type { BottomNavigationProps, BottomNavigationItem } from './types'
