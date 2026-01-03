import withBaseTheme from '../../hocs/withBaseTheme';
import { combineClassNames } from '@monkey-tilt/utils';
import React, { ComponentType, forwardRef } from 'react';
import withBaseTailwindProps from '../../hocs/withBaseTailwindProps';
import type { ComponentColor } from '../types';
import {
  BACKGROUND_COLOR_STYLES,
  COLOR_STYLES,
  CONTAINER_STYLES,
  DEFAULT_CONTAINER_STYLE,
  VARIANTS,
} from './constants';
import { BoxProps } from './types';

const Box = forwardRef<HTMLElement, BoxProps>(({
  variant = 'div',
  className,
  position,
  overflow,
  bg,
  color,
  border,
  opacity,
  zIndex,
  container = false,
  children,
  ...props
}, ref) => {
  const Component = (VARIANTS[variant] ?? 'div') as unknown as ComponentType<
    React.HTMLProps<HTMLElement>
  >;

  const containerClasses = container
    ? typeof container === 'string'
      ? CONTAINER_STYLES[container]
      : DEFAULT_CONTAINER_STYLE
    : '';

  const backgroundColorClasses = BACKGROUND_COLOR_STYLES[bg as ComponentColor] ?? bg;

  const colorClasses = COLOR_STYLES[color as ComponentColor] ?? color;

  const baseClasses = combineClassNames(
    containerClasses,
    position,
    overflow,
    backgroundColorClasses,
    colorClasses,
    border,
    opacity,
    zIndex,
    className
  );

  return (
    <Component ref={ref} className={baseClasses} {...props}>
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export default withBaseTheme(withBaseTailwindProps(Box));
