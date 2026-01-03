import React from 'react';
import { combineClassNames } from '@nathanhfoster/utils';
import { SkeletonProps } from './types';
import {
  VARIANTS,
  ANIMATION_STYLES,
  COLOR_STYLES,
  DEFAULT_ANIMATION,
  DEFAULT_VARIANT,
  DEFAULT_COLOR,
} from './constants';
import type { ComponentColor } from '../types';
import withBaseTheme from '../../hocs/withBaseTheme';
import withForwardRef from '../../hocs/withForwardRef';

const Skeleton: React.FC<SkeletonProps> = ({
  variant = DEFAULT_VARIANT,
  fullWidth,
  fullHeight,
  width,
  height,
  borderRadius,
  animation = DEFAULT_ANIMATION,
  color = DEFAULT_COLOR,
  className,
  ...props
}) => {
  const variantClasses = VARIANTS[variant];
  const animationClasses = ANIMATION_STYLES[animation];
  const colorClasses = COLOR_STYLES[color as ComponentColor] ?? color;

  const baseClasses = combineClassNames(
    variantClasses,
    animationClasses,
    colorClasses,
    fullWidth && 'w-full',
    fullHeight && 'h-full',
    width,
    height,
    borderRadius,
    className
  );

  return <div className={baseClasses} {...props} />;
};

export default withForwardRef(withBaseTheme(Skeleton));
