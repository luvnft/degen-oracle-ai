import React from 'react';

const TokenSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#333333] rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-[#333333] rounded" />
            <div className="h-3 w-32 bg-[#333333] rounded" />
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="h-4 w-16 bg-[#333333] rounded" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-20 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-16 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-12 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-20 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-24 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-16 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-16 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-16 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4 text-right">
        <div className="h-4 w-16 bg-[#333333] rounded ml-auto" />
      </td>
      <td className="p-4">
        <div className="h-6 w-16 bg-[#333333] rounded" />
      </td>
      <td className="p-4 text-center">
        <div className="h-8 w-8 bg-[#333333] rounded mx-auto" />
      </td>
    </tr>
  );
};

export default TokenSkeleton; 