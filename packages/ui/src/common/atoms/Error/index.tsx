import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Box from '../Box';
import Typography from '../Typography';
import { combineClassNames } from '@monkey-tilt/utils';
import { ErrorProps } from './types';
import {
  ERROR_VARIANTS,
  ERROR_ICON_STYLES,
  ERROR_TITLE_STYLES,
  ERROR_MESSAGE_STYLES,
} from './constants';

const Error: React.FC<ErrorProps> = ({
  message = 'An error occurred',
  title = 'Error',
  variant = 'default',
  className = '',
  children,
}) => {
  const baseStyles = ERROR_VARIANTS[variant];

  return (
    <Box className={combineClassNames(baseStyles, className)}>
      <ExclamationTriangleIcon className={ERROR_ICON_STYLES} />
      {variant !== 'minimal' && (
        <Typography variant="h3" className={ERROR_TITLE_STYLES}>
          {title}
        </Typography>
      )}
      <Typography variant="p" className={ERROR_MESSAGE_STYLES}>
        {message}
      </Typography>
      {children}
    </Box>
  );
};

export default Error;
