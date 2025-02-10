import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import { Loader2 } from 'lucide-react';
import { YOUTUBE_VIDEO_API } from '../utils/constants';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getVideos = useCallback(async () => {
    if (loading) return;
    console.log("YouTube API Key:", process.env.REACT_APP_YOUTUBE_API_KEY);

    setLoading(true);
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
      const json = await data.json();
      setVideos((prevVideos) => [...prevVideos, ...json.items]);
      setHasMore(json.items.length === 50);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const scrollPosition = window.scrollY + window.innerHeight;
    const containerHeight = document.getElementById('video-container')?.offsetHeight || 0;
    if (scrollPosition >= containerHeight - 500) {
      getVideos();
    }
  }, [loading, hasMore, getVideos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div id="video-container" className="w-full mx-auto my-2 sm:my-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id} className="block">
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-4 sm:py-6">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default VideoContainer;

