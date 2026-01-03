import type { ComposableComponent } from '../../../../../types';
import { LinkProps } from 'next/link';

export interface FooterLinkProps extends Omit<LinkProps, 'className' | 'onClick'>, ComposableComponent {
  target?: string;
  rel?: string;
  'aria-label'?: string;
}
