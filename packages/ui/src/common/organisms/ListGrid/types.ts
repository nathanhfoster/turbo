import type { CSSProperties } from "react";
import type { GridCellProps, InfiniteLoaderProps } from "react-virtualized";
import type { DataComponent } from "../../../types";
import type { PickPartial } from "@nathanhfoster/utils";

export interface ListGridProps<T extends object>
  extends DataComponent<T>,
    PickPartial<
      InfiniteLoaderProps,
      | "isRowLoaded"
      | "loadMoreRows"
      | "rowCount"
      | "threshold"
      | "minimumBatchSize"
    > {
  /** Optional className to apply to the root element */
  className?: string;
  /** Optional style to apply to the root element */
  style?: CSSProperties;
  /** Render function for each item in the grid */
  renderItem: (item: T, index?: number, data?: T[]) => React.ReactNode;
  /** Maximum number of columns to display (default: 3) */
  columns?: number;
  /** Gap between grid items in pixels (default: 16) */
  gap?: number;
  /** Minimum width of each grid item in pixels (default: 200) */
  itemMinWidth?: number;
  /** Height of each grid item in pixels (default: 200) */
  itemHeight?: number;
  /** Number of columns to render outside of the visible area (default: 2) */
  overscanColumnCount?: number;
  /** Number of rows to render outside of the visible area (default: 2) */
  overscanRowCount?: number;
  /** Debounce time for onLoadMore (default: 150) */
  loadMoreDebounce?: number;
  /** Distance from bottom in pixels to trigger onLoadMore (default: 100) */
  scrollThreshold?: number;
}

// Extend GridCellProps from react-virtualized
export type GridCellRendererProps = GridCellProps & {
  /** The item to render in the cell */
  item?: React.ReactNode;
  /** Gap between items in pixels */
  gap?: number;
};
