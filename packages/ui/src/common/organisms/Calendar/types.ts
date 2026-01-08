import type { BaseTailwindProps } from "../../atoms/types";
import type { ReactNode } from "react";

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
  /**
   * Whether to show year selector
   * @default true
   */
  showYearSelector?: boolean;
  /**
   * Whether to show month selector
   * @default true
   */
  showMonthSelector?: boolean;
  /**
   * Custom render function for day tile content
   * Receives the date and returns ReactNode to render inside the day tile
   */
  renderDayContent?: (date: Date) => ReactNode;
  /**
   * Custom render function for day tile wrapper
   * Allows full control over the day tile rendering
   */
  renderDay?: (
    date: Date,
    dayNumber: number,
    isDisabled: boolean,
    isSelected: boolean,
    isGreen: boolean,
  ) => ReactNode;
  /**
   * Year range for year selector
   * [startYear, endYear]
   * @default [1900, 2100]
   */
  yearRange?: [number, number];
  /**
   * Initial selected date
   */
  value?: Date | null;
  /**
   * Initial month to display
   */
  defaultMonth?: Date;
}
