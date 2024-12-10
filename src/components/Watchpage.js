import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice'
import { useSearchParams } from 'react-router-dom'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'

const Watchpage = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get("v")

  useEffect(() => {
    dispatch(closeMenu())
  }, [dispatch])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-3/4">
            <div className="relative pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-900">Video Title</h1>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/placeholder.svg?height=40&width=40"
                    alt="Channel avatar"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Channel Name</p>
                    <p className="text-sm text-gray-500">1M subscribers</p>
                  </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 mt-6 lg:mt-0">
            <LiveChat />
          </div>
        </div>
        <div className="mt-8">
          <CommentsContainer />
        </div>
      </div>
    </div>
  )
}

export default Watchpage

