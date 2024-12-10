import React from 'react'

const Button = ({ name }) => {
  return (
    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
      {name}
    </button>
  )
}

export default Button