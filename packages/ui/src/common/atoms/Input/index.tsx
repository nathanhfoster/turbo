import withForwardRef from './../../hocs/withForwardRef';
import { TAILWIND_SIZES } from './../../../constants';
import { combineClassNames } from '@nathanhfoster/utils';
import React from 'react';
import { isString } from '@nathanhfoster/utils';
import Box from '../Box';
import type { ComponentColor } from '../types';
import Typography from '../Typography';
import ClearButton from './components/ClearButton';
import InputLabel from './components/Label';
import { BASE_STYLES, COLOR_STYLES, ERROR_STYLES } from './constants';
import { InputProps } from './types';

const Input: React.FC<InputProps> = ({
  type = 'text',
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
  ...props
}) => {
  const colorStyles = COLOR_STYLES[error ? 'error' : (color as ComponentColor)];

  return (
    <Box fullWidth className="relative">
      {label && <InputLabel name={name} label={label} required={required} />}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={combineClassNames(
            BASE_STYLES,
            colorStyles?.border,
            colorStyles?.focus,
            colorStyles?.hover,
            TAILWIND_SIZES[size],
            fullWidth && 'w-full',
            fullHeight && 'h-full',
            className,
            'pr-8'
          )}
          required={required}
          {...props}
        />
        <ClearButton onChange={onChange} size={size} value={value} />
      </div>
      {isString(error) && (
        <Typography variant="p" color="error" className={ERROR_STYLES}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default withForwardRef(Input);
