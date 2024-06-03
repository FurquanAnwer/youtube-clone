import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { MdHome, MdShortText, MdVideoLibrary, MdLiveTv } from 'react-icons/md';


const SideBar = () => {
    const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);
    //Early Return Pattern
    if(!isMenuOpen) return null;
  return (
    <div className='p-5 shadow-lg col-span-1'>
            <div className='flex flex-col py-1 '>
                <Link to="/">
                    <div className='flex items-center'>
                        <MdHome className='h-8 w-8' />
                        <span className='ml-2'>Home</span>
                    </div>
                </Link>
            </div>

            <div className='flex flex-col py-1 '>
                <div className='flex items-center'>
                    <MdShortText className='h-8 w-8' />
                    <span className='ml-2'>Shorts</span>
                </div>
            </div>

            <div className='flex flex-col py-1 '>
                <div className='flex items-center'>
                    <MdVideoLibrary className='h-8 w-8' />
                    <span className='ml-2'>Videos</span>
                </div>
            </div>

            <div className='flex flex-col py-1 '>
                <div className='flex items-center'>
                    <MdLiveTv className='h-8 w-8' />
                    <span className='ml-2'>Live</span>
                </div>
            </div>

            <div className='border-t border-gray-300'>
                <h1 className='pt-2 font-bold'>Subscriptions</h1>
                <ul>
                    <li>Music</li>
                    <li>Sports</li>
                    <li>Gaming</li>
                    <li>Movies</li>
                </ul>
            </div>

            <div className='border-t border-gray-300'>
                <h1 className='pt-2 font-bold'>Watch later</h1>
                <ul>
                    <li>Music</li>
                    <li>Sports</li>
                    <li>Gaming</li>
                    <li>Movies</li>
                </ul>
            </div>
        </div>    
  )
}

export default SideBar