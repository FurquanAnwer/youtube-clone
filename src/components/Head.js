import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else if (searchQuery.trim()) {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_RESULTS_API + searchQuery);
      const json = await data.json();
      setSuggestions(json[1]);

      dispatch(
        cacheResults({
          [searchQuery]: json[1],
        })
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       const currentParams = new URLSearchParams(location.search);
//       currentParams.set("search_query", searchQuery);
//       const updatedUrl = `${location.pathname}?${currentParams.toString()}`;
//       window.history.pushState({}, "", updatedUrl);
//       setShowSuggestions(false);
//     }
//   };

const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/results?search_query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

// const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion);
//     const currentParams = new URLSearchParams(location.search);
//     currentParams.set("search_query", suggestion);
//     const updatedUrl = `${location.pathname}?${currentParams.toString()}`;
//     window.history.pushState({}, "", updatedUrl);
//     setShowSuggestions(false);
//   };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex justify-between items-center p-2 md:px-5">
        {/* Left Section */}
        <div className="flex items-center">
          <MenuIcon
            className="h-6 cursor-pointer hover:bg-gray-100 rounded-full p-1"
            onClick={toggleMenuHandler}
          />
          <Link to="/">
            <img
              className="h-6 md:h-5 mx-3"
              alt="youtube logo"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            />
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex-grow max-w-2xl mx-4" ref={searchInputRef}>
          <form onSubmit={handleSubmit} className="flex">
            <div className="relative flex-grow">
              <input
                className="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 hover:bg-gray-200"
              type="submit"
            >
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </button>
          </form>
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
