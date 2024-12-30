import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='w-full flex-1 flex'>
      <SideBar />
      <div className='flex-1 overflow-x-hidden'>
        <Outlet />
      </div>
    </div>
  )
}

export default Body

