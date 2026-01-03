import React from 'react';
import { combineClassNames } from '@monkey-tilt/utils';
import withBaseTheme from './../../hocs/withBaseTheme';
import withForwardRef from './../../hocs/withForwardRef';
import type { ButtonGroupProps } from './types';
import Box from './../../atoms/Box';

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  display = 'flex',
  justify,
  className = '',
  children,
  ...buttonProps
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Box display={display} justify={justify} role="group" className={className}>
      {React.Children.map(childrenArray, (child, index) => {
        if (!React.isValidElement<{ className?: string }>(child)) return null;

        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;

        return React.cloneElement(child, {
          ...child.props,
          className: combineClassNames(
            child.props.className,
            'rounded-none',
            isFirst && 'rounded-s-md',
            !isFirst && !isFirst && 'border-l-0',
            isLast && 'rounded-e-md'
          ),
          ...buttonProps,
        });
      })}
    </Box>
  );
};

export default withForwardRef(withBaseTheme(ButtonGroup));
