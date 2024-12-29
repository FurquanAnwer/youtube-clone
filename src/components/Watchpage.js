import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import { API_KEY } from "../utils/constants";
import { numberFormatter } from '../utils/helper';

const Watchpage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  // State to hold video and channel details
  const [videoDetails, setVideoDetails] = useState({
    videoTitle: '',
    channelName: '',
    channelDp: '',
    subscribers: '',
  });

  // Function to fetch YouTube details
  const fetchYouTubeDetails = async (videoId) => {
    try {
      // Fetch video details
      const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${API_KEY}&id=${videoId}`);
      const videoData = await videoResponse.json();
      const video = videoData.items[0];
      const channelId = video.snippet.channelId;

      // Fetch channel details
      const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${API_KEY}&id=${channelId}`);
      const channelData = await channelResponse.json();
      const channel = channelData.items[0];

      // Update state with fetched details
      setVideoDetails({
        videoTitle: video.snippet.title,
        channelName: channel.snippet.title,
        channelDp: channel.snippet.thumbnails.default.url,
        subscribers: channel.statistics.subscriberCount,
      });
    } catch (error) {
      console.error('Error fetching YouTube details:', error);
    }
  };

  useEffect(() => {
    dispatch(closeMenu());
    if (videoId) fetchYouTubeDetails(videoId); // Fetch details when videoId is available
  }, [dispatch, videoId]);

  return (
    <div className="bg-gray-100 min-h-screen col-span-11">
      <div className="max-w-10xl mx-auto px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-3/4">
            <div className="relative pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-900">{videoDetails.videoTitle}</h1>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={videoDetails.channelDp}
                    alt="Channel avatar"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{videoDetails.channelName}</p>
                    <p className="text-sm text-gray-500">{numberFormatter(videoDetails.subscribers)} subscribers</p>
                  </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 mt-6 lg:mt-0">
            <LiveChat />
          </div>
        </div>
        <div className="mt-8">
          <CommentsContainer />
        </div>
      </div>
    </div>
  );
};

export default Watchpage;
