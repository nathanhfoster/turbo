'use client';

import { useMemo } from 'react';
import type { DrawerProps } from './types';
import { combineClassNames } from '@nathanhfoster/utils';
import Box from '../Box';
import {
  DRAWER_POSITION_CLASSES,
  DRAWER_TRANSFORM_CLASSES,
  DRAWER_TRANSITION_DELAY,
} from './constants';
import { useEffectAfterMount } from '@nathanhfoster/resurrection';
import Portal from '../Portal';

const Drawer: React.FC<DrawerProps> = ({
  className,
  isOpen,
  onClose,
  position = 'left',
  width = 'w-80',
  height = 'h-80',
  children,
}) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press
  useEffectAfterMount(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizeClasses = useMemo(() => {
    return {
      left: width,
      right: width,
      top: height,
      bottom: height,
    };
  }, [width, height]);

  return (
    <Portal unmountDelay={DRAWER_TRANSITION_DELAY}>
      <Box
        bg={isOpen ? 'bg-black/50 opacity-100' : 'pointer-events-none bg-black/0 opacity-0'}
        className={combineClassNames(
          'fixed inset-0 z-51 flex items-center justify-center transition-all duration-400 ease-in-out',
          !isOpen && 'invisible'
        )}
        onClick={handleBackdropClick}
      >
        <Box
          variant="aside"
          bg="white"
          fullHeight={position === 'left' || position === 'right'}
          fullWidth={position === 'top' || position === 'bottom'}
          className={combineClassNames(
            'fixed shadow-lg transition-transform duration-400 ease-out',
            DRAWER_POSITION_CLASSES[position],
            sizeClasses[position],
            isOpen ? 'translate-x-0 translate-y-0' : DRAWER_TRANSFORM_CLASSES[position],
            className
          )}
        >
          {children}
        </Box>
      </Box>
    </Portal>
  );
};

export default Drawer;
