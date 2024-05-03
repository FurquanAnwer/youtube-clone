import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const SideBar = () => {
    const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);
    //Early Return Pattern
    if(!isMenuOpen) return null;
  return (
    <div className='p-5 shadow-lg col-span-1'>
            
            <div className='flex flex-col py-1 '>
                <Link to="/">
                    <div className='flex items-center'>
                        <img className='h-8 w-8' src="https://static.thenounproject.com/png/3574480-200.png" alt="Home Icon"/>
                        <span className='ml-2'>Home</span>
                    </div>
                </Link>
            </div>

            <div className='flex flex-col py-1 '>
                {/* <Link to="/"> */}
                    <div className='flex items-center'>
                        <img className='h-8 w-8' src="https://i.pinimg.com/originals/17/d2/18/17d21878c22fe49e7e4752eecaa36541.png" alt="Home Icon"/>
                        <span className='ml-2'>Shorts</span>
                    </div>
                {/* </Link> */}
            </div>

            <div className='flex flex-col py-1 '>
                {/* <Link to="/"> */}
                    <div className='flex items-center'>
                        <img className='h-8 w-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1hheVu2X6VQXWLWLnLfeBF1yk3voFiwOiCYcoFZtyIQ&s" alt="Home Icon"/>
                        <span className='ml-2'>Videos</span>
                    </div>
                {/* </Link> */}
            </div>

            <div className='flex flex-col py-1 '>
                {/* <Link to="/"> */}
                    <div className='flex items-center'>
                        <img className='h-8 w-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOniDBBj9QSK1qE33g9-BBsCjGNU0KStHsw&s" alt="Home Icon"/>
                        <span className='ml-2'>Live</span>
                    </div>
                {/* </Link> */}
            </div>

            {/* </div> */}
        
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