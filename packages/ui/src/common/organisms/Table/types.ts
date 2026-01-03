import { DataComponent } from '../../../types';
import { ReactNode } from 'react';
import type { ColumnProps as VirtualizedColumnProps, TableHeaderProps } from 'react-virtualized';

export type SortDirection = 'ASC' | 'DESC';
import type { CSSProperties } from 'react';
// import type { Column as VirtualizedColumn } from 'react-virtualized';
import type { PickPartial } from '@monkey-tilt/utils';
import type { InfiniteLoaderProps } from 'react-virtualized';

export interface TableColumn<T>
  extends Pick<
    VirtualizedColumnProps,
    | 'cellDataGetter'
    | 'cellRenderer'
    | 'className'
    | 'disableSort'
    | 'flexGrow'
    | 'flexShrink'
    | 'label'
    | 'minWidth'
    | 'maxWidth'
  > {
  /**
   * Unique key for the column
   */
  key: 'actions' | string;
  /**
   * Header label for the column
   */
  header: string;
  /**
   * Function to render the header content
   */
  renderHeader?: (item: TableHeaderProps) => ReactNode;
  /**
   * Function to render the cell content
   */
  renderColumn: (item: T) => ReactNode;
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
   * Whether the column is sortable
   */
  sortable?: boolean;
}

export interface TableProps<T extends object>
  extends DataComponent<T>,
    PickPartial<
      InfiniteLoaderProps,
      'isRowLoaded' | 'loadMoreRows' | 'rowCount' | 'threshold' | 'minimumBatchSize'
    > {
  /**
   * Optional className for the table container
   */
  className?: string;
  /**
   * Optional style for the table container
   */
  style?: CSSProperties;
  /**
   * Array of column definitions
   */
  columns: TableColumn<T>[];
  /**
   * Optional row height in pixels
   */
  rowHeight?: number;
  /**
   * Optional header height in pixels
   */
  headerHeight?: number;
  /**
   * Currently sorted column key
   */
  sortBy?: string;
  /**
   * Current sort direction ('ASC' or 'DESC')
   */
  sortDirection?: SortDirection;
  /**
   * Callback when a column header is clicked for sorting
   */
  onSort?: (columnKey: string, direction: SortDirection) => void;
  /**
   * Custom row renderer function
   */
  rowRenderer?: (props: {
    index: number;
    className: string;
    rowData: T;
    style: CSSProperties;
  }) => React.ReactNode;
  /**
   * Function to call when a row is clicked
   */
  onRowClick?: (props: { rowData: T; index: number; event: React.MouseEvent }) => void;
}
