import type { LinkProps } from './../Link/types';
import type { BaseTailwindProps, ColoredComponent, Size } from '../types';

export type ColorStyles = {
  bg: string;
  text: string;
  hover: string;
  active: string;
  border: string;
};

export interface BaseButtonProps
  extends ColoredComponent,
    BaseTailwindProps,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  size?: Size;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export interface AnchorProps
  extends Omit<LinkProps, 'onClick'>,
    Omit<BaseButtonProps, 'color' | 'size'> {
  href: LinkProps['href'];
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'onClick'> {
  href?: string;
}

export type FinalButtonProps = AnchorProps | ButtonProps;
