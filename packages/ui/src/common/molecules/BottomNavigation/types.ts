import { ReactNode } from 'react'

export interface BottomNavigationItem {
	id: string
	icon: ReactNode
	label: string
	href?: string
	onClick?: () => void
}

export interface BottomNavigationProps {
	items: BottomNavigationItem[]
	activeItemId?: string
	className?: string
}
