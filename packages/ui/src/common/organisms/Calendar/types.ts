import type { BaseTailwindProps } from "../../atoms/types";

export type CalendarSize = "sm" | "md" | "lg" | "xl";
export type CalendarRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type CalendarShadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface CalendarProps extends Omit<BaseTailwindProps, "shadow"> {
	/**
	 * Whether to show borders
	 * @default true
	 */
	bordered?: boolean;
	/**
	 * Disabled dates
	 */
	disabledDates?: Date[];
	/**
	 * Green/highlighted dates
	 */
	greenDates?: Date[];
	/**
	 * Whether to disable weekends
	 * @default false
	 */
	disabledWeekends?: boolean;
	/**
	 * Whether to show horizontal borders
	 * @default true
	 */
	horizontalBorders?: boolean;
	/**
	 * Minimum selectable date
	 */
	minDate?: Date;
	/**
	 * Maximum selectable date
	 */
	maxDate?: Date;
	/**
	 * Border radius
	 * @default 'md'
	 */
	radius?: CalendarRadius;
	/**
	 * Shadow size
	 * @default 'md'
	 */
	shadow?: CalendarShadow;
	/**
	 * Calendar size
	 * @default 'md'
	 */
	size?: CalendarSize;
	/**
	 * Whether to show vertical borders
	 * @default true
	 */
	verticalBorders?: boolean;
	/**
	 * Change handler
	 */
	onChange?: (date: Date | null) => void;
	/**
	 * Additional className
	 */
	className?: string;
}

