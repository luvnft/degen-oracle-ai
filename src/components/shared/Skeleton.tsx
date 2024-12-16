import React from 'react';

export const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-[#1A1A1A] rounded ${className}`} />
  );
}; 