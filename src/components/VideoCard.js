import React from 'react'
import { useState, useEffect } from 'react';
import { Shimmer } from 'react-shimmer';

// const VideoCard = ({info}) => {
//   console.log(info);
// //   console.log(typeof info);
//   const {snippet,statistics}=info;
//   const {channelTitle,title,thumbnails} = snippet;

//   return (
//     <div className='w-72 bg-white rounded-lg shadow-lg overflow-hidden m-4'>
//         <div className='aspect-w-16 aspect-h-9'>
//         <Shimmer width={300} height={200} />
//           <img className='object-cover w-full h-full' alt = 'thumbnail' src={thumbnails.high.url}/>
//         </div>
        
//         <div className="p-4">
//           <h3 className="text-m font-semibold">{title}</h3>
//           <p className="text-sm ">{channelTitle}</p>
//           <p className='text-sm '>{statistics.viewCount} views</p>
//         </div>
//         {/* <ul>
//                 <li className='font-bold py-2'>{title}</li>
//                 <li>{channelTitle}</li>
//                 <li>{statistics.viewCount} views</li>
//             </ul>
//         </div>       */}
      
//     </div>
//   )
// }

const VideoCard = ({ info }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timer);
  }, []);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  // console.log(isLoading);

  return (
      <div className='w-72 bg-white rounded-lg shadow-lg overflow-hidden m-4'>
          <div className='aspect-w-16 aspect-h-9 relative'>
              {isLoading && <Shimmer width={300} height={200} />}
              <img
                  className={`${isLoading ? 'hidden' : 'object-cover w-full h-full'}`}
                  alt='thumbnail'
                  src={thumbnails.high.url}
                  // onLoad={() => setIsLoading(false)}
              />
          </div>
          <div className='p-4'>
              <h3 className='text-m font-semibold'>{isLoading ? 'Loading...' : title}</h3>
              <p className='text-sm'>{isLoading ? 'Loading...' : channelTitle}</p>
              <p className='text-sm'>{isLoading ? 'Loading...' : statistics.viewCount} views</p>
          </div>
      </div>
  );
};

export default VideoCard