import type { TableColumn } from "./types";

export const calculateColumnWidths = <T>(
  columns: TableColumn<T>[],
  totalWidth: number,
) => {
  // First pass: Calculate initial flexible width distribution
  const fixedWidthColumns = columns.filter((col) => col.width !== undefined);
  const flexibleColumns = columns.filter((col) => col.width === undefined);
  const totalFixedWidth = fixedWidthColumns.reduce(
    (sum, col) => sum + (col.width || 0),
    0,
  );
  const remainingWidth = totalWidth - totalFixedWidth;
  const initialFlexibleWidth =
    flexibleColumns.length > 0 ? remainingWidth / flexibleColumns.length : 0;

  // Second pass: Apply min/max constraints and redistribute space if needed
  let columnsWithConstraints = columns.map((column) => {
    const baseWidth =
      column.width !== undefined ? column.width : initialFlexibleWidth;
    let constrainedWidth = baseWidth;

    if (column.minWidth !== undefined && baseWidth < column.minWidth) {
      constrainedWidth = column.minWidth;
    }
    if (column.maxWidth !== undefined && baseWidth > column.maxWidth) {
      constrainedWidth = column.maxWidth;
    }

    return {
      ...column,
      calculatedWidth: constrainedWidth,
      isFlexible: column.width === undefined,
    };
  });

  // Calculate total constrained width
  const totalConstrainedWidth = columnsWithConstraints.reduce(
    (sum, col) => sum + col.calculatedWidth,
    0,
  );

  // If we have overflow or underflow, redistribute space among flexible columns
  if (totalConstrainedWidth !== totalWidth) {
    const widthDifference = totalWidth - totalConstrainedWidth;
    const flexibleCols = columnsWithConstraints.filter((col) => col.isFlexible);

    if (flexibleCols.length > 0) {
      const adjustmentPerColumn = widthDifference / flexibleCols.length;

      columnsWithConstraints = columnsWithConstraints.map((column) => {
        if (!column.isFlexible) return column;

        let adjustedWidth = column.calculatedWidth + adjustmentPerColumn;

        // Reapply constraints after adjustment
        if (column.minWidth !== undefined && adjustedWidth < column.minWidth) {
          adjustedWidth = column.minWidth;
        }
        if (column.maxWidth !== undefined && adjustedWidth > column.maxWidth) {
          adjustedWidth = column.maxWidth;
        }

        return {
          ...column,
          calculatedWidth: adjustedWidth,
        };
      });
    }
  }

  // Remove the temporary isFlexible property before returning
  return columnsWithConstraints.map(({ isFlexible, ...column }) => column);
};
