import type React from 'react';
import type { ComposableComponent } from '../../../types';
import type { ImageProps as NextImageProps } from 'next/image';

export interface ImageProps extends Omit<NextImageProps, 'onClick'>, Omit<ComposableComponent, 'onClick'> {
  size?: NextImageProps['width'] | NextImageProps['height'];
  belowTheFold?: boolean;
  responsive?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}
