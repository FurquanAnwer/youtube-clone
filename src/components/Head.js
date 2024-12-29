import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import {
  MenuIcon,
  SearchIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      // Check cache first
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
        return;
      }

      try {
        const response = await fetch(`${YOUTUBE_SEARCH_RESULTS_API}&q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error("Failed to fetch suggestions");

        const data = await response.json();
        if (data && data[1]) {
          setSuggestions(data[1]);
          dispatch(cacheResults({ [searchQuery]: data[1] }));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    // Debounce API calls
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, dispatch, searchCache]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/results?search_query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex justify-between items-center p-2 md:px-5">
        {/* Left Section */}
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

        {/* Search Section */}
        <div className="flex-grow max-w-2xl mx-4 relative" ref={searchInputRef}>
          <form onSubmit={handleSubmit} className="flex">
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
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          <MicrophoneIcon className="h-6 mx-2 cursor-pointer" />
          <VideoCameraIcon className="h-6 mx-2 cursor-pointer" />
          <BellIcon className="h-6 mx-2 cursor-pointer" />
          <UserCircleIcon className="h-8 mx-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Head;
