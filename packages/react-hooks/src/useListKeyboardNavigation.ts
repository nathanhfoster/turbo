"use client";

import { useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { MutableRefObject } from "react";

export interface ListKeyboardNavigationOptions {
  /**
   * Whether the list is currently open/active
   */
  isOpen: boolean;
  /**
   * Current focused index (-1 if none focused)
   */
  focusedIndex: number;
  /**
   * Callback to update the focused index
   */
  setFocusedIndex: (index: number | ((prev: number) => number)) => void;
  /**
   * Array of refs to focusable items
   */
  itemRefs: MutableRefObject<(HTMLElement | null)[]>;
  /**
   * Total number of items in the list
   */
  itemCount: number;
  /**
   * Callback when Escape is pressed (typically to close)
   */
  onEscape?: () => void;
  /**
   * Ref to element to focus when closing (e.g., trigger button)
   */
  returnFocusRef?: MutableRefObject<HTMLElement | null>;
  /**
   * Keys that open the list when closed
   */
  openKeys?: string[];
  /**
   * Callback when list should open
   */
  onOpen?: () => void;
  /**
   * Whether to loop navigation (ArrowDown from last goes to first)
   */
  loop?: boolean;
}

/**
 * Hook that provides keyboard navigation for list-like components (dropdowns, menus, etc.).
 * Handles ArrowUp/Down, Home/End, Escape, and Enter/Space for opening.
 * 
 * This follows Web Design Guidelines for keyboard navigation and accessibility.
 * 
 * @param options - Configuration options for keyboard navigation
 * @returns A keyboard event handler function
 * 
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const [focusedIndex, setFocusedIndex] = useState(-1);
 *   const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
 *   const triggerRef = useRef<HTMLButtonElement>(null);
 * 
 *   const handleKeyDown = useListKeyboardNavigation({
 *     isOpen,
 *     focusedIndex,
 *     setFocusedIndex,
 *     itemRefs,
 *     itemCount: items.length,
 *     onEscape: () => {
 *       setIsOpen(false);
 *       triggerRef.current?.focus();
 *     },
 *     returnFocusRef: triggerRef,
 *     onOpen: () => setIsOpen(true),
 *   });
 * 
 *   return (
 *     <div onKeyDown={handleKeyDown}>
 *       dropdown content
 *     </div>
 *   );
 * }
 * ```
 */
const useListKeyboardNavigation = (
  options: ListKeyboardNavigationOptions,
): ((e: ReactKeyboardEvent) => void) => {
  const {
    isOpen,
    focusedIndex,
    setFocusedIndex,
    itemRefs,
    itemCount,
    onEscape,
    returnFocusRef,
    openKeys = ["Enter", " ", "ArrowDown"],
    onOpen,
    loop = true,
  } = options;

  return useCallback(
    (e: ReactKeyboardEvent) => {
      // Handle opening when closed
      if (!isOpen) {
        if (openKeys.includes(e.key)) {
          e.preventDefault();
          onOpen?.();
          // Focus first item when opening
          if (itemRefs.current[0]) {
            itemRefs.current[0]?.focus();
            setFocusedIndex(0);
          }
        }
        return;
      }

      // Handle navigation when open
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onEscape?.();
          returnFocusRef?.current?.focus();
          break;

        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => {
            if (loop) {
              const next = prev < itemCount - 1 ? prev + 1 : 0;
              itemRefs.current[next]?.focus();
              return next;
            } else {
              const next = Math.min(prev + 1, itemCount - 1);
              itemRefs.current[next]?.focus();
              return next;
            }
          });
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => {
            if (loop) {
              const next = prev > 0 ? prev - 1 : itemCount - 1;
              itemRefs.current[next]?.focus();
              return next;
            } else {
              const next = Math.max(prev - 1, 0);
              itemRefs.current[next]?.focus();
              return next;
            }
          });
          break;

        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          itemRefs.current[0]?.focus();
          break;

        case "End":
          e.preventDefault();
          const lastIndex = itemCount - 1;
          setFocusedIndex(lastIndex);
          itemRefs.current[lastIndex]?.focus();
          break;
      }
    },
    [
      isOpen,
      focusedIndex,
      setFocusedIndex,
      itemRefs,
      itemCount,
      onEscape,
      returnFocusRef,
      openKeys,
      onOpen,
      loop,
    ],
  );
};

export default useListKeyboardNavigation;
