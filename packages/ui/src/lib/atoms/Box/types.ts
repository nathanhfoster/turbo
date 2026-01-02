import type { HTMLAttributes, ReactNode } from 'react';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string;
  width?: string;
  height?: string;
  bg?: string;
  className?: string;
  children?: ReactNode;
}

