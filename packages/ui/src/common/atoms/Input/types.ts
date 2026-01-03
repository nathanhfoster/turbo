import type React from 'react';
import type { ComposableComponent } from '../../../types';
import type { ColoredComponent, Size } from '../types';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color' | 'onClick'>,
    Omit<ComposableComponent, 'onClick'>,
    Pick<ColoredComponent, 'color'> {
  label?: string;
  error?: boolean | string;
  size?: Size;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
