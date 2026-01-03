import type { ErrorVariant } from './types';

export const ERROR_VARIANTS: Record<ErrorVariant, string> = {
  default: 'flex flex-col items-center justify-center p-4 rounded-lg bg-red-50',
  full: 'flex flex-col items-center justify-center min-h-[200px] p-8 rounded-lg bg-red-50',
  minimal: 'flex items-center gap-2 text-red-500',
};

export const ERROR_ICON_STYLES = 'w-6 h-6 text-red-500';
export const ERROR_TITLE_STYLES = 'text-lg font-semibold text-red-700 mb-2';
export const ERROR_MESSAGE_STYLES = 'text-sm text-red-600';
