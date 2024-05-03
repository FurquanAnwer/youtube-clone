import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { addMessage } from '../utils/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomName, getRandomComments } from '../utils/helper';

const LiveChat = () => {
    const dispatch = useDispatch()
    const chatMessages = useSelector((store)=>store.chat.messages);
    const [liveMessage,setLiveMessage] = useState("");
    useEffect(()=>{
        const i = setInterval(()=>{
            //API Polling
            console.log("API Polling");
            dispatch(
                addMessage({
                    name:generateRandomName(),
                    message:getRandomComments(),
                })
            );
            
        },500);
       

        return ()=>clearInterval(i);
    },[]);

    return (
        <>
        <div className='h-[600px] ml-2 p-2 col-span-1 border border-black bg-slate -200 rounded-lg overflow-y-scroll flex flex-col-reverse'>
        {
            chatMessages.map((c,i)=>(
                <ChatMessage key={i} name={c.name} message={c.message}/>
            ))
        }
        </div>
        <div >
            <form className='w-full p-2 ml-2 border border-black flex'
             onSubmit={(e)=>{
             e.preventDefault();
             dispatch(
                addMessage({
                    name:"Furquan",
                    message:liveMessage,
                }) 
             );
             setLiveMessage("");            
            }}   
            >

            
            <input 
            className='px-2 w-96 border-blue-300 bg-slate-200 rounded-lg' 
            type="text"
            value={liveMessage}
            onChange={(e)=>{
                setLiveMessage(e.target.value);
            }}
            />
            
            <button className='px-2 mx-2 bg-green-100'>Send</button>
            </form>
        </div>    
        </>
    
  )
}

export default LiveChat