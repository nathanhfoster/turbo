"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Hook that returns a ref containing the latest value.
 * Updates the ref when the value changes, allowing stable subscriptions
 * without stale closures.
 * 
 * This follows React Best Practices Rule: advanced-use-latest
 * to prevent effect re-runs while avoiding stale closures.
 * 
 * @template T - The type of the value
 * @param value - The value to store in the ref
 * @returns A ref containing the latest value
 * 
 * @example
 * ```tsx
 * function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
 *   const [query, setQuery] = useState('');
 *   const onSearchRef = useLatest(onSearch);
 * 
 *   useEffect(() => {
 *     const timeout = setTimeout(() => onSearchRef.current(query), 300);
 *     return () => clearTimeout(timeout);
 *   }, [query]); // onSearch not in deps - stable subscription!
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function Modal({ onClose, open }: ModalProps) {
 *   const onCloseRef = useLatest(onClose);
 * 
 *   useEffect(() => {
 *     if (open) {
 *       const handler = () => onCloseRef.current();
 *       document.addEventListener('keydown', handler);
 *       return () => document.removeEventListener('keydown', handler);
 *     }
 *   }, [open]); // onClose not in deps - stable subscription!
 * }
 * ```
 */
const useLatest = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export default useLatest;
