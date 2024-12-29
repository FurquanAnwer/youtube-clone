import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { addMessage } from '../utils/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { generateRandomName, getRandomComments } from '../utils/helper'

const LiveChat = () => {
    const dispatch = useDispatch()
    const chatMessages = useSelector((store) => store.chat.messages)
    const [liveMessage, setLiveMessage] = useState("")

    useEffect(() => {
        const i = setInterval(() => {
            // API Polling
            console.log("API Polling")
            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: getRandomComments(),
                })
            )
        }, 500)

        return () => clearInterval(i)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (liveMessage.trim()) {
            dispatch(
                addMessage({
                    name: "Furquan",
                    message: liveMessage,
                })
            )
            setLiveMessage("")
        }
    }

    return (
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg overflow-hidden h-full w-full">
            <div className="bg-white border-b border-gray-300 p-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Live chat</h2>
                <button className="text-blue-600 hover:text-blue-800">
                    ···
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {chatMessages.slice().reverse().map((c, i) => (
                    <ChatMessage key={i} name={c.name} message={c.message} />
                ))}
            </div>
            <div className="border-t border-gray-300 p-4 bg-gray-50">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <input
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Chat publicly as Furquan..."
                        value={liveMessage}
                        onChange={(e) => setLiveMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none"
                        disabled={!liveMessage.trim()}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LiveChat

