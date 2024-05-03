import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='px-5 py-2 col-span-11 shadow-lg'>
        <ButtonList/>
        <VideoContainer/>
    </div>
  )
}

export default MainContainer