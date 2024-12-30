import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, FireIcon, PlayIcon, ClockIcon, ThumbUpIcon, FilmIcon, BookmarkIcon, CollectionIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

function Sidebar() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

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
    <aside className={`
      fixed inset-y-0 left-0 z-10 w-64 bg-white overflow-y-auto transition-all duration-300 ease-in-out
      ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static ${isMenuOpen ? 'lg:w-64' : 'lg:w-20'}
    `}>
      <nav className="p-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg ${isMenuOpen ? '' : 'lg:justify-center'}`}
          >
            <item.icon className="h-6 w-6 mr-4" />
            <span className={isMenuOpen ? '' : 'lg:hidden'}>{item.text}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

