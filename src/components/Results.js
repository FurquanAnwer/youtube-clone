import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { YOUTUBE_SEARCH_RESULTS_API } from '../utils/constants';
import { Loader2 } from 'lucide-react';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get('search_query');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${YOUTUBE_SEARCH_RESULTS_API}&q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch search results. Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.items || data.items.length === 0) {
          setError('No results found for your query.');
        } else {
          setSearchResults(data.items);
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const formatPublishTime = (publishTime) => {
    const now = new Date();
    const published = new Date(publishTime);
    const diffInSeconds = Math.floor((now - published) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Search Results for "{searchQuery}"
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4 p-4 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((video) => (
            <Link 
              key={video.id?.videoId || Math.random()} 
              to={`/watch?v=${video.id?.videoId}`}
              className="flex flex-col sm:flex-row mb-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <div className="relative w-full sm:w-48 h-48 sm:h-28">
                <img
                  src={video.snippet?.thumbnails?.medium?.url}
                  alt={video.snippet?.title || 'YouTube Video'}
                  className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                  {formatPublishTime(video.snippet?.publishTime)}
                </span>
              </div>
              <div className="p-3 flex-1">
                <h3 className="text-base font-semibold line-clamp-2 mb-1">
                  {video.snippet?.title || 'Untitled Video'}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {video.snippet?.channelTitle || 'Unknown Channel'}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {video.snippet?.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center p-4 bg-gray-100 rounded-lg">
          No results found. Try a different query.
        </p>
      )}
    </div>
  );
};

export default Results;

