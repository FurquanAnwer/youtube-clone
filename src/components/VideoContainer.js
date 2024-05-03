import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';


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
      setVideos((prevVideos) => [...prevVideos,...json.items]);
      setHasMore(json.items.length === 50); // assuming 10 items per page
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (loading ||!hasMore) return;
    const scrollPosition = window.scrollY + window.innerHeight;
    const containerHeight = document.getElementById('video-container').offsetHeight;
    if (scrollPosition >= containerHeight) {
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
    <div id="video-container" className="flex flex-wrap justify-center">
      {videos.map((video) => (
        <Link to={"/watch?v=" + video.id} key={video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};


// const VideoContainer = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//       getVideos();
//   }, []);

//   const getVideos = async () => {
//       try {
//           const data = await fetch(YOUTUBE_VIDEO_API);
//           const json = await data.json();
//           setVideos(json.items);
//       } catch (error) {
//           console.error('Error fetching videos:', error);
//       }
//   };

//   return (
//       <div className='flex flex-wrap justify-center'>
//           {videos.map((video) => (
//               <Link to={"/watch?v=" + video.id} key={video.id}>
//                   <VideoCard info={video} />
//               </Link>
//           ))}
//       </div>
//   );
// };



// const VideoContainer = () => {
//   const [videos,setVideos] = useState([]);
//   useEffect(()=>{
//     getVideos();
//   },[]);
//   const getVideos = async ()=> {
//     const data = await fetch(YOUTUBE_VIDEO_API);
//     const json = await data.json();
//     // console.log(json.items);
//     setVideos(json.items)
//   };
//   // console.log(videos[0]);
//   // console.log(typeof videos[0]);
//   // const {snippet,statistics} = videos[0];
//   // console.log(snippet);
//   // console.log(statistics);
//   return (
//     <div className='flex flex-wrap justify-center'>
//       {
//         videos.map((video)=>(
//           <Link to={"/watch?v="+video.id}>
//           <VideoCard key={video.id} info={video}/>
//           </Link>
//         ))
//       }
      
//     </div>
//   )
// }

export default VideoContainer