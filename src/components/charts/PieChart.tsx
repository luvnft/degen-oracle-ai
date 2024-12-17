import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChartDataPoint } from '../../types';

interface PieChartProps {
  data: PieChartDataPoint[];
}

export const PieChart = ({ data }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={(entry) => `${entry.value}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => `${value}%`}
          contentStyle={{ 
            backgroundColor: '#1A1A1A',
            border: 'none',
            borderRadius: '8px',
          }}
        />
        <Legend 
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span style={{ color: '#888888' }}>{value}</span>}
        />
      </RechartsChart>
    </ResponsiveContainer>
  );
}; 