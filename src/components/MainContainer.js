import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='w-full px-4 py-2 overflow-x-hidden'>
      <ButtonList />
      <VideoContainer />
    </div>
  )
}

export default MainContainer

