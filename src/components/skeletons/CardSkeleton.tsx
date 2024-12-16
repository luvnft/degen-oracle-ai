import React from 'react';

interface CardSkeletonProps {
  rows?: number;
}

const CardSkeleton = ({ rows = 3 }: CardSkeletonProps) => {
  return (
    <div className="bg-[#111111] rounded-lg border border-[#333333] p-6 animate-pulse">
      <div className="h-6 w-48 bg-[#333333] rounded mb-6" />
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-32 bg-[#333333] rounded" />
            <div className="h-4 w-24 bg-[#333333] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton; 