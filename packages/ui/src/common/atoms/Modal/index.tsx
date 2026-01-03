'use client';

import withBaseTailwindProps from '../../hocs/withBaseTailwindProps';
import { combineClassNames } from '@monkey-tilt/utils';
import { useMemo } from 'react';
import { useIsomorphicLayoutEffect } from '../../../hooks';
import Box from '../Box';
import Portal from '../Portal';
import { MODAL_SIZE_CLASSES, MODAL_TRANSITION_DELAY } from './constants';
import type { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({
  className,
  open,
  onClose,
  size = 'medium',
  children,
  showBackdrop = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  ...props
}) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (open) {
      if (closeOnEscape) {
        document.addEventListener('keydown', handleEscape);
      }
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscape);
      }
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose, closeOnEscape]);

  const backdropClasses = useMemo(() => {
    if (!showBackdrop) {
      return 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none';
    }

    return combineClassNames(
      'fixed inset-0 z-50 flex items-center justify-center',
      open
        ? 'bg-black/50 backdrop-blur-sm pointer-events-auto'
        : 'bg-transparent pointer-events-none'
    );
  }, [open, showBackdrop]);

  const modalClasses = useMemo(() => {
    return combineClassNames(
      'relative bg-white rounded-lg shadow-lg [&:not([open])]:hidden',
      MODAL_SIZE_CLASSES[size],
      className
    );
  }, [open, size, className]);

  const wrapperClasses = useMemo(() => {
    return combineClassNames(
      'transition-all duration-400 ease-out origin-center',
      open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
    );
  }, [open]);

  return (
    <Portal unmountDelay={MODAL_TRANSITION_DELAY}>
      <Box
        className={backdropClasses}
        onClick={showBackdrop && closeOnOutsideClick ? handleBackdropClick : undefined}
      >
        <Box className={wrapperClasses}>
          <Box variant="dialog" role="dialog" className={modalClasses} open={open} {...props}>
            {children}
          </Box>
        </Box>
      </Box>
    </Portal>
  );
};

export default withBaseTailwindProps(Modal);
