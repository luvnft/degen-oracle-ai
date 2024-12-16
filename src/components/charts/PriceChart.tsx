import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface PriceChartProps {
  timeRange: '24h' | '7d' | '30d';
}

export const PriceChart = ({ timeRange }: PriceChartProps) => {
  // Mock data - จะแทนที่ด้วยข้อมูลจริงภายหลัง
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.random() * 100 + 50
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#88D693" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#88D693" stopOpacity={0}/>
          </linearGradient>
        </defs>
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
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#88D693"
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PriceChart; 