"use client";

import { isClientSide } from "@nathanhfoster/utils";
import { useEffect, type RefObject } from "react";
import useLatest from "./useLatest";

/**
 * Hook to handle clicking outside an element to close it (e.g., dropdowns, modals).
 * Optimized for SSR - only runs on the client side.
 * Uses useLatest for stable subscriptions (Rule: advanced-use-latest).
 *
 * @param ref - React ref to the element that should not trigger the close
 * @param isOpen - Whether the dropdown/menu is currently open
 * @param onClose - Callback function to call when clicking outside
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const dropdownRef = useRef<HTMLDivElement>(null);
 *
 * useClickOutside(dropdownRef, isOpen, () => setIsOpen(false));
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  isOpen: boolean,
  onClose: () => void,
) {
  // Rule: advanced-use-latest - Store callback in ref for stable subscription
  const onCloseRef = useLatest(onClose);

  useEffect(() => {
    if (!isOpen || !isClientSide()) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onCloseRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, ref]); // onClose not in deps - stable subscription via useLatest
}
