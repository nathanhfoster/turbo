"use client";

import React, { useState, useRef, useEffect } from "react";
import { createContext, useContext } from "@nathanhfoster/resurrection";
import { combineClassNames } from "@nathanhfoster/utils";
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
}>({ close: () => {} });

const Dropdown = ({
  tone = "solid",
  className,
  children,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const triggerChildren = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownTrigger,
  );
  const contentChildren = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownContent,
  );

  return (
    <DropdownContext.Provider value={{ close }}>
      <div
        ref={containerRef}
        className={combineClassNames("relative", className)}
        {...props}
      >
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {triggerChildren}
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className={combineClassNames(
              "absolute right-0 z-50 mt-2 min-w-[12rem] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1",
            )}
            style={{ top: "100%" }}
          >
            {contentChildren}
          </div>
        )}
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
  const { close } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
    close();
  };

  return (
    <div
      className={combineClassNames(
        "px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
        className,
      )}
      onClick={handleClick}
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
