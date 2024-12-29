import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, FireIcon, PlayIcon, ClockIcon, ThumbUpIcon, FilmIcon, BookmarkIcon, CollectionIcon, MenuIcon } from '@heroicons/react/outline';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: HomeIcon, text: 'Home', link: '/' },
    { icon: FireIcon, text: 'Trending', link: '/' },
    { icon: PlayIcon, text: 'Subscriptions', link: '/' },
    { icon: CollectionIcon, text: 'Library', link: '/' },
    { icon: ClockIcon, text: 'History', link: '/' },
    { icon: ThumbUpIcon, text: 'Liked videos', link: '/' },
    { icon: FilmIcon, text: 'Your videos', link: '/' },
    { icon: BookmarkIcon, text: 'Watch later', link: '/' },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:w-25
      `}>
        <nav className="p-2 ">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-6 w-6 mr-4" />
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;

