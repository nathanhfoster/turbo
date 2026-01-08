import type { Size } from "react-virtualized";

export interface ListProps<T extends object> {
  /**
   * Array of data items to render
   */
  data?: T[];
  /**
   * Function to render each item
   * @param item - The data item
   * @param index - The index of the item
   * @param data - The full data array
   * @returns React node
   */
  renderItem: (item: T, index: number, data: T[]) => React.ReactNode;
  /**
   * Height of each row/item in pixels
   * @default 50
   */
  rowHeight?: number | ((params: { index: number }) => number);
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Whether rows are loaded (for infinite loading)
   * @default (index) => index < data.length
   */
  isRowLoaded?: (params: { index: number }) => boolean;
  /**
   * Function to load more rows (for infinite loading)
   * @default () => Promise.resolve()
   */
  loadMoreRows?: (params: {
    startIndex: number;
    stopIndex: number;
  }) => Promise<void>;
  /**
   * Total row count (for infinite loading)
   * @default data.length
   */
  rowCount?: number;
  /**
   * Threshold for triggering loadMoreRows
   * @default 15
   */
  threshold?: number;
  /**
   * Number of rows to render outside of the visible area
   * @default 5
   */
  overscanRowCount?: number;
  /**
   * Callback when a row is clicked
   */
  onRowClick?: (params: { index: number; rowData: T }) => void;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Empty state component
   */
  emptyComponent?: React.ReactNode;
  /**
   * Index to scroll to (will scroll when this changes)
   */
  scrollToIndex?: number;
  /**
   * Index of the selected row (will be highlighted)
   */
  selectedIndex?: number;
}
