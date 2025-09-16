import withForwardRef from './../../hocs/withForwardRef';
import { TAILWIND_SIZES } from './../../../constants';
import { combineClassNames } from '@nathanhfoster/utils';
import React from 'react';
import { isString } from '@nathanhfoster/utils';
import Box from '../Box';
import type { ComponentColor } from '../types';
import Typography from '../Typography';
import { BASE_STYLES, COLOR_STYLES, ERROR_STYLES } from './constants';
import { TextAreaProps } from './types';

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error = false,
  required = false,
  size = 'md',
  className,
  color,
  fullWidth = true,
  fullHeight = false,
  rows = 4,
  ...props
}) => {
  const colorStyles = COLOR_STYLES[error ? 'error' : (color as ComponentColor)];

  return (
    <Box fullWidth className="relative">
      {label && (
        <Typography variant="p" mb="mb-1">
          {label}
          {required && <span className="text-error"> *</span>}
        </Typography>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={combineClassNames(
          BASE_STYLES,
          colorStyles?.border,
          colorStyles?.focus,
          colorStyles?.hover,
          TAILWIND_SIZES[size],
          fullWidth && 'w-full',
          fullHeight && 'h-full',
          className
        )}
        required={required}
        {...props}
      />
      {isString(error) && (
        <Typography variant="p" color="error" className={ERROR_STYLES}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default withForwardRef(TextArea);
