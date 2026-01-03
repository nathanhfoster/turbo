'use client';

import React, { useCallback, useRef } from 'react';
import AutoSizerComponent from '../../molecules/AutoSizer';
import {
  InfiniteLoader,
  Grid as VirtualizedGrid,
  Size,
  SectionRenderedParams,
  GridCellProps,
} from 'react-virtualized';
import { ListGridProps } from './types';
import Box from '../../atoms/Box';
import Skeleton from '../../atoms/Skeleton';
import { useLayoutEffectAfterMount, useThrottledCallback } from '../../../hooks';
import { THROTTLE_TIME } from './constants';

const ListGrid = <T extends object>({
  className = 'h-screen',
  style,
  data = [],
  renderItem,
  columns = 3,
  gap = 16,
  itemMinWidth = 200,
  itemHeight = 200,
  overscanColumnCount = 5,
  overscanRowCount = 10,
  isRowLoaded = ({ index }) => index < data.length,
  threshold = 15,
  loadMoreRows = () => Promise.resolve(),
  rowCount = data.length,
}: ListGridProps<T>) => {
  const gridRef = useRef<VirtualizedGrid>(null);
  const [currentWidth, setCurrentWidth] = React.useState(0);

  const throttledSetCurrentWidth = useThrottledCallback(setCurrentWidth, [], THROTTLE_TIME);

  // Force grid recalculation when key props change
  useLayoutEffectAfterMount(() => {
    if (gridRef.current) {
      gridRef.current.recomputeGridSize();
    }
  }, [itemMinWidth, itemHeight, renderItem, columns, currentWidth]);

  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
      const idx = rowIndex * columns + columnIndex;
      const isLoaded = isRowLoaded({ index: idx });

      if (idx >= rowCount) {
        return null;
      }

      return (
        <Box
          key={key}
          style={{
            ...style,
            padding: gap / 2,
            boxSizing: 'border-box',
          }}
        >
          {isLoaded && data[idx] ? (
            renderItem(data[idx], idx, data)
          ) : (
            <Skeleton variant="rectangular" fullWidth fullHeight />
          )}
        </Box>
      );
    },
    [columns, data, gap, isRowLoaded, renderItem, rowCount]
  );

  return (
    <Box fullHeight fullWidth className={className} style={style}>
      <AutoSizerComponent>
        {(size: Size) => {
          const { width, height } = size;
          if (width !== currentWidth) {
            throttledSetCurrentWidth(width);
          }

          // Calculate how many items can fit in the available width
          const availableWidth = width;
          const itemWidthWithGap = itemMinWidth + gap;
          const maxCols = Math.floor(availableWidth / itemWidthWithGap);
          // Use the minimum between requested columns and what can fit
          const colCount = Math.max(1, Math.min(columns, maxCols));
          // Calculate actual column width to fill the space
          const columnWidth = (availableWidth - (colCount - 1) * gap) / colCount;
          const gridRows = Math.ceil(rowCount / colCount);

          return (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount}
              threshold={threshold}
            >
              {({ onRowsRendered, registerChild }) => (
                <VirtualizedGrid
                  ref={ref => {
                    registerChild(ref);
                    gridRef.current = ref;
                  }}
                  onSectionRendered={({
                    rowStartIndex,
                    rowStopIndex,
                    columnStartIndex,
                    columnStopIndex,
                  }: SectionRenderedParams) => {
                    const startIndex = rowStartIndex * colCount + columnStartIndex;
                    const stopIndex = rowStopIndex * colCount + columnStopIndex;
                    onRowsRendered({ startIndex, stopIndex });
                  }}
                  cellRenderer={cellRenderer}
                  columnCount={colCount}
                  columnWidth={columnWidth}
                  height={height}
                  rowCount={gridRows}
                  rowHeight={itemHeight}
                  width={width}
                  overscanColumnCount={overscanColumnCount}
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

export default ListGrid;
