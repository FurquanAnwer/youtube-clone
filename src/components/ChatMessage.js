import React from 'react'

const ChatMessage = ({name,message}) => {
  return (
    <div className='flex items-center border-separate'>
        <img className='w-8 h-8 '
        src="data:image/png;base64,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"
        alt="user logo"
        />
        <span className='py-2 px-2 font-bold'>
            {name}
        </span>
        <span className='text-1xl'>
            {message}
        </span>
    </div>
  )
}

export default ChatMessage