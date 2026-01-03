import type { DialogHTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import type { BaseTailwindProps } from '../types';

export type ModalSize = 'small' | 'medium' | 'large' | 'full';

export interface ModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'onClick'>, Omit<BaseTailwindProps, 'onClick'> {
  /**
   * Function to handle modal close
   */
  onClose: () => void;
  /**
   * Content to be rendered inside the modal
   */
  children: ReactNode;
  /**
   * Size of the modal
   * @default 'medium'
   */
  size?: ModalSize;
  /**
   * Additional className for the modal
   */
  className?: string;
  /**
   * Whether to show the backdrop
   * @default true
   */
  showBackdrop?: boolean;
  /**
   * Whether to close the modal when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * Whether to close the modal when pressing escape
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Click handler for the modal
   */
  onClick?: MouseEventHandler<HTMLDialogElement>;
}
