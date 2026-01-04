"use client";

import React, { useState, useRef, useEffect } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import type {
	DropdownProps,
	DropdownTriggerProps,
	DropdownContentProps,
	DropdownItemProps,
	DropdownLabelProps,
	DropdownDividerProps,
} from "./types";

const Dropdown = ({
	tone = "solid",
	className,
	children,
	...props
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

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
		(child) =>
			React.isValidElement(child) && child.type === DropdownTrigger,
	);
	const contentChildren = React.Children.toArray(children).find(
		(child) =>
			React.isValidElement(child) && child.type === DropdownContent,
	);

	return (
		<Box
			ref={containerRef}
			className={combineClassNames("relative", className)}
			{...props}
		>
			<Box
				onClick={() => setIsOpen(!isOpen)}
				className="cursor-pointer"
			>
				{triggerChildren}
			</Box>
			{isOpen && (
				<Box
					ref={dropdownRef}
					className={combineClassNames(
						"absolute z-50 mt-2 min-w-[12rem] bg-white rounded-md shadow-lg border border-gray-200 py-1",
					)}
				>
					{contentChildren}
				</Box>
			)}
		</Box>
	);
};

const DropdownTrigger = ({
	className,
	children,
	...props
}: DropdownTriggerProps) => {
	return (
		<Box className={combineClassNames(className)} {...props}>
			{children}
		</Box>
	);
};

const DropdownContent = ({
	className,
	children,
	...props
}: DropdownContentProps) => {
	return (
		<Box className={combineClassNames(className)} {...props}>
			{children}
		</Box>
	);
};

const DropdownItem = ({
	className,
	children,
	onClick,
	...props
}: DropdownItemProps) => {
	return (
		<Box
			className={combineClassNames(
				"px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</Box>
	);
};

const DropdownLabel = ({
	className,
	children,
	...props
}: DropdownLabelProps) => {
	return (
		<Box
			className={combineClassNames(
				"px-4 py-2 text-xs font-semibold text-gray-500 uppercase",
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

const DropdownDivider = ({ className, ...props }: DropdownDividerProps) => {
	return (
		<Box
			className={combineClassNames("border-t border-gray-200 my-1", className)}
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

