"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createContext, useContext } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import {
  useClickOutside,
  useListKeyboardNavigation,
} from "@nathanhfoster/react-hooks";
import type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownDividerProps,
} from "./types";

const DropdownContext = createContext<{
  close: () => void;
  isOpen: boolean;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}>({
  close: () => {},
  isOpen: false,
  itemRefs: { current: [] },
});

const Dropdown = ({
  tone = "solid",
  className,
  children,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Rule: rerender-functional-setstate - use functional setState
  const close = useCallback(() => setIsOpen(false), []);

  // Rule: client-event-listeners - Use hook for click outside handling
  useClickOutside(containerRef, isOpen, close);

  // Auto-focus first item when opening
  useEffect(() => {
    if (isOpen && itemRefs.current[0]) {
      itemRefs.current[0]?.focus();
      setFocusedIndex(0);
    }
  }, [isOpen]);

  // Calculate item count (non-null refs) - memoize to avoid recalculation
  const itemCount = useMemo(
    () => itemRefs.current.filter((ref) => ref !== null).length,
    [isOpen], // Recalculate when dropdown opens/closes (items register/unregister)
  );

  // Rule: Web Design Guidelines - Use hook for keyboard navigation
  const handleKeyDown = useListKeyboardNavigation({
    isOpen,
    focusedIndex,
    setFocusedIndex,
    itemRefs,
    itemCount,
    onEscape: close,
    returnFocusRef: triggerRef,
    onOpen: () => setIsOpen(true),
    loop: true,
  });

  const triggerChildren = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownTrigger,
  );
  const contentChildren = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownContent,
  );

  return (
    <DropdownContext.Provider value={{ close, isOpen, itemRefs }}>
      <div
        ref={containerRef}
        className={combineClassNames("relative", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div
          ref={triggerRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer"
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={0}
        >
          {triggerChildren}
        </div>
        {isOpen ? (
          <div
            ref={dropdownRef}
            role="menu"
            className={combineClassNames(
              "absolute right-0 z-50 mt-2 min-w-[12rem] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1",
            )}
            style={{ top: "100%" }}
          >
            {contentChildren}
          </div>
        ) : null}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({
  className,
  children,
  ...props
}: DropdownTriggerProps) => {
  return (
    <div className={combineClassNames(className)} {...props}>
      {children}
    </div>
  );
};

const DropdownContent = ({
  className,
  children,
  ...props
}: DropdownContentProps) => {
  return (
    <div className={combineClassNames(className)} {...props}>
      {children}
    </div>
  );
};

const DropdownItem = ({
  className,
  children,
  onClick,
  ...props
}: DropdownItemProps) => {
  const { close, isOpen, itemRefs } = useContext(DropdownContext);
  const itemRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<number>(-1);

  // Register this item in the refs array
  useEffect(() => {
    if (itemRef.current && isOpen) {
      const index = itemRefs.current.length;
      indexRef.current = index;
      itemRefs.current[index] = itemRef.current;
      return () => {
        itemRefs.current[index] = null;
      };
    }
  }, [isOpen, itemRefs]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  return (
    <div
      ref={itemRef}
      role="menuitem"
      tabIndex={-1}
      className={combineClassNames(
        "px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownLabel = ({
  className,
  children,
  ...props
}: DropdownLabelProps) => {
  return (
    <div
      className={combineClassNames(
        "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownDivider = ({ className, ...props }: DropdownDividerProps) => {
  return (
    <div
      className={combineClassNames(
        "border-t border-gray-200 dark:border-gray-700 my-1",
        className,
      )}
      {...props}
    />
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Label = DropdownLabel;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
