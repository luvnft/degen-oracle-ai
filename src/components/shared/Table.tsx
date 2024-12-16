import React from 'react';
import { Skeleton } from '../shared/Skeleton';

interface Column<T> {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string | null;
  emptyText?: string;
  className?: string;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error = null,
  emptyText = 'No data',
  className = ''
}: TableProps<T>) => {
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex-1 overflow-auto scrollbar-custom">
        <table className="w-full">
          <thead>
            <tr className="sticky top-0 bg-[#111111] border-b border-[#333333]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-3 py-3 text-left text-sm font-medium text-gray-400
                    ${column.width || ''}
                    ${column.sortable ? 'cursor-pointer hover:text-white' : ''}
                  `}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-3 py-3">
                      <Skeleton className="h-6 w-24" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-gray-400"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              // Data rows
              data.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-[#333333] hover:bg-[#1A1A1A]"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-3 py-3">
                      {column.render
                        ? column.render(record[column.key], record)
                        : record[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table; 