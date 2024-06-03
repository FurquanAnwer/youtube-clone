import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants'
import { cacheResults } from '../utils/searchSlice'

const Head = () => {
    const [searchQuery,setSearchQuery] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const [showSuggestions,setShowSuggestions] = useState(false);
    const searchCache = useSelector((store)=>store.search);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(searchQuery);
        const timer = setTimeout(()=>{
            if(searchCache[searchQuery]){
                setSuggestions(searchCache[searchQuery]);
                console.log("setSuggestion is called");
            }
            else{
                getSearchSuggestions();
                console.log("getSearchSuggestions is called")
            }
        },200);
        return ()=>{
            clearTimeout(timer);
        };
    },[searchQuery]);

    const getSearchSuggestions = async () =>{
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        console.log(json[1]);
        setSuggestions(json[1]);
        console.log(suggestions);

        //update cache
        dispatch(cacheResults({
            [searchQuery]:json[1],
        }
        ));
    }
    // const dispatch = useDispatch();
    const toggleMenuHandler = () =>{
        dispatch(toggleMenu());
    };
    return (
    <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
        <div className='flex items-center col-span-1'>
            <img className='h-8 cursor-pointer hover:bg-gray-300 rounded-full p-1'
            onClick={()=>toggleMenuHandler()}
            alt='menu'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png">
            </img>
            <a href="/">
            <img className='h-14 w-35 mx-3 cursor-pointer'
            alt = 'youtube logo'
            src='https://1000logos.net/wp-content/uploads/2017/05/Youtube-logo.jpg'>
            </img>
            </a>
            
        </div>
        <div className='col-span-10'>
            <div className='flex items-center justify-center'>
            <input 
                className = 'w-1/2 border border-gray-400 p-2 rounded-l-full' 
                type='text'
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                onFocus={()=>setShowSuggestions(true)}
                onBlur={()=>setShowSuggestions(false)}>
            </input>
            <button className='border border-gray-4oo p-2 rounded-r-full'>
            
                Search
            </button>
            </div>
            
                
        </div>
        <div className='col-span-1'>
                <img className='h-8 hover:cursor-pointer'
                alt = "user-logo"
                src="https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"></img>
        </div>
        
    </div>
  )
}

export default Head





