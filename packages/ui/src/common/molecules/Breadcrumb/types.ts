import type { DataComponent } from '../../../types';
import type { ReactNode } from 'react';
import type { BaseTypographyProps, SpanProps } from '../../atoms/Typography/types';

export interface BreadcrumbItem extends SpanProps {
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: ReactNode;
}

export interface BreadcrumbProps
  extends DataComponent<BreadcrumbItem>,
    Pick<BaseTypographyProps, 'size'> {
  className?: string;
  showChevron?: boolean;
}
