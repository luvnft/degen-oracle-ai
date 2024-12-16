import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface VolumeChartProps {
  timeRange: '24h' | '7d' | '30d';
}

export const VolumeChart = ({ timeRange }: VolumeChartProps) => {
  // Mock data
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.random() * 1000000
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis 
          dataKey="time"
          stroke="#888888"
          fontSize={12}
        />
        <YAxis 
          stroke="#888888"
          fontSize={12}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1A1A1A',
            border: 'none',
            borderRadius: '8px',
          }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Bar 
          dataKey="value"
          fill="#88D693"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart; 