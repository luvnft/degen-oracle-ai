import React from 'react';

interface SortableHeaderProps {
  title: string;
  sortKey: string;
  currentSort: string | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (key: string) => void;
}

const SortableHeader = ({
  title,
  sortKey,
  currentSort,
  sortDirection,
  onSort
}: SortableHeaderProps) => {
  return (
    <div
      className="flex items-center space-x-1 cursor-pointer"
      onClick={() => onSort(sortKey)}
    >
      <span>{title}</span>
      <div className="flex flex-col">
        <span className={`
          h-0 w-0 border-l-[4px] border-l-transparent
          border-r-[4px] border-r-transparent
          border-b-[4px]
          ${currentSort === sortKey && sortDirection === 'asc'
            ? 'border-b-[#00FF00]'
            : 'border-b-gray-600'}
        `} />
        <span className={`
          h-0 w-0 border-l-[4px] border-l-transparent
          border-r-[4px] border-r-transparent
          border-t-[4px]
          ${currentSort === sortKey && sortDirection === 'desc'
            ? 'border-t-[#00FF00]'
            : 'border-t-gray-600'}
        `} />
      </div>
    </div>
  );
};

export default SortableHeader; 