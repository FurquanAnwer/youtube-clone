import React, { useState, useEffect } from 'react';
import { Shimmer } from 'react-shimmer';
import { numberFormatter } from '../utils/helper';
import { VerifiedIcon } from 'lucide-react';

const VideoCard = ({ info }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  const getTimeDifference = (publishDate) => {
    const now = new Date();
    const published = new Date(publishDate);
    const difference = now.getTime() - published.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className='w-full bg-white dark:bg-gray-800 overflow-hidden group'>
      <div className='aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden mb-3'>
        {isLoading ? (
          <Shimmer width="100%" height="100%" />
        ) : (
          <img
            className='object-cover w-full h-full transition-transform duration-200 group-hover:scale-105'
            alt={title}
            src={thumbnails.high.url}
            loading="lazy"
          />
        )}
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {numberFormatter(statistics.viewCount)} views
        </div>
      </div>
      <div className='flex'>
        <div className="flex-shrink-0 mr-3">
          <img
            className="h-8 w-8 rounded-full"
            src={thumbnails.default.url}
            alt={`${channelTitle} avatar`}
            loading="lazy"
          />
        </div>
        <div className='flex-grow'>
          <h3 className='text-sm font-semibold line-clamp-2 mb-1 dark:text-white'>
            {isLoading ? 'Loading...' : title}
          </h3>
          <p className='text-xs text-gray-500 dark:text-gray-400 flex items-center'>
            {isLoading ? 'Loading...' : (
              <>
                {channelTitle}
                <VerifiedIcon className="w-3 h-3 ml-1 text-gray-400" aria-label="Verified channel" />
              </>
            )}
          </p>
          <p className='flex gap-1 text-xs text-gray-500 dark:text-gray-400'>
            {isLoading ? 'Loading...' : (
              <>
                <span>{numberFormatter(statistics.viewCount)} views</span>
                <span aria-hidden="true">•</span>
                <span>{getTimeDifference(publishedAt)}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

