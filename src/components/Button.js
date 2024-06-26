import React from 'react'

const Button = ({name}) => {
  return (
    <div>
        <button className='px-2 py-2 mx-2 bg-gray-200 rounded-lg'>{name}</button>
    </div>
  )
}

export default Button