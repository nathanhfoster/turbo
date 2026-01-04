'use client'

import { combineClassNames } from '@nathanhfoster/utils'
import type { ChipProps } from './types'

export function Chip({
	label,
	onRemove,
	variant = 'default',
	size = 'md',
	className,
	...props
}: ChipProps) {
	const variantClasses = {
		default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
		primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
		secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300',
	}

	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm',
	}

	return (
		<span
			className={combineClassNames(
				'inline-flex items-center gap-1 rounded-full font-medium',
				variantClasses[variant],
				sizeClasses[size],
				className,
			)}
			{...props}
		>
			<span>{label}</span>
			{onRemove && (
				<button
					type="button"
					onClick={onRemove}
					className="ml-1 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
					aria-label={`Remove ${label}`}
				>
					<svg
						className="w-3 h-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</span>
	)
}

export type { ChipProps }
