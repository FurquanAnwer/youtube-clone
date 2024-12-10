import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { YOUTUBE_SEARCH_RESULTS_API } from '../utils/constants';

const VideoCard = ({ video }) => (
  <Link to={`/watch?v=${video.id.videoId}`} className="flex mb-4">
    <img 
      src={video.snippet.thumbnails.medium.url} 
      alt={video.snippet.title} 
      className="w-40 h-24 object-cover"
    />
    <div className="ml-4">
      <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
      <p className="text-sm text-gray-500">{video.snippet.channelTitle}</p>
      <p className="text-sm text-gray-500">{video.snippet.publishTime}</p>
    </div>
  </Link>
);

const Results = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get('search_query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${YOUTUBE_SEARCH_RESULTS_API}&q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setSearchResults(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
      <div className="space-y-4">
        {searchResults.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Results;

