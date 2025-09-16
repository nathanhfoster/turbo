'use client';

import React from 'react';
import { AutoSizer, Size } from 'react-virtualized';
import Box from '../../atoms/Box';
import type { AutoSizerProps } from './types';

const AutoSizerComponent: React.FC<AutoSizerProps> = ({
  children,
  className,
  _style,
  ...props
}) => {
  return (
    <Box fullWidth fullHeight className={className}>
      <AutoSizer {...props}>
        {(size: Size) => (
          <Box fullWidth fullHeight>
            {children(size)}
          </Box>
        )}
      </AutoSizer>
    </Box>
  );
};

export default AutoSizerComponent;
