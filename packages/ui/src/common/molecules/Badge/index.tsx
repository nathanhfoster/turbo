'use client'

import { combineClassNames } from '@nathanhfoster/utils'
import type { BadgeProps } from './types'

export function Badge({
	count,
	variant = 'primary',
	size = 'sm',
	dot = false,
	className,
	children,
	...props
}: BadgeProps) {
	const variantClasses = {
		default: 'bg-gray-500',
		primary: 'bg-primary-500',
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		danger: 'bg-red-500',
	}

	const sizeClasses = {
		sm: dot ? 'w-2 h-2' : 'min-w-[1.25rem] h-5 px-1.5 text-xs',
		md: dot ? 'w-3 h-3' : 'min-w-[1.5rem] h-6 px-2 text-sm',
	}

	if (dot) {
		return (
			<span
				className={combineClassNames(
					'inline-block rounded-full',
					variantClasses[variant],
					sizeClasses[size],
					className,
				)}
				{...props}
			/>
		)
	}

	if (!count && count !== 0) return null

	return (
		<span
			className={combineClassNames(
				'inline-flex items-center justify-center rounded-full font-semibold text-white',
				variantClasses[variant],
				sizeClasses[size],
				className,
			)}
			{...props}
		>
			{children || (count > 99 ? '99+' : count)}
		</span>
	)
}

export type { BadgeProps }
