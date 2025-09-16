'use client';

import { useRef, useCallback, MouseEvent } from 'react';

export interface RippleOptions<T extends HTMLElement = HTMLElement> {
  disabled?: boolean;
  ripple?: boolean;
  onClick?: (event: MouseEvent<T>) => void;
}

export interface UseRippleReturn<T extends HTMLElement = HTMLElement> {
  elementRef: React.RefObject<T | null>;
  handleClick: (event: MouseEvent<T>) => void;
}

/**
 * Hook for adding ripple effect to elements
 */
export const useRipple = <T extends HTMLElement = HTMLElement>({
  disabled = false,
  ripple = true,
  onClick,
}: RippleOptions<T>): UseRippleReturn<T> => {
  const elementRef = useRef<T>(null);

  const createRipple = useCallback((event: MouseEvent<T>) => {
    const element = elementRef.current;
    if (!element || disabled || !ripple) return;

    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    // Default ripple styles
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'currentColor';
    circle.style.opacity = '0.1';
    circle.style.animation = 'ripple 0.6s linear';
    circle.style.pointerEvents = 'none';

    const rippleElement = element.querySelector('.ripple');
    if (rippleElement) {
      rippleElement.remove();
    }

    element.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  }, [disabled, ripple]);

  const handleClick = useCallback(
    (event: MouseEvent<T>) => {
      createRipple(event);
      onClick?.(event);
    },
    [createRipple, onClick],
  );

  return {
    elementRef,
    handleClick,
  };
};

export default useRipple;