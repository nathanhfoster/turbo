"use client";

import { isClientSide } from "@nathanhfoster/utils";
import { useEffect } from "react";

/**
 * Hook to handle clicking outside dropdowns to close them
 * Optimized for SSR - only runs on the client side
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
  ref: React.RefObject<T | null>,
  isOpen: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen || !isClientSide()) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, ref, onClose]);
}
