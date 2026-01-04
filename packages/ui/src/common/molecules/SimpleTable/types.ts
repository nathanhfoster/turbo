import type { ReactNode, HTMLAttributes } from "react";
import type { BaseTailwindProps, ComponentColor, Size } from "../../atoms/types";

export type TableSize = Size | "lg" | "xl";
export type TableRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type TableAlign = "left" | "center" | "right";

export interface BaseTableProps extends BaseTailwindProps {
	/**
	 * Header color variant
	 */
	headerColor?: ComponentColor | "dark";
	/**
	 * Whether to show outer borders
	 * @default true
	 */
	outerBorders?: boolean;
	/**
	 * Border radius
	 * @default 'md'
	 */
	radius?: TableRadius;
	/**
	 * Table size
	 * @default 'md'
	 */
	size?: TableSize;
	/**
	 * Additional className
	 */
	className?: string;
	/**
	 * Children elements
	 */
	children?: ReactNode;
}

export interface TableProps extends BaseTableProps, HTMLAttributes<HTMLTableElement> {}

export interface TableRowProps
	extends HTMLAttributes<HTMLTableRowElement>,
		BaseTailwindProps {
	children?: ReactNode;
}

export interface TableCellProps
	extends HTMLAttributes<HTMLTableCellElement>,
		BaseTailwindProps {
	children?: ReactNode;
	/**
	 * Text alignment
	 * @default 'left'
	 */
	align?: TableAlign;
}

