import React from 'react';
import { formatNumber, formatPercent } from '@/utils/format';

interface SocialMetricsProps {
  metrics: {
    twitter: {
      followers: number;
      followersChange24h: number;
      engagement: number;
      engagementChange24h: number;
    };
    telegram: {
      members: number;
      membersChange24h: number;
      activity: number;
      activityChange24h: number;
    };
    sentiment: {
      score: number;
      scoreChange24h: number;
      positive: number;
      negative: number;
      neutral: number;
    };
  };
}

const SocialMetrics = ({ metrics }: SocialMetricsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Twitter Followers</span>
            <span className={`text-sm ${metrics.twitter.followersChange24h >= 0 ? 'text-[#00FF00]' : 'text-red-500'}`}>
              {formatPercent(metrics.twitter.followersChange24h)}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-medium">{formatNumber(metrics.twitter.followers)}</span>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Twitter Engagement</span>
            <span className={`text-sm ${metrics.twitter.engagementChange24h >= 0 ? 'text-[#00FF00]' : 'text-red-500'}`}>
              {formatPercent(metrics.twitter.engagementChange24h)}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-medium">{formatNumber(metrics.twitter.engagement)}</span>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Telegram Members</span>
            <span className={`text-sm ${metrics.telegram.membersChange24h >= 0 ? 'text-[#00FF00]' : 'text-red-500'}`}>
              {formatPercent(metrics.telegram.membersChange24h)}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-medium">{formatNumber(metrics.telegram.members)}</span>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Telegram Activity</span>
            <span className={`text-sm ${metrics.telegram.activityChange24h >= 0 ? 'text-[#00FF00]' : 'text-red-500'}`}>
              {formatPercent(metrics.telegram.activityChange24h)}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-medium">{formatNumber(metrics.telegram.activity)}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-lg p-4">
        <h3 className="text-sm text-gray-400 mb-4">Sentiment Analysis</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-[#111111] rounded-full h-2">
            <div
              className="bg-[#00FF00] h-full rounded-full"
              style={{ width: `${metrics.sentiment.positive}%` }}
            />
          </div>
          <span className="text-[#00FF00]">{metrics.sentiment.positive}%</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex-1 bg-[#111111] rounded-full h-2">
            <div
              className="bg-red-500 h-full rounded-full"
              style={{ width: `${metrics.sentiment.negative}%` }}
            />
          </div>
          <span className="text-red-500">{metrics.sentiment.negative}%</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex-1 bg-[#111111] rounded-full h-2">
            <div
              className="bg-gray-500 h-full rounded-full"
              style={{ width: `${metrics.sentiment.neutral}%` }}
            />
          </div>
          <span className="text-gray-500">{metrics.sentiment.neutral}%</span>
        </div>
      </div>
    </div>
  );
};

export default SocialMetrics; 