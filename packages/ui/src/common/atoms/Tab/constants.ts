import type { ComponentColor } from '../types';
import type { TabVariant } from './types';

export const VARIANT_STYLES: Record<TabVariant, string> = {
  default: '',
  underline: '',
  pills: 'rounded-full',
};

export const BASE_STYLES =
  'inline-flex items-center justify-center p-4 transition-colors duration-200 font-medium';

export const DISABLED_STYLES = '!text-gray-400 !cursor-not-allowed';

export const getTabStyles = ({
  isActive,
  isDisabled,
  variant = 'default',
  color = 'primary',
  fullWidth = false,
}: {
  isActive: boolean;
  isDisabled: boolean;
  variant?: TabVariant;
  color?: ComponentColor;
  fullWidth?: boolean;
}) => {
  const variantStyles = VARIANT_STYLES[variant];
  const widthStyles = fullWidth ? 'flex-1' : '';

  if (isDisabled) {
    return `${BASE_STYLES} ${variantStyles} ${widthStyles} ${DISABLED_STYLES}`;
  }

  return `${BASE_STYLES} ${variantStyles} ${widthStyles}`;
};
