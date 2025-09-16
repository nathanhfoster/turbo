import React from 'react';
import type { TabProps } from './types';
import { getTabStyles } from './constants';
import Button from '../Button';
import { combineClassNames } from '@nathanhfoster/utils';
import withForwardRef from '../../hocs/withForwardRef';

const Tab: React.FC<TabProps> = ({
  id,
  label,
  isActive,
  isDisabled = false,
  icon,
  onClick,
  variant = 'default',
  color = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <Button
      onClick={() => !isDisabled && onClick(id)}
      className={combineClassNames(
        getTabStyles({
          isActive,
          isDisabled,
          variant,
          color,
          fullWidth,
        }),
        className
      )}
      disabled={isDisabled}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={isDisabled}
      variant={isActive && variant === 'pills' ? 'contained' : 'text'}
      color={color}
      isActive={isActive}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Button>
  );
};

export default withForwardRef(Tab);
