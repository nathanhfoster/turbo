import withForwardRef from './../../hocs/withForwardRef';
import { combineClassNames } from '@nathanhfoster/utils';
import React, { ComponentType } from 'react';
import withBaseTailwindProps from '../../hocs/withBaseTailwindProps';
import type { ComponentColor } from '../types';
import {
  TYPOGRAPHY_COLOR_STYLES,
  TYPOGRAPHY_DISABLED_STYLES,
  TYPOGRAPHY_VARIANT_MAPPING,
  TYPOGRAPHY_VARIANT_STYLES,
  VARIANT_DEFAULT_SIZES,
  VARIANT_DEFAULT_WEIGHTS,
} from './constants';
import { TypographyProps } from './types';

const BaseTypography: React.FC<TypographyProps> = ({
  font,
  href,
  variant = href ? 'a' : 'span',
  italic = false,
  size,
  color = 'inherit',
  lineHeight = 'leading-normal',
  weight,
  truncate = false,
  ellipsis = false,
  whiteSpaceNoWrap = false,
  noWrap = false,
  center = false,
  ripple = false,
  capitalize = false,
  uppercase = false,
  underline = false,
  lineClamp,
  className,
  disabled = false,
  children,
  ...props
}) => {
  const defaultSize = VARIANT_DEFAULT_SIZES[variant] ?? 'inherit';
  const sizeClass = size ?? defaultSize;
  const Component = TYPOGRAPHY_VARIANT_MAPPING[variant] as ComponentType<any>;
  const baseStyles = TYPOGRAPHY_VARIANT_STYLES[variant];
  const colorStyle = TYPOGRAPHY_COLOR_STYLES[color as ComponentColor] ?? color;
  const defaultWeight = VARIANT_DEFAULT_WEIGHTS[variant];
  const weightStyle = weight ?? defaultWeight;

  return (
    <Component
      {...props}
      href={href}
      className={combineClassNames(
        font && `font-${font}`,
        baseStyles,
        colorStyle,
        sizeClass,
        lineHeight && `leading-${lineHeight}`,
        weightStyle && `font-${weightStyle}`,
        italic && 'italic',
        truncate && 'truncate',
        ellipsis && 'ellipsis',
        whiteSpaceNoWrap && 'whitespace-nowrap',
        noWrap && 'nowrap',
        underline && (variant === 'a' ? 'hover:underline' : 'underline'),
        capitalize && 'capitalize',
        uppercase && 'uppercase',
        center && 'text-center',
        ripple && 'cursor-pointer',
        lineClamp && lineClamp,
        disabled && TYPOGRAPHY_DISABLED_STYLES,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default withForwardRef(withBaseTailwindProps(BaseTypography));
