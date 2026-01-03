import type { ComposableComponent,   } from '../../../types';
import type { ComponentColor } from '../types';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps extends ComposableComponent {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  borderRadius?: string;
  animation?: 'pulse' | 'wave' | 'none';
  color?: ComponentColor | string;
  className?: string;
}

export interface BaseSkeletonProps extends SkeletonProps {
  variant: SkeletonVariant;
}
