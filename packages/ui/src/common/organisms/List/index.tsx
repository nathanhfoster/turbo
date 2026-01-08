"use client";

import { useCallback } from "react";
import AutoSizerComponent from "../../molecules/AutoSizer";
import {
  List as VirtualizedList,
  InfiniteLoader,
  ListRowProps,
  Size,
} from "react-virtualized";
import { ListProps } from "./types";
import Box from "../../atoms/Box";
import Typography from "../../atoms/Typography";
import Skeleton from "../../atoms/Skeleton";
import { combineClassNames } from "@nathanhfoster/utils";

const List = <T extends object>({
  className = "h-screen",
  style,
  data = [],
  renderItem,
  rowHeight = 50,
  isRowLoaded = ({ index }) => index < data.length,
  threshold = 15,
  loadMoreRows = () => Promise.resolve(),
  rowCount = data.length,
  overscanRowCount = 5,
  onRowClick,
  emptyMessage = "No items",
  emptyComponent,
}: ListProps<T>) => {
  const rowRenderer = useCallback(
    ({ index, key, style: rowStyle }: ListRowProps) => {
      const isLoaded = isRowLoaded({ index });

      if (!isLoaded || !data[index]) {
        const height = typeof rowHeight === "function" 
          ? rowHeight({ index })
          : rowHeight;
        return (
          <Box
            key={key}
            style={rowStyle}
            className="px-4 py-2"
          >
            <Skeleton 
              variant="rectangular" 
              fullWidth 
              style={{ height: `${height}px` }}
            />
          </Box>
        );
      }

      const item = data[index];
      const content = renderItem(item, index, data);

      return (
        <Box
          key={key}
          style={rowStyle}
          onClick={
            onRowClick
              ? () => onRowClick({ index, rowData: item })
              : undefined
          }
          className={combineClassNames(
            "px-4 py-2",
            onRowClick && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          )}
        >
          {content}
        </Box>
      );
    },
    [data, isRowLoaded, renderItem, rowHeight, onRowClick],
  );

  const getRowHeight = useCallback(
    (params: { index: number }) => {
      if (typeof rowHeight === "function") {
        return rowHeight(params);
      }
      return rowHeight;
    },
    [rowHeight],
  );

  if (data.length === 0 && !loadMoreRows) {
    return (
      <Box
        className={combineClassNames("flex items-center justify-center", className)}
        style={style}
      >
        {emptyComponent || (
          <Typography variant="p" className="text-gray-500 dark:text-gray-400">
            {emptyMessage}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      fullHeight
      fullWidth
      className={combineClassNames("overflow-hidden", className)}
      style={style}
    >
      <AutoSizerComponent>
        {(size: Size) => {
          const { width, height } = size;

          return (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount}
              threshold={threshold}
            >
              {({ onRowsRendered, registerChild }) => (
                <VirtualizedList
                  ref={registerChild}
                  width={width}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={getRowHeight}
                  rowRenderer={rowRenderer}
                  onRowsRendered={onRowsRendered}
                  overscanRowCount={overscanRowCount}
                  className="scrollbar-hide"
                />
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizerComponent>
    </Box>
  );
};

export default List;
