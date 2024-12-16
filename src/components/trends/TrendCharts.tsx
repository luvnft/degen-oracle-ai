import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface TrendChartsProps {
  volumeData: { time: string; value: number }[];
  growthData: { time: string; value: number }[];
}

export const TrendCharts = ({ volumeData, growthData }: TrendChartsProps) => {
  const volumeChartRef = useRef<HTMLDivElement>(null);
  const growthChartRef = useRef<HTMLDivElement>(null);
  const chartRefs = useRef<{ volume?: IChartApi; growth?: IChartApi }>({});

  useEffect(() => {
    if (!volumeChartRef.current || !growthChartRef.current) return;

    // Volume Chart
    chartRefs.current.volume = createChart(volumeChartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#888888',
      },
      grid: {
        vertLines: { color: '#333333' },
        horzLines: { color: '#333333' },
      },
      width: volumeChartRef.current.clientWidth,
      height: 300,
    });

    const volumeSeries = chartRefs.current.volume.addAreaSeries({
      lineColor: '#88D693',
      topColor: '#88D69330',
      bottomColor: '#88D69305',
      lineWidth: 2,
    });

    volumeSeries.setData(volumeData);
    chartRefs.current.volume.timeScale().fitContent();

    // Growth Chart
    chartRefs.current.growth = createChart(growthChartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#888888',
      },
      grid: {
        vertLines: { color: '#333333' },
        horzLines: { color: '#333333' },
      },
      width: growthChartRef.current.clientWidth,
      height: 300,
    });

    const growthSeries = chartRefs.current.growth.addAreaSeries({
      lineColor: '#FFD039',
      topColor: '#FFD03930',
      bottomColor: '#FFD03905',
      lineWidth: 2,
    });

    growthSeries.setData(growthData);
    chartRefs.current.growth.timeScale().fitContent();

    const handleResize = () => {
      if (volumeChartRef.current && chartRefs.current.volume) {
        chartRefs.current.volume.applyOptions({
          width: volumeChartRef.current.clientWidth,
        });
      }
      if (growthChartRef.current && chartRefs.current.growth) {
        chartRefs.current.growth.applyOptions({
          width: growthChartRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRefs.current.volume) chartRefs.current.volume.remove();
      if (chartRefs.current.growth) chartRefs.current.growth.remove();
    };
  }, [volumeData, growthData]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-[#111111] rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Volume Trends</h3>
        <div ref={volumeChartRef} />
      </div>
      <div className="bg-[#111111] rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Category Growth</h3>
        <div ref={growthChartRef} />
      </div>
    </div>
  );
}; 