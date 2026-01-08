import { getMainAppUrl } from '../../../../../shared/utils/getMainAppUrl'

/**
 * Navigation utility for entry domain
 * Handles absolute URL construction for cross-app navigation
 */

/**
 * Navigate to entry view page
 * @param entryId - The ID of the entry to view
 * @returns The absolute URL for the entry view page
 */
export function getEntryViewUrl(entryId: number): string {
	const mainAppUrl = getMainAppUrl()
	return `${mainAppUrl}/apps/astralpoet/view/${entryId}`
}
