"use client";

import { useCallback } from "react";
import AutoSizerComponent from "../../molecules/AutoSizer";
import {
  Table as VirtualizedTable,
  Column,
  TableHeaderProps,
} from "react-virtualized";
import { InfiniteLoader } from "react-virtualized";
import { TableProps } from "./types";
import Box from "../../atoms/Box";
import { calculateColumnWidths } from "./utils";
import { combineClassNames } from "@nathanhfoster/utils";
import SortArrow from "./components/SortArrow";
import Skeleton from "../../atoms/Skeleton";

const Table = <T extends object>({
  className = "h-screen",
  style,
  data = [],
  columns,
  rowHeight = 50,
  headerHeight = 50,
  loadMoreRows = () => Promise.resolve(),
  rowRenderer,
  onRowClick,
  sortBy,
  sortDirection = "ASC",
  onSort,
  rowCount = data.length,
  isRowLoaded = ({ index }: { index: number }) => index < data.length,
  threshold = 15,
}: TableProps<T>) => {
  const getColumnWidth = useCallback(
    (width: number) => calculateColumnWidths(columns, width),
    [columns],
  );

  const handleHeaderClick = useCallback(
    (columnKey: string) => {
      if (!onSort) return;
      const isSortable = columns.find((col) => col.key === columnKey)?.sortable;
      if (!isSortable) return;
      const newDirection =
        sortBy === columnKey && sortDirection === "ASC" ? "DESC" : "ASC";
      onSort(columnKey, newDirection);
    },
    [columns, onSort, sortBy, sortDirection],
  );

  return (
    <Box
      fullHeight
      fullWidth
      style={style}
      className={combineClassNames(className, "scrollbar-hide-all")}
    >
      <AutoSizerComponent>
        {(size) => {
          const columnsWithWidths = getColumnWidth(size.width);

          return (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount}
              threshold={threshold}
            >
              {({ onRowsRendered, registerChild }) => (
                <VirtualizedTable
                  ref={registerChild}
                  width={size.width}
                  height={size.height}
                  headerHeight={headerHeight}
                  rowHeight={rowHeight}
                  rowCount={rowCount}
                  rowGetter={({ index }) =>
                    isRowLoaded({ index })
                      ? data[index]
                      : ({ isSkeleton: true } as T)
                  }
                  onRowsRendered={onRowsRendered}
                  onRowClick={onRowClick}
                  headerRowRenderer={({ className, style, columns }) => (
                    <Box
                      className={combineClassNames(className, "flex")}
                      style={style}
                    >
                      {columns}
                    </Box>
                  )}
                  rowRenderer={({
                    index,
                    className,
                    style,
                    rowData,
                    ...props
                  }) => {
                    const isSkeletonRow = !isRowLoaded({ index });

                    if (isSkeletonRow) {
                      return (
                        <Box
                          key={`skeleton-row-${index}`}
                          className={combineClassNames(className, "flex")}
                          style={style}
                        >
                          {columnsWithWidths.map((col, colIndex) => (
                            <Box
                              key={`skeleton-cell-${colIndex}`}
                              className="border-t border-gray-200 px-4 py-3"
                              style={{ width: col.calculatedWidth }}
                            >
                              <Skeleton fullWidth fullHeight variant="text" />
                            </Box>
                          ))}
                        </Box>
                      );
                    }

                    const newClassName = combineClassNames(
                      className,
                      "flex",
                      onRowClick && "cursor-pointer hover:bg-gray-50",
                    );

                    if (rowRenderer) {
                      return rowRenderer({
                        ...props,
                        index,
                        className: newClassName,
                        rowData,
                        style,
                      });
                    }

                    return (
                      <Box
                        key={`row-${index}`}
                        className={newClassName}
                        style={style}
                        onClick={(e) =>
                          onRowClick?.({ rowData, index, event: e })
                        }
                      >
                        {props.columns}
                      </Box>
                    );
                  }}
                >
                  {getColumnWidth(size.width).map((column, idx) => (
                    <Column
                      key={
                        column.key === "actions"
                          ? `actions-${column.header}-${idx}`
                          : column.key
                      }
                      label={column.header}
                      dataKey={column.key}
                      width={column.calculatedWidth}
                      minWidth={column.calculatedWidth}
                      maxWidth={column.calculatedWidth}
                      defaultSortDirection={sortDirection}
                      disableSort={!column.sortable}
                      headerRenderer={(props: TableHeaderProps) => {
                        return (
                          <Box
                            className={combineClassNames(
                              "px-4 py-3 text-sm font-semibold text-gray-700",
                              column.sortable &&
                                "cursor-pointer hover:bg-gray-50",
                              sortBy === column.key && "bg-gray-50",
                            )}
                            style={{ width: column.calculatedWidth }}
                            onClick={() => handleHeaderClick(column.key)}
                          >
                            <div className="flex items-center justify-between">
                              <span>
                                {column.renderHeader
                                  ? column.renderHeader(props)
                                  : props.label}
                              </span>
                              {column.sortable && sortBy === column.key && (
                                <SortArrow direction={sortDirection} />
                              )}
                            </div>
                          </Box>
                        );
                      }}
                      cellDataGetter={({ rowData }) => rowData[column.key]}
                      cellRenderer={({ rowData }) => (
                        <Box
                          className={combineClassNames(
                            "border-t border-gray-200 px-4 py-3",
                          )}
                          style={{ width: column.calculatedWidth }}
                        >
                          {column.renderColumn(rowData)}
                        </Box>
                      )}
                    />
                  ))}
                </VirtualizedTable>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizerComponent>
    </Box>
  );
};

export default Table;
