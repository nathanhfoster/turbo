'use client'

import { combineClassNames } from '@nathanhfoster/utils'
import type { IconButtonProps } from './types'

export function IconButton({
	icon,
	label,
	size = 'md',
	variant = 'default',
	isActive = false,
	className,
	...props
}: IconButtonProps) {
	const sizeClasses = {
		sm: 'p-2 text-sm',
		md: 'p-3 text-base',
		lg: 'p-4 text-lg',
	}

	const variantClasses = {
		default: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
		primary: 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
		ghost: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
	}

	const activeClasses = isActive
		? 'text-primary-600 dark:text-primary-400 font-semibold'
		: ''

	return (
		<button
			type="button"
			className={combineClassNames(
				'flex flex-col items-center justify-center gap-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
				sizeClasses[size],
				variantClasses[variant],
				activeClasses,
				className,
			)}
			aria-label={label}
			{...props}
		>
			<span className="flex-shrink-0">{icon}</span>
			{label && <span className="text-xs">{label}</span>}
		</button>
	)
}

export type { IconButtonProps }
