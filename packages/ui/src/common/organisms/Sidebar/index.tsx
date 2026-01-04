"use client";

import React, { useState, useCallback, Children } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import { COLOR_CLASSES } from "./constants";
import type {
	SidebarProps,
	SidebarHeadProps,
	SidebarHeadLogoProps,
	SidebarHeadTitleProps,
	SidebarHeadToggleProps,
	SidebarNavProps,
	SidebarNavSectionProps,
	SidebarNavSectionTitleProps,
	SidebarNavSectionItemProps,
	SidebarFooterProps,
	SidebarState,
} from "./types";

const Sidebar = ({
	color = "white",
	onToggle,
	className,
	children,
	...props
}: SidebarProps) => {
	const [expanded, setExpanded] = useState(true);
	const [mobile, setMobile] = useState(false);

	const handleToggle = useCallback(() => {
		const newExpanded = !expanded;
		setExpanded(newExpanded);
		onToggle?.({ expanded: newExpanded, mobile });
	}, [expanded, mobile, onToggle]);

	return (
		<Box
			className={combineClassNames(
				"fixed left-0 top-0 h-screen transition-all duration-300 z-30",
				expanded ? "w-64" : "w-18",
				COLOR_CLASSES[color],
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

const SidebarHead = ({ className, children, ...props }: SidebarHeadProps) => {
	return (
		<Box
			className={combineClassNames(
				"flex items-center justify-between p-4 border-b border-gray-200",
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

const SidebarHeadLogo = ({
	className,
	children,
	...props
}: SidebarHeadLogoProps) => {
	return (
		<Box className={combineClassNames("flex items-center", className)} {...props}>
			{children}
		</Box>
	);
};

const SidebarHeadTitle = ({
	className,
	children,
	...props
}: SidebarHeadTitleProps) => {
	return (
		<Box
			className={combineClassNames("ml-2 font-semibold text-lg", className)}
			{...props}
		>
			{children}
		</Box>
	);
};

const SidebarHeadToggle = ({ className, ...props }: SidebarHeadToggleProps) => {
	return (
		<button
			className={combineClassNames(
				"p-2 rounded-md hover:bg-gray-100 transition-colors",
				className,
			)}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clipRule="evenodd"
				/>
			</svg>
		</button>
	);
};

const SidebarNav = ({ className, children, ...props }: SidebarNavProps) => {
	return (
		<Box
			className={combineClassNames("flex flex-col p-4 space-y-2", className)}
			{...props}
		>
			{children}
		</Box>
	);
};

const SidebarNavSection = ({
	isChild = false,
	className,
	children,
	...props
}: SidebarNavSectionProps) => {
	return (
		<Box
			className={combineClassNames(
				isChild ? "ml-4 space-y-1" : "space-y-1",
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

const SidebarNavSectionTitle = ({
	className,
	children,
	...props
}: SidebarNavSectionTitleProps) => {
	return (
		<Box
			className={combineClassNames(
				"text-xs font-semibold text-gray-500 uppercase px-2 py-1",
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

const SidebarNavSectionItem = ({
	icon,
	label,
	href,
	active = false,
	as = "a",
	onClick,
	className,
	children,
	...props
}: SidebarNavSectionItemProps) => {
	// If there are children, always render as div to avoid nesting interactive elements
	// This prevents button-inside-button errors when children contain interactive elements
	// Check for children - handle both single elements and arrays
	const hasChildren = React.isValidElement(children) || 
		(Array.isArray(children) && children.length > 0) ||
		(children !== undefined && children !== null && children !== false && children !== "");
	const Component = hasChildren
		? "div"
		: as === "button"
			? "button"
			: "a";
	const isLink = as === "a" && href && !hasChildren;

	return React.createElement(
		Component,
		{
			...(isLink ? { href } : {}),
			onClick,
			className: combineClassNames(
				"flex items-center px-2 py-2 rounded-md transition-colors",
				active
					? "bg-blue-100 text-blue-700"
					: "text-gray-700 hover:bg-gray-100",
				className,
			),
			...props,
		} as any,
		icon && <span className="mr-2">{icon}</span>,
		label && <span>{label}</span>,
		children,
	);
};

const SidebarFooter = ({ className, children, ...props }: SidebarFooterProps) => {
	return (
		<Box
			className={combineClassNames(
				"absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200",
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

// Assign sub-components with proper typing
const SidebarWithSubComponents = Sidebar as any;

SidebarWithSubComponents.Head = SidebarHead;
SidebarWithSubComponents.Head.Logo = SidebarHeadLogo;
SidebarWithSubComponents.Head.Title = SidebarHeadTitle;
SidebarWithSubComponents.Head.Toggle = SidebarHeadToggle;
SidebarWithSubComponents.Nav = SidebarNav;
SidebarWithSubComponents.Nav.Section = SidebarNavSection;
SidebarWithSubComponents.Nav.Section.Title = SidebarNavSectionTitle;
SidebarWithSubComponents.Nav.Section.Item = SidebarNavSectionItem;
SidebarWithSubComponents.Footer = SidebarFooter;

export default SidebarWithSubComponents;

