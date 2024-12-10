import React from 'react'

const ChatMessage = ({ name, message }) => {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                        {name.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>
            <div className="flex-1">
                <p className="text-sm">
                    <span className="font-medium text-gray-900">{name}</span>{' '}
                    <span className="text-gray-700">{message}</span>
                </p>
            </div>
        </div>
    )
}

export default ChatMessage

