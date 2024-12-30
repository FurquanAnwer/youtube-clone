import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";
import { API_KEY } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import {
  MenuIcon,
  SearchIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";  // YouTube Data API v3 search endpoint

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Handle search suggestions using YouTube Data API v3
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
        return;
      }

      try {
        const response = await fetch(
          `${YOUTUBE_API_URL}?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch suggestions");

        const data = await response.json();
        if (data.items) {
          const suggestions = data.items.map(item => item.snippet.title);
          setSuggestions(suggestions);
          dispatch(cacheResults({ [searchQuery]: suggestions }));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    // Debounce effect for suggestions API call
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(fetchSuggestions, 300);
    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch, searchCache]);

  // Handle search form submission for video results
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/results?search_query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside of the search input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to shorten suggestion text
  const shortenText = (text, length = 20) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="w-full sticky top-0 z-20 bg-white">
      <div className="flex justify-between items-center p-2 md:px-5">
        <div className="flex items-center">
          <MenuIcon
            className="h-6 cursor-pointer hover:bg-gray-100 rounded-full p-1"
            onClick={() => dispatch(toggleMenu())}
          />
          <Link to="/">
            <img
              className="h-6 md:h-5 mx-3"
              alt="YouTube Logo"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            />
          </Link>
        </div>

        <div className={`${showSearch ? 'flex' : 'hidden'} md:flex flex-grow max-w-2xl mx-4 relative`} ref={searchInputRef}>
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              className="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search"
            />
            <button
              className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 hover:bg-gray-200"
              type="submit"
            >
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </button>
          </form>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute mt-11 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <SearchIcon className="h-5 w-5 text-gray-500 mr-2" /> {/* Search icon for each suggestion */}
                  <span>{shortenText(suggestion, 30)}</span> {/* Shortened text for suggestions */}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <SearchIcon 
            className="h-6 mx-2 cursor-pointer md:hidden" 
            onClick={() => setShowSearch(!showSearch)}
          />
          <MicrophoneIcon className="h-6 mx-2 cursor-pointer hidden sm:block" />
          <VideoCameraIcon className="h-6 mx-2 cursor-pointer hidden sm:block" />
          <BellIcon className="h-6 mx-2 cursor-pointer" />
          <UserCircleIcon className="h-8 mx-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Head;
