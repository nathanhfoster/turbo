import type { ReactNode } from 'react';
import type { ComposableComponent } from '../../../types';
import type { ComponentColor } from '../types';

export type TabVariant = 'default' | 'underline' | 'pills';

export type ColorStyles = { active: string; inactive: string };

export interface TabProps extends Omit<ComposableComponent, 'onClick'> {
  id: string;
  label: string;
  isActive: boolean;
  isDisabled?: boolean;
  icon?: ReactNode;
  onClick: (id: string) => void;
  variant?: TabVariant;
  color?: ComponentColor;
  className?: string;
  fullWidth?: boolean;
}
