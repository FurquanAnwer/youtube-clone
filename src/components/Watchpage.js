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
            <div className='px-5 py-2 shadow-lg flex flex-col md:flex-row'>
                <div className='flex-grow md:flex-grow-0 md:w-3/4'>
                    <div className='relative' style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            className='absolute top-0 left-0 w-full h-full'
                            src={`https://www.youtube.com/embed/${searchParams.get(
                              "v"
                            )}?autoplay=1`}
                           //  {"https://www.youtube.com/embed/" + searchParams.get("v")}
                            title='YouTube video player'
                            frameBorder='0'
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                    
                </div>
                <div className='flex-grow md:flex-grow-0 md:w-1/4 mt-4 md:mt-0 md:ml-4'>
                    <LiveChat />
                </div>
            </div>
            <CommentsContainer />
        </div>
 
   </>
   
  )
}

export default Watchpage