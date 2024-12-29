import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    if (loading) return;
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
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const scrollPosition = window.scrollY + window.innerHeight;
    const containerHeight = document.getElementById('video-container').offsetHeight;
    if (scrollPosition >= containerHeight - 500) {
      getVideos();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div id="video-container" className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id} className="block">
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default VideoContainer

