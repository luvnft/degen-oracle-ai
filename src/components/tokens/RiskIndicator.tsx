import React from 'react';

interface RiskIndicatorProps {
  score: number; // 0-100
  factors: {
    label: string;
    score: number;
    impact: 'high' | 'medium' | 'low';
  }[];
}

const RiskIndicator = ({ score, factors }: RiskIndicatorProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-[#00FF00]';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-[#00FF00]';
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Risk Score</h3>
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
          {score}/100
        </span>
      </div>

      <div className="relative h-2 bg-[#111111] rounded-full mb-8">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${getScoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="space-y-4">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${getImpactColor(factor.impact)}`} />
              <span className="text-sm">{factor.label}</span>
            </div>
            <span className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
              {factor.score}/100
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskIndicator; 