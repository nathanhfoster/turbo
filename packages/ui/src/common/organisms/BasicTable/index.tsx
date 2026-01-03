import { combineClassNames } from '@nathanhfoster/utils';
import Box from '../../atoms/Box';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import type { BasicTableProps } from './types';

export const BasicTable = <T extends object>({
  data = [],
  columns,
  striped = false,
  hoverable = false,
  className,
  style,
}: BasicTableProps<T>) => {
  return (
    <div
      className={combineClassNames(
        'relative overflow-x-auto sm:rounded-lg sm:shadow-md',
        className
      )}
      style={style}
    >
      {/* Table layout for larger screens */}
      <div className="hidden sm:block">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              {columns.map(column => {
                const columnStyle = {
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  flexGrow: column.flexGrow,
                  flexShrink: column.flexShrink,
                };

                return (
                  <th
                    key={String(column.accessor)}
                    scope="col"
                    className={combineClassNames('px-6 py-3', column.className)}
                    style={columnStyle}
                  >
                    {column.renderHeader ? column.renderHeader() : column.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={combineClassNames(
                  'border-b',
                  striped ? (rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50') : 'bg-white',
                  hoverable && 'hover:bg-gray-100' // Hover effect
                )}
              >
                {columns.map(column => {
                  const columnStyle = {
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    flexGrow: column.flexGrow,
                    flexShrink: column.flexShrink,
                  };

                  return (
                    <td
                      key={String(column.accessor)}
                      className={combineClassNames(
                        'px-6 py-4 whitespace-nowrap md:px-4 md:whitespace-normal',
                        column.className
                      )}
                      style={columnStyle}
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : String(row[column.accessor])}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked layout for smaller screens */}
      <Box display="flex" flexDirection="flex-col" gap="gap-2" className="sm:hidden">
        {data.map((row, rowIndex) => (
          <Card key={rowIndex}>
            {columns.map(column => (
              <Box key={String(column.accessor)} mb="mb-2">
                <Typography size="text-sm" className="block font-medium text-gray-500 uppercase">
                  {column.header}
                </Typography>
                <Typography size="text-sm" className="block text-gray-700">
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : String(row[column.accessor])}
                </Typography>
              </Box>
            ))}
          </Card>
        ))}
      </Box>
    </div>
  );
};
