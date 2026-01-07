import { getMainAppUrl } from "../../../../../shared/utils/getMainAppUrl";

/**
 * Navigation utility for resume domain
 * Handles absolute URL construction for cross-app navigation
 */

/**
 * Navigate to resume view page
 * @param resumeId - The ID of the resume to view
 * @returns The absolute URL for the resume view page
 */
export function getResumeViewUrl(resumeId: string): string {
  const mainAppUrl = getMainAppUrl();
  return `${mainAppUrl}/apps/resume/view/${resumeId}`;
}
