"use client";

import { useEffect, useRef } from "react";

/**
 * Hook that manages timeout cleanup automatically.
 * Returns a function to register timeouts that will be cleaned up on unmount.
 * 
 * This follows React Best Practices Rule: client-event-listeners
 * to prevent memory leaks from timeouts that outlive component lifecycle.
 * 
 * @returns A function to register timeout IDs for automatic cleanup
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const registerTimeout = useTimeoutCleanup();
 *   
 *   const handleClick = () => {
 *     const id = setTimeout(() => {
 *       console.log('Delayed action');
 *     }, 1000);
 *     registerTimeout(id);
 *   };
 *   
 *   // All registered timeouts are automatically cleared on unmount
 * }
 * ```
 */
const useTimeoutCleanup = (): ((timeoutId: ReturnType<typeof setTimeout>) => void) => {
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((id) => clearTimeout(id));
      timeoutRefs.current = [];
    };
  }, []);

  /**
   * Register a timeout ID for cleanup
   * @param timeoutId - The timeout ID returned from setTimeout
   */
  const registerTimeout = (timeoutId: ReturnType<typeof setTimeout>): void => {
    timeoutRefs.current.push(timeoutId);
  };

  return registerTimeout;
};

export default useTimeoutCleanup;
