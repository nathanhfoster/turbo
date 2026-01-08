import type { NavItem } from '@nathanhfoster/ui'
import { IconHome, IconSliders } from '@nathanhfoster/ui'

export const getNavItems = (mainAppUrl: string): NavItem[] => [
	{ label: 'Home', href: `${mainAppUrl}/apps/astralpoet` },
	{ label: 'Settings', href: `${mainAppUrl}/apps/astralpoet/settings` },
]

export const getBottomNavItems = (mainAppUrl: string): NavItem[] => [
	{ label: 'Home', href: `${mainAppUrl}/apps/astralpoet`, Icon: <IconHome /> },
	{
		label: 'Settings',
		href: `${mainAppUrl}/apps/astralpoet/settings`,
		Icon: <IconSliders />,
	},
]

export const STRIP_PREFIX = '/apps/astralpoet'
export const BASE_PATH = '/astralpoet'
