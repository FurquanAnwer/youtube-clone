import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { YOUTUBE_SEARCH_RESULTS_API } from '../utils/constants';

const VideoCard = ({ video }) => {
  const {
    snippet: { thumbnails, title, channelTitle, publishTime } = {},
    id: { videoId } = {},
  } = video;

  if (!videoId || !thumbnails?.medium?.url) {
    return null; // Skip rendering if critical data is missing
  }

  return (
    <Link to={`/watch?v=${videoId}`} className="flex mb-4">
      <img
        src={thumbnails.medium.url}
        alt={title || 'YouTube Video'}
        className="w-40 h-24 object-cover rounded"
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold truncate">{title || 'Untitled Video'}</h3>
        <p className="text-sm text-gray-500">{channelTitle || 'Unknown Channel'}</p>
        <p className="text-sm text-gray-500">
          {new Date(publishTime).toLocaleDateString() || 'Unknown Date'}
        </p>
      </div>
    </Link>
  );
};

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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Fetching results...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((video) => (
            <VideoCard key={video.id?.videoId || Math.random()} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found. Try a different query.</p>
      )}
    </div>
  );
};

export default Results;
