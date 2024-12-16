import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1); // Separator
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#333333]">
      {/* Items info */}
      {itemsPerPage && totalItems && (
        <div className="text-sm text-gray-400">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
        </div>
      )}

      {/* Page buttons */}
      <div className="flex items-center space-x-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-lg
            ${currentPage === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }
          `}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, idx) => (
          <button
            key={idx}
            onClick={() => pageNum !== -1 && onPageChange(pageNum)}
            disabled={pageNum === -1}
            className={`
              min-w-[32px] h-8 rounded-lg text-sm
              ${pageNum === currentPage
                ? 'bg-[#1A1A1A] text-white'
                : pageNum === -1
                ? 'text-gray-500 cursor-default'
                : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }
            `}
          >
            {pageNum === -1 ? '...' : pageNum}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-lg
            ${currentPage === totalPages
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }
          `}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 