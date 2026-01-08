"use client";

import { useCallback, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@nathanhfoster/react-hooks";
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
import { combineClassNames, isFunction } from "@nathanhfoster/utils";

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
  scrollToIndex,
  selectedIndex,
}: ListProps<T>) => {
  const listRef = useRef<VirtualizedList | null>(null);
  const rowRenderer = useCallback(
    ({ index, key, style: rowStyle }: ListRowProps) => {
      const isLoaded = isRowLoaded({ index });

      if (!isLoaded || !data[index]) {
        const height = isFunction(rowHeight)
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
      const isSelected = selectedIndex !== undefined && selectedIndex === index;

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
            onRowClick && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            isSelected && "bg-primary/10 dark:bg-primary/20 border-l-4 border-primary"
          )}
        >
          {content}
        </Box>
      );
    },
    [data, isRowLoaded, renderItem, rowHeight, onRowClick, selectedIndex],
  );

  const getRowHeight = useCallback(
    (params: { index: number }) => {
      if (isFunction(rowHeight)) {
        return rowHeight(params);
      }
      return rowHeight;
    },
    [rowHeight],
  );

  // Scroll to index when scrollToIndex changes
  // Use useIsomorphicLayoutEffect to scroll before paint for smoother UX
  useIsomorphicLayoutEffect(() => {
    if (scrollToIndex !== undefined && scrollToIndex >= 0 && listRef.current) {
      listRef.current.scrollToRow(scrollToIndex);
    }
  }, [scrollToIndex]);

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
              {({ onRowsRendered, registerChild }) => {
                // Store ref for scrolling
                const setRef = (ref: VirtualizedList | null) => {
                  registerChild(ref);
                  listRef.current = ref;
                };
                
                return (
                  <VirtualizedList
                    ref={setRef}
                    width={width}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={getRowHeight}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    overscanRowCount={overscanRowCount}
                    className="scrollbar-hide"
                  />
                );
              }}
            </InfiniteLoader>
          );
        }}
      </AutoSizerComponent>
    </Box>
  );
};

export default List;
