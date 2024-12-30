import React from 'react'
import Button from './Button'

const ButtonList = () => {
  const buttons = ["All", "Music", "Mixes", "Gaming", "Live", "Comedy", "Podcasts", "Cooking", "Recently uploaded", "Watched"]

  return (
    <div className="flex flex-wrap p-2 mb-4 justify-center items-center space-x-2 md:space-x-4">
      {buttons.map((button, index) => (
        <Button key={index} name={button}/>      
      ))}
    </div>
  )
}

export default ButtonList
