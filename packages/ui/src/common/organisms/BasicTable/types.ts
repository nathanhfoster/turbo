import { DataComponent } from "../../../types";
import { CSSProperties, ReactNode } from "react";

export interface Column<T> {
  /**
   * Header label for the column
   */
  header: string;

  /**
   * Key to access data from the row object
   */
  accessor: keyof T;

  /**
   * Function to render the cell content
   */
  render?: (value: T[keyof T], row: T) => ReactNode;

  /**
   * Function to render custom header content
   */
  renderHeader?: () => ReactNode;

  /**
   * Optional width for the column
   */
  width?: number;

  /**
   * Optional minimum width for the column
   */
  minWidth?: number;

  /**
   * Optional maximum width for the column
   */
  maxWidth?: number;

  /**
   * Optional className for the column
   */
  className?: string;

  /**
   * Optional flex grow value
   */
  flexGrow?: number;

  /**
   * Optional flex shrink value
   */
  flexShrink?: number;
}

export interface BasicTableProps<T extends object> extends DataComponent<T> {
  /**
   * Array of column definitions
   */
  columns: Column<T>[];

  /**
   * Whether to use striped rows
   */
  striped?: boolean;

  /**
   * Whether rows should have hover effect
   */
  hoverable?: boolean;

  /**
   * Optional className for the table container
   */
  className?: string;

  /**
   * Optional style for the table container
   */
  style?: CSSProperties;
}
