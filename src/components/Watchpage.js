import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const Watchpage = () => {
 const dispatch = useDispatch();
 useEffect(()=>{
    dispatch(closeMenu());
 },[]);
 const [searchParams] = useSearchParams();
 console.log(searchParams.get("v"));

 
 return (
   <>
      <div className='flex flex-col'>
         <div className='px-5 py-2 col-span-11 shadow-lg flex'>
            <div>
            <iframe
            width="1000"
            height="600"
            src = {"https://www.youtube.com/embed/"+searchParams.get("v")}
            title='YouTube video player'
            frameBorder = '0'
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        
            </iframe>
            </div>
            <div className='col-span-1'>
               <LiveChat/>
            </div>
            
         </div>
      <CommentsContainer/>
      </div>
    
   </>
   
  )
}

export default Watchpage