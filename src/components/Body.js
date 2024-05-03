import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import Watchpage from './Watchpage'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='grid grid-flow-col gap-0'>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default Body