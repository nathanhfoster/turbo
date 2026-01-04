import type { ReactNode, MouseEventHandler } from "react";
import type { BaseTailwindProps, ComponentColor } from "../../atoms/types";

export interface DropdownProps extends BaseTailwindProps {
	/**
	 * Color tone
	 */
	tone?: ComponentColor | "solid" | "transparent";
	/**
	 * Children elements
	 */
	children?: ReactNode;
	/**
	 * Additional className
	 */
	className?: string;
}

export interface DropdownTriggerProps extends BaseTailwindProps {
	/**
	 * Children elements
	 */
	children?: ReactNode;
	/**
	 * Additional className
	 */
	className?: string;
}

export interface DropdownContentProps extends BaseTailwindProps {
	/**
	 * Children elements
	 */
	children?: ReactNode;
	/**
	 * Additional className
	 */
	className?: string;
}

export interface DropdownItemProps extends BaseTailwindProps {
	/**
	 * Children elements
	 */
	children?: ReactNode;
	/**
	 * Additional className
	 */
	className?: string;
	/**
	 * Click handler
	 */
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface DropdownLabelProps extends BaseTailwindProps {
	/**
	 * Children elements
	 */
	children?: ReactNode;
	/**
	 * Additional className
	 */
	className?: string;
}

export interface DropdownDividerProps extends BaseTailwindProps {
	/**
	 * Additional className
	 */
	className?: string;
}

